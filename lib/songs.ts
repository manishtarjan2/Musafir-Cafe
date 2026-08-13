export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
  cover?: string;
};

const seedSongs: Song[] = [
  {
    id: "song-1",
    title: "After Rain",
    artist: "Arijit Singh",
    duration: "3:42",
    mood: "Calm",
    cover: "rain",
  },
  {
    id: "song-2",
    title: "Peaceful",
    artist: "Lo-Fi Playlist",
    duration: "4:08",
    mood: "Focus",
    cover: "portrait",
  },
  {
    id: "song-3",
    title: "Save Your Tears",
    artist: "The Weeknd",
    duration: "3:12",
    mood: "Drift",
    cover: "sea",
  },
  {
    id: "song-4",
    title: "Chill Vibes",
    artist: "Playlist",
    duration: "2:58",
    mood: "Evening",
    cover: "sky",
  },
];

let songs: Song[] = [...seedSongs];

export function getSongs() {
  return [...songs];
}

export function addSong(song: Omit<Song, "id"> & { id?: string }): Song {
  const newSong: Song = {
    ...song,
    id: song.id ?? `song-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  };

  songs = [newSong, ...songs];
  return newSong;
}
