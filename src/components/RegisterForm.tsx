"use client";

import { useState } from "react";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      setMessage("Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-gray-900 p-6 rounded-2xl shadow-lg"
    >
      {/* Input field */}
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-700 bg-gray-800 text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        required
      />

      {/* Modern button */}
      <button
        type="submit"
        className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        Register
      </button>

      {/* Message */}
      {message && (
        <p className="text-sm text-green-400 text-center font-medium">
          {message}
        </p>
      )}
    </form>
  );
}
