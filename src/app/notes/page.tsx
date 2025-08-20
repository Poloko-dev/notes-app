"use client";

import { useState, useEffect } from "react";

interface Note {
  _id: string;
  userId: string;
  title: string;
  content: string;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const fetchNotes = async () => {
    const res = await fetch("/api/notes");
    const data = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addNote = async () => {
    if (!title || !content) return;

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("User not logged in");
      return;
    }
    const user = JSON.parse(storedUser);

    const res = await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, title, content }),
    });

    const data = await res.json();
    setNotes((prev) => [...prev, data.note]);
    setTitle("");
    setContent("");
  };

  const updateNote = async (noteId: string) => {
    const newTitle = prompt("New title:");
    const newContent = prompt("New content:");
    if (!newTitle || !newContent) return;

    const res = await fetch(`/api/notes/${noteId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });

    const updatedNote = await res.json();
    setNotes((prev) =>
      prev.map((note) => (note._id === noteId ? updatedNote : note))
    );
  };

  const deleteNote = async (noteId: string) => {
    await fetch(`/api/notes/${noteId}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((note) => note._id !== noteId));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded flex-1"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border px-4 py-2 rounded flex-1"
        />
        <button
          onClick={addNote}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{note.title}</h2>
              <p>{note.content}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateNote(note._id)}
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
