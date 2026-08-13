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

  const currentSong = songs[currentIndex];
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
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
    }
  }, [currentSong]);

  const playNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const togglePlay = () => {
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
    <div className="music-player-container">
      <audio ref={audioRef} />

      {/* Now Playing Section */}
      <div className="now-playing">
        <div className="player-card">
          <div className="album-cover">
            <div className="cover-placeholder">♪</div>
          </div>
          <div className="song-info">
            <h2>{currentSong?.title || "No song selected"}</h2>
            <p>{currentSong?.artist || "Unknown Artist"}</p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="player-controls">
          <div className="progress-container">
            <span className="time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleProgressChange}
              className="progress-bar"
            />
            <span className="time">{formatTime(duration)}</span>
          </div>

          <div className="button-group">
            <button onClick={playPrev} className="control-btn" title="Previous">
              ⏮️ Prev
            </button>
            <button onClick={togglePlay} className="control-btn play-btn" title={isPlaying ? "Pause" : "Play"}>
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button onClick={playNext} className="control-btn" title="Next">
              Next ⏭️
            </button>
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="playlist-section">
        <h3>Playlist ({filteredSongs.length} songs)</h3>

        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search songs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="songs-grid">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <div
                key={song.id}
                className={`song-card ${currentSong?.id === song.id ? "active" : ""}`}
                onClick={() => {
                  setCurrentIndex(songs.indexOf(song));
                  setIsPlaying(true);
                }}
              >
                <div className="song-number">{index + 1}</div>
                <div className="song-details">
                  <div className="title">{song.title}</div>
                  <div className="artist">{song.artist}</div>
                </div>
                {currentSong?.id === song.id && (
                  <div className="playing-indicator">🎵</div>
                )}
              </div>
            ))
          ) : (
            <div className="no-results">No songs found</div>
          )}
        </div>
      </div>

      <style jsx>{`
        .music-player-container {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding: 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          color: white;
        }

        .now-playing {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 2rem;
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .player-card {
          display: flex;
          gap: 2rem;
          align-items: center;
        }

        .album-cover {
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #764ba2, #667eea);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          flex-shrink: 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        }

        .cover-placeholder {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .song-info {
          flex: 1;
        }

        .song-info h2 {
          margin: 0;
          font-size: 1.8rem;
          font-weight: bold;
          word-break: break-word;
        }

        .song-info p {
          margin: 0.5rem 0 0 0;
          font-size: 1rem;
          opacity: 0.9;
        }

        .player-controls {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .progress-container {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .time {
          font-size: 0.9rem;
          min-width: 40px;
        }

        .progress-bar {
          flex: 1;
          height: 6px;
          -webkit-appearance: none;
          appearance: none;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          outline: none;
        }

        .progress-bar::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .progress-bar::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .button-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }

        .control-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          transition: all 0.3s ease;
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .control-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.05);
        }

        .play-btn {
          background: white;
          color: #667eea;
          padding: 0.75rem 2rem;
          font-size: 1.1rem;
        }

        .play-btn:hover {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        }

        .playlist-section {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .playlist-section h3 {
          margin: 0;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .search-box {
          display: flex;
        }

        .search-input {
          flex: 1;
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.9);
          font-size: 1rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .songs-grid {
          display: grid;
          gap: 0.75rem;
          max-height: 400px;
          overflow-y: auto;
          padding-right: 0.5rem;
        }

        .song-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .song-card:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }

        .song-card.active {
          background: rgba(255, 255, 255, 0.25);
          border-color: white;
        }

        .song-number {
          min-width: 30px;
          text-align: center;
          font-weight: bold;
          opacity: 0.7;
        }

        .song-details {
          flex: 1;
          min-width: 0;
        }

        .title {
          font-weight: 600;
          font-size: 0.95rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .artist {
          font-size: 0.85rem;
          opacity: 0.8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .playing-indicator {
          font-size: 1.2rem;
          animation: bounce 1s infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }

        .no-results {
          text-align: center;
          padding: 2rem;
          opacity: 0.7;
          font-size: 1rem;
        }

        /* Scrollbar styling */
        .songs-grid::-webkit-scrollbar {
          width: 6px;
        }

        .songs-grid::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }

        .songs-grid::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
        }

        .songs-grid::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        @media (max-width: 768px) {
          .music-player-container {
            padding: 1rem;
            gap: 1.5rem;
          }

          .player-card {
            flex-direction: column;
            text-align: center;
          }

          .album-cover {
            width: 100px;
            height: 100px;
          }

          .song-info h2 {
            font-size: 1.4rem;
          }

          .button-group {
            flex-wrap: wrap;
          }

          .control-btn {
            flex: 1;
            min-width: 80px;
          }

          .songs-grid {
            max-height: 300px;
          }
        }
      `}</style>
    </div>
  );
}
