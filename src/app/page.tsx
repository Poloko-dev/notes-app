"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8 text-center">
      {/* Gradient Title */}
      <h1 className="text-6xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
        NotesApp
      </h1>

      {/* Modern Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Register
        </button>
        <button
          onClick={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
          className="px-6 py-2 rounded-full text-white font-semibold bg-gradient-to-r from-green-400 to-emerald-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          Login
        </button>
      </div>

      {/* Centered Auth Forms */}
      <div className="mt-6 flex justify-center w-full">
        <div className="w-full max-w-md">
          {showRegister && <RegisterForm />}
          {showLogin && <LoginForm />}
        </div>
      </div>
    </div>
  );
}
