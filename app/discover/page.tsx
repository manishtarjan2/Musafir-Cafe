import Link from "next/link";

const discoveries = [
  { title: "City lights at dusk", type: "Moodboard" },
  { title: "Quiet jazz sessions", type: "Playlist" },
  { title: "Stories about wandering", type: "Books" },
  { title: "Late-night reflections", type: "Thoughts" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function DiscoverPage() {
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Discover</h1>
        <nav className="page-nav" aria-label="Discover navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="page-grid">
        <section className="content-card">
          <h2>Fresh finds</h2>
          <div className="discover-list">
            {discoveries.map((item) => (
              <div key={item.title} className="content-item">
                <div>
                  <strong>{item.title}</strong>
                  <div className="content-meta">{item.type}</div>
                </div>
                <span className="book-badge">Explore</span>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-card">
          <h2>Read next</h2>
          <ul>
            <li>Behind the melody of the day</li>
            <li>Travel journals from quiet corners</li>
            <li>Best books to carry on the road</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
