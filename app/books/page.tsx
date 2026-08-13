import Link from "next/link";

const books = [
  { title: "The Silent Patient", author: "Alex Michaelides", mood: "Thriller" },
  { title: "Ikigai", author: "Héctor García", mood: "Mindful" },
  { title: "Atomic Habits", author: "James Clear", mood: "Growth" },
  { title: "The Alchemist", author: "Paulo Coelho", mood: "Inspiring" },
  { title: "The Psychology of Money", author: "Morgan Housel", mood: "Finance" },
  {
    title: "Musafir Cafe",
    author: "Musafir Cafe Collection",
    mood: "Featured",
    href: "/Musafir cafe.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
    action: "Open PDF",
  },
  {
    title: "October Junction",
    author: "Musafir Cafe Library",
    mood: "New",
    href: "/October Junction.pdf",
    target: "_blank",
    rel: "noopener noreferrer",
    action: "Read now",
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
              <a
                key={book.title}
                href={book.href || "#"}
                target={book.target}
                rel={book.rel}
                className="book-item book-item-link"
                style={{ textDecoration: "none" }}
              >
                <div className="book-copy">
                  <strong>{book.title}</strong>
                  <div className="book-meta-line">{book.author}</div>
                </div>
                <div className="book-actions">
                  <span className="book-badge">{book.mood}</span>
                  {book.href ? <span className="book-open">{book.action || "Open"}</span> : null}
                </div>
              </a>
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
