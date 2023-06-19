"use client";

import { useSession, signOut } from "next-auth/react";
import NewChat from "./NewChat";
import OpenIALogo from '@/assets/logo-open-ai.png'

export default function Sidebar() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex-1">
        <div>
          <NewChat />

          <div>{/* ModelSelecion */}</div>

          {/* Map to chats */}
        </div>
      </div>
      {session && (
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
