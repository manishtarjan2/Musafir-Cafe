import { NextResponse } from 'next/server';
import { getPlaylistTracks, searchTracks } from '@/lib/spotify';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  const playlistId = searchParams.get('playlist');

  try {
    let response;
    if (query) {
      response = await searchTracks(query);
    } else {
      // Default to fetching a playlist if no query is provided
      response = await getPlaylistTracks(playlistId || undefined);
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Spotify API Error:', response.status, errorData);
      return NextResponse.json(
        { error: 'Failed to fetch data from Spotify API', details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in /api/spotify:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
