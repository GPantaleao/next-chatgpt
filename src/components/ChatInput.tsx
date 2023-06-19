"use client";

import { PaperPlaneRight } from "@phosphor-icons/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { db } from "../../firebase";

interface ChatInput {
  chatId: string;
}

export default function ChatInput({ chatId }: ChatInput) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();

  const model = 'text-davinci-003'

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    setPrompt("");

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar:
          session?.user?.image! ||
          `https://ui-avatar.com/api/?name=${session?.user?.name}`,
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session
      })
    })
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Escreva sua mensagem aqui"
        />
        <button
          className="bg-[#11A37F] text-white px-4 py-2 rounded hover:opacity-50 cursor-pointer disabled:bg-transparent disabled:cursor-default disabled:text-inherit disabled:pointer-events-none transition-all"
          disabled={!prompt || !session}
          type="submit"
        >
          <PaperPlaneRight size={20} weight="fill" />
        </button>
      </form>

      {/* <div></div> */}
    </div>
  );
}
