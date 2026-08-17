"use client";

import { useMusic } from "@/app/context/MusicContext";
import { useEffect } from "react";

export default function FullScreenPlayer() {
  const { 
    currentSong, isPlaying, togglePlay, playNext, playPrev, 
    formatTime, currentTime, duration, handleProgressChange,
    isFullScreen, setIsFullScreen, fullScreenTheme, setFullScreenTheme,
    isShuffle, toggleShuffle
  } = useMusic();

  // Prevent scrolling on body when full screen is active
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullScreen]);

  if (!isFullScreen || !currentSong) return null;

  const themes = [
    { id: "salon", label: "Deluxe Salon", icon: "🍸" },
    { id: "truck", label: "Truck Driver", icon: "🛣️" },
    { id: "nostalgia", label: "Nostalgia", icon: "📼" },
    { id: "lounge", label: "Night Lounge", icon: "🌃" },
  ];

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col justify-between theme-${fullScreenTheme} transition-colors duration-1000 overflow-hidden bg-[#0b090c]`}>
      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {fullScreenTheme === "salon" && (
          <>
            <div className="absolute inset-0 bg-[url('/vibes/OIP.webp')] bg-cover bg-center opacity-40 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#2a170b]/90 via-[#1a0f08]/80 to-[#050201]/95" />
          </>
        )}
        {fullScreenTheme === "truck" && (
          <>
            <div className="absolute inset-0 bg-[url('/vibes/Truck%20Theme.webp')] bg-cover bg-center opacity-50 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/90 via-[#1f2833]/80 to-[#0b0c10]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(69,162,158,0.2),transparent_70%)]" />
          </>
        )}
        {fullScreenTheme === "nostalgia" && (
          <>
            <div className="absolute inset-0 bg-[url('/vibes/OIP%20(1).webp')] bg-cover bg-center opacity-60" />
            <div className="absolute inset-0 bg-[#d7ccc8] opacity-60 mix-blend-overlay" />
            <div className="absolute inset-0 bg-[#795548] opacity-20 mix-blend-color" />
          </>
        )}
        {fullScreenTheme === "lounge" && (
          <>
            <div className="absolute inset-0 bg-[url('/vibes/download.webp')] bg-cover bg-center opacity-50 mix-blend-screen" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/90 via-[#1f2833]/80 to-[#0b0c10]/90" />
          </>
        )}
        <div className={`noise-overlay absolute inset-0 mix-blend-overlay ${['nostalgia'].includes(fullScreenTheme) ? 'opacity-40' : 'opacity-10'}`}></div>
      </div>

      {/* Top Bar */}
      <div className="relative z-10 p-4 md:p-6 flex justify-between items-center">
        <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 md:pb-0">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => setFullScreenTheme(t.id)}
              className={`px-4 py-2 rounded-full backdrop-blur-md border transition-all flex items-center gap-2 whitespace-nowrap ${
                fullScreenTheme === t.id 
                  ? "bg-white/20 border-white/40 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]" 
                  : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
              }`}
            >
              <span>{t.icon}</span>
              <span className="text-sm font-medium tracking-wide">{t.label}</span>
            </button>
          ))}
        </div>
        
        <button 
          onClick={() => setIsFullScreen(false)}
          className="w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all backdrop-blur-md"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-6 min-h-0">
        {/* Cover Art Wrapper with theme-specific styling */}
        <div className={`relative mb-4 md:mb-8 mx-auto transition-all duration-700 ${
          ['salon'].includes(fullScreenTheme) ? 'w-[40vh] h-[40vh] max-w-[400px] max-h-[400px] rounded-full shadow-[0_0_50px_rgba(232,181,122,0.15)] animate-[spin_20s_linear_infinite] ' + (isPlaying ? 'playing' : 'paused') :
          ['truck', 'lounge'].includes(fullScreenTheme) ? 'w-[40vh] h-[40vh] max-w-[350px] max-h-[350px] rounded-3xl shadow-[0_0_60px_rgba(69,162,158,0.2)] border-2 border-[#45a29e]/30' :
          'w-[40vh] h-[40vh] max-w-[320px] max-h-[320px] rounded-sm shadow-[10px_10px_0_rgba(0,0,0,0.5)] border-4 border-[#3e2723]'
        }`}>
          <img 
            src={currentSong.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=600&q=80"} 
            alt={currentSong.title}
            className={`w-full h-full object-cover ${
              ['salon'].includes(fullScreenTheme) ? 'rounded-full' : 
              ['truck', 'lounge'].includes(fullScreenTheme) ? 'rounded-3xl' : 
              'rounded-sm sepia-[0.4] contrast-[1.2]'
            }`}
          />
          {['salon'].includes(fullScreenTheme) && (
            <div className="absolute inset-0 rounded-full border-4 border-black/80 flex items-center justify-center">
               <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#111] border-[8px] md:border-[12px] border-[#222]" />
            </div>
          )}
          {['truck', 'lounge'].includes(fullScreenTheme) && isPlaying && (
            <div className="absolute inset-0 rounded-3xl border-2 border-[#45a29e] animate-pulse pointer-events-none" />
          )}
        </div>

        <div className="text-center max-w-2xl px-4">
          <h2 className={`text-3xl md:text-5xl font-bold mb-3 md:mb-4 ${
            ['truck', 'lounge'].includes(fullScreenTheme) ? 'text-[#66fcf1] font-mono tracking-wider' :
            ['nostalgia'].includes(fullScreenTheme) ? 'text-[#3e2723] font-serif' :
            'text-white'
          }`}>{currentSong.title}</h2>
          <p className={`text-lg md:text-2xl ${
            ['truck', 'lounge'].includes(fullScreenTheme) ? 'text-[#45a29e] font-mono' :
            ['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037] font-serif italic' :
            'text-white/60'
          }`}>{currentSong.artist}</p>

          {/* Audio Visualizer */}
          <div className={`flex items-end justify-center gap-1.5 h-8 md:h-12 mt-4 md:mt-6 transition-opacity duration-300 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            {[0.2, 0.4, 0.1, 0.5, 0.3, 0.6, 0.2].map((delay, i) => (
              <div 
                key={i}
                className={`w-1.5 md:w-2 rounded-t-full audio-bar ${
                  ['truck', 'lounge'].includes(fullScreenTheme) ? 'bg-[#66fcf1]' : 
                  ['nostalgia'].includes(fullScreenTheme) ? 'bg-[#5d4037]' : 
                  'bg-[#e8b57a]'
                } ${isPlaying ? 'playing' : 'paused'}`} 
                style={{ height: '100%', animationDelay: `${delay}s` }} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="relative z-10 p-4 md:p-6 pb-6 md:pb-8 w-full max-w-4xl mx-auto flex flex-col gap-4 md:gap-6">
        
        {/* Progress Bar */}
        <div className="flex items-center gap-4 w-full">
          <span className={`text-xs md:text-sm w-10 md:w-12 text-right ${['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037]' : 'text-white/50'}`}>{formatTime(currentTime)}</span>
          <div 
            className="flex-1 h-2 md:h-2.5 bg-white/10 rounded-full relative cursor-pointer group" 
            onClick={(e) => { 
              const bounds = e.currentTarget.getBoundingClientRect(); 
              handleProgressChange({ target: { value: String((e.clientX - bounds.left) / bounds.width * duration) } } as unknown as React.ChangeEvent<HTMLInputElement>); 
            }}
          >
            <div 
              className={`absolute top-0 left-0 h-full rounded-full transition-colors ${
                ['truck', 'lounge'].includes(fullScreenTheme) ? 'bg-[#66fcf1] group-hover:bg-[#45a29e]' :
                ['nostalgia'].includes(fullScreenTheme) ? 'bg-[#8d6e63] group-hover:bg-[#6d4c41]' :
                'bg-[#e8b57a] group-hover:bg-[#f6cd98]'
              }`} 
              style={{ width: `${(currentTime / duration) * 100}%` }}
            >
              <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 rounded-full shadow opacity-0 group-hover:opacity-100 translate-x-1/2 transition-opacity ${
                ['truck', 'lounge'].includes(fullScreenTheme) ? 'bg-[#66fcf1]' :
                ['nostalgia'].includes(fullScreenTheme) ? 'bg-[#8d6e63]' :
                'bg-[#e8b57a]'
              }`} />
            </div>
          </div>
          <span className={`text-xs md:text-sm w-10 md:w-12 ${['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037]' : 'text-white/50'}`}>{formatTime(duration)}</span>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-6 md:gap-10">
          <button onClick={toggleShuffle} className={`hidden sm:block bg-transparent border-none p-0 cursor-pointer ${['nostalgia'].includes(fullScreenTheme) ? (isShuffle ? 'text-[#8d6e63]' : 'text-[#5d4037]/60 hover:text-[#5d4037]') : (isShuffle ? 'text-[#e8b57a]' : 'text-white/40 hover:text-white/80')}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
          </button>
          
          <button onClick={playPrev} className={`bg-transparent border-none p-0 cursor-pointer hover:scale-110 transition-transform ${['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037]/80 hover:text-[#5d4037]' : 'text-white/70 hover:text-white'}`}>
            <svg width="32" height="32" className="md:w-[40px] md:h-[40px]" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          
          <button 
            onClick={togglePlay} 
            className={`w-14 h-14 md:w-20 md:h-20 rounded-full text-black border-none flex items-center justify-center cursor-pointer hover:scale-105 transition-transform ${
              ['truck', 'lounge'].includes(fullScreenTheme) ? 'bg-[#66fcf1] shadow-[0_0_30px_rgba(102,252,241,0.4)]' :
              ['nostalgia'].includes(fullScreenTheme) ? 'bg-[#8d6e63] shadow-[0_4px_12px_rgba(141,110,99,0.4)]' :
              'bg-[#e8b57a] shadow-[0_4px_20px_rgba(232,181,122,0.4)]'
            }`}
          >
            {isPlaying ? 
              <svg width="24" height="24" className="md:w-[32px] md:h-[32px]" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : 
              <svg width="24" height="24" className="md:w-[32px] md:h-[32px] ml-1 md:ml-2" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
          </button>
          
          <button onClick={playNext} className={`bg-transparent border-none p-0 cursor-pointer hover:scale-110 transition-transform ${['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037]/80 hover:text-[#5d4037]' : 'text-white/70 hover:text-white'}`}>
            <svg width="32" height="32" className="md:w-[40px] md:h-[40px]" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
          
          <button className={`hidden sm:block bg-transparent border-none p-0 cursor-pointer ${['nostalgia'].includes(fullScreenTheme) ? 'text-[#5d4037]/60 hover:text-[#5d4037]' : 'text-white/40 hover:text-white/80'}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}
