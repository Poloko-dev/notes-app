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
    <div className="p-8 max-w-3xl mx-auto min-h-screen bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-white">My Notes</h1>

      <div className="flex flex-col gap-3 mb-6">
        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-100 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Content textarea */}
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-gray-100 px-4 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none min-h-[100px]"
        ></textarea>

        {/* Add button */}
        <button
          onClick={addNote}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition-all shadow-md w-full sm:w-auto"
        >
          Add
        </button>
      </div>

      <ul className="space-y-4">
        {notes.map((note) => (
          <li
            key={note._id}
            className="border border-gray-700 rounded p-4 flex justify-between items-center bg-gray-800 shadow-md hover:shadow-lg transition-all"
          >
            <div className="max-w-[70%] break-words">
              <h2 className="font-semibold text-lg">{note.title}</h2>
              <p className="text-gray-300 mt-1 break-words whitespace-pre-wrap">
                {note.content}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateNote(note._id)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded shadow-md transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow-md transition-all"
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
