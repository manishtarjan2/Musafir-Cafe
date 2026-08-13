"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const musicCards = [
  { title: "After Rain", artist: "Arijit Singh", cover: "rain" },
  { title: "Peaceful", artist: "Lo-Fi Playlist", cover: "portrait" },
  { title: "Save Your Tears", artist: "The Weeknd", cover: "sea" },
  { title: "Chill Vibes", artist: "Playlist", cover: "sky" },
];

const bookCards = [
  { title: "The Silent Patient", author: "Alex Michaelides", cover: "cover-one" },
  { title: "Ikigai", author: "Héctor García", cover: "cover-two" },
  { title: "Atomic Habits", author: "James Clear", cover: "cover-three" },
  { title: "The 5 AM Club", author: "Robin Sharma", cover: "cover-four" },
  { title: "The Psychology of Money", author: "Morgan Housel", cover: "cover-five" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "Music", href: "/music" },
  { label: "Books", href: "/books" },
  { label: "Cafe Thoughts", href: "/thoughts" },
  { label: "Discover", href: "/discover" },
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shellRef = useRef<HTMLDivElement | null>(null);

  const closeMenu = () => setMobileMenuOpen(false);
  const toggleMenu = () => setMobileMenuOpen((open) => !open);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    function handleDocumentClick(event: MouseEvent) {
      if (!shellRef.current) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      const sidebar = shellRef.current.querySelector(".sidebar");
      const toggle = shellRef.current.querySelector(".mobile-menu-toggle");

      const clickedSidebar = sidebar?.contains(target);
      const clickedToggle = toggle?.contains(target);

      if (!clickedSidebar && !clickedToggle) {
        closeMenu();
      }
    }

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [mobileMenuOpen]);

  return (
    <div ref={shellRef} className="musafir-shell">
      <aside className={mobileMenuOpen ? "sidebar is-open" : "sidebar"}>
        <div className="brand-block">
          <div className="brand-mark" aria-label="Musafir Cafe logo">
            <svg viewBox="0 0 120 120" role="img" aria-hidden="true">
              <circle cx="60" cy="60" r="52" className="ring" />
              <path d="M28 72c0-18 14-32 32-32s32 14 32 32v4H28v-4Z" className="cup" />
              <path d="M36 74h48c0 13-10 23-24 23S36 87 36 74Z" className="steam" />
              <path d="M60 26c9 11 13 22 13 34 0 11-4 19-13 26-9-7-13-15-13-26 0-12 4-23 13-34Z" className="sun" />
              <path d="M29 39c6 8 11 15 16 19M91 39c-6 8-11 15-16 19M60 20v12M60 92v12" className="lines" />
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-name">Musafir</span>
            <span className="brand-sub">CAFE</span>
          </div>
        </div>

        <nav className="side-nav" aria-label="Sidebar navigation">
          {navItems.map((item, index) => (
            <Link
              key={item.label}
              href={item.href}
              className={index === 0 ? "nav-item active" : "nav-item"}
              onClick={closeMenu}
            >
              <span className="nav-icon">
                {index === 0 ? "⌂" : index === 1 ? "♫" : index === 2 ? "📖" : index === 3 ? "✎" : "◌"}
              </span>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mini-track">
          <div className="mini-cover" />
          <div className="mini-track-text">
            <strong>The Night We Met</strong>
            <span>Lord Huron</span>
          </div>
          <div className="mini-track-time">
            <small>1:24</small>
            <small>3:28</small>
          </div>
        </div>

        <div className="player-row">
          <button aria-label="Shuffle">⤮</button>
          <button aria-label="Previous">⏮</button>
          <button className="play-button" aria-label="Play">▶</button>
          <button aria-label="Next">⏭</button>
          <button aria-label="Repeat">↻</button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            onClick={toggleMenu}
          >
            <span />
            <span />
            <span />
          </button>

          <div className="search-box" role="search">
            <span className="search-placeholder">Search songs, books, authors, artists, thoughts...</span>
            <span className="search-icon">⌕</span>
          </div>

          <div className="user-meta">
            <button className="bell" aria-label="Notifications">◔</button>
            <div className="user-pill">
              <div className="user-avatar">M</div>
              <span>Manish</span>
            </div>
          </div>
        </header>

        <section id="home" className="hero-panel">
          <div className="hero-copy">
            <h1>
              Good Evening, Manish <span>☕</span>
            </h1>
            <p>“Some journeys are meant to be felt, not explained.”</p>

            <div className="chip-group">
              <Link href="/music" className="chip active">For You</Link>
              <Link href="/music" className="chip">Music</Link>
              <Link href="/books" className="chip">Books</Link>
              <Link href="/thoughts" className="chip">Thoughts</Link>
            </div>
          </div>

          <div className="hero-scene" aria-label="Atmospheric cafe view" />
        </section>

        <section id="music" className="content-panel">
          <div className="section-head">
            <h2>Continue Listening <span>›</span></h2>
            <Link href="/music" className="section-link">Open library</Link>
          </div>

          <div className="music-grid">
            {musicCards.map((card) => (
              <article key={card.title} className="music-card">
                <div className={`cover cover-${card.cover}`}>
                  <button className="play-mini" aria-label={`Play ${card.title}`}>
                    ▶
                  </button>
                </div>
                <div className="music-card-meta">
                  <div className="track-name-row">
                    <strong>{card.title}</strong>
                    <span className="tiny-heart">♡</span>
                  </div>
                  <div className="track-sub-row">
                    <span>{card.artist}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="books" className="content-panel">
          <div className="section-head">
            <h2>For You — Books <span>›</span></h2>
            <Link href="/books" className="section-link">Browse shelf</Link>
          </div>

          <div className="book-grid">
            {bookCards.map((book) => (
              <article key={book.title} className="book-card">
                <div className={`book-cover ${book.cover}`} />
                <div className="book-title">{book.title}</div>
                <div className="book-author">{book.author}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="thoughts" className="community-panel">
          <div className="feed-header">
            <div className="feed-tabs">
              <button className="feed-tab active">All</button>
              <button className="feed-tab">Following</button>
              <button className="feed-tab">For You</button>
            </div>
            <Link href="/thoughts" className="write-btn">✎ View thoughts</Link>
          </div>

          <div className="thought-card">
            <div className="thought-author-row">
              <div className="thought-avatar">A</div>
              <div>
                <strong>Ananya</strong>
                <span>2 hours ago</span>
              </div>
            </div>

            <p>
              There are days when a book understands you more than people do. What&apos;s that one book you&apos;ll always go back to?
            </p>
          </div>
        </section>
      </main>

      <aside className="right-rail">
        <div className="rail-card rail-image-card">
          <div className="rail-title-row">
            <h3>Song of the Day</h3>
          </div>

          <div className="mini-rail-cover">
            <button className="rail-play" aria-label="Play song of the day">▶</button>
          </div>

          <div className="song-meta">
            <h4>A Sky Full of Stars</h4>
            <span>Coldplay</span>
          </div>

          <p>Look at the stars, look how they shine for you.</p>

          <div className="rail-actions">
            <button>♡</button>
            <button>◌</button>
            <button>＋</button>
          </div>
        </div>

        <div className="rail-card">
          <h3>Book of the Day</h3>
          <div className="book-day-row">
            <div className="book-day-cover" />
            <div className="book-day-copy">
              <h4>The Alchemist</h4>
              <span>Paulo Coelho</span>
            </div>
          </div>

          <p>“When you want something, all the universe conspires in helping you to achieve it.”</p>

          <div className="rail-actions">
            <button>◌</button>
            <button>♡</button>
            <button>＋</button>
          </div>
        </div>

        <div id="discover" className="rail-card">
          <h3>Trending Thoughts</h3>
          <p className="trend-quote">“Some songs are not just heard, they are lived.”</p>
          <span className="trend-author">— Unknown</span>

          <div className="trend-actions">
            <button>♡ 256</button>
            <button>↻ 32</button>
            <Link href="/discover">↗ Discover</Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
