"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { useMusic } from "@/app/context/MusicContext";
import { musicCards, bookCards } from "@/lib/data";
import dynamic from "next/dynamic";

const FullScreenPlayer = dynamic(() => import("./FullScreenPlayer"), {
  ssr: false,
});
const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Cafe Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { 
    currentSong, isPlaying, togglePlay, playNext, playPrev, 
    formatTime, currentTime, duration, handleProgressChange, 
    setIsFullScreen, volume, handleVolumeChange, isShuffle, toggleShuffle 
  } = useMusic();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const [showMiniPlayer, setShowMiniPlayer] = useState(false);
  const [isDeepFocus, setIsDeepFocus] = useState(false);
  const miniPlayerRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen((open) => !open);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { songs: [], books: [] };
    const query = searchQuery.toLowerCase();
    return {
      songs: musicCards.filter((song) => song.title.toLowerCase().includes(query) || song.artist.toLowerCase().includes(query)).slice(0, 3),
      books: bookCards.filter((book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query)).slice(0, 3)
    };
  }, [searchQuery]);

  useEffect(() => {
    if (isDeepFocus) {
      document.body.setAttribute('data-focus-mode', 'true');
    } else {
      document.body.removeAttribute('data-focus-mode');
    }
  }, [isDeepFocus]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function handleDocumentClick(event: MouseEvent) {
      if (!shellRef.current) return;
      const target = event.target;
      if (!(target instanceof Node)) return;

      const sidebar = shellRef.current.querySelector(".sidebar");
      const toggle = shellRef.current.querySelector(".mobile-menu-toggle");

      const clickedSidebar = sidebar?.contains(target);
      const clickedToggle = toggle?.contains(target);

      if (!clickedSidebar && !clickedToggle) {
        closeMenu();
      }

      if (searchContainerRef.current && !searchContainerRef.current.contains(target)) {
        setIsSearchFocused(false);
      }

      if (miniPlayerRef.current && !miniPlayerRef.current.contains(target)) {
        setShowMiniPlayer(false);
      }
    }

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [mobileMenuOpen]);

  return (
    <div ref={shellRef} className={`musafir-shell ${pathname !== "/" ? "no-rail" : ""}`}>
      <aside className={mobileMenuOpen ? "sidebar is-open" : "sidebar"}>
        <div className="brand-block">
          <div className="brand-mark" aria-label="Musafir Cafe logo">
            <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
              <circle cx="60" cy="60" r="52" className="ring" />
              <path d="M28 72c0-18 14-32 32-32s32 14 32 32v4H28v-4Z" className="cup" />
              <path d="M36 74h48c0 13-10 23-24 23S36 87 36 74Z" className="steam" />
              <path d="M60 26c9 11 13 22 13 34 0 11-4 19-13 26-9-7-13-15-13-26 0-12 4-23 13-34Z" className="sun" />
              <path d="M29 39c6 8 11 15 16 19M91 39c-6 8-11 15-16 19M60 20v12M60 92v12" className="lines" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Musafir</span>
            <span className="brand-sub">CAFE</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Sidebar navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={pathname === item.href ? "nav-item active" : "nav-item"}
              onClick={closeMenu}
            >
              <span className="nav-icon">
                {index === 0 ? "⌂" : index === 1 ? "♫" : index === 2 ? "📖" : index === 3 ? "✎" : "◌"}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="search-box relative" role="search" ref={searchContainerRef}>
            <input 
              type="text" 
              className="search-input w-full" 
              placeholder="Search songs, books, authors, artists, thoughts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
            <span className="search-icon">⌕</span>

            {isSearchFocused && searchQuery.trim() && (
              <div className="search-results absolute top-[110%] left-0 right-0 p-4 rounded-xl flex flex-col gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] bg-[#0b090c]/90 backdrop-blur-xl border border-white/10 z-[200]">
                {searchResults.songs.length === 0 && searchResults.books.length === 0 ? (
                  <div className="text-white/50 text-center py-4">No results found for &quot;{searchQuery}&quot;</div>
                ) : (
                  <>
                    {searchResults.songs.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h4 className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-1">Songs</h4>
                        {searchResults.songs.map((song) => (
                          <div key={song.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                            <div className="w-10 h-10 rounded-md bg-[#222] overflow-hidden shrink-0">
                               <img src={`https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=100&q=80`} alt={song.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-white text-sm font-medium">{song.title}</span>
                              <span className="text-[#e8b57a] text-xs">{song.artist}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {searchResults.books.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <h4 className="text-white/40 text-[10px] font-semibold tracking-widest uppercase mb-1">Books</h4>
                        {searchResults.books.map((book) => (
                          <div key={book.title} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                            <div className="w-8 h-10 rounded-sm bg-[#333] shrink-0 border border-white/10" />
                            <div className="flex flex-col">
                              <span className="text-white text-sm font-medium">{book.title}</span>
                              <span className="text-white/50 text-xs">{book.author}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className="user-meta">
            <button 
              className="bell" 
              onClick={toggleTheme} 
              aria-label="Toggle Light/Dark Mode"
              title="Switch Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <div className="relative" ref={miniPlayerRef}>
              <button 
                className={`bell flex items-center justify-center transition-colors ${showMiniPlayer ? 'bg-white/10' : ''}`} 
                aria-label="Now Playing"
                onClick={() => setShowMiniPlayer(!showMiniPlayer)}
              >
                <span className={`inline-block ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '3s' }}>◔</span>
              </button>
              
              {showMiniPlayer && (
                <div className="absolute top-[120%] right-0 w-[240px] p-4 rounded-xl flex flex-col gap-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] bg-[#0b090c]/90 backdrop-blur-xl border border-white/10 z-[200]">
                  <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <div className={`flex items-end gap-[2px] h-[16px] shrink-0 ${!isPlaying ? 'eq-paused' : ''}`}>
                      <div className="eq-bar" />
                      <div className="eq-bar" />
                      <div className="eq-bar" />
                      <div className="eq-bar" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-white text-xs font-medium truncate">{currentSong?.title || "No song playing"}</span>
                      <span className="text-white/50 text-[10px] truncate">{currentSong?.artist || "Pick a track"}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/80 font-medium">Deep Focus Mode</span>
                    <button 
                      onClick={() => setIsDeepFocus(!isDeepFocus)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${isDeepFocus ? 'bg-[#e8b57a]' : 'bg-white/20'}`}
                    >
                      <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isDeepFocus ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="user-pill">
              <div className="user-avatar">M</div>
              <span>Manish</span>
            </div>
          </div>
        </header>

        <div className="content-scrollable">
          {children}
        </div>
      </main>

      {pathname === "/" && (
        <aside className="right-rail">
          <div className="rail-card rail-image-card">
            <div className="rail-title-row">
              <h3>Song of the Day</h3>
            </div>
            <div className="mini-rail-cover">
              <button className="rail-play" aria-label="Play song of the day">▶</button>
            </div>
            <div className="song-meta">
              <h4>A Sky Full of Stars</h4>
              <span>Coldplay</span>
            </div>
            <p>Look at the stars, look how they shine for you.</p>
            <div className="rail-actions">
              <button>♡</button>
              <button>◌</button>
              <button>＋</button>
            </div>
          </div>

          <div className="rail-card">
            <h3>Book of the Day</h3>
            <div className="book-day-row">
              <div className="book-day-cover" />
              <div className="book-day-copy">
                <h4>The Alchemist</h4>
                <span>Paulo Coelho</span>
              </div>
            </div>
            <p>“When you want something, all the universe conspires in helping you to achieve it.”</p>
            <div className="rail-actions">
              <button>◌</button>
              <button>♡</button>
              <button>＋</button>
            </div>
          </div>
        </aside>
      )}

      {currentSong && (
        <div className="bottom-player max-sm:px-3 max-sm:h-16 max-sm:gap-2">
          <div className="flex items-center gap-4 w-[260px] max-sm:w-auto max-sm:flex-1 shrink-0 overflow-hidden">
            <img src={currentSong.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=100&q=80"} alt={currentSong.title} className="w-14 h-14 max-sm:w-10 max-sm:h-10 rounded-xl object-cover shadow-md" />
            <div className="min-w-0 flex flex-col justify-center">
              <h4 className="m-0 text-[15px] max-sm:text-[13px] font-semibold truncate text-white/90">{currentSong.title}</h4>
              <p className="m-0 text-[12px] max-sm:text-[10px] truncate text-white/50">{currentSong.artist}</p>
            </div>
            <button className="ml-auto bg-transparent border-none text-white/40 hover:text-[#e8b57a] p-0 cursor-pointer hidden sm:block">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
            </button>
          </div>

          <div className="flex-1 max-sm:flex-none flex flex-col items-center justify-center gap-2 max-w-2xl px-4 max-sm:px-0">
            <div className="flex items-center gap-6 max-sm:gap-3">
              <button onClick={toggleShuffle} className={`bg-transparent border-none p-0 cursor-pointer hidden sm:block ${isShuffle ? 'text-[#e8b57a]' : 'text-white/40 hover:text-white/80'}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
              </button>
              <button onClick={playPrev} className="bg-transparent border-none text-white/70 hover:text-white p-0 cursor-pointer max-sm:w-6 max-sm:h-6"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="max-sm:w-5 max-sm:h-5"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
              <button onClick={togglePlay} className="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full bg-[#e8b57a] text-black border-none flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-[0_4px_12px_rgba(232,181,122,0.3)]">
                {isPlaying ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="max-sm:w-4 max-sm:h-4"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg> : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="max-sm:w-4 max-sm:h-4"><path d="M8 5v14l11-7z"/></svg>}
              </button>
              <button onClick={playNext} className="bg-transparent border-none text-white/70 hover:text-white p-0 cursor-pointer max-sm:w-6 max-sm:h-6"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="max-sm:w-5 max-sm:h-5"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
              <button className="bg-transparent border-none text-white/40 hover:text-white/80 p-0 cursor-pointer hidden sm:block"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg></button>
            </div>
            
            <div className="flex items-center gap-3 w-full max-w-lg max-sm:hidden">
              <span className="text-[10px] text-white/40 w-8 text-right">{formatTime(currentTime)}</span>
              <div className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer group" onClick={(e) => { const bounds = e.currentTarget.getBoundingClientRect(); handleProgressChange({ target: { value: (e.clientX - bounds.left) / bounds.width * duration } } as unknown as React.ChangeEvent<HTMLInputElement>); }}>
                <div className="absolute top-0 left-0 h-full bg-[#e8b57a] rounded-full group-hover:bg-[#f6cd98] transition-colors" style={{ width: `${(currentTime / duration) * 100}%` }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e8b57a] rounded-full shadow opacity-0 group-hover:opacity-100 translate-x-1/2 transition-opacity" />
                </div>
              </div>
              <span className="text-[10px] text-white/40 w-8">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 lg:w-[280px] shrink-0 max-sm:w-auto max-sm:gap-2">
             <div className="hidden lg:flex items-center gap-4">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>
               <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} className="w-24 accent-[#e8b57a] cursor-pointer" />
             </div>
             <button onClick={() => setIsFullScreen(true)} className="bg-transparent border-none text-white/40 hover:text-white p-0 ml-2 max-sm:ml-0" title="Full Screen Vibe Mode">
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
             </button>
          </div>
        </div>
      )}

      <FullScreenPlayer />
    </div>
  );
}
