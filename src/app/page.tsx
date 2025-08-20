"use client";

import Image from "next/image";
import { useState } from "react";
import RegisterForm from "@/components/RegisterForm";
import LoginForm from "@/components/LoginForm";

export default function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 gap-8">
      <Image
        className="dark:invert"
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />

      <div className="flex gap-4">
        <button
          onClick={() => {
            setShowRegister(true);
            setShowLogin(false);
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
        <button
          onClick={() => {
            setShowLogin(true);
            setShowRegister(false);
          }}
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          Login
        </button>
      </div>

      <div className="mt-6">
        {showRegister && <RegisterForm />}
        {showLogin && <LoginForm />}
      </div>
    </div>
  );
}
