"use client";

import Image from "next/image";
import OpenIALogo from "@/assets/logo-open-ai.png";
import { signIn } from "next-auth/react";

export default async function Login() {
  return (
    <div className="bg-openai-500 h-screen flex flex-col items-center justify-center text-center">
      <Image src={OpenIALogo} alt="logo" width={300} height={300} />
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="text-white bg-openai-200 p-4 rounded font-semibold text-xl hover:bg-openai-200/80 transition-colors"
      >
        Log in to use ChatGPT
      </button>
    </div>
  );
}
