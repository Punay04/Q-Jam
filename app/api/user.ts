import User from "@/models/user";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  const user = await auth();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const existing = await User.findOne({ userId: user.userId });
  if (existing) {
    return NextResponse.json({ message: "User already exists" });
  }

  try {
    await User.create({
      username: user.userId,
    });
    return NextResponse.json({ message: "User created successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
