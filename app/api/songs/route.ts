import { NextResponse } from "next/server";

import { addSong, getSongsAsync } from "@/lib/songs";

export async function GET() {
  const songs = await getSongsAsync();
  return NextResponse.json({ songs });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, artist, duration, mood, cover, playlist } = body ?? {};

    if (!title || !artist || !duration || !mood || !playlist) {
      return NextResponse.json(
        { error: "Title, artist, duration, mood, and playlist are required." },
        { status: 400 }
      );
    }

    const song = addSong({ title, artist, duration, mood, cover, playlist });
    return NextResponse.json({ song }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid song payload." }, { status: 400 });
  }
}
