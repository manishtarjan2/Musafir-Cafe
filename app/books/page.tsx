"use client";

import Link from "next/link";
import { useState, useRef } from "react";

/* ── Book Data ── */
const books = [
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Inspiring", progress: 43, color: "from-yellow-200 to-yellow-500", textColor: "text-slate-900", href: "/The Alchemist.pdf", action: "Read now", pairing: "Lo-Fi Beats & Hot Chai", vibe: "Perfect for a sunny morning" },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", progress: 28, color: "from-slate-700 to-slate-900", textColor: "text-white", pairing: "Dark Ambient & Black Coffee", vibe: "Late night edge-of-seat read" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self Help", progress: 67, color: "from-amber-400 to-orange-500", textColor: "text-white", pairing: "Upbeat Jazz & Matcha", vibe: "A quick 15-min daily read" },
  { title: "Ikigai", author: "Héctor García", genre: "Mindful", progress: 15, color: "from-rose-100 to-teal-100", textColor: "text-slate-800", pairing: "Nature Sounds & Green Tea", vibe: "Relaxing Sunday afternoon" },
  { title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", progress: 0, color: "from-green-600 to-emerald-800", textColor: "text-white", pairing: "Acoustic Guitar & Espresso", vibe: "Insightful commute reading" },
  { title: "Musafir Cafe", author: "Musafir Cafe Collection", genre: "Featured", progress: 0, color: "from-indigo-500 to-purple-700", textColor: "text-white", href: "/Musafir cafe.pdf", action: "Open PDF", pairing: "Indie Folk & Cappuccino", vibe: "Warm rainy day comfort" },
  { title: "October Junction", author: "Musafir Cafe Library", genre: "New", progress: 0, color: "from-red-500 to-rose-700", textColor: "text-white", href: "/October Junction.pdf", action: "Read now", pairing: "Soft Piano & Hot Chocolate", vibe: "Cozy winter evening" },
];

const popularBooks = [
  { title: "The Psychology of Money", author: "Morgan Housel", genre: "Finance", color: "from-green-600 to-emerald-800", textColor: "text-white", pairing: "Acoustic Guitar & Espresso", vibe: "Insightful commute reading" },
  { title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", color: "from-slate-700 to-slate-900", textColor: "text-white", pairing: "Dark Ambient & Black Coffee", vibe: "Late night edge-of-seat read" },
  { title: "Atomic Habits", author: "James Clear", genre: "Self Help", color: "from-amber-400 to-orange-500", textColor: "text-white", pairing: "Upbeat Jazz & Matcha", vibe: "A quick 15-min daily read" },
  { title: "The Alchemist", author: "Paulo Coelho", genre: "Inspiring", color: "from-yellow-200 to-yellow-500", textColor: "text-slate-900", pairing: "Lo-Fi Beats & Hot Chai", vibe: "Perfect for a sunny morning" },
  { title: "October Junction", author: "Musafir Cafe Library", genre: "New", color: "from-red-500 to-rose-700", textColor: "text-white", pairing: "Soft Piano & Hot Chocolate", vibe: "Cozy winter evening" },
];

const genres = [
  { name: "Fiction", icon: "📖", count: 24 },
  { name: "Self Help", icon: "💡", count: 18 },
  { name: "Romance", icon: "💕", count: 12 },
  { name: "Finance", icon: "📊", count: 9 },
  { name: "Poetry", icon: "🖊️", count: 15 },
  { name: "Biography", icon: "👤", count: 7 },
];

const topAuthors = [
  { name: "Paulo Coelho", books: 12 },
  { name: "James Clear", books: 9 },
  { name: "Morgan Housel", books: 11 },
  { name: "Héctor García", books: 5 },
];

/* ── Book Card Component ── */
function BookCard({ book, showProgress = false }: { book: typeof books[0]; showProgress?: boolean }) {
  const inner = (
    <div className="flex flex-col gap-2 group cursor-pointer shrink-0 w-[140px] sm:w-[160px]">
      {/* Cover */}
      <div className={`relative aspect-[2/3] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${book.color} transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-xl group-hover:-translate-y-1`}>
        {/* Spine */}
        <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-black/30 to-transparent z-10" />
        {/* Title on cover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 z-10 text-center">
          <h4 className={`text-sm sm:text-base font-bold leading-tight m-0 drop-shadow-sm text-balance line-clamp-3 ${book.textColor}`} style={{ fontFamily: "var(--font-display), serif" }}>
            {book.title}
          </h4>
        </div>
        {/* Progress badge */}
        {showProgress && book.progress > 0 && (
          <div className="absolute top-2 right-2 z-20 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)" }}>
            {book.progress}%
          </div>
        )}
        {/* Hover overlay for PDFs */}
        {book.href && (
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full shadow-lg">{book.action || "Open"}</span>
          </div>
        )}
      </div>
      {/* Meta */}
      <div className="px-0.5 mt-2 flex flex-col gap-1">
        <p className="m-0 text-sm font-semibold truncate" style={{ color: "var(--soft-text)" }}>{book.title}</p>
        <p className="m-0 text-xs truncate" style={{ color: "var(--muted)" }}>{book.author}</p>
        
        {book.pairing && (
          <div className="mt-1 flex items-start gap-1">
            <span className="text-[10px] leading-tight text-[#e8c284]">✨ Pairs with:</span>
            <span className="text-[10px] leading-tight text-white/70 truncate">{book.pairing}</span>
          </div>
        )}
        
        {book.vibe && (
          <div className="flex items-start gap-1">
            <span className="text-[10px] leading-tight text-[#e8c284]">⏱️ Vibe:</span>
            <span className="text-[10px] leading-tight text-white/50 truncate">{book.vibe}</span>
          </div>
        )}

        {book.genre && (
          <div className="mt-1">
            <span className="inline-block text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--button-strong)", color: "var(--primary)" }}>
              {book.genre}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (book.href) {
    return <a href={book.href} target="_blank" rel="noopener noreferrer" className="no-underline">{inner}</a>;
  }
  return inner;
}

/* ── Horizontal Scroll Row ── */
function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    ref.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
  };
  return (
    <div className="relative group/scroll">
      {/* Left arrow */}
      <button onClick={() => scroll(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border-none cursor-pointer opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg flex items-center justify-center" style={{ backgroundColor: "var(--panel-bg)", color: "var(--soft-text)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      {/* Scroll area */}
      <div ref={ref} className="flex gap-5 overflow-x-auto pb-2 scroll-smooth" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
      {/* Right arrow */}
      <button onClick={() => scroll(1)} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border-none cursor-pointer opacity-0 group-hover/scroll:opacity-100 transition-opacity shadow-lg flex items-center justify-center" style={{ backgroundColor: "var(--panel-bg)", color: "var(--soft-text)" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
      </button>
    </div>
  );
}

/* ── Main Page ── */
export default function BooksPage() {
  const [activeAmbiance, setActiveAmbiance] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-10">

      {/* ═══ MAIN CONTENT GRID ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        
        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-10 min-w-0">

          {/* ═══ HERO BANNER ═══ */}
          <div className="relative rounded-2xl overflow-hidden min-h-[200px] flex items-center" style={{ background: "linear-gradient(135deg, rgba(30,20,15,0.95) 40%, rgba(60,40,25,0.8))" }}>
            {/* Background image */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1200&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="relative z-10 p-8 sm:p-10 max-w-lg">
              <h1 className="text-3xl sm:text-4xl font-bold m-0 mb-3 text-white leading-tight" style={{ fontFamily: "var(--font-display), serif" }}>
                Books for every journey within.
              </h1>
              <p className="text-sm m-0 mb-6" style={{ color: "rgba(255,255,255,0.7)" }}>Read. Reflect. Share your thoughts.</p>
              <div className="flex gap-3 flex-wrap">
                <button className="px-6 py-2.5 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-all hover:scale-105" style={{ backgroundColor: "transparent", borderColor: "var(--primary)", color: "var(--primary)" }}>
                  Explore Books
                </button>
                <button className="px-6 py-2.5 rounded-xl text-sm font-semibold border-2 cursor-pointer transition-all hover:scale-105" style={{ backgroundColor: "transparent", borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.8)" }}>
                  My Reading List
                </button>
              </div>
            </div>
          </div>

          {/* ── Reading Ambiance ── */}
          <section className="bg-black/20 p-5 rounded-2xl border border-white/5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h2 className="m-0 text-lg font-bold" style={{ color: "var(--soft-text)" }}>Reading Ambiance</h2>
                <p className="text-xs text-white/50 m-0 mt-1">Set the mood for your reading session.</p>
              </div>
              <div className="flex gap-2">
                {[
                  { id: 'rain', icon: '🌧️', label: 'Rain' },
                  { id: 'fire', icon: '🔥', label: 'Fireplace' },
                  { id: 'cafe', icon: '☕', label: 'Cafe' }
                ].map((ambiance) => (
                  <button
                    key={ambiance.id}
                    onClick={() => setActiveAmbiance(activeAmbiance === ambiance.id ? null : ambiance.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all border ${activeAmbiance === ambiance.id ? 'bg-[#e8c284]/20 border-[#e8c284]/50 text-[#e8c284]' : 'bg-white/5 border-transparent text-white/60 hover:bg-white/10 hover:text-white'}`}
                  >
                    <span className="text-base">{ambiance.icon}</span>
                    <span className="text-sm font-semibold">{ambiance.label}</span>
                    {activeAmbiance === ambiance.id && (
                      <span className="flex gap-[2px] ml-1 h-3 items-end opacity-70">
                        <span className="w-1 bg-[#e8c284] rounded-full animate-bounce" style={{ height: '60%', animationDuration: '0.8s' }} />
                        <span className="w-1 bg-[#e8c284] rounded-full animate-bounce" style={{ height: '100%', animationDuration: '1s' }} />
                        <span className="w-1 bg-[#e8c284] rounded-full animate-bounce" style={{ height: '80%', animationDuration: '0.6s' }} />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ── Pick up where you left off ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="m-0 text-xl font-bold" style={{ color: "var(--soft-text)" }}>Pick up where you left off</h2>
              <button className="text-xs font-semibold border-none bg-transparent cursor-pointer flex items-center gap-1" style={{ color: "var(--primary)" }}>
                View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <ScrollRow>
              {books.filter(b => b.progress > 0).map(book => (
                <BookCard key={book.title} book={book} showProgress />
              ))}
              {/* Add remaining books as suggestions */}
              {books.filter(b => b.progress === 0).map(book => (
                <BookCard key={book.title} book={book} />
              ))}
            </ScrollRow>
          </section>

          {/* ── Popular on Musafir Cafe ── */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="m-0 text-xl font-bold" style={{ color: "var(--soft-text)" }}>Popular on Musafir Cafe</h2>
              <button className="text-xs font-semibold border-none bg-transparent cursor-pointer flex items-center gap-1" style={{ color: "var(--primary)" }}>
                View all <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
              </button>
            </div>
            <ScrollRow>
              {popularBooks.map(book => (
                <BookCard key={book.title + "-pop"} book={{ ...book, progress: 0 }} />
              ))}
            </ScrollRow>
          </section>

          {/* ── Browse by Genre ── */}
          <section>
            <h2 className="m-0 text-xl font-bold mb-5" style={{ color: "var(--soft-text)" }}>Browse by Genre</h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {genres.map(g => (
                <div key={g.name} className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all hover:scale-105 border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
                  <span className="text-2xl">{g.icon}</span>
                  <span className="text-xs font-semibold" style={{ color: "var(--soft-text)" }}>{g.name}</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>{g.count} books</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto">

          {/* ── Book of the Day ── */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <h3 className="m-0 mb-4 text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: "var(--primary)" }}>
              📖 Book of the Day
            </h3>
            <div className="flex gap-4 mb-4">
              {/* Mini book cover */}
              <div className="w-20 aspect-[2/3] rounded-lg shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center shadow-md">
                <span className="text-white text-xs font-bold text-center px-1" style={{ fontFamily: "var(--font-display), serif" }}>Musafir Cafe</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="m-0 text-base font-bold" style={{ color: "var(--soft-text)" }}>Musafir Cafe</h4>
                <p className="m-0 text-xs mt-1" style={{ color: "var(--muted)" }}>Musafir Cafe Collection</p>
                <p className="m-0 text-xs mt-2 leading-relaxed line-clamp-3" style={{ color: "var(--muted)" }}>
                  &ldquo;A curated collection of stories, poems, and reflections from the soul of the cafe.&rdquo;
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <a href="/Musafir cafe.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg text-xs font-semibold text-center no-underline border cursor-pointer transition-all hover:scale-[1.02]" style={{ backgroundColor: "var(--primary)", color: "var(--page-bg)", borderColor: "var(--primary)" }}>
                View Details
              </a>
              <button className="p-2 rounded-lg border cursor-pointer" style={{ backgroundColor: "transparent", borderColor: "var(--line)", color: "var(--muted)" }}>
                🔖
              </button>
            </div>
          </div>

          {/* ── Top Authors ── */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="m-0 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>Top Authors</h3>
              <button className="text-[10px] font-semibold border-none bg-transparent cursor-pointer" style={{ color: "var(--primary)" }}>View all</button>
            </div>
            <div className="flex flex-col gap-3">
              {topAuthors.map(a => (
                <div key={a.name} className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all" style={{ backgroundColor: "transparent" }}>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0" style={{ background: "linear-gradient(135deg, var(--primary), var(--soft-gold))", color: "var(--page-bg)" }}>
                    {a.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="m-0 text-sm font-semibold truncate" style={{ color: "var(--soft-text)" }}>{a.name}</p>
                    <p className="m-0 text-[10px]" style={{ color: "var(--muted)" }}>{a.books} books</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── From the Cafe (Thoughts) ── */}
          <div className="rounded-2xl p-5 border" style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--line)" }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="m-0 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--primary)" }}>From the Cafe</h3>
              <button className="text-[10px] font-semibold border-none bg-transparent cursor-pointer" style={{ color: "var(--primary)" }}>View all</button>
            </div>
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, var(--primary), var(--soft-gold))", color: "var(--page-bg)" }}>A</div>
              <div>
                <p className="m-0 text-xs font-semibold" style={{ color: "var(--soft-text)" }}>Ananya</p>
                <p className="m-0 text-[10px]" style={{ color: "var(--muted)" }}>2h ago</p>
              </div>
            </div>
            <p className="m-0 text-sm leading-relaxed italic" style={{ color: "var(--soft-text)" }}>
              &ldquo;Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.&rdquo;
            </p>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--muted)" }}>❤️ 128</span>
              <span className="text-xs flex items-center gap-1" style={{ color: "var(--muted)" }}>💬 24</span>
            </div>
            <Link href="/thoughts" className="flex items-center justify-center gap-2 mt-4 py-2.5 rounded-xl text-xs font-semibold no-underline border cursor-pointer transition-all hover:scale-[1.02]" style={{ backgroundColor: "transparent", borderColor: "var(--line)", color: "var(--soft-text)" }}>
              + Write a thought
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
