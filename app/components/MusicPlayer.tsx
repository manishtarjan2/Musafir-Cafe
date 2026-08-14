"use client";

import { useMusic } from "@/app/context/MusicContext";
import { useState, useRef } from "react";

/* ── Scroll Row Component ── */
function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  return (
    <div className="relative group/scroll">
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border-none cursor-pointer opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg flex items-center justify-center" style={{ backgroundColor: "var(--panel-bg)", color: "var(--soft-text)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <div ref={ref} className="flex gap-5 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none" }}>{children}</div>
      <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border-none cursor-pointer opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg flex items-center justify-center" style={{ backgroundColor: "var(--panel-bg)", color: "var(--soft-text)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, onViewAll }: { title: string; onViewAll?: () => void }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="m-0 text-xl font-bold" style={{ color: "var(--soft-text)" }}>{title}</h2>
      {onViewAll && (
        <button onClick={onViewAll} className="text-xs font-semibold border-none bg-transparent cursor-pointer flex items-center gap-1" style={{ color: "var(--primary)" }}>
          View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      )}
    </div>
  );
}

/* ── Playlist data ── */
const playlists = [
  { name: "Morning Bliss", gradient: "from-amber-600 to-orange-800", icon: "☀️" },
  { name: "Bollywood Romance", gradient: "from-rose-500 to-pink-800", icon: "💕" },
  { name: "Chill Vibes", gradient: "from-teal-500 to-cyan-800", icon: "🌊" },
  { name: "Workout Energy", gradient: "from-red-500 to-orange-600", icon: "🔥" },
  { name: "Rainy Day Feels", gradient: "from-slate-500 to-blue-800", icon: "🌧️" },
  { name: "Lo-fi Beats", gradient: "from-purple-500 to-indigo-800", icon: "🎧" },
];

