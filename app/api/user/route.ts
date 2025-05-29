import connectToDatabase from "@/lib/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

interface MongoError extends Error {
  code?: number;
  message: string;
}

export async function POST() {
  await connectToDatabase();
  const { userId } = await auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const existing = await User.findOne({
    $or: [{ userId }, { username: userId }],
  });

  if (existing) {
    return NextResponse.json({ message: "User already exists" });
  }

  try {
    await User.create({
      userId,
      username: userId,
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    const err = error as MongoError;

    if (err && err.code === 11000) {
      return NextResponse.json(
        { message: "Duplicate key error", error: err.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error creating user", error: err.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
