"use client"

import Image from "next/image"
import OpenIALogo from '@/assets/logo-open-ai.png'
import { signIn } from "next-auth/react"

export default async function Login() {
  
  return (
    <div className="bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center">
      <Image 
        src={OpenIALogo}
        alt="logo"
        width={300}
        height={300}
      />
      <button onClick={() => signIn('google')} className="text-white font-bold text-3xl animate-pulse">
        Sign In to use ChatGPT
      </button>
    </div>
  )
}
