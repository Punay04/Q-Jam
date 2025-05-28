import connectToDatabase from "@/lib/db";
import Track from "@/models/track";
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
    return new Response("Error fetching video details", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const user = await auth();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const tracks = await Track.find({ addedBy: user.userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json(tracks);
  } catch (error) {
    return new Response("Error fetching tracks", { status: 500 });
  }
}
