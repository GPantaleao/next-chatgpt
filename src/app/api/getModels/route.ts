import query from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "../../../lib/firebaseAdmin";
import { NextResponse } from "next/server";
import openai from "@/lib/chatgpt";



export async function GET(
  req: Request,
  res: NextApiResponse<Model>
) {
  const models = await openai.listModels().then((res) => res.data.data);

  const modelsOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }))

  return new Response(JSON.stringify({ modelsOptions }), { status: 200 })
}
