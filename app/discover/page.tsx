import Link from "next/link";

const discoveries = [
  { title: "City lights at dusk", type: "Moodboard", gradient: "from-blue-600 to-indigo-900" },
  { title: "Quiet jazz sessions", type: "Playlist", gradient: "from-amber-600 to-orange-900" },
  { title: "Stories about wandering", type: "Books", gradient: "from-emerald-600 to-teal-900" },
  { title: "Late-night reflections", type: "Thoughts", gradient: "from-purple-600 to-indigo-900" },
];

export default function DiscoverPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <section className="flex flex-col gap-8 min-w-0">

          {/* ═══ HERO BANNER ═══ */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-end" style={{ background: "linear-gradient(135deg, rgba(20,15,25,0.95) 30%, rgba(40,25,50,0.85))" }}>
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="relative z-10 p-8 sm:p-10 w-full">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3" style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)" }}>EXPLORE</span>
              <h1 className="text-3xl sm:text-4xl font-bold m-0 mb-2 text-white leading-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                Discover
              </h1>
              <p className="text-sm m-0 mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>Find something new. Collections curated just for you.</p>
            </div>
          </div>
          <div className="flex justify-between items-end border-b border-gray-200 pb-4" style={{ borderColor: "var(--line)" }}>
            <h2 className="text-2xl font-bold m-0" style={{ color: "var(--soft-text)" }}>Fresh finds</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {discoveries.map((item) => (
              <div key={item.title} className={`relative overflow-hidden rounded-2xl p-6 h-48 flex flex-col justify-end bg-gradient-to-br ${item.gradient} cursor-pointer hover:scale-[1.02] transition-transform shadow-lg group`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="relative z-10">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1 text-white/80">{item.type}</div>
                  <h3 className="text-xl font-bold text-white m-0">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="hidden lg:flex flex-col gap-5 sticky top-24 self-start">
          <div className="rounded-2xl p-6 shadow-sm border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: "var(--primary)" }}>
              Read next
            </h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-4 text-sm" style={{ color: "var(--soft-text)" }}>
              <li className="cursor-pointer hover:text-primary transition-colors flex flex-col gap-1">
                <span className="font-semibold text-base">Behind the melody of the day</span>
                <span className="text-xs opacity-60">Music • 5 min read</span>
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors flex flex-col gap-1">
                <span className="font-semibold text-base">Travel journals from quiet corners</span>
                <span className="text-xs opacity-60">Travel • 8 min read</span>
              </li>
              <li className="cursor-pointer hover:text-primary transition-colors flex flex-col gap-1">
                <span className="font-semibold text-base">Best books to carry on the road</span>
                <span className="text-xs opacity-60">Books • 3 min read</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
