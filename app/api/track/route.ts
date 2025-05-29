import connectToDatabase from "@/lib/db";
import Track from "@/models/track";
import Vote from "@/models/vote";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const user = await auth();
  if (req.body === null) {
    return new Response("No body provided", { status: 400 });
  }

  const { youtubeId } = await req.json();

  if (!youtubeId) {
    return new Response("youtubeId is required", { status: 400 });
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    console.log(
      "YouTube API key:",
      process.env.YOUTUBE_API_KEY ? "exists" : "missing"
    );
    if (!response.ok) {
      return NextResponse.json({
        message: "Failed to fetch video details",
        status: response.status,
        response: response.statusText,
      });
    }
    const data = await response.json();
    if (data.items.length === 0) {
      return new Response("Video not found", { status: 404 });
    }
    const video = data.items[0].snippet;
    const track = {
      youtubeId: data.items[0].id,
      title: video.title,
      artist: video.channelTitle,
    };

    const existing = await Track.findOne({ youtubeId: track.youtubeId });
    if (existing) {
      return NextResponse.json({
        message: "Track already exists",
        track: existing,
      });
    }

    try {
      await Track.create({
        youtubeId: track.youtubeId,
        title: track.title,
        artist: track.artist,
        addedBy: user.userId,
      });
      return NextResponse.json({ message: "Track added successfully", track });
    } catch (error) {
      return NextResponse.json({
        message: "Error saving track to database",
        error,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching video details",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}

export async function GET() {
  await connectToDatabase();
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const tracks = await Track.find({}).sort({ createdAt: -1 });
    const voteCounts = await Vote.aggregate([
      {
        $group: {
          _id: "$track",
          upvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] },
          },
          downvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] },
          },
        },
      },
    ]);

    const voteMap: {
      [key: string]: { upvotes: number; downvotes: number; total: number };
    } = {};
    voteCounts.forEach((vote) => {
      voteMap[vote._id.toString()] = {
        upvotes: vote.upvotes,
        downvotes: vote.downvotes,
        total: vote.upvotes - vote.downvotes,
      };
    });

    const tracksWithVotes = tracks.map((track) => {
      const votes = voteMap[track._id.toString()] || {
        upvotes: 0,
        downvotes: 0,
        total: 0,
      };

      return {
        ...track.toObject(),
        voteCount: votes.total,
        upvotes: votes.upvotes,
        downvotes: votes.downvotes,
      };
    });

    return NextResponse.json(tracksWithVotes);
  } catch (error) {
    return NextResponse.json({
      message: "Error fetching tracks",
      error: error instanceof Error ? error.message : "Unknown error",
      status: 500,
    });
  }
}
