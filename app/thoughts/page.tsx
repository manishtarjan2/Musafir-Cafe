import Link from "next/link";

const thoughts = [
  {
    author: "Ananya",
    time: "2 hours ago",
    text: "There are days when a book understands you more than people do. What is the one book you always return to?",
    color: "from-blue-50 to-indigo-100",
    accent: "text-indigo-600",
  },
  {
    author: "Kabir",
    time: "5 hours ago",
    text: "The best playlists are the ones that feel like a long train ride at sunset.",
    color: "from-amber-50 to-orange-100",
    accent: "text-orange-600",
  },
  {
    author: "Sana",
    time: "Yesterday",
    text: "A perfect café is half coffee, half conversation, and half silence.",
    color: "from-rose-50 to-pink-100",
    accent: "text-rose-600",
  },
  {
    author: "Musafir",
    time: "2 days ago",
    text: "Sometimes the most productive thing you can do is relax and listen to the rain.",
    color: "from-emerald-50 to-teal-100",
    accent: "text-teal-600",
  }
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function ThoughtsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <header className="flex justify-between items-center p-8 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10 max-md:flex-col max-md:gap-4 max-md:p-4">
        <h1 className="text-2xl font-bold m-0 text-slate-900 flex items-center gap-2">💭 Cafe Thoughts</h1>
        <nav className="flex gap-6 font-medium text-sm text-slate-500 max-md:flex-wrap max-md:justify-center">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="no-underline text-inherit hover:text-indigo-600 transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main className="max-w-7xl mx-auto p-8 max-md:p-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <section className="lg:col-span-3">
          <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
            <h2 className="text-3xl font-bold m-0">Community Feed</h2>
          </div>
          
          {/* Thoughts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {thoughts.map((post) => (
              <div 
                key={`${post.author}-${post.time}`} 
                className={`bg-gradient-to-br ${post.color} p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50 flex flex-col justify-between min-h-[200px]`}
              >
                <div>
                  <p className="text-lg text-slate-800 font-medium leading-relaxed italic mb-6">"{post.text}"</p>
                </div>
                <div className="flex justify-between items-end mt-auto border-t border-black/5 pt-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-lg shadow-sm ${post.accent}`}>
                      {post.author.charAt(0)}
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
