"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import MusicPlayer from "@/app/components/MusicPlayer";
import type { Song } from "@/lib/songs";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function MusicPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSongs() {
      try {
        const response = await fetch("/api/songs", { cache: "no-store" });
        const data = await response.json();
        setSongs(data.songs ?? []);
      } catch (error) {
        console.error("Failed to load songs:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSongs();
  }, []);

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>🎵 Music Library</h1>
        <nav className="page-nav" aria-label="Music navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="p-8 max-md:p-0">
        {loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>Loading your music library...</p>
          </div>
        ) : songs.length > 0 ? (
          <MusicPlayer songs={songs} />
        ) : (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            <p>No songs available. Please add some songs!</p>
          </div>
        )}
      </main>
    </div>
  );
}
