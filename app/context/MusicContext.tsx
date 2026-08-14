"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { Song } from "@/lib/songs";

interface MusicContextType {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  currentIndex: number;
  activeTab: "all" | "custom";
  customPlaylistIds: string[];
  searchQuery: string;
  loading: boolean;
  
  // Setters
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: "all" | "custom") => void;
  setCurrentIndex: (index: number) => void;
  
  // Actions
  togglePlay: () => void;
  playNext: () => void;
  playPrev: () => void;
  toggleCustomPlaylist: (e: React.MouseEvent, songId: string) => void;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSongClick: (song: Song) => void;
  formatTime: (time: number) => string;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "custom">("all");
  const [customPlaylistIds, setCustomPlaylistIds] = useState<string[]>([]);
  
  const pathname = usePathname();

  // Load songs initially
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

  // Load custom playlist
  useEffect(() => {
    const saved = localStorage.getItem("musafir-custom-playlist");
    if (saved) {
      try {
        setCustomPlaylistIds(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    if (customPlaylistIds.length > 0 || localStorage.getItem("musafir-custom-playlist")) {
      localStorage.setItem("musafir-custom-playlist", JSON.stringify(customPlaylistIds));
    }
  }, [customPlaylistIds]);

  // Create audio element globally
  useEffect(() => {
    if (typeof window !== "undefined" && !audioRef.current) {
      audioRef.current = new Audio();
      
      const updateTime = () => setCurrentTime(audioRef.current?.currentTime || 0);
      const updateDuration = () => setDuration(audioRef.current?.duration || 0);
      
      // Need a stable reference for handleEnded to playNext from latest state
      audioRef.current.addEventListener("timeupdate", updateTime);
      audioRef.current.addEventListener("loadedmetadata", updateDuration);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("timeupdate", updateTime);
          audioRef.current.removeEventListener("loadedmetadata", updateDuration);
          audioRef.current.pause();
          audioRef.current.src = "";
          audioRef.current = null;
        }
      };
    }
  }, []); 

  const currentPlayableSongs = activeTab === "all" ? songs : songs.filter(s => customPlaylistIds.includes(s.id));
  const validCurrentIndex = activeTab === "custom" && currentPlayableSongs.length === 0 ? -1 : (currentIndex % (currentPlayableSongs.length || 1));
  const currentSong = currentPlayableSongs.length > 0 ? currentPlayableSongs[validCurrentIndex] : null;

  // Stable ended handler attached when play queue changes
  useEffect(() => {
    if (!audioRef.current) return;
    const handleEnded = () => playNext();
    audioRef.current.addEventListener("ended", handleEnded);
    return () => {
      audioRef.current?.removeEventListener("ended", handleEnded);
    };
  }, [currentPlayableSongs.length, currentIndex]);

  const initAudioCtx = () => {
    if (!audioCtxRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const track = ctx.createMediaElementSource(audioRef.current);
      track.connect(ctx.destination);
      audioCtxRef.current = ctx;
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      initAudioCtx();
      audio.play().catch(() => { setIsPlaying(false); });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      const isSrcDifferent = !audioRef.current.src.endsWith(encodeURI(currentSong?.url || "xyz-none"));
      if (isSrcDifferent && currentSong) {
        audioRef.current.src = currentSong.url || "";
        audioRef.current.load();
        if (isPlaying) {
          initAudioCtx();
          audioRef.current.play().catch(() => { setIsPlaying(false); });
        }
      }
    }
  }, [currentSong?.url, isPlaying]); // Track URL changes directly

  useEffect(() => {
    if ("mediaSession" in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: "Musafir Cafe",
      });
      navigator.mediaSession.setActionHandler("play", () => setIsPlaying(true));
      navigator.mediaSession.setActionHandler("pause", () => setIsPlaying(false));
      navigator.mediaSession.setActionHandler("previoustrack", () => playPrev());
      navigator.mediaSession.setActionHandler("nexttrack", () => playNext());
    }
  }, [currentSong, currentPlayableSongs.length]);

  const toggleCustomPlaylist = (e: React.MouseEvent, songId: string) => {
    e.stopPropagation();
    setCustomPlaylistIds((prev) => 
      prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]
    );
  };

  const playNext = () => {
    if (currentPlayableSongs.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % currentPlayableSongs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    if (currentPlayableSongs.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + currentPlayableSongs.length) % currentPlayableSongs.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    if (!isPlaying) initAudioCtx();
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleSongClick = (song: Song) => {
    const index = currentPlayableSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsPlaying(true);
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const value = {
    songs,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    currentIndex,
    activeTab,
    customPlaylistIds,
    searchQuery,
    loading,
    setSearchQuery,
    setActiveTab,
    setCurrentIndex,
    togglePlay,
    playNext,
    playPrev,
    toggleCustomPlaylist,
    handleProgressChange,
    handleSongClick,
    formatTime,
  };

  // MiniPlayer logic
  const isMusicPage = pathname === "/music";

  return (
    <MusicContext.Provider value={value}>
      {children}
      
      {/* Global Mini-Player when NOT on music page */}
      {!isMusicPage && currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-indigo-900 text-white p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.2)] z-50 flex items-center justify-between gap-4 border-t border-indigo-700/50 backdrop-blur-md bg-opacity-95" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-bold text-sm truncate block w-full">{currentSong.title}</span>
            <span className="text-xs text-indigo-200 truncate block w-full">{currentSong.artist}</span>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <button onClick={playPrev} className="text-xl p-1 rounded-full hover:text-indigo-200 transition-colors">
              ⏮️
            </button>
            <button onClick={togglePlay} className="w-10 h-10 flex items-center justify-center bg-white text-indigo-900 rounded-full hover:scale-105 transition-all shadow-md text-sm font-bold">
              {isPlaying ? "⏸️" : "▶️"}
            </button>
            <button onClick={playNext} className="text-xl p-1 rounded-full hover:text-indigo-200 transition-colors">
              ⏭️
            </button>
          </div>
        </div>
      )}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}
