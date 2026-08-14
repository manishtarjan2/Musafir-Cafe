"use client";

import MusicPlayer from "@/app/components/MusicPlayer";
import GlobalHeader from "@/app/components/GlobalHeader";

export default function MusicPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-24">
      <GlobalHeader title="🎵 Music Library" />

      <main className="max-w-7xl mx-auto p-8 max-md:p-4">
        <MusicPlayer />
      </main>
    </div>
  );
}
