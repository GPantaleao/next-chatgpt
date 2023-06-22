"use client";

import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { SidebarSimple } from "@phosphor-icons/react";

interface SidebarButtonProps {
  title: string;
  onSidebar?: boolean; 
}

export default function SidebarButton({ title, onSidebar }: SidebarButtonProps) {
  const { setIsHeaderOpen, isHeaderOpen } = useContext(AppContext);

  return (
    <div
      className={`top-4 left-4 p-3 text-sm rounded-md border-gray-500 border hover:bg-gray-600/70 cursor-pointer text-gray-300 transition-colors ${
        !onSidebar ? isHeaderOpen ? "hidden" : "absolute" : ""
      }`}
      title={title}
      onClick={() => setIsHeaderOpen(!isHeaderOpen)}
    >
      <SidebarSimple size={20} />
    </div>
  );
}
