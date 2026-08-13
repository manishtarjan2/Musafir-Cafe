"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [form, setForm] = useState({
    title: "",
    artist: "",
    duration: "3:30",
    mood: "Calm",
    cover: "rain",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadSongs() {
      const response = await fetch("/api/songs", { cache: "no-store" });
      const data = await response.json();
      setSongs(data.songs ?? []);
    }

    loadSongs();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const response = await fetch("/api/songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok && data.song) {
      setSongs((current) => [data.song, ...current]);
      setForm({ title: "", artist: "", duration: "3:30", mood: "Calm", cover: "rain" });
    }

    setSubmitting(false);
  }

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Music Library</h1>
        <nav className="page-nav" aria-label="Music navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="page-grid">
        <section className="content-card">
          <h2>Now playing</h2>
          <div className="song-list">
            {songs.map((song) => (
              <div key={song.id} className="song-item">
                <div>
                  <strong>{song.title}</strong>
                  <div className="song-meta-line">{song.artist}</div>
                  <div className="song-meta-line">Mood: {song.mood}</div>
                </div>
                <span className="song-badge">{song.duration}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-card">
          <h2>Add a Song</h2>
          <form className="song-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Song title"
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Artist"
              value={form.artist}
              onChange={(event) => setForm({ ...form, artist: event.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Duration (3:30)"
              value={form.duration}
              onChange={(event) => setForm({ ...form, duration: event.target.value })}
              required
            />
            <select
              value={form.mood}
              onChange={(event) => setForm({ ...form, mood: event.target.value })}
            >
              <option value="Calm">Calm</option>
              <option value="Warm">Warm</option>
              <option value="Focus">Focus</option>
              <option value="Evening">Evening</option>
              <option value="Drift">Drift</option>
            </select>
            <select
              value={form.cover}
              onChange={(event) => setForm({ ...form, cover: event.target.value })}
            >
              <option value="rain">Rain</option>
              <option value="portrait">Portrait</option>
              <option value="sea">Sea</option>
              <option value="sky">Sky</option>
            </select>
            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add song"}
            </button>
          </form>
        </aside>
      </div>
    </div>
  );
}
