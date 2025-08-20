import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("-password -__v"); // exclude password & __v

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Convert mongoose doc to plain object
    const safeUser = user.toObject();

    return NextResponse.json(
      { message: "User found", user: safeUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
