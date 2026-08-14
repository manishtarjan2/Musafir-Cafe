"use client";

import Link from "next/link";
import { useState } from "react";
import GlobalHeader from "@/app/components/GlobalHeader";

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
    // Keep author name so they don't have to retype it for consecutive posts
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans pb-24">
      <GlobalHeader title="💭 Cafe Thoughts" />

      <main className="max-w-7xl mx-auto p-8 max-md:p-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <section className="lg:col-span-3">
          <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold m-0">Community Feed</h2>
          </div>

          {/* Create Post Box */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <form onSubmit={handlePost} className="flex flex-col gap-4">
              <textarea 
                placeholder="What's on your mind? Share a thought, a quote, or a feeling..."
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all resize-none h-28 text-slate-700 text-base"
                required
              />
              <div className="flex justify-between items-center max-sm:flex-col max-sm:gap-4 max-sm:items-stretch">
                <input 
                  type="text" 
                  placeholder="Your Name (e.g. Musafir)"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:bg-white focus:border-indigo-300 transition-all text-sm w-56 max-sm:w-full"
                  required
                />
                <button 
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
                  <p className="text-lg text-slate-800 font-medium leading-relaxed italic mb-6">"{post.text}"</p>
                </div>
                <div className="flex justify-between items-end mt-auto border-t border-black/5 pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-sm ${post.accent}`}>
                      {post.author.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong className="block text-slate-900 text-sm">{post.author}</strong>
                      <span className="text-xs text-slate-500 font-medium">{post.time}</span>
                    </div>
                  </div>
                  <button className={`bg-white/50 hover:bg-white p-2 rounded-full transition-colors shadow-sm ${post.accent}`}>
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100 sticky top-28 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-900">
              <span>🔥</span> Trending Topics
            </h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-3 text-indigo-800 text-sm">
              <li className="flex gap-3 items-center bg-white/60 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors border border-indigo-50">
                <span className="text-indigo-400 font-bold">#1</span>
                Slow living mornings
              </li>
              <li className="flex gap-3 items-center bg-white/60 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors border border-indigo-50">
                <span className="text-indigo-400 font-bold">#2</span>
                Rainy-day playlists
              </li>
              <li className="flex gap-3 items-center bg-white/60 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors border border-indigo-50">
                <span className="text-indigo-400 font-bold">#3</span>
                Books that stay with you
              </li>
              <li className="flex gap-3 items-center bg-white/60 p-3 rounded-lg hover:bg-white cursor-pointer transition-colors border border-indigo-50">
                <span className="text-indigo-400 font-bold">#4</span>
                Travel stories in ten words
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
