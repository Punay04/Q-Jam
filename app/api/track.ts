import Track from "@/models/track";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
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
    if (!response.ok) {
      return new Response("Failed to fetch video details", {
        status: response.status,
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
      });
      return NextResponse.json({ message: "Track added successfully", track });
    } catch (error) {
      return new Response("Error saving track to database", { status: 500 });
    }
  } catch (error) {
    return new Response("Error fetching video details", { status: 500 });
  }
}
