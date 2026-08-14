"use client";

import { useMusic } from "@/app/context/MusicContext";

export default function MusicPlayer() {
  const {
    songs,
    currentSong,
    isPlaying,
    currentTime,
    duration,
    activeTab,
    customPlaylistIds,
    searchQuery,
    loading,
    setSearchQuery,
    setActiveTab,
    togglePlay,
    playNext,
    playPrev,
    toggleCustomPlaylist,
    handleProgressChange,
    handleSongClick,
    formatTime,
  } = useMusic();

  if (loading) {
    return <div className="text-center p-12 text-lg font-medium text-slate-500 animate-pulse">Loading your music library...</div>;
  }

  if (songs.length === 0) {
    return <div className="text-center p-12 text-lg text-slate-500">No songs available.</div>;
  }

  const currentPlayableSongs = activeTab === "all" ? songs : songs.filter(s => customPlaylistIds.includes(s.id));
  const filteredSongs = currentPlayableSongs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 p-8 rounded-2xl text-white bg-gradient-to-br from-indigo-500 to-purple-700 max-md:rounded-none max-md:min-h-[calc(100vh-80px)] max-md:p-4 max-md:gap-6">
      
      {/* Now Playing Section */}
      <div className="flex flex-col gap-8 p-8 rounded-2xl bg-white/10 backdrop-blur-md max-md:p-6">
        <div className="flex gap-8 items-center max-md:flex-col max-md:text-center overflow-hidden">
          <div className="w-32 h-32 md:w-32 md:h-32 max-md:w-36 max-md:h-36 bg-gradient-to-br from-purple-600 to-indigo-500 rounded-xl flex items-center justify-center text-5xl shrink-0 shadow-lg">
            <div className={isPlaying ? "animate-pulse" : ""}>♪</div>
          </div>
          <div className="flex-1 min-w-0 w-full overflow-hidden">
            {/* Added truncate block to fix title overflowing the screen on mobile */}
            <h2 className="m-0 text-3xl max-md:text-xl font-bold truncate block w-full whitespace-nowrap overflow-hidden text-ellipsis" title={currentSong?.title || "No song selected"}>
              {currentSong?.title || "No song selected"}
            </h2>
            <p className="mt-2 text-base max-md:text-sm text-white/90 truncate block w-full whitespace-nowrap overflow-hidden text-ellipsis" title={currentSong?.artist || "Select a song"}>
              {currentSong?.artist || "Select a song from the playlist below"}
            </p>
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
              disabled={!currentSong}
              className="flex-1 h-1.5 appearance-none bg-white/30 rounded-full outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-md cursor-pointer disabled:opacity-50"
            />
            <span className="text-sm min-w-[40px]">{formatTime(duration)}</span>
          </div>

          <div className="flex gap-4 justify-center flex-wrap max-md:gap-2">
            <button
              onClick={playPrev}
              disabled={!currentSong}
              className="px-6 py-3 border-none rounded-full bg-white/20 text-white cursor-pointer text-base font-semibold transition-all hover:bg-white/30 hover:scale-105 border-2 border-white/30 max-md:flex-1 max-md:min-w-[70px] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              title="Previous"
            >
              ⏮️ Prev
            </button>
            <button
              onClick={togglePlay}
              disabled={!currentSong}
              className="px-8 py-3 border-none rounded-full bg-white text-indigo-500 cursor-pointer text-lg font-semibold transition-all hover:bg-white/90 shadow-lg hover:shadow-xl max-md:flex-1 max-md:min-w-[100px] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button
              onClick={playNext}
              disabled={!currentSong}
              className="px-6 py-3 border-none rounded-full bg-white/20 text-white cursor-pointer text-base font-semibold transition-all hover:bg-white/30 hover:scale-105 border-2 border-white/30 max-md:flex-1 max-md:min-w-[70px] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              title="Next"
            >
              Next ⏭️
            </button>
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center max-md:flex-col max-md:gap-4 max-md:items-start">
          <h3 className="m-0 text-2xl font-bold">
            {activeTab === "all" ? "All Songs" : "My Playlist"} ({filteredSongs.length})
          </h3>
          <div className="flex bg-white/10 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border-none cursor-pointer ${activeTab === "all" ? "bg-white text-indigo-600 shadow-sm" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              Library
            </button>
            <button 
              onClick={() => setActiveTab("custom")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all border-none cursor-pointer ${activeTab === "custom" ? "bg-white text-indigo-600 shadow-sm" : "bg-transparent text-white hover:bg-white/10"}`}
            >
              My Playlist
            </button>
          </div>
        </div>

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
            filteredSongs.map((song, index) => {
              const inPlaylist = customPlaylistIds.includes(song.id);
              return (
                <div
                  key={song.id}
                  className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border-2 border-transparent hover:bg-white/20 hover:translate-x-1 ${
                    currentSong?.id === song.id ? "bg-white/25 border-white" : "bg-white/10"
                  }`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="min-w-[30px] text-center font-bold opacity-70">{index + 1}</div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="font-semibold text-[0.95rem] truncate block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {song.title}
                    </div>
                    <div className="text-[0.85rem] opacity-80 truncate block w-full whitespace-nowrap overflow-hidden text-ellipsis">
                      {song.artist}
                    </div>
                  </div>
                  {currentSong?.id === song.id && (
                    <div className="text-xl animate-bounce shrink-0">🎵</div>
                  )}
                  <button 
                    onClick={(e) => toggleCustomPlaylist(e, song.id)}
                    className={`ml-2 p-2 rounded-full border-none shrink-0 cursor-pointer transition-colors ${inPlaylist ? 'bg-red-500/80 text-white hover:bg-red-500' : 'bg-white/20 text-white hover:bg-white/40'}`}
                    title={inPlaylist ? "Remove from Playlist" : "Add to Playlist"}
                  >
                    {inPlaylist ? "❤️" : "🤍"}
                  </button>
                </div>
              );
            })
          ) : (
            <div className="text-center p-8 opacity-70 text-base">
              {activeTab === "custom" && searchQuery === "" 
                ? "Your playlist is empty. Add some songs from the library!" 
                : "No songs found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
