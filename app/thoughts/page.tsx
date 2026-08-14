"use client";

import { useState } from "react";

const initialThoughts = [
  {
    id: 1,
    author: "Ananya",
    time: "2 hours ago",
    text: "There are days when a book understands you more than people do. What is the one book you always return to?",
    color: "from-blue-50 to-indigo-100",
    accent: "text-indigo-600",
  },
  {
    id: 2,
    author: "Kabir",
    time: "5 hours ago",
    text: "The best playlists are the ones that feel like a long train ride at sunset.",
    color: "from-amber-50 to-orange-100",
    accent: "text-orange-600",
  },
  {
    id: 3,
    author: "Sana",
    time: "Yesterday",
    text: "A perfect café is half coffee, half conversation, and half silence.",
    color: "from-rose-50 to-pink-100",
    accent: "text-rose-600",
  },
  {
    id: 4,
    author: "Musafir",
    time: "2 days ago",
    text: "Sometimes the most productive thing you can do is relax and listen to the rain.",
    color: "from-emerald-50 to-teal-100",
    accent: "text-teal-600",
  }
];

const colors = [
  { color: "from-blue-50 to-indigo-100", accent: "text-indigo-600" },
  { color: "from-amber-50 to-orange-100", accent: "text-orange-600" },
  { color: "from-rose-50 to-pink-100", accent: "text-rose-600" },
  { color: "from-emerald-50 to-teal-100", accent: "text-teal-600" },
  { color: "from-purple-50 to-fuchsia-100", accent: "text-fuchsia-600" }
];

export default function ThoughtsPage() {
  const [thoughts, setThoughts] = useState(initialThoughts);
  const [newThought, setNewThought] = useState("");
  const [authorName, setAuthorName] = useState("");

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought.trim() || !authorName.trim()) return;

    const randomStyle = colors[Math.floor(Math.random() * colors.length)];
    
    const post = {
      id: Date.now(),
      author: authorName,
      time: "Just now",
      text: newThought,
      color: randomStyle.color,
      accent: randomStyle.accent,
    };

    setThoughts([post, ...thoughts]);
    setNewThought("");
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
                className="w-full p-4 rounded-xl outline-none transition-all resize-none h-28 text-base border"
                style={{ backgroundColor: "var(--main-bg)", color: "var(--soft-text)", borderColor: "var(--line)" }}
                required
              />
              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4 max-sm:items-stretch">
                <input 
                  type="text" 
                  placeholder="Your Name (e.g. Musafir)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-4 py-2.5 rounded-lg outline-none transition-all text-sm w-56 max-sm:w-full border"
                  style={{ backgroundColor: "var(--main-bg)", color: "var(--soft-text)", borderColor: "var(--line)" }}
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
                className={`bg-gradient-to-br ${post.color} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50 flex flex-col justify-between min-h-[200px]`}
              >
                <div>
                  <p className="text-lg text-slate-900 font-medium leading-relaxed italic mb-6">"{post.text}"</p>
                </div>
                <div className="flex justify-between items-end mt-auto border-t border-black/5 pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-sm ${post.accent}`}>
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">{post.author}</strong>
                      <span className="text-xs text-slate-700 font-medium">{post.time}</span>
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
