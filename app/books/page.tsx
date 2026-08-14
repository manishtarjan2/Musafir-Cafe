import Link from "next/link";

const books = [
  { title: "The Silent Patient", author: "Alex Michaelides", mood: "Thriller", color: "from-slate-700 to-slate-900", textColor: "text-white" },
  { title: "Ikigai", author: "Héctor García", mood: "Mindful", color: "from-rose-100 to-teal-100", textColor: "text-slate-800" },
  { title: "Atomic Habits", author: "James Clear", mood: "Growth", color: "from-amber-400 to-orange-500", textColor: "text-white" },
  { title: "The Alchemist", author: "Paulo Coelho", mood: "Inspiring", color: "from-yellow-200 to-yellow-500", textColor: "text-slate-900" },
  { title: "The Psychology of Money", author: "Morgan Housel", mood: "Finance", color: "from-green-600 to-emerald-800", textColor: "text-white" },
  {
    title: "Musafir Cafe",
    author: "Musafir Cafe Collection",
    mood: "Featured",
    href: "/Musafir cafe.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
    action: "Open PDF",
    color: "from-indigo-500 to-purple-700",
    textColor: "text-white"
  },
  {
    title: "October Junction",
    author: "Musafir Cafe Library",
    mood: "New",
    href: "/October Junction.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
    action: "Read now",
    color: "from-red-500 to-rose-700",
    textColor: "text-white"
  },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function BooksPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 font-sans">
      <header className="flex justify-between items-center p-8 bg-white shadow-sm border-b border-gray-100 sticky top-0 z-10 max-md:flex-col max-md:gap-4 max-md:p-4">
        <h1 className="text-2xl font-bold m-0 text-slate-900 flex items-center gap-2">📚 Cafe Shelf</h1>
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
            <h2 className="text-3xl font-bold m-0">Recommended Reads</h2>
          </div>
          
          {/* Books Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8" style={{ perspective: "1000px" }}>
            {books.map((book) => {
              const bookContent = (
                <div className={`relative w-full aspect-[2/3] rounded-r-xl rounded-l-md shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-rotate-1 hover:translate-y-[-5px] group bg-gradient-to-br ${book.color} flex flex-col p-6 border-l-8 border-black/20`}>
                  
                  {/* Book Binding effect */}
                  <div className="absolute top-0 left-0 bottom-0 w-2 bg-gradient-to-r from-black/20 to-transparent"></div>
                  
                  <div className="flex-1 flex flex-col justify-between relative z-10">
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[0.7rem] font-bold uppercase tracking-wider text-inherit mb-4 border border-white/10 shadow-sm">
                        {book.mood}
                      </span>
                    </div>
                    
                    <div className="mt-auto">
                      <h3 className={`text-2xl font-bold leading-tight mb-2 ${book.textColor}`}>{book.title}</h3>
                      <p className={`text-sm opacity-90 font-medium m-0 ${book.textColor}`}>{book.author}</p>
                    </div>
                  </div>

                  {book.href && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-r-xl rounded-l-md flex items-center justify-center z-20">
                      <span className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                        {book.action || "Open"}
                      </span>
                    </div>
                  )}
                </div>
              );

              if (book.href) {
                return (
                  <a
                    key={book.title}
                    href={book.href}
                    target={book.target}
                    rel={book.rel}
                    className="block no-underline"
                  >
                    {bookContent}
                  </a>
                );
              }

              return (
                <div key={book.title} className="block cursor-default">
                  {bookContent}
                </div>
              );
            })}
          </div>
        </section>

        <aside className="lg:col-span-1">
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 sticky top-28 shadow-sm">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-amber-900">
              <span>☕</span> Reading notes
            </h3>
            <ul className="m-0 p-0 list-none flex flex-col gap-4 text-amber-800 text-sm leading-relaxed">
              <li className="flex gap-3 items-start">
                <span className="text-amber-500 mt-0.5">•</span>
                Quiet evenings are best with a slow read and warm tea.
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-amber-500 mt-0.5">•</span>
                Keep a few titles in rotation for mood-based reading.
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-amber-500 mt-0.5">•</span>
                Bookmark your next discovery from the music and thoughts feed.
              </li>
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
