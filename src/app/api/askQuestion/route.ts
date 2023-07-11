import query from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";

type Data = {
  answer: string;
};

export const config = {
  runtime: 'edge'
};

export async function POST(
  req: Request,
  res: NextApiResponse<Data>
) {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt) {
    res.status(400).json({ answer: "Please provide a prompt" });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: "Please provide a valid chat ID" });
    return;
  }

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "Chat GPT was unable to find an answer for that!",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "ChatGPT",
      name: "ChatGPT",
      avatar: "https://links.papareact.com/89k",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return new Response(JSON.stringify({answer: message.text}), {status: 200})
  // res.status(200).json({answer: message.text})
}
