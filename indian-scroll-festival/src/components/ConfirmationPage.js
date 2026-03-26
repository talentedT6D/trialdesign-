import React from "react";

const ConfirmationPage = () => {
  const handleRefer = () => {
    window.open("https://www.indianscrollfestival.com/", "_blank");
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "#1a0505",
      }}
    >
      {/* Confirmation image as full background */}
      <img
        src="/images/confirmatrion.png"
        alt="Submission Confirmed"
        style={{
          width: "100%",
          maxWidth: "900px",
          height: "auto",
          display: "block",
          margin: "0 auto",
          paddingTop: "40px",
        }}
      />

      {/* REFER A FRIEND button */}
      <div
        className="flex justify-center"
        style={{ padding: "30px 16px 40px" }}
      >
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
            whiteSpace: "nowrap",
            fontSize: "clamp(20px, 2.8vw, 30px)",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: "1",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)",
            border: "none",
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

export default ConfirmationPage;
