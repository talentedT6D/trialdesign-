import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!name || !email || !contact) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    navigate("/submission", {
      state: { name, email, contact, howHeard },
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "20px 24px",
    background: "rgba(0,0,0,0.65)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "1.1rem",
    fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
    textAlign: "center",
    letterSpacing: "0.05em",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #8b0000 0%, #4a0000 30%, #1a0000 70%, #0a0000 100%)",
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
            background: "linear-gradient(180deg, #3d0a0a 0%, #381010 40%, #2e0e0e 70%, #2a0c0c 100%)",
            borderRadius: "24px",
            padding: "30px 32px 40px",
            width: "100%",
            maxWidth: "480px",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Noise overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "24px",
              opacity: 0.15,
              pointerEvents: "none",
              zIndex: 1,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
            }}
          />
          {/* Back button */}
          <button
            onClick={() => window.history.back()}
            className="bg-transparent border-none cursor-pointer p-0"
            style={{ position: "absolute", top: "20px", left: "20px", zIndex: 2 }}
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
            className="text-center"
            style={{
              fontFamily: "'obviously-condensed', 'Bebas Neue', sans-serif",
              fontSize: "clamp(3rem, 10vw, 5rem)",
              color: "#FFFFFF",
              fontWeight: 700,
              fontStyle: "normal",
              letterSpacing: "0em",
              lineHeight: "0.95",
              margin: "10px 0 30px 0",
              textShadow: "0 0 8px #FAFF00, 0 0 20px rgba(250,255,0,0.3)",
              position: "relative",
              zIndex: 2,
            }}
          >
            SUBMISSION FORM
          </h2>

          {error && (
            <div
              className="mb-4 px-4 py-2 bg-black/40 text-red-300 text-center text-sm"
              style={{ borderRadius: "10px" }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative", zIndex: 2 }}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="Contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="How Did You Get To Know About Us?"
              value={howHeard}
              onChange={(e) => setHowHeard(e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>

        {/* NEXT button */}
        <button
          onClick={handleNext}
          className="cursor-pointer border-none"
          style={{
            marginTop: "28px",
            padding: "18px 100px",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)",
            color: "#1a0800",
            fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
            fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.1em",
            boxShadow: "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)",
            border: "none",
          }}
        >
          NEXT
        </button>
      </div>

      {/* Social icons — bottom right */}
      <div
        className="absolute flex items-center gap-4"
        style={{ bottom: "30px", right: "30px", zIndex: 30 }}
      >
        <button
          className="bg-transparent border-none cursor-pointer p-0"
          aria-label="Instagram"
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffd700"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#ffd700" stroke="none" />
          </svg>
        </button>
        <button
          className="bg-transparent border-none cursor-pointer p-0"
          aria-label="X"
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffd700">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
      </div>

      {/* Placeholder styles */}
      <style>{`
        input::placeholder {
          color: #FFFFFF;
          text-shadow: 0 0 12.8px #FF0504;
        }
`}</style>
    </div>
  );
};

export default LandingPage;
