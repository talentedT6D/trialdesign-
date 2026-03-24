import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, submissionTitle } = location.state || {};
  const [category, setCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const categories = ["Comedy", "Edits", "Emotional", "Food", "AI"];

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
            width: "550px",
            minHeight: "600px",
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
                onClick={() => navigate("/submission", { state: { name, email } })}
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
                  fontSize: "112px",
                  color: "#FFFFFF",
                  fontWeight: 500,
                  fontStyle: "normal",
                  letterSpacing: "0em",
                  lineHeight: "0.95",
                  margin: "0 0 30px 0",
                  textShadow: "none",
                  position: "relative",
                  zIndex: 2,
                }}
              >
            SUBMISSION FORM
              </h2>
            </div>
          </div>

          {/* Custom Category Dropdown */}
          <div style={{ position: "relative", zIndex: 3 }}>
            {/* Dropdown trigger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                width: "100%",
                padding: "20px 24px",
                background: "rgba(0,0,0,0.65)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: isOpen ? "16px 16px 0 0" : "16px",
                color: category ? "#fff" : "rgba(255,255,255,0.7)",
                fontSize: "1.1rem",
                fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                textAlign: "center",
                letterSpacing: "0.05em",
                outline: "none",
                boxSizing: "border-box",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <span>{category || "Category"}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "20px",
                  transition: "transform 0.2s",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {/* Dropdown options */}
            {isOpen && (
              <div
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.85)",
                  borderRadius: "0 0 16px 16px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderTop: "none",
                  overflow: "hidden",
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      setIsOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "14px 24px",
                      background: "transparent",
                      border: "none",
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "1.1rem",
                      fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                      textAlign: "center",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      borderBottom: "1px solid rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.05)")}
                    onMouseLeave={(e) => (e.target.style.background = "transparent")}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* PAY 499 AND SUBMIT button */}
        <button
          onClick={handleSubmit}
          className="cursor-pointer border-none"
          style={{
            marginTop: "28px",
            width: "550px",
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
            fontSize: "clamp(24px, 3.5vw, 36px)",
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

export default PaymentPage;
