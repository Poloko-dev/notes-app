import { NextRequest, NextResponse } from "next/server";
import Note from "@/models/Note";
import { connectDB } from "@/lib/mongodb";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { message: "Note id is required" },
      { status: 400 }
    );
  }

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete note error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await connectDB();

  try {
    const { id } = params;
    const body = await req.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { message: "title and content are required" },
        { status: 400 }
      );
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!updatedNote) {
      return NextResponse.json({ message: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(updatedNote, { status: 200 });
  } catch (error) {
    console.error("Update note error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
