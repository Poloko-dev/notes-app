"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/notes");
      } else {
        setMessage(data.message);
      }
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
        className="border border-gray-700 bg-gray-800 text-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        required
      />

      {/* Modern button */}
      <button
        type="submit"
        className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
      >
        Login
      </button>

      {/* Error / message */}
      {message && (
        <p className="text-sm text-red-400 text-center font-medium">
          {message}
        </p>
      )}
    </form>
  );
}
