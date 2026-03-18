import React from "react";
import { Link } from "react-router-dom";

const TICKER_TEXT = "INDIA'S FIRST VERTICAL FILM FESTIVAL\u00A0\u00A0\u00A0\u00A0";
const REPEATED = Array(20).fill(TICKER_TEXT).join("");
const EDGE_FONT_SIZE = "63.6px";
const EDGE_COLOR = "rgba(250, 255, 0, 0.5)";
const EDGE_THICKNESS = "70px";

const edgeTextStyle = {
  fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
  fontSize: EDGE_FONT_SIZE,
  fontWeight: 300,
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
          backgroundImage: "url('/images/hero-bg.jpg')",
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
            "radial-gradient(ellipse at 60% 50%, rgba(204,34,0,0.85) 0%, rgba(139,0,0,0.9) 35%, rgba(61,0,0,0.95) 65%, rgba(26,0,0,1) 100%)",
        }}
      />
      {/* Extra glow highlights */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 70%, rgba(255,120,0,0.4) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 30% 30%, rgba(200,0,0,0.3) 0%, transparent 50%)",
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
        {/* INDIAN title */}
        <h1
          style={{
            fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "#ffd700",
            letterSpacing: "0.15em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          INDIAN
        </h1>

        {/* SCROLL logo box with year */}
        <div className="flex items-center gap-4 my-2">
          <span
            style={{
              fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "#ffd700",
              letterSpacing: "0.1em",
            }}
          >
            20
          </span>

          <div
            className="flex items-center justify-center"
            style={{
              backgroundColor: "#ffd700",
              padding: "16px 24px",
              width: "clamp(80px, 12vw, 140px)",
              height: "clamp(140px, 22vw, 240px)",
            }}
          >
            <span
              style={{
                fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                fontWeight: 700,
                color: "#000000",
                writingMode: "vertical-lr",
                textOrientation: "mixed",
                letterSpacing: "0.05em",
                lineHeight: 1,
              }}
            >
              SCROLL
            </span>
          </div>

          <span
            style={{
              fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              color: "#ffd700",
              letterSpacing: "0.1em",
            }}
          >
            26
          </span>
        </div>

        {/* Decorative zigzag / wave pattern */}
        <div className="flex justify-center my-1">
          <svg width="180" height="40" viewBox="0 0 180 40" fill="none">
            <path d="M10 8 L20 2 L30 8 L40 2 L50 8 L60 2 L70 8 L80 2 L90 8 L100 2 L110 8 L120 2 L130 8 L140 2 L150 8 L160 2 L170 8" stroke="#ffd700" strokeWidth="2" fill="none" />
            <path d="M10 16 L20 10 L30 16 L40 10 L50 16 L60 10 L70 16 L80 10 L90 16 L100 10 L110 16 L120 10 L130 16 L140 10 L150 16 L160 10 L170 16" stroke="#ffd700" strokeWidth="2" fill="none" />
            <path d="M10 28 Q20 20 30 28 Q40 20 50 28 Q60 20 70 28 Q80 20 90 28 Q100 20 110 28 Q120 20 130 28 Q140 20 150 28 Q160 20 170 28" stroke="#ffd700" strokeWidth="2" fill="none" />
            <path d="M10 36 Q20 28 30 36 Q40 28 50 36 Q60 28 70 36 Q80 28 90 36 Q100 28 110 36 Q120 28 130 36 Q140 28 150 36 Q160 28 170 36" stroke="#ffd700" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* FESTIVAL title */}
        <h1
          style={{
            fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
            fontSize: "clamp(3rem, 8vw, 6rem)",
            color: "#ffd700",
            letterSpacing: "0.15em",
            margin: 0,
            lineHeight: 1,
          }}
        >
          FESTIVAL
        </h1>

        {/* CTA Button */}
        <Link to="/submission" className="mt-10">
          <button
            className="px-12 py-4 rounded-full text-xl font-bold tracking-widest cursor-pointer border-none"
            style={{
              fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
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
        <div className="flex items-center gap-5 mt-8">
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
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/Obviously-Narrow.woff2') format('woff2'),
               url('/fonts/Obviously-Narrow.woff') format('woff');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/Obviously-Regular.woff2') format('woff2'),
               url('/fonts/Obviously-Regular.woff') format('woff');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/Obviously-Bold.woff2') format('woff2'),
               url('/fonts/Obviously-Bold.woff') format('woff');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
