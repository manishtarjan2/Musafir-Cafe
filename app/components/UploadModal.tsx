"use client";

import React, { useState } from "react";
import { useMusic } from "@/app/context/MusicContext";

export default function UploadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { addSongToContext } = useMusic();

  if (!isOpen) return null;

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        alert("Cloudinary credentials are not configured in .env.local");
        setUploading(false);
        return;
      }

      formData.append("upload_preset", uploadPreset);
      formData.append("resource_type", "video"); // Cloudinary handles audio under video resource type

      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData
      });
      
      if (!res.ok) {
        throw new Error("Failed to upload to Cloudinary");
      }

      const data = await res.json();

      // 2. Add to our local database/cache via API
      const newSong = {
        title: file.name.replace(/\.[^/.]+$/, "").replace(/_/g, " "),
        artist: "Uploaded Track",
        duration: "3:00", // Placeholder duration, will be accurate upon playback
        mood: "Custom",
        playlist: "All Songs",
        provider: "cloudinary",
        providerId: data.public_id,
        url: data.secure_url,
      };

      const apiRes = await fetch("/api/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSong)
      });
      
      const apiData = await apiRes.json();
      
      // 3. Update UI
      addSongToContext(apiData.song);
      alert("Song uploaded successfully!");
      onClose();
      setFile(null);
    } catch (e) {
      console.error(e);
      alert("Error uploading track.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#1a1311] border border-white/10 rounded-2xl w-full max-w-md p-6 shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white bg-transparent border-none cursor-pointer"
        >
          ✕
        </button>
        <h2 className="text-[#f0d4a0] text-xl font-bold mb-4 mt-0">Upload to Cloudinary</h2>
        
        <div className="flex flex-col gap-4">
          <p className="text-white/70 text-sm m-0">
            Select an MP3 file from your device to upload it securely to your personal Cloudinary storage.
          </p>
          
          <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#e8b57a] transition-colors">
            <input 
              type="file" 
              accept="audio/*" 
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
              className="w-full text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#e8b57a]/20 file:text-[#e8b57a] hover:file:bg-[#e8b57a]/30 cursor-pointer"
            />
          </div>

          <button 
            onClick={handleUpload} 
            disabled={!file || uploading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d0a76a] to-[#956041] text-[#201610] font-bold border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-opacity"
          >
            {uploading ? "Uploading..." : "Upload Track"}
          </button>
        </div>
      </div>
    </div>
  );
}
