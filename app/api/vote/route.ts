import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Vote from "@/models/vote";
import connectToDatabase from "@/lib/db";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { trackId, voteType } = await req.json();

  if (!trackId || !["upvote", "downvote"].includes(voteType)) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const alreadyVoted = await Vote.findOne({ user: userId, track: trackId });

    if (alreadyVoted) {
      return NextResponse.json({ error: "Already voted" }, { status: 409 });
    }

    await Vote.create({
      user: userId,
      track: trackId,
      voteType,
    });

    return NextResponse.json({ message: "Vote recorded successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
