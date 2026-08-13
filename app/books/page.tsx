import Link from "next/link";

const books = [
  { title: "The Silent Patient", author: "Alex Michaelides", mood: "Thriller" },
  { title: "Ikigai", author: "Héctor García", mood: "Mindful" },
  { title: "Atomic Habits", author: "James Clear", mood: "Growth" },
  { title: "The Alchemist", author: "Paulo Coelho", mood: "Inspiring" },
  { title: "The Psychology of Money", author: "Morgan Housel", mood: "Finance" },
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
    <div className="page-shell">
      <header className="page-header">
        <h1>Cafe Shelf</h1>
        <nav className="page-nav" aria-label="Book navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="page-grid">
        <section className="content-card">
          <h2>Recommended reads</h2>
          <div className="book-list">
            {books.map((book) => (
              <div key={book.title} className="book-item">
                <div>
                  <strong>{book.title}</strong>
                  <div className="book-meta-line">{book.author}</div>
                </div>
                <span className="book-badge">{book.mood}</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-card">
          <h2>Reading notes</h2>
          <ul>
            <li>Quiet evenings are best with a slow read and warm tea.</li>
            <li>Keep a few titles in rotation for mood-based reading.</li>
            <li>Bookmark your next discovery from the music and thoughts feed.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
