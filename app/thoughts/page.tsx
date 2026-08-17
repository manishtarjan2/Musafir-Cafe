"use client";

import { useState } from "react";
import DOMPurify from "dompurify";

const initialThoughts = [
  {
    id: 1,
    author: "Ananya",
    time: "2 hours ago",
    text: "There are days when a book understands you more than people do. What is the one book you always return to?",
    bgClass: "bg-gradient-to-br from-[#aecbfa] to-[#c1d8fb]",
    textClass: "text-[#202124]",
    accent: "text-[#aecbfa]",
    fontSize: "text-lg",
  },
  {
    id: 2,
    author: "Kabir",
    time: "5 hours ago",
    text: "The best playlists are the ones that feel like a long train ride at sunset.",
    bgClass: "bg-gradient-to-br from-[#fbbc04] to-[#fcd033]",
    textClass: "text-[#202124]",
    accent: "text-[#fbbc04]",
    fontSize: "text-xl",
  },
  {
    id: 3,
    author: "Sana",
    time: "Yesterday",
    text: "A perfect café is half coffee, half conversation, and half silence.",
    bgClass: "bg-gradient-to-br from-[#fdcfe8] to-[#fde1f0]",
    textClass: "text-[#202124]",
    accent: "text-[#fdcfe8]",
    fontSize: "text-lg",
  },
  {
    id: 4,
    author: "Musafir",
    time: "2 days ago",
    text: "Sometimes the most productive thing you can do is relax and listen to the rain.",
    bgClass: "bg-gradient-to-br from-[#ccff90] to-[#dcfb9f]",
    textClass: "text-[#202124]",
    accent: "text-[#ccff90]",
    fontSize: "text-base",
  }
];

const noteColors = [
  { id: "default", bgClass: "bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d]", textClass: "text-[#e8eaed]", accent: "text-[#2d2d2d]", swatch: "#2d2d2d" },
  { id: "red", bgClass: "bg-gradient-to-br from-[#f28b82] to-[#f49d95]", textClass: "text-[#202124]", accent: "text-[#f28b82]", swatch: "#f28b82" },
  { id: "orange", bgClass: "bg-gradient-to-br from-[#fbbc04] to-[#fcd033]", textClass: "text-[#202124]", accent: "text-[#fbbc04]", swatch: "#fbbc04" },
  { id: "yellow", bgClass: "bg-gradient-to-br from-[#fff475] to-[#fff799]", textClass: "text-[#202124]", accent: "text-[#fff475]", swatch: "#fff475" },
  { id: "green", bgClass: "bg-gradient-to-br from-[#ccff90] to-[#dcfb9f]", textClass: "text-[#202124]", accent: "text-[#ccff90]", swatch: "#ccff90" },
  { id: "teal", bgClass: "bg-gradient-to-br from-[#a7ffeb] to-[#bbfaf1]", textClass: "text-[#202124]", accent: "text-[#a7ffeb]", swatch: "#a7ffeb" },
  { id: "blue", bgClass: "bg-gradient-to-br from-[#cbf0f8] to-[#d8f4fa]", textClass: "text-[#202124]", accent: "text-[#cbf0f8]", swatch: "#cbf0f8" },
  { id: "darkblue", bgClass: "bg-gradient-to-br from-[#aecbfa] to-[#c1d8fb]", textClass: "text-[#202124]", accent: "text-[#aecbfa]", swatch: "#aecbfa" },
  { id: "purple", bgClass: "bg-gradient-to-br from-[#d7aefb] to-[#e1c1fb]", textClass: "text-[#202124]", accent: "text-[#d7aefb]", swatch: "#d7aefb" },
  { id: "pink", bgClass: "bg-gradient-to-br from-[#fdcfe8] to-[#fde1f0]", textClass: "text-[#202124]", accent: "text-[#fdcfe8]", swatch: "#fdcfe8" },
  { id: "brown", bgClass: "bg-gradient-to-br from-[#e6c9a8] to-[#eed7bd]", textClass: "text-[#202124]", accent: "text-[#e6c9a8]", swatch: "#e6c9a8" },
];

