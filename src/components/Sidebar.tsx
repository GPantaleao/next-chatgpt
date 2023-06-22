"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import OpenIALogo from "@/assets/logo-open-ai.png";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../lib/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";
import { SignOut } from "@phosphor-icons/react";
import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export default function Sidebar() {
  const { data: session } = useSession();
  const { isMobile, isHeaderOpen } = useContext(AppContext);

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className={`bg-openai-800 overflow-y-auto ${ isHeaderOpen ? 'md:w-[20rem] w-full' : 'md:w-0 w-0'} transition-all`}>
      <div className="flex flex-col h-screen p-2">
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <div>
            <NewChat />

            <div className="hidden sm:inline">
              <ModelSelection />
            </div>

            {loading && (
              <div className="animate-pulse text-center text-white my-4">
                <p className="font-medium">Loading Chats...</p>
              </div>
            )}

            <div className="flex flex-col space-y-2 my-4">
              {chats?.docs.map((chat) => (
                <ChatRow key={chat.id} chatId={chat.id} />
              ))}
            </div>
          </div>
        </div>
        {session && (
          <div
            className="flex items-center text-white rounded-lg cursor-pointer py-2 px-2 space-x-4 hover:bg-gray-700/50 transition-colors "
            title="Sign Out"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            <img
              id="profile-pic"
              src={session?.user?.image! ?? OpenIALogo}
              alt=""
              className="h-10 w-h-10 rounded-full cursor-pointer hover:opacity-50"
              referrerPolicy="no-referrer"
            />
            <p className="font-medium text-sm flex-1">{session?.user?.name!}</p>
            <SignOut size={24} />
          </div>
        )}
      </div>
    </div>
  );
}
