"use client";

import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";
import Message from "./Message";
import { ArrowCircleDown } from "@phosphor-icons/react";
import SidebarButton from "./SidebarButton";

export default function Chat({ chatId }: Chat) {
  const { data: session } = useSession();

  const [messages, loading] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden">
      <SidebarButton title="Hide Sidebar"/>
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">Type a prompt in below to get started!</p>
          <ArrowCircleDown size={40} className="mx-auto mt-5 text-white animate-bounce"/>
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()}/>
      ))}
    </div>
  ) 
}
