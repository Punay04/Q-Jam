import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import Track from "@/models/track";
import Vote from "@/models/vote";

export async function GET() {
  await connectToDatabase();

  try {
    const voteCounts = await Vote.aggregate([
      {
        $lookup: {
          from: "tracks", // name of the Track collection (Mongo uses lowercase plural by default)
          localField: "track",
          foreignField: "_id",
          as: "trackDetails",
        },
      },
      { $unwind: "$trackDetails" }, // Removes orphaned votes
      {
        $group: {
          _id: "$track",
          upvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "upvote"] }, 1, 0] },
          },
          downvotes: {
            $sum: { $cond: [{ $eq: ["$voteType", "downvote"] }, 1, 0] },
          },
          trackDetails: { $first: "$trackDetails" },
        },
      },
      {
        $addFields: {
          score: { $subtract: ["$upvotes", "$downvotes"] },
        },
      },
      { $sort: { score: -1 } },
    ]);

    let nowPlaying;

    if (voteCounts.length === 0) {
      const allTracks = await Track.find();
      if (allTracks.length === 0) {
        return NextResponse.json({ nowPlaying: null });
      }

      const randomTrack =
        allTracks[Math.floor(Math.random() * allTracks.length)];

      nowPlaying = {
        _id: randomTrack._id,
        title: randomTrack.title,
        artist: randomTrack.artist,
        youtubeId: randomTrack.youtubeId,
        voteCount: 0,
        upvotes: 0,
        downvotes: 0,
      };
    } else {
      const topVote = voteCounts[0];
      const track = topVote.trackDetails;
      if (!track) {
        return NextResponse.json(
          { error: "Top voted track not found" },
          { status: 404 }
        );
      }

      nowPlaying = {
        _id: track._id,
        title: track.title,
        artist: track.artist,
        youtubeId: track.youtubeId,
        voteCount: topVote.score,
        upvotes: topVote.upvotes,
        downvotes: topVote.downvotes,
      };
    }

    return NextResponse.json({ nowPlaying });
  } catch (error) {
    console.error("Error fetching now playing track:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
