import React, { useEffect, useState, useRef } from "react";
import NewsCard from "./components/NewsCard";
import "./App.css";
import heroImage from "./assets/hero.jpg"; // import your local image

function App() {
  const [clusters, setClusters] = useState([]);
  const [search, setSearch] = useState("");

  const heroPhrases = [
  <>The World, <span className="hero-emphasis">Curated.</span></>,
  <>Designed With <span className="hero-emphasis">Purpose.</span></>,
  <>Beyond the <span className="hero-emphasis">Moment.</span></>,
  <>A World in <span className="hero-emphasis">Context.</span></>,
  <>Stories That <span className="hero-emphasis">Matter.</span></>,
  <>Elegance in <span className="hero-emphasis">Reporting.</span></>,
  <>Insights <span className="hero-emphasis">Redefined.</span></>,
  <>Premium <span className="hero-emphasis">Narratives.</span></>,
  <>Voices of <span className="hero-emphasis">Influence.</span></>,
  <>Where Knowledge Meets <span className="hero-emphasis">Style.</span></>
];


  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const phraseTimeout = useRef(null);

  // Rotate hero text every 8 seconds with smooth fade
  useEffect(() => {
    phraseTimeout.current = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentPhraseIndex((prev) => (prev + 1) % heroPhrases.length);
        setFade(true);
      }, 1500);
    }, 8000);

    return () => clearInterval(phraseTimeout.current);
  }, []);

  // Fetch news
  useEffect(() => {
    fetch("https://ai-based-aggregator-backend.onrender.com/news")
      .then((res) => res.json())
      .then((data) => setClusters(data))
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  const filteredArticles = clusters.flatMap((cluster) =>
    cluster.articles.filter((article) =>
      article.title.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="app light">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <h1 className="logo">THE WORLD BRIEF</h1>
          <div className="nav-actions">
            <input
              type="text"
              className="search-input"
              placeholder="Search stories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </nav>

      {/* HERO / INTRO */}
      <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="hero-overlay"></div>
        <h2 className={`hero-title ${fade ? "fade-in" : "fade-out"}`}>
          {heroPhrases[currentPhraseIndex]}
        </h2>
        <p className="hero-subtitle">
          Timeless journalism. Global perspectives. Thoughtfully organized.
        </p>
      </section>

      {/* NEWS FEED WITH BACKGROUND */}
      <div className="news-background">
        <main className="news-container">
          {clusters.length === 0 && (
            <p className="loading-text">Loading latest stories…</p>
          )}

          {filteredArticles.map((article, index) => (
            <NewsCard key={index} article={article} index={index} />
          ))}
        </main>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} The World Brief Co.</p>
      </footer>
    </div>
  );
}

export default App;
