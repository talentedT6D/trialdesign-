import React from "react";

const ConfirmationPage = () => {
  const shareUrl = "https://indianscrollfestival.com/";
  const shareText = "Check out the Indian Scroll Festival 2026 — India's First Vertical Film Festival! Submit your film now.";

  const handleRefer = async () => {
    // Use Web Share API if available (mobile/supported browsers)
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Indian Scroll Festival 2026",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // User cancelled or share failed — ignore
      }
    } else {
      // Fallback: open WhatsApp share
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + " " + shareUrl)}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "url('/images/Submission confirmation BG.png') center/cover no-repeat",
        backgroundColor: "#1a0505",
      }}
    >
      {/* Main content */}
      <div
        className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4"
      >
        {/* Festival Logo centered at top */}
        <img
          src="/images/festival-logo.png"
          alt="Indian Scroll Festival 2026"
          style={{
            width: "100px",
            height: "auto",
            objectFit: "contain",
            marginBottom: "20px",
          }}
        />

        {/* Confirmation image (title + seats + text) */}
        <img
          src="/images/confirmatrion.png"
          alt="Submission Confirmed"
          style={{
            width: "100%",
            maxWidth: "600px",
            height: "auto",
            display: "block",
          }}
        />

        {/* REFER A FRIEND button */}
        <button
          onClick={handleRefer}
          className="cursor-pointer border-none"
          style={{
            marginTop: "30px",
            width: "480px",
            maxWidth: "85vw",
            height: "60px",
            padding: "0 40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)",
            color: "#000000",
            whiteSpace: "nowrap",
            fontSize: "clamp(18px, 2.5vw, 26px)",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: "1",
            textAlign: "center",
            boxShadow: "0 0 30px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2)",
            border: "none",
          }}
        >
          <span style={{ marginTop: "-3px" }}>REFER A FRIEND</span>
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
