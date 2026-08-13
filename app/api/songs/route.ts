import { NextResponse } from "next/server";

import { addSong, getSongs } from "@/lib/songs";

export async function GET() {
  return NextResponse.json({ songs: getSongs() });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artist, duration, mood, cover } = body ?? {};

    if (!title || !artist || !duration || !mood) {
      return NextResponse.json(
        { error: "Title, artist, duration, and mood are required." },
        { status: 400 }
      );
    }

    const song = addSong({ title, artist, duration, mood, cover });
    return NextResponse.json({ song }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid song payload." }, { status: 400 });
  }
}
