import connectToDatabase from "@/lib/db";
import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

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
    if (typeof error === "object" && error !== null && "code" in error && (error as any).code === 11000) {
      return NextResponse.json(
        { message: "Duplicate key error", error: (error as any).message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Error creating user", error: (error as any)?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
