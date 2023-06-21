"use client";

import { PaperPlaneRight } from "@phosphor-icons/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent,  useRef, useState } from "react";
import { db } from "../lib/firebase";
import { toast } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

export default function ChatInput({ chatId }: Chat) {
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null)
  const [isTextareaResize, setIsTextareaResize] = useState(false)

  const { data: model } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

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

    const notification = toast.loading("ChatGPT is thinking...");
    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      toast.success("ChatGPT has responded!", {
        id: notification,
      });
    });

  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setPrompt(value);
  
    const textarea = document.getElementById('textarea');
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
      setIsTextareaResize(textarea.scrollHeight > 20)
    }
  };

  const handlePressEnter = (event: any) => {
    if (event.keyCode == 13 && !event.shiftKey && !!prompt.trim().length) {
      sendMessage(event);
    }
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm  w-full max-w-4xl mx-auto my-4">
      <form onSubmit={sendMessage} className={`p-3 space-x-5 flex ${isTextareaResize ? "items-end" : "items-center"}`} ref={formRef}>
        <textarea
          id="textarea"
          className="text-white bg-transparent focus:outline-none flex-1 max-h-32 disabled:cursor-not-allowed disabled:text-gray-300 resize-none overflow-y-auto"
          disabled={!session}
          rows={1}
          value={prompt}
          onChange={(event) => handleTextareaChange(event)}
          onKeyDown={(e) => handlePressEnter(e)}
          placeholder="Escreva sua mensagem aqui"
        />
        <button
          className="bg-openai-200 text-white px-4 py-2 rounded hover:opacity-50 cursor-pointer disabled:bg-transparent disabled:cursor-default disabled:text-inherit disabled:pointer-events-none transition-all flex items-end h-full"
          disabled={!prompt || !session}
          type="submit"
        >
          <PaperPlaneRight size={20} weight="fill" />
        </button>
      </form>

      <div className="md:hidden">
        <ModelSelection />
      </div>
    </div>
  );
}
