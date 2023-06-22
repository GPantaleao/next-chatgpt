"use client";

import { Plus, SidebarSimple } from "@phosphor-icons/react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { db } from "../lib/firebase";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import SidebarButton from "./SidebarButton";

export default function NewChat() {
  const router = useRouter();
  const { setIsHeaderOpen, isHeaderOpen } = useContext(AppContext);
  const { data: session } = useSession();

  const createNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email!,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="flex items-center space-x-4">
      <div
        onClick={createNewChat}
        className="border-gray-700 border chatRow flex-1"
        title="Create new chat"
      >
        <Plus size={16} />
        <p>New Chat</p>
      </div>
      <SidebarButton title="Hide Sidebar" onSidebar/>
    </div>
  );
}
