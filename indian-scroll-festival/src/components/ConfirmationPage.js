import React from "react";

const ConfirmationPage = () => {
  const handleRefer = () => {
    window.open("https://www.indianscrollfestival.com/", "_blank");
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "url('/images/F02.2 (1) (1).png') center/cover no-repeat",
      }}
    >
      {/* Main content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
        style={{ paddingTop: "40px", paddingBottom: "40px" }}
      >
        {/* Spotlight / arch glow behind the content */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "500px",
            height: "100%",
            background: "radial-gradient(ellipse 50% 70% at 50% 30%, rgba(255,80,40,0.35) 0%, rgba(255,30,0,0.15) 40%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Arch shape */}
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "85%",
            borderRadius: "210px 210px 0 0",
            background: "radial-gradient(ellipse 100% 80% at 50% 20%, rgba(255,100,50,0.25) 0%, rgba(200,30,0,0.1) 50%, transparent 80%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Festival Logo centered at top */}
        <img
          src="/images/festival-logo.png"
          alt="Indian Scroll Festival 2026"
          style={{
            width: "120px",
            height: "auto",
            objectFit: "contain",
            position: "relative",
            zIndex: 2,
            marginBottom: "30px",
          }}
        />

        {/* SUBMISSION CONFIRMED */}
        <h1
          style={{
            fontFamily: "'obviously-condensed', 'Bebas Neue', sans-serif",
            fontSize: "clamp(60px, 10vw, 120px)",
            color: "#ffd700",
            fontWeight: 700,
            lineHeight: "0.9",
            textAlign: "center",
            margin: "0 0 40px 0",
            position: "relative",
            zIndex: 2,
            textShadow: "0 0 40px rgba(255,215,0,0.4)",
          }}
        >
          SUBMISSION
          <br />
          CONFIRMED
        </h1>

        {/* Theater Seats - Row 1 (6 seats) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "10px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[...Array(6)].map((_, i) => (
            <SeatIcon key={`r1-${i}`} />
          ))}
        </div>

        {/* Theater Seats - Row 2 (4 seats) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginBottom: "24px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {[...Array(4)].map((_, i) => (
            <SeatIcon key={`r2-${i}`} />
          ))}
        </div>

        {/* WE'LL SEE YOU ON THE BIG SCREEN */}
        <p
          style={{
            fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
            fontSize: "1.1rem",
            color: "rgba(255,255,255,0.8)",
            textAlign: "center",
            letterSpacing: "0.06em",
            lineHeight: "1.4",
            margin: "0 0 36px 0",
            position: "relative",
            zIndex: 2,
          }}
        >
          WE'LL SEE YOU ON
          <br />
          THE BIG SCREEN.
        </p>

        {/* REFER A FRIEND button */}
        <button
          onClick={handleRefer}
          className="cursor-pointer border-none"
          style={{
            width: "535px",
            maxWidth: "90vw",
            height: "69px",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)",
            color: "#000000",
            fontSize: "clamp(24px, 3vw, 36px)",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: "1",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)",
            border: "none",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span style={{ marginTop: "-4px" }}>REFER A FRIEND</span>
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

/* Theater seat SVG icon */
const SeatIcon = () => (
  <svg
    width="48"
    height="36"
    viewBox="0 0 48 36"
    fill="none"
    stroke="#ffd700"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Seat back (arch) */}
    <path d="M8 20 Q8 4 24 4 Q40 4 40 20" />
    {/* Seat bottom */}
    <rect x="6" y="20" width="36" height="8" rx="3" />
    {/* Armrests */}
    <line x1="6" y1="28" x2="6" y2="34" />
    <line x1="42" y1="28" x2="42" y2="34" />
  </svg>
);

export default ConfirmationPage;