const fontSizes = [
  { id: "small", class: "text-base", label: "Aa" },
  { id: "medium", class: "text-lg", label: "Aa" },
  { id: "large", class: "text-xl", label: "Aa" },
  { id: "xlarge", class: "text-2xl", label: "Aa" },
];

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState(initialThoughts);
  const [newThought, setNewThought] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [selectedColor, setSelectedColor] = useState(noteColors[0]);
  const [selectedFont, setSelectedFont] = useState(fontSizes[1]);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFontPicker, setShowFontPicker] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought.trim() || !authorName.trim()) return;

    // Sanitize user inputs to prevent XSS
    const safeThought = DOMPurify.sanitize(newThought);
    const safeAuthor = DOMPurify.sanitize(authorName);

    const post = {
      id: Date.now(),
      author: safeAuthor,
      time: "Just now",
      text: safeThought,
      bgClass: selectedColor.bgClass,
      textClass: selectedColor.textClass,
      accent: selectedColor.accent,
      fontSize: selectedFont.class,
    };

    setThoughts([post, ...thoughts]);
    setNewThought("");
    setSelectedColor(noteColors[0]);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <section className="flex flex-col gap-8 min-w-0">

          {/* ═══ HERO BANNER ═══ */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-end" style={{ background: "linear-gradient(135deg, rgba(20,15,25,0.95) 30%, rgba(40,25,50,0.85))" }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="relative z-10 p-8 sm:p-10 w-full">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3" style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)" }}>COMMUNITY</span>
              <h1 className="text-3xl sm:text-4xl font-bold m-0 mb-2 text-white leading-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                Cafe Thoughts
              </h1>
              <p className="text-sm m-0 mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>A corner for your mind. Share your thoughts, feelings, and musings.</p>
            </div>
          </div>
          <div className="flex justify-between items-end border-b border-gray-200 pb-4" style={{ borderColor: "var(--line)" }}>
            <h2 className="text-2xl font-bold m-0" style={{ color: "var(--soft-text)" }}>Community Feed</h2>
          </div>

          {/* Create Post Box */}
          <div className="p-6 rounded-2xl shadow-sm border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <form onSubmit={handlePost} className="flex flex-col gap-4">
              <textarea 
                placeholder="What's on your mind? Share a thought, a quote, or a feeling..."
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                className={`w-full p-6 rounded-xl outline-none transition-all resize-none h-32 border ${selectedColor.bgClass} ${selectedColor.textClass} ${selectedFont.class}`}
                style={{ borderColor: "var(--line)" }}
                required
              />

              <div className="flex items-center bg-white/5 p-2 rounded-xl border border-white/5 relative">
                <div className="flex gap-2">
                  {/* Font Size Toggle */}
                  <button 
                    type="button" 
                    onClick={() => { setShowFontPicker(!showFontPicker); setShowColorPicker(false); }} 
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${showFontPicker ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'}`} 
                    title="Font Size"
                  >
                    <span className="font-bold text-lg leading-none">Aa</span>
                  </button>
                  
                  {/* Color Palette Toggle */}
                  <button 
                    type="button" 
                    onClick={() => { setShowColorPicker(!showColorPicker); setShowFontPicker(false); }} 
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors ${showColorPicker ? 'bg-white/10' : 'hover:bg-white/10'}`} 
                    title="Background Color"
                  >
                    <div className="w-5 h-5 rounded-full border border-white/50" style={{ backgroundColor: selectedColor.swatch }} />
                  </button>
                </div>

                {/* Font Size Popover */}
                {showFontPicker && (
                  <div className="absolute top-14 left-2 bg-[#1c1a1f] border border-white/10 p-2 rounded-xl shadow-2xl flex gap-1 z-20">
                    {fontSizes.map((font) => (
                      <button
                        key={font.id}
                        type="button"
                        onClick={() => { setSelectedFont(font); setShowFontPicker(false); }}
                        className={`w-9 h-9 flex items-center justify-center rounded-md transition-all ${selectedFont.id === font.id ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10 hover:text-white'}`}
                      >
                        <span className={font.class === 'text-2xl' ? 'text-lg font-bold' : font.class === 'text-xl' ? 'text-base font-bold' : font.class === 'text-lg' ? 'text-sm font-semibold' : 'text-xs'}>{font.label}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* Color Swatches Popover */}
                {showColorPicker && (
                  <div className="absolute top-14 left-2 bg-[#1c1a1f] border border-white/10 p-3 rounded-xl shadow-2xl flex gap-3 flex-wrap w-[240px] z-20">
                    {noteColors.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        onClick={() => { setSelectedColor(color); setShowColorPicker(false); }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 ${selectedColor.id === color.id ? 'border-white scale-110' : 'border-transparent opacity-80 hover:opacity-100'}`}
                        style={{ backgroundColor: color.swatch }}
                        aria-label={`Select ${color.id} color`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4 max-sm:items-stretch mt-2">
                <input 
                  type="text" 
                  placeholder="Your Name (e.g. Musafir)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-4 py-2.5 rounded-lg outline-none transition-all text-sm w-56 max-sm:w-full border bg-black/40 text-white/90 placeholder:text-white/30"
                  style={{ borderColor: "var(--line)" }}
                  required
                />
                <button 
                  type="submit"
                  className="px-8 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none cursor-pointer"
                  style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)" }}
                >
                  Post Thought ✍️
                </button>
              </div>
            </form>
          </div>
          
          {/* Thoughts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thoughts.map((post) => (
              <div 
                key={post.id} 
                className={`${post.bgClass} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/10 flex flex-col justify-between min-h-[220px]`}
              >
                <div>
                  <p className={`${post.fontSize} ${post.textClass} font-medium leading-relaxed italic mb-6 break-words`}>&quot;{post.text}&quot;</p>
                </div>
                <div className={`flex justify-between items-end mt-auto border-t ${post.textClass.includes('text-[#e8eaed]') ? 'border-white/10' : 'border-black/10'} pt-4`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-sm ${post.accent}`}>
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong className={`block ${post.textClass} text-sm font-semibold`}>{post.author}</strong>
                      <span className={`${post.textClass} opacity-70 text-xs font-medium`}>{post.time}</span>
                    </div>
                  </div>
                  <button className={`bg-white/50 hover:bg-white p-2 rounded-full transition-colors shadow-sm ${post.accent} border-none cursor-pointer`}>
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="hidden lg:flex flex-col gap-5 sticky top-24 self-start">
          <div className="rounded-2xl p-6 shadow-sm border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: "var(--primary)" }}>
              <span>🔥</span> Trending Topics
            </h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-3 text-sm" style={{ color: "var(--soft-text)" }}>
              <li className="flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-colors border" style={{ backgroundColor: "var(--main-bg)", borderColor: "var(--line)" }}>
                <span className="font-bold" style={{ color: "var(--primary)" }}>#1</span>
                Slow living mornings
              </li>
              <li className="flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-colors border" style={{ backgroundColor: "var(--main-bg)", borderColor: "var(--line)" }}>
                <span className="font-bold" style={{ color: "var(--primary)" }}>#2</span>
                Rainy-day playlists
              </li>
              <li className="flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-colors border" style={{ backgroundColor: "var(--main-bg)", borderColor: "var(--line)" }}>
                <span className="font-bold" style={{ color: "var(--primary)" }}>#3</span>
                Books that stay with you
              </li>
              <li className="flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-colors border" style={{ backgroundColor: "var(--main-bg)", borderColor: "var(--line)" }}>
                <span className="font-bold" style={{ color: "var(--primary)" }}>#4</span>
                Travel stories in ten words
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
