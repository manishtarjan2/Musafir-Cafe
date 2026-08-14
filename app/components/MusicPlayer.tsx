"use client";

import { useState, useEffect, useRef } from "react";
import type { Song } from "@/lib/songs";

interface MusicPlayerProps {
  songs: Song[];
}

export default function MusicPlayer({ songs }: MusicPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudioCtx = () => {
    if (!audioCtxRef.current && audioRef.current) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const track = ctx.createMediaElementSource(audioRef.current);
      
      const gainNode = ctx.createGain();
      gainNode.gain.value = 1.2; // Loud sound

      const bassNode = ctx.createBiquadFilter();
      bassNode.type = "lowshelf";
      bassNode.frequency.value = 150; // Bass frequency
      bassNode.gain.value = 5; // Boost bass by 5dB

      track.connect(bassNode);
      bassNode.connect(gainNode);
      gainNode.connect(ctx.destination);

      audioCtxRef.current = ctx;
    }
    
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const currentSong = songs[currentIndex];
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      initAudioCtx();
      audio.play().catch(() => {
        // Autoplay blocked or other error
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentIndex, songs.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong?.url || "";
      audioRef.current.load();
      if (isPlaying) {
        initAudioCtx();
        audioRef.current.play().catch(() => { });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    if ("mediaSession" in navigator && currentSong) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.title,
        artist: currentSong.artist,
        album: "Musafir Cafe",
      });

      navigator.mediaSession.setActionHandler("play", () => {
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("pause", () => {
        setIsPlaying(false);
      });
      navigator.mediaSession.setActionHandler("previoustrack", () => {
        setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
        setIsPlaying(true);
      });
      navigator.mediaSession.setActionHandler("nexttrack", () => {
        setCurrentIndex((prev) => (prev + 1) % songs.length);
        setIsPlaying(true);
      });
    }
  }, [currentSong, songs.length]);

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (!isPlaying) {
      initAudioCtx();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="flex flex-col gap-8 p-8 rounded-2xl text-white bg-gradient-to-br from-indigo-500 to-purple-700 max-md:fixed max-md:inset-0 max-md:w-screen max-md:h-screen max-md:z-50 max-md:rounded-none max-md:m-0 max-md:overflow-y-auto max-md:p-6">
      <audio ref={audioRef} />

      {/* Now Playing Section */}
      <div className="flex flex-col gap-8 p-8 rounded-2xl bg-white/10 backdrop-blur-md max-md:p-6">
        <div className="flex gap-8 items-center max-md:flex-col max-md:text-center">
          <div className="w-32 h-32 md:w-32 md:h-32 max-md:w-36 max-md:h-36 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-5xl shrink-0 shadow-lg">
            <div className="animate-pulse">♪</div>
          </div>
          <div className="flex-1">
            <h2 className="m-0 text-3xl max-md:text-2xl font-bold break-words">{currentSong?.title || "No song selected"}</h2>
            <p className="mt-2 text-base text-white/90">{currentSong?.artist || "Unknown Artist"}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm min-w-[40px] text-right">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="flex-1 h-1.5 appearance-none bg-white/30 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md cursor-pointer"
            />
            <span className="text-sm min-w-[40px]">{formatTime(duration)}</span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap max-md:gap-2">
            <button
              onClick={playPrev}
              className="px-6 py-3 border-none rounded-full bg-white/20 text-white cursor-pointer text-base font-semibold transition-all hover:bg-white/30 hover:scale-105 border-2 border-white/30 max-md:flex-1 max-md:min-w-[70px]"
              title="Previous"
            >
              ⏮️ Prev
            </button>
            <button
              onClick={togglePlay}
              className="px-8 py-3 border-none rounded-full bg-white text-indigo-500 cursor-pointer text-lg font-semibold transition-all hover:bg-white/90 shadow-lg hover:shadow-xl max-md:flex-1 max-md:min-w-[100px]"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button
              onClick={playNext}
              className="px-6 py-3 border-none rounded-full bg-white/20 text-white cursor-pointer text-base font-semibold transition-all hover:bg-white/30 hover:scale-105 border-2 border-white/30 max-md:flex-1 max-md:min-w-[70px]"
              title="Next"
            >
              Next ⏭️
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="flex flex-col gap-6">
        <h3 className="m-0 text-2xl font-bold">Playlist ({filteredSongs.length} songs)</h3>

        <div className="flex">
          <input
            type="text"
            placeholder="🔍 Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border-none rounded-xl bg-white/90 text-gray-800 text-base outline-none transition-all focus:bg-white focus:shadow-md placeholder-gray-500"
          />
        </div>

        <div className="grid gap-3 max-h-[400px] overflow-y-auto pr-2 max-md:max-h-none max-md:pb-8 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/30 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/50">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 border-transparent hover:bg-white/20 hover:translate-x-1 ${currentSong?.id === song.id ? "bg-white/25 border-white" : "bg-white/10"
                  }`}
                onClick={() => {
                  setCurrentIndex(songs.indexOf(song));
                  setIsPlaying(true);
                }}
              >
                <div className="min-w-[30px] text-center font-bold opacity-70">{index + 1}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[0.95rem] whitespace-nowrap overflow-hidden text-ellipsis">
                    {song.title}
                  </div>
                  <div className="text-[0.85rem] opacity-80 whitespace-nowrap overflow-hidden text-ellipsis">
                    {song.artist}
                  </div>
                </div>
                {currentSong?.id === song.id && (
                  <div className="text-xl animate-bounce">🎵</div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center p-8 opacity-70 text-base">No songs found</div>
          )}
        </div>
      </div>
    </div>
  );
}
