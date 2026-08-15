export type Song = {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
  playlist: string;
  cover?: string;
  url?: string;
};

// Generate songs from filename
function sanitizeTitle(filename: string): string {
  return filename
    .replace(/\.mp3$/, "")
    .replace(/_/g, " ")
    .replace(/\(0\)/g, "")
    .replace(/\(\d+k\)/g, "")
    .replace(/\(\d+\)/g, "")
    .trim();
}

const allSongs = [
  "Aaila_Re__From__Jung__(0)",
  "Aaj_Kehna_Zaroori_Hai__From__Andaaz__(0)",
  "Aaj_Main_Upar__From__Khamoshi_-_The_Musical__(0)",
  "Aamdani_Atthanni__Aamdani_Atthanni_Kharcha_Rupaiya___Soundtrack_Version_(0)",
  "Aanewala_Pal_Janewala_Hai(0)",
  "Aankhein_Khuli(0)",
  "Aayee_Hai_Diwali__From__Aamdani_Atthanni_Kharcha_Rupaiya__(0)",
  "Aaye_Ho_Meri_Zindagi_Mein__Male-Jhankar_(0)",
  "Aaye_Tum_Yaad_Mujhe(0)",
  "AUD-20251027-WA0000",
  "Badi_Mushkil__From__Lajja__(0)",
  "Bahon_Ke_Darmiyan__From__Khamoshi_-_The_Musical__(0)",
  "Bairi_Piya__From__Devdas__(0)",
  "banke_tera_Saya_Mai_tujhko_Tham_Lu_uth_Ke_Rab_se_pahle_main_tera_Naam_Lun_ringtone_maa_ringtone_2021(256k)",
  "Bhanware_Ki_Gunjan(0)",
  "Bheed_Mein(0)",
  "Chann_Chann__From__Munnabhai_MBBS__(0)",
  "Chingari_Koi_Bhadke(0)",
  "Chori_Chori_Chupke_Chupke__From__Chori_Chori_Chupke_Chupke__(0)",
  "Chote_Chote_Bhaiyon_Ke_Bade_Bhaiya(0)",
  "College_Ki_Ladkiyon(0)",
  "Dekha_Na_Haye_Re(0)",
  "Dekhne_Walon_Ne__From___Chori_Chori_Chupke_Chupke___(0)",
  "Dekh_Le__From__Munnabhai_MBBS__(0)",
  "Dheere_Se_Jana_Bagiyan_Mein(0)",
  "Dil_Deewana_Kehta_Hai(0)",
  "Dil_Mein_Dard_Sa__From__Kranti__(0)",
  "Dil_To_Pagal_Hai(0)",
  "Diwani_Diwani__From__Chori_chori_Chupke_Chupke__(0)",
  "Dola_Re_Dola__From__Devdas__(0)",
  "Ek_Dilruba_Hai(0)",
  "Ek_Ladki_Bas_Gayee__From__Jaal_-_The_Trap__(0)",
  "Ek_Ladki_Bheegi_Bhagi_Si(0)",
  "Gore_Gore_Mukhde_Pe(0)",
  "Hai_re_othalali_hai_re_kajra_Bhojpuri_Status_HD(256k)",
  "HAMEIN_TUMSE_HUA_PYAR(0)",
  "Ham_Hain_Rahi_Pyar_Ke(0)",
  "HAR_DIL_JO_PYAR_KAREGA(0)",
  "Ho_Gaya_Hai_Tujhko_To_Pyar_Sajna(0)",
  "HUM_TUMKO_NIGAHON_MEIN(0)",
  "Jaaneman_Jaaneman(0)",
  "Jack_Sparrow_Bgm___BGM_WORLD(256k)",
  "Jack_Sparrow_Remix_Ringtone______Download_Link_👇__(256k)",
  "Jeevan_Ke_Safar_Mein_Rahi(0)",
  "Jugraafiya__feat._Hrithik_Roshan___Mrunal_Thakur_(0)",
  "Kaho_Naa_Pyar_Hai(0)",
  "Kaun_Disha_Mein_Leke_Chala(0)",
  "Kehna_Hi_Kya__From__Bombay__(0)",
  "KGF_2__Remix_Theme_KGF_2_Ringtone_KGF_2_Theme_Ringtone_KGF_2_Theme_Song_KGF_2_Theme_Music_Ringtone(256k)",
  "Khwab_Ho_Tum_Ya_Koi_Haqeeqat(0)",
  "Kitne_Sapne_Kitne_Arman(0)",
  "Kya_Karte_They_Sajna(0)",
  "KYO_KISI_KO(0)",
  "Maine_Tujhko_Pyar_Kiya_Hai__Talaashi___Soundtrack_Version_(0)",
  "Main_jis_din_bhula_doon_tera_pyar_dil_se_song_ringtone_😓__broken_heart_ringtone_new_ringtone_2021_💔(256k)",
  "Main_Nikla_Gaddi_Leke(0)",
  "Mana_Janab_Ne_Pukara_Nahin(0)",
  "Manzilen_Apni_Jagah_Hai(0)",
  "Mere_Sapnon_Ki_Rani(0)",
  "Meri_Bheegi_Bheegi_Si(0)",
  "Mohabbat_Dil_Ka_Sakoon(0)(1)",
  "Mujhse_Shaadi_Karogi(0)(1)",
  "Murgiwalo_Apni_Murgiyan_Sambhalo(0)",
  "Nahin_Hona_Tha(0)",
  "Nakhrewali(0)",
  "No._1_Punjabi__From__Chori_chori_Chupke_Chupke__(0)",
  "Oh_Hansini(0)",
  "OODHNI(0)",
  "O_Mere_Dil_Ke_Chain(0)",
  "O_Meri_Sharmilee(0)",
  "O_Soniya(0)",
  "Pardesi_Pardesi__Jhankar_(0)",
  "PEHLE_KABHI_NA_MERA_HAAL(0)",
  "Priye_Praneshwari(0)",
  "Pyar_Diwana_Hota_Hai(0)",
  "Raat_Kali_Ek_Khwab_Men_Aai(0)",
  "Rab_Kare(0)",
  "Radha_Kaise_Na_Jale(0)",
  "Ram_Jaane__From__Ram_Jaane__(0)",
  "Rockbye__Remix__-_Ringtone____Villain_beats_____Download_link👇_(256k)",
  "Roop_Salona_Tera_Dekh_Ke__Jaani_Dushman___Soundtrack_Version_(0)",
  "Roop_Tera_Mastana(0)",
  "Shaam_Bhi_Khoob_Hai(0)",
  "Silsila_Ye_Chahat_Ka__From__Devdas__(0)",
  "Taal_Se_Taal(0)",
  "TERE_NAAM(0)",
  "Terre_Pyaar_Mein(0)",
  "TUJHE_DEKH_KE_DIL(0)",
  "Tum_Bin_Jaoon_Kahan(0)",
  "Tu_Hi_Re__From__Bombay__(0)",
  "TU_NEENDON_KI_RANI_AUR_MAIN_PYAR_KA_SAPNA(0)",
  "Tu_Qatil_Tera_Dil_Qatil(0)",
  "Wonderful_Song",
  "Yeh_Bandhan_Toh(0)",
  "Yeh_Dharti_Chand_Sitare(0)",
  "Yeh_Dil_Na_Hota_Bechara(0)",
  "Yeh_Jeevan_Hai(0)",
  "Yeh_Kya_Hua(0)",
  "Yeh_Sham_Mastani(0)",
  "Yeh_Teri_Aankhen_Jhuki_Jhuki(0)",
  "Zindagi_Ban_Gaye_Ho_Tum(0)",
  "Zindagi_Ka_Safar(0)",
  "Zindagi_Ke_Safar_Mein(0)",
];

