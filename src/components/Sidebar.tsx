"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import OpenIALogo from "@/assets/logo-open-ai.png";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import ChatRow from "./ChatRow";

export default function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, "users", session.user?.email!, "chats"),
    orderBy("createdAt", 'asc')
  ));

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <div>
          <NewChat />

          <div>{/* ModelSelecion */}</div>

          {/* Map to chats */}
          {
            chats?.docs.map(chat => (
              <ChatRow key={chat.id} id={chat.id}/>
            ))
          }
        </div>
      </div>
      {session && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={session.user?.image! ?? OpenIALogo}
          alt=""
          title="Sign Out"
          className="h-12 w-12 rounded-full cursor-pointer mx-auto mb-2 hover:opacity-50"
          onClick={() => signOut()}
        />
      )}
    </div>
  );
}
