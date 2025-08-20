import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Note from "@/models/Note";

export const POST = async (req: NextRequest) => {
  await connectDB();

  try {
    const body = await req.json();
    const { title, content, userId } = body;

    if (!userId || !title || !content) {
      return NextResponse.json(
        { message: "userId, title, and content are required" },
        { status: 400 }
      );
    }

    const newNote = await Note.create({ userId, title, content });

    return NextResponse.json(
      { message: "Note created successfully", note: newNote },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const GET = async () => {
  await connectDB();

  try {
    const notes = await Note.find();
    return NextResponse.json(notes, { status: 200 });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
