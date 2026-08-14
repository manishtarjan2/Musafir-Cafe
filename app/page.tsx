import Link from "next/link";

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

export default function Home() {
  return (
    <>
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
    </>
  );
}
