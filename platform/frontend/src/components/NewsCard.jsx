import { useState } from "react";
import "./NewsCard.css";

const NewsCard = ({ article, index }) => {
  const [liked, setLiked] = useState(false);

  return (
    <article
      className="news-card fade-in"
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* Headline */}
      <h3 className="news-title">{article.title}</h3>

      {/* Source */}
      <p className="news-source">{article.source}</p>

      {/* Footer */}
      <div className="news-footer">
        <a
          href={article.url}
          target="_blank"
          rel="noreferrer"
          className="read-link"
        >
          Read full article →
        </a>

        <span
          className={`heart ${liked ? "liked" : ""}`}
          onClick={() => setLiked(!liked)}
        >
          ♥
        </span>
      </div>
    </article>
  );
};

export default NewsCard;
