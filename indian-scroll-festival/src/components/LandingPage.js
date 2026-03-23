import React from "react";
import { Link } from "react-router-dom";

const TICKER_TEXT = "INDIA'S FIRST VERTICAL FILM FESTIVAL\u00A0\u00A0\u00A0\u00A0";
const REPEATED = Array(20).fill(TICKER_TEXT).join("");
const EDGE_FONT_SIZE = "63.6px";
const EDGE_COLOR = "rgba(220, 50, 20, 0.6)";
const EDGE_THICKNESS = "70px";

const edgeTextStyle = {
  fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
  fontSize: EDGE_FONT_SIZE,
  fontWeight: 400,
  letterSpacing: "0.15em",
  color: EDGE_COLOR,
  lineHeight: EDGE_THICKNESS,
  whiteSpace: "nowrap",
};

const LandingPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "#1a0000" }}>
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 60% 50%, rgba(204,34,0,0.15) 0%, rgba(139,0,0,0.2) 35%, rgba(61,0,0,0.3) 65%, rgba(26,0,0,0.45) 100%)",
        }}
      />
      {/* Extra glow highlights */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 70%, rgba(255,120,0,0.1) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 30% 30%, rgba(200,0,0,0.08) 0%, transparent 50%)",
        }}
      />

      {/* === SCROLLING BORDER TEXT — ALL 4 EDGES === */}

      {/* TOP edge — scrolling, text upside down */}
      <div
        className="absolute top-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ height: EDGE_THICKNESS, zIndex: 20, transform: "rotate(180deg)" }}
      >
        <div style={{ ...edgeTextStyle, animation: "scrollLeft 40s linear infinite" }}>
          {REPEATED}
        </div>
      </div>

      {/* BOTTOM edge — scrolling left */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none"
        style={{ height: EDGE_THICKNESS, zIndex: 20 }}
      >
        <div style={{ ...edgeTextStyle, animation: "scrollLeft 35s linear infinite" }}>
          {REPEATED}
        </div>
      </div>

      {/* LEFT edge — scrolling upward */}
      <div
        className="absolute left-0 top-0 pointer-events-none"
        style={{
          width: "100vh",
          height: EDGE_THICKNESS,
          zIndex: 20,
          transformOrigin: "0 0",
          transform: "rotate(-90deg) translateX(-100vh)",
          overflow: "hidden",
        }}
      >
        <div style={{ ...edgeTextStyle, animation: "scrollLeft 45s linear infinite" }}>
          {REPEATED}
        </div>
      </div>

      {/* RIGHT edge — scrolling downward */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: EDGE_THICKNESS,
          height: "100vh",
          zIndex: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100vh",
            height: EDGE_THICKNESS,
            position: "absolute",
            top: 0,
            left: EDGE_THICKNESS,
            transformOrigin: "0 0",
            transform: "rotate(90deg)",
            overflow: "hidden",
          }}
        >
        <div style={{ ...edgeTextStyle, animation: "scrollLeft 45s linear infinite" }}>
          {REPEATED}
        </div>
        </div>
      </div>

      {/* Main centered content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Festival logo image */}
        <img
          src="/images/festival-logo.png"
          alt="Indian Scroll Festival 2026"
          style={{
            width: "240px",
            height: "440px",
            objectFit: "contain",
          }}
        />

        {/* CTA Button */}
        <Link to="/submission" className="mt-6">
          <button
            className="px-12 py-4 rounded-full text-xl font-bold tracking-widest cursor-pointer border-none"
            style={{
              fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              color: "#ffd700",
              background: "linear-gradient(180deg, #cc2200 0%, #ff4500 50%, #ff6a00 100%)",
              boxShadow: "0 0 30px rgba(255,69,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
              letterSpacing: "0.15em",
              border: "2px solid rgba(255,215,0,0.4)",
            }}
          >
            SIGN UP TO SUBMIT
          </button>
        </Link>

        {/* Social icons */}
        <div className="flex items-center gap-5 mt-5">
          <button className="text-yellow-400 hover:text-yellow-300 transition-colors bg-transparent border-none cursor-pointer p-0" aria-label="Instagram">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#ffd700" stroke="none" />
            </svg>
          </button>
          <button className="text-yellow-400 hover:text-yellow-300 transition-colors bg-transparent border-none cursor-pointer p-0" aria-label="X">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#ffd700">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Keyframe animations & fonts */}
      <style>{`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
