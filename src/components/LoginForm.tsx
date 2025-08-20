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
      className="flex flex-col gap-4 w-full max-w-sm"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border px-4 py-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Login
      </button>
      {message && <p className="text-sm text-red-500">{message}</p>}
    </form>
  );
}