const playlists = [
  "Morning Bliss",
  "Bollywood Romance",
  "Chill Vibes",
  "Workout Energy",
  "Rainy Day Feels",
  "Lo-fi Beats",
];

const seedSongs: Song[] = [
  {
    id: "song-fallback-1",
    title: "Midnight Café",
    artist: "The Lanterns",
    duration: "3:41",
    mood: "Calm",
    playlist: playlists[0],
    url: "/music/songs/Aaila_Re__From__Jung__(0).mp3",
  }
];

let songsCache: Song[] | null = null;

export async function getSongsAsync(): Promise<Song[]> {
  if (songsCache) return songsCache;
  
  try {
    const res = await fetch("https://api.jamendo.com/v3.0/tracks/?client_id=56d30c95&format=jsonpretty&limit=50&hasimage=true&audioformat=mp32", { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    
    if (!data.results || data.results.length === 0) throw new Error("No results");

    songsCache = data.results.map((track: any, index: number) => {
      const duration = parseInt(track.duration, 10) || 180;
      const minutes = Math.floor(duration / 60);
      const seconds = Math.floor(duration % 60);
      return {
        id: track.id,
        title: track.name,
        artist: track.artist_name,
        duration: `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`,
        mood: "Chill",
        playlist: playlists[index % playlists.length],
        cover: track.image,
        url: track.audio
      };
    });
    
    return songsCache!;
  } catch (e) {
    console.error("Jamendo fetch failed", e);
    if (!songsCache) songsCache = [...seedSongs];
    return songsCache;
  }
}

export function getSongs() {
  return songsCache || [...seedSongs];
}

export function addSong(song: Omit<Song, "id"> & { id?: string }): Song {
  const newSong: Song = {
    ...song,
    id: song.id ?? `song-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
  };

  if (songsCache) {
    songsCache = [newSong, ...songsCache];
  } else {
    songsCache = [newSong, ...seedSongs];
  }
  return newSong;
}
