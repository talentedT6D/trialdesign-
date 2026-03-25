import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const categoryIcons = {
  Comedy: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Happy mask */}
      <circle cx="22" cy="30" r="16" />
      <circle cx="17" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <circle cx="27" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <path d="M15 34 Q22 42 29 34" />
      {/* Sad mask */}
      <circle cx="42" cy="30" r="16" />
      <circle cx="37" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <circle cx="47" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <path d="M35 38 Q42 32 49 38" />
    </svg>
  ),
  Edits: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Scissors */}
      <circle cx="20" cy="48" r="6" />
      <circle cx="44" cy="48" r="6" />
      <line x1="24" y1="44" x2="40" y2="16" />
      <line x1="40" y1="44" x2="24" y2="16" />
    </svg>
  ),
  AI: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Image/landscape icon with sparkle */}
      <rect x="8" y="12" width="48" height="40" rx="4" />
      <circle cx="22" cy="28" r="5" />
      <path d="M8 44 L24 32 L36 40 L48 28 L56 36" />
      {/* Sparkle */}
      <path d="M46 14 L48 8 L50 14 L56 16 L50 18 L48 24 L46 18 L40 16 Z" fill="rgba(255,255,255,0.85)" stroke="none" />
    </svg>
  ),
  Food: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Plate/tray */}
      <rect x="10" y="30" width="44" height="6" rx="2" />
      <rect x="14" y="36" width="36" height="10" rx="2" />
      {/* Sushi/food items */}
      <ellipse cx="24" cy="26" rx="6" ry="5" />
      <ellipse cx="38" cy="26" rx="6" ry="5" />
      <line x1="24" y1="21" x2="24" y2="26" />
      <line x1="38" y1="21" x2="38" y2="26" />
    </svg>
  ),
  Emotional: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Two people hugging */}
      <circle cx="24" cy="16" r="7" />
      <circle cx="40" cy="16" r="7" />
      <path d="M12 52 L12 36 Q12 28 24 28 Q30 28 32 32" />
      <path d="M52 52 L52 36 Q52 28 40 28 Q34 28 32 32" />
      <path d="M20 36 Q32 44 44 36" />
    </svg>
  ),
};

const CategoryCard = ({ cat, category, setCategory }) => (
  <button
    onClick={() => setCategory(cat)}
    style={{
      flex: 1,
      padding: "18px 12px",
      background: category === cat ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.3)",
      border: category === cat ? "2px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.15)",
      borderRadius: "16px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    }}
  >
    <span
      style={{
        fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
        fontSize: "1.05rem",
        color: "#fff",
        letterSpacing: "0.04em",
      }}
    >
      {cat}
    </span>
    {categoryIcons[cat]}
  </button>
);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, contact, howHeard, submissionTitle } = location.state || {};
  const [category, setCategory] = useState("");

  const categories = ["Comedy", "Edits", "AI", "Food", "Emotional"];

  const handleSubmit = () => {
    if (!category) return;
    navigate("/confirmation", {
      state: { name, email, submissionTitle, category },
    });
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "url('/images/F02.2 (1) (1).png') center/cover no-repeat",
      }}
    >
      {/* Festival logo — top left */}
      <img
        src="/images/festival-logo.png"
        alt="Indian Scroll Festival 2026"
        style={{
          position: "absolute",
          top: "72px",
          left: "72px",
          width: "100px",
          height: "180px",
          objectFit: "contain",
          zIndex: 30,
        }}
      />

      {/* Main content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        {/* Dark maroon card */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "24px",
            padding: "30px 32px 40px",
            width: "535px",
            maxWidth: "90vw",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >

          {/* Back button + Title wrapper */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
              <button
                onClick={() => navigate("/submission", { state: { name, email, contact, howHeard, submissionTitle } })}
                className="bg-transparent border-none cursor-pointer p-0"
                style={{ position: "relative", zIndex: 2, alignSelf: "flex-start", marginBottom: "4px" }}
                aria-label="Go back"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#cc2200"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <polyline points="14 16 10 12 14 8" />
                </svg>
              </button>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'obviously-condensed', 'Bebas Neue', sans-serif",
                  fontSize: "100px",
                  color: "#FFFFFF",
                  fontWeight: 500,
                  fontStyle: "normal",
                  letterSpacing: "0em",
                  lineHeight: "0.95",
                  margin: "0 0 24px 0",
                  textShadow: "none",
                  position: "relative",
                  zIndex: 2,
                }}
              >
            SUBMISSION FORM
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              letterSpacing: "0.04em",
              margin: "0 0 24px 0",
              position: "relative",
              zIndex: 2,
            }}
          >
            Pick From A Category Below
          </p>

          {/* Category Cards Grid - Row 1: Comedy, Edits, AI */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              position: "relative",
              zIndex: 2,
              marginBottom: "16px",
            }}
          >
            {categories.slice(0, 3).map((cat) => (
              <CategoryCard key={cat} cat={cat} category={category} setCategory={setCategory} />
            ))}
          </div>

          {/* Category Cards Grid - Row 2: Food, Emotional (centered, matching row 1 card widths) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              position: "relative",
              zIndex: 2,
              width: "calc((100% - 32px) * 2 / 3 + 16px)",
              margin: "0 auto",
            }}
          >
            {categories.slice(3).map((cat) => (
              <CategoryCard key={cat} cat={cat} category={category} setCategory={setCategory} />
            ))}
          </div>
        </div>

        {/* PAY 499 AND SUBMIT button */}
        <button
          onClick={handleSubmit}
          className="cursor-pointer border-none"
          style={{
            marginTop: "28px",
            width: "535px",
            maxWidth: "90vw",
            height: "69px",
            padding: "0 40px",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            background: category
              ? "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)"
              : "rgba(200,180,160,0.4)",
            color: category ? "#000000" : "rgba(80,50,40,0.6)",
            fontSize: "clamp(20px, 2.8vw, 30px)",
            overflow: "hidden",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: "1",
            textAlign: "center",
            boxShadow: category
              ? "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)"
              : "none",
            border: "none",
          }}
        >
          <span style={{ marginTop: "-4px" }}>PAY 499 AND SUBMIT</span>
        </button>
      </div>

      {/* Social icons — bottom right */}
      <div
        className="absolute flex items-center gap-4"
        style={{ bottom: "30px", right: "30px", zIndex: 30 }}
      >
        <button className="bg-transparent border-none cursor-pointer p-0" aria-label="Instagram">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#ffd700" stroke="none" />
          </svg>
        </button>
        <button className="bg-transparent border-none cursor-pointer p-0" aria-label="X">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffd700">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
