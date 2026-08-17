const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

export const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
    cache: 'no-store', // Token expires, don't cache aggressively
  });

  return response.json();
};

export const searchTracks = async (query: string) => {
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

// Example function to get a specific playlist (you can change the playlist ID)
// Defaulting to "Top 50 - Global" for demonstration
const TOP_50_PLAYLIST_ID = '37i9dQZEVXbMDoHDwVN2tF';
export const getPlaylistTracks = async (playlistId = TOP_50_PLAYLIST_ID) => {
  const { access_token } = await getAccessToken();

  return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=20`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};
