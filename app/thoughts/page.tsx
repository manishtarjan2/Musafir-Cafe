import Link from "next/link";

const thoughts = [
  {
    author: "Ananya",
    time: "2 hours ago",
    text: "There are days when a book understands you more than people do. What is the one book you always return to?",
  },
  {
    author: "Kabir",
    time: "5 hours ago",
    text: "The best playlists are the ones that feel like a long train ride at sunset.",
  },
  {
    author: "Sana",
    time: "Yesterday",
    text: "A perfect café is half coffee, half conversation, and half silence.",
  },
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
    <div className="page-shell">
      <header className="page-header">
        <h1>Cafe Thoughts</h1>
        <nav className="page-nav" aria-label="Thought navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <div className="page-grid">
        <section className="content-card">
          <h2>Community feed</h2>
          <div className="content-list">
            {thoughts.map((post) => (
              <div key={`${post.author}-${post.time}`} className="content-item">
                <div>
                  <strong>{post.author}</strong>
                  <div className="content-meta">{post.time}</div>
                  <p>{post.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="side-card">
          <h2>Trending topics</h2>
          <ul>
            <li>Slow living mornings</li>
            <li>Rainy-day playlists</li>
            <li>Books that stay with you</li>
            <li>Travel stories in ten words</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
