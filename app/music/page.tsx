"use client";

import Link from "next/link";
import MusicPlayer from "@/app/components/MusicPlayer";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function MusicPage() {
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
        <MusicPlayer />
      </main>
    </div>
  );
}
