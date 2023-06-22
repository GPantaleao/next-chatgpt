"use client"

import { Chat, Trash } from "@phosphor-icons/react";
import { collection, deleteDoc, doc, orderBy } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "../lib/firebase";
import { AppContext } from "@/context/AppContext";

export default function ChatRow({ chatId }: Chat) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);
  const { setIsHeaderOpen, isMobile } = useContext(AppContext);

  const [messages, loading, error] = useCollection(
    collection(db, "users", session?.user?.email!, "chats", chatId, "messages")
  );

  useEffect(() => {
    if (!pathname) return;

    setActive(pathname.includes(chatId));
  }, [pathname, chatId]);

  const removeChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", chatId));
    router.replace("/");
  };

  return (
    <Link
      href={`/chat/${chatId}`}
      className={`chatRow justify-center items-center ${
        active && "bg-gray-700/50"
      }`}
      onClick={() => setIsHeaderOpen(!isMobile)}
    >
      <Chat size={20} />
      <p className="flex-1 inline-flex truncate">
        {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
      </p>
      <Trash
        onClick={removeChat}
        size={20}
        className="text-gray-700 hover:text-red-600 transition-colors"
      />
    </Link>
  );
}
