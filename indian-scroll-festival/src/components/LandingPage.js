import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-festival-dark">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0a0a0a 0%, #1a0000 30%, #8b0000 60%, #ff4500 85%, #ffd700 100%)",
          }}
        />

        {/* Decorative film reel / spotlight effect */}
        <div
          className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, rgba(255,0,0,0.3) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          {/* Festival Logo Icon */}
          <div className="mb-6 flex justify-center">
            <div
              className="w-24 h-24 border-4 flex items-center justify-center"
              style={{ borderColor: "#ffd700" }}
            >
              <span
                className="text-5xl font-bold"
                style={{
                  fontFamily: "Bebas Neue, sans-serif",
                  color: "#ffd700",
                }}
              >
                ISF
              </span>
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold tracking-wider mb-2"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            INDIAN
          </h1>
          <h1
            className="text-7xl md:text-9xl font-bold tracking-wider mb-2"
            style={{
              fontFamily: "Bebas Neue, sans-serif",
              color: "#ffd700",
              textShadow: "0 0 40px rgba(255,215,0,0.5)",
            }}
          >
            SCROLL
          </h1>
          <h1
            className="text-6xl md:text-8xl font-bold tracking-wider mb-8"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            FESTIVAL
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-4 max-w-xl mx-auto">
            India's First Vertical Film Festival
          </p>
          <p className="text-sm text-white/60 mb-8 max-w-md mx-auto">
            Submit your vertical short film (under 120 seconds) and get featured
            on the big screen.
          </p>

          <Link to="/submission">
            <button className="btn-festival text-xl px-10 py-4">
              START SUBMISSION
            </button>
          </Link>

          {/* Festival details */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70">
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "#ffd700", fontFamily: "Bebas Neue" }}
              >
                120 SEC
              </p>
              <p className="text-xs uppercase tracking-wider">Max Duration</p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "#ffd700", fontFamily: "Bebas Neue" }}
              >
                200 MB
              </p>
              <p className="text-xs uppercase tracking-wider">Max File Size</p>
            </div>
            <div className="text-center">
              <p
                className="text-2xl font-bold"
                style={{ color: "#ffd700", fontFamily: "Bebas Neue" }}
              >
                ₹499
              </p>
              <p className="text-xs uppercase tracking-wider">
                Submission Fee
              </p>
            </div>
          </div>
        </div>

        {/* Zigzag decorative border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 zigzag-border" />
      </section>

      {/* About Section */}
      <section
        className="py-20 px-4"
        style={{ background: "linear-gradient(180deg, #1a0000, #0a0a0a)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-5xl mb-8"
            style={{ fontFamily: "Bebas Neue", color: "#ffd700" }}
          >
            CREATE FOR THE BIG SCREEN
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            The Indian Scroll Festival celebrates the art of vertical
            storytelling. Whether you're an aspiring filmmaker or a seasoned
            professional, this is your chance to showcase your creativity on the
            biggest stage.
          </p>
          <p className="text-white/70 text-lg leading-relaxed">
            Submit your vertical short film, pay a nominal fee of ₹499, and your
            work could be featured at India's first-ever vertical film festival.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10 text-center">
        <p className="text-white/40 text-sm">
          &copy; 2026 Indian Scroll Festival. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