export default function MusicPlayer() {
  const {
    songs, currentSong, isPlaying, currentTime, duration,
    activeTab, customPlaylistIds, searchQuery, loading,
    setSearchQuery, setActiveTab, togglePlay, playNext, playPrev,
    toggleCustomPlaylist, handleProgressChange, handleSongClick, formatTime,
    currentPlaylist, setCurrentPlaylist,
  } = useMusic();

  const [chartTab, setChartTab] = useState<"songs" | "albums" | "artists">("songs");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-[3px] border-t-transparent animate-spin" style={{ borderColor: "var(--primary)", borderTopColor: "transparent" }} />
          <p className="text-sm font-medium animate-pulse" style={{ color: "var(--muted)" }}>Loading your music library...</p>
        </div>
      </div>
    );
  }

  const currentPlayableSongs = activeTab === "all" ? songs : songs.filter(s => customPlaylistIds.includes(s.id));
  
  const filteredSongs = currentPlayableSongs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );  
  // Mock data to match the screenshot
  const playlistsData = [
    { title: 'All Songs', followers: '100+ Tracks', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=300&q=80' },
    { title: 'Morning Bliss', followers: '1.2M Followers', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80' },
    { title: 'Bollywood Romance', followers: '2.5M Followers', img: 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?auto=format&fit=crop&w=300&q=80' },
    { title: 'Chill Vibes', followers: '1.8M Followers', img: 'https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&w=300&q=80' },
    { title: 'Workout Energy', followers: '1.6M Followers', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80' },
    { title: 'Rainy Day Feels', followers: '2.1M Followers', img: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=300&q=80' },
    { title: 'Lo-fi Beats', followers: '1.9M Followers', img: 'https://images.unsplash.com/photo-1516280440502-a2798e404b90?auto=format&fit=crop&w=300&q=80' },
  ];

  const recentSongsList = currentPlayableSongs.slice(0, 6);
  const topChartsList = currentPlayableSongs.slice(0, 6);
  const upNextSongs = currentSong 
    ? currentPlayableSongs.slice(currentPlayableSongs.findIndex(s => s.id === currentSong.id) + 1, currentPlayableSongs.findIndex(s => s.id === currentSong.id) + 6)
    : currentPlayableSongs.slice(0, 5);
  const recommendedSongs = currentPlayableSongs.slice(6, 10);

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
        
        {/* ═══ MAIN CONTENT ═══ */}
        <div className="flex flex-col gap-10 min-w-0">

          {/* ═══ HERO BANNER ═══ */}
          <div className="relative rounded-[20px] overflow-hidden min-h-[200px] flex items-center group">
            <div className="absolute inset-0" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center 20%" }} />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            
            <button className="absolute left-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button className="absolute right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/40 text-white/70 hover:bg-black/60 hover:text-white transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            <div className="relative z-10 p-10 max-w-md">
              <span className="inline-block px-3 py-1 rounded-full text-[9px] font-bold tracking-widest mb-4 border" style={{ borderColor: "rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)" }}>PLAYLIST</span>
              <h1 className="text-4xl font-bold m-0 mb-3 text-white leading-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                Late Night<br/>Acoustic
              </h1>
              <p className="text-sm m-0 mb-6 text-white/60">Soft songs for your midnight thoughts.</p>
              <button className="px-6 py-2.5 rounded-full text-sm font-semibold border-none cursor-pointer transition-all hover:scale-105 shadow-lg flex items-center gap-2" style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                Play Now
              </button>
            </div>
            
            {/* Pagination dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              <div className="w-4 h-1.5 rounded-full bg-white/80"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
            </div>
          </div>

          {/* ── Recently Played ── */}
          <section>
            <SectionHeader title="Recently Played" onViewAll={() => {}} />
            <ScrollRow>
              {recentSongsList.map((song) => (
                <div key={song.id} className="shrink-0 w-[140px] sm:w-[160px] cursor-pointer group" onClick={() => handleSongClick(song)}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-black/20">
                    <img src={(song.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={song.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="m-0 text-[13px] font-semibold truncate text-white">{song.title}</p>
                      <p className="m-0 text-[11px] truncate text-white/50 mt-0.5">{song.artist}</p>
                    </div>
                    <span className="text-[10px] text-white/40 pt-0.5">{song.duration}</span>
                  </div>
                </div>
              ))}
            </ScrollRow>
          </section>

          {/* ── Popular Playlists ── */}
          <section>
            <SectionHeader title="Popular Playlists" onViewAll={() => {}} />
            <ScrollRow>
              {playlistsData.map(pl => (
                <div 
                  key={pl.title} 
                  className={`shrink-0 w-[140px] sm:w-[160px] cursor-pointer group p-2 rounded-2xl transition-colors ${currentPlaylist === pl.title ? 'bg-white/10' : 'hover:bg-white/5'}`}
                  onClick={() => setCurrentPlaylist(pl.title)}
                >
                  <div className="relative aspect-square rounded-2xl overflow-hidden mb-3 bg-black/20">
                    <img src={pl.img} alt={pl.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <p className="m-0 text-[13px] font-semibold truncate text-white">{pl.title}</p>
                  <p className="m-0 text-[11px] truncate text-white/50 mt-0.5">{pl.followers}</p>
                </div>
              ))}
            </ScrollRow>
          </section>

          {/* ── Top Charts ── */}
          <section>
            <div className="flex items-center gap-6 mb-5 border-b border-white/5 pb-3">
              <h2 className="m-0 text-[17px] font-semibold" style={{ color: "var(--soft-text)" }}>Top Charts</h2>
              <div className="flex gap-4">
                {(["songs", "albums", "artists"] as const).map(tab => (
                  <button key={tab} onClick={() => setChartTab(tab)} className={`text-[13px] font-medium border-none cursor-pointer transition-all capitalize bg-transparent ${chartTab === tab ? "text-[#e8b57a] border-b-2 border-[#e8b57a] pb-1 -mb-[14px]" : "text-white/40 hover:text-white/70"}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="ml-auto">
                <button className="text-[11px] font-semibold border-none bg-transparent cursor-pointer flex items-center gap-1" style={{ color: "var(--primary)" }}>
                  View all <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-1">
              {topChartsList.map((song, i) => (
                <div key={song.id} className="flex items-center gap-4 py-2 px-2 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSongClick(song)}>
                  <span className="text-[12px] font-medium w-4 text-center text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <img src={(song.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={song.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[13px] font-medium truncate text-white/90 group-hover:text-white">{song.title}</p>
                    <p className="m-0 text-[11px] truncate text-white/40 mt-0.5">{song.artist}</p>
                  </div>
                  <span className="text-[11px] text-white/40">{song.duration}</span>
                  <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <button className="bg-transparent border-none text-white/40 hover:text-white p-0 cursor-pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
                    <button className="bg-transparent border-none text-white/40 hover:text-white p-0 cursor-pointer"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── All Songs (Library) ── */}
          <section>
            <SectionHeader title={searchQuery ? `Search Results for "${searchQuery}"` : currentPlaylist} />
            <div className="flex flex-col gap-1">
              {filteredSongs.map((song, i) => (
                <div 
                  key={song.id} 
                  className={`flex items-center gap-4 py-2 px-3 rounded-xl cursor-pointer hover:bg-white/5 transition-colors group ${currentSong?.id === song.id ? "bg-white/10" : ""}`}
                  onClick={() => handleSongClick(song)}
                >
                  <span className="text-[12px] font-medium w-4 text-center text-white/40">{i + 1}</span>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-black/20">
                    <img src={(song.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={song.title} className="w-full h-full object-cover" />
                    {currentSong?.id === song.id && isPlaying && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-4 h-4 flex items-end justify-center gap-0.5">
                          {[1, 2, 3].map((bar) => (
                            <div key={bar} className="w-0.5 bg-[#e8b57a] animate-[bounce_1s_infinite]" style={{ height: `${Math.random() * 100}%`, animationDelay: `${bar * 0.1}s` }} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`m-0 text-[13px] font-medium truncate group-hover:text-white ${currentSong?.id === song.id ? "text-[#e8b57a]" : "text-white/90"}`}>{song.title}</p>
                    <p className="m-0 text-[11px] truncate text-white/40 mt-0.5">{song.artist}</p>
                  </div>
                  <span className="text-[11px] text-white/40">{song.duration}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ═══ RIGHT SIDEBAR ═══ */}
        <aside className="hidden lg:flex flex-col gap-8">
          
          {/* Now Playing */}
          {currentSong && (
          <div className="bg-[#1a1513] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="m-0 text-[14px] font-medium text-white/90">Now Playing</h3>
              <div className="flex items-center gap-1">
                {[3, 5, 2].map((h, i) => (
                  <span key={i} className={`block w-1 rounded-full bg-[#e8b57a] ${isPlaying ? 'animate-[bounce_1s_infinite]' : ''}`} style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>

            <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-5">
              <img src={(currentSong.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={currentSong.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex items-start justify-between mb-6">
              <div className="min-w-0 flex-1">
                <h4 className="m-0 text-[16px] font-semibold text-white/90 truncate">{currentSong.title}</h4>
                <p className="m-0 text-[12px] text-white/50 mt-1 truncate">{currentSong.artist}</p>
              </div>
              <button className="bg-transparent border-none text-white/40 hover:text-[#e8b57a] p-0 cursor-pointer mt-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
              </button>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="text-[10px] text-white/40 w-8">{formatTime(currentTime)}</span>
              <div 
                className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer"
                onClick={(e) => {
                  const bounds = e.currentTarget.getBoundingClientRect();
                  const percent = (e.clientX - bounds.left) / bounds.width;
                  handleProgressChange({ target: { value: String(percent * duration) } } as any);
                }}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-[#e8b57a] rounded-full"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#e8b57a] rounded-full shadow translate-x-1/2" />
                </div>
              </div>
              <span className="text-[10px] text-white/40 w-8 text-right">{formatTime(duration)}</span>
            </div>

            <div className="flex items-center justify-between px-2">
              <button className="bg-transparent border-none text-white/40 hover:text-white/80 p-0 cursor-pointer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg></button>
              <button onClick={playPrev} className="bg-transparent border-none text-white/90 hover:text-white p-0 cursor-pointer"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg></button>
              <button onClick={togglePlay} className="w-12 h-12 rounded-full bg-[#e8b57a] text-black border-none flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <button onClick={playNext} className="bg-transparent border-none text-white/90 hover:text-white p-0 cursor-pointer"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg></button>
              <button className="bg-transparent border-none text-white/40 hover:text-white/80 p-0 cursor-pointer"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg></button>
            </div>
          </div>
          )}

          {/* Up Next */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="m-0 text-[14px] font-medium text-white/90">Up Next</h3>
              <button className="text-[11px] font-medium bg-transparent border-none text-[#e8b57a] cursor-pointer">Clear</button>
            </div>
            <div className="flex flex-col gap-1">
              {upNextSongs.map((song, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSongClick(song)}>
                  <img src={(song.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={song.title} className="w-9 h-9 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[12px] font-medium truncate text-white/90">{song.title}</p>
                    <p className="m-0 text-[10px] truncate text-white/40 mt-0.5">{song.artist}</p>
                  </div>
                  <span className="text-[11px] text-white/40">{song.duration}</span>
                  <button className="bg-transparent border-none text-white/20 group-hover:text-white/60 p-0 ml-1 cursor-grab"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/></svg></button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended for You */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="m-0 text-[14px] font-medium text-white/90">Recommended for You</h3>
              <button className="text-[11px] font-medium bg-transparent border-none text-[#e8b57a] cursor-pointer">View all</button>
            </div>
            <div className="flex flex-col gap-1">
              {recommendedSongs.map((song, i) => (
                <div key={i} className="flex items-center gap-3 py-1.5 px-2 rounded-lg cursor-pointer hover:bg-white/5 transition-colors group" onClick={() => handleSongClick(song)}>
                  <img src={(song.cover || "https://images.unsplash.com/photo-1478147427282-58a87a120781?auto=format&fit=crop&w=300&q=80")} alt={song.title} className="w-9 h-9 rounded-md object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-[12px] font-medium truncate text-white/90">{song.title}</p>
                    <p className="m-0 text-[10px] truncate text-white/40 mt-0.5">{song.artist}</p>
                  </div>
                  <span className="text-[11px] text-white/40">{song.duration}</span>
                  <button className="bg-transparent border-none text-[#e8b57a] p-0 ml-1 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></button>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
