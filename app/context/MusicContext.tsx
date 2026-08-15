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
  currentPlaylist: string;
  loading: boolean;
  
  // Setters
  setSearchQuery: (query: string) => void;
  setCurrentPlaylist: (playlist: string) => void;
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
  isFullScreen: boolean;
  setIsFullScreen: (val: boolean) => void;
  fullScreenTheme: string;
  setFullScreenTheme: (val: string) => void;
  isShuffle: boolean;
  toggleShuffle: () => void;
  volume: number;
  handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Cookie utilities
  const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === "undefined") return;
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;samesite=lax`;
  };

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return decodeURIComponent(match[2]);
    return null;
  };
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlaylist, setCurrentPlaylist] = useState("All Songs");
  const [activeTab, setActiveTab] = useState<"all" | "custom">("all");
  const [customPlaylistIds, setCustomPlaylistIds] = useState<string[]>([]);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullScreenTheme, setFullScreenTheme] = useState("salon"); // 'salon', 'truck', 'nostalgia'
  const [isShuffle, setIsShuffle] = useState(false);
  const [volume, setVolume] = useState(1);
  
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

  // Load session from cookies
  useEffect(() => {
    const savedPlaylist = getCookie("musafir-session-playlist");
    if (savedPlaylist) {
      try {
        setCustomPlaylistIds(JSON.parse(savedPlaylist));
      } catch (e) {}
    }
    
    const savedTab = getCookie("musafir-session-tab");
    if (savedTab === "all" || savedTab === "custom") {
      setActiveTab(savedTab);
    }
  }, []);

  // Save playlist to session cookie
  useEffect(() => {
    if (customPlaylistIds.length > 0 || getCookie("musafir-session-playlist")) {
      setCookie("musafir-session-playlist", JSON.stringify(customPlaylistIds));
    }
  }, [customPlaylistIds]);

  // Save active tab to session cookie
  useEffect(() => {
    setCookie("musafir-session-tab", activeTab);
  }, [activeTab]);

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

  const playlistFilteredSongs = currentPlaylist === "All Songs" ? songs : songs.filter(s => s.playlist === currentPlaylist);
  const currentPlayableSongs = activeTab === "all" ? playlistFilteredSongs : songs.filter(s => customPlaylistIds.includes(s.id));
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
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * currentPlayableSongs.length);
      setCurrentIndex(randomIndex);
    } else {
      setCurrentIndex((prev) => (prev + 1) % currentPlayableSongs.length);
    }
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
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
    currentPlaylist,
    loading,
    setSearchQuery,
    setCurrentPlaylist,
    setActiveTab,
    setCurrentIndex,
    togglePlay,
    playNext,
    playPrev,
    toggleCustomPlaylist,
    handleProgressChange,
    handleSongClick,
    formatTime,
    isFullScreen,
    setIsFullScreen,
    fullScreenTheme,
    setFullScreenTheme,
    isShuffle,
    toggleShuffle,
    volume,
    handleVolumeChange,
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
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
