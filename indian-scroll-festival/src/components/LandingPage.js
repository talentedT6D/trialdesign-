import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prev = location.state || {};
  const [name, setName] = useState(prev.name || "");
  const [email, setEmail] = useState(prev.email || "");
  const [contact, setContact] = useState(prev.contact || "");
  const [igHandle, setIgHandle] = useState(prev.igHandle || "");
  const [howHeard, setHowHeard] = useState(prev.howHeard || "");
  const [howHeardOther, setHowHeardOther] = useState(prev.howHeardOther || "");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    setSubmitted(true);
    const finalHowHeard = howHeard === "Other" ? (howHeardOther || "Other") : howHeard;
    if (!name || !email || !contact || !igHandle || !howHeard) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    navigate("/submission", {
      state: { name, email, contact, igHandle, howHeard: finalHowHeard },
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "clamp(14px, 2.5vw, 20px) clamp(16px, 3vw, 24px)",
    background: "rgba(0,0,0,0.65)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    color: "#fff",
    fontSize: "1.1rem",
    fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
    textAlign: "left",
    letterSpacing: "0.05em",
    outline: "none",
    boxSizing: "border-box",
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background: "url('/images/F02.2 (1) (1).png') center/cover no-repeat",
      }}
    >
      {/* Festival logo */}
      <img
        src="/images/festival-logo.png"
        alt="Indian Scroll Festival 2026"
        className="festival-logo"
        style={{
          position: "absolute",
          top: "clamp(20px, 5vw, 72px)",
          left: "clamp(20px, 5vw, 72px)",
          width: "clamp(60px, 10vw, 100px)",
          height: "auto",
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
            padding: "clamp(20px, 4vw, 30px) clamp(20px, 4vw, 32px) clamp(28px, 5vw, 40px)",
            width: "100%",
            maxWidth: "535px",
            minHeight: "auto",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >
          {/* Back button + Title wrapper */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
              <button
                onClick={() => window.history.back()}
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
              fontSize: "clamp(48px, 12vw, 100px)",
              color: "#FFFFFF",
              fontWeight: 500,
              fontStyle: "normal",
              letterSpacing: "0em",
              lineHeight: "0.95",
              margin: "10px 0 30px 0",
              textShadow: "none",
              position: "relative",
              zIndex: 2,
            }}
          >
            SUBMISSION FORM
              </h2>
            </div>
          </div>

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
              placeholder={submitted && !name ? "Name *" : "Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                ...inputStyle,
                border: submitted && !name ? "1px solid rgba(255,0,0,0.6)" : inputStyle.border,
              }}
            />
            <input
              type="email"
              placeholder={submitted && !email ? "Email ID *" : "Email ID"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                ...inputStyle,
                border: submitted && !email ? "1px solid rgba(255,0,0,0.6)" : inputStyle.border,
              }}
            />
            <input
              type="tel"
              placeholder={submitted && !contact ? "Contact *" : "Contact"}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              style={{
                ...inputStyle,
                border: submitted && !contact ? "1px solid rgba(255,0,0,0.6)" : inputStyle.border,
              }}
            />
            <input
              type="text"
              placeholder={submitted && !igHandle ? "IG Handle *" : "IG Handle"}
              value={igHandle}
              onChange={(e) => setIgHandle(e.target.value)}
              style={{
                ...inputStyle,
                border: submitted && !igHandle ? "1px solid rgba(255,0,0,0.6)" : inputStyle.border,
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <select
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                style={{
                  ...inputStyle,
                  appearance: "none",
                  WebkitAppearance: "none",
                  cursor: "pointer",
                  color: howHeard ? "#fff" : "#FFFFFF",
                  textShadow: howHeard ? "none" : "0 0 12.8px #FF0504",
                  border: submitted && !howHeard ? "1px solid rgba(255,0,0,0.6)" : inputStyle.border,
                }}
              >
                <option value="" disabled style={{ background: "#1a0a0a", color: "rgba(255,255,255,0.7)" }}>
                  {submitted && !howHeard ? "How Did You Get To Know About Us? *" : "How Did You Get To Know About Us?"}
                </option>
                <option value="Instagram" style={{ background: "#1a0a0a", color: "#fff" }}>Instagram</option>
                <option value="Twitter" style={{ background: "#1a0a0a", color: "#fff" }}>Twitter</option>
                <option value="LIT School" style={{ background: "#1a0a0a", color: "#fff" }}>LIT School</option>
                <option value="Main Mission" style={{ background: "#1a0a0a", color: "#fff" }}>Main Mission</option>
                <option value="Other" style={{ background: "#1a0a0a", color: "#fff" }}>Other</option>
              </select>
              {/* Dropdown arrow */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {howHeard === "Other" && (
              <input
                type="text"
                placeholder="Please specify..."
                value={howHeardOther}
                onChange={(e) => setHowHeardOther(e.target.value.slice(0, 20))}
                maxLength={20}
                style={inputStyle}
              />
            )}
          </div>
        </div>

        {/* NEXT button */}
        <button
          onClick={handleNext}
          className="cursor-pointer border-none"
          style={{
            marginTop: "28px",
            width: "100%",
            maxWidth: "535px",
            height: "clamp(54px, 9vw, 69px)",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)",
            color: "#000000",
            fontSize: "clamp(28px, 6vw, 42px)",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.1em",
            boxShadow: "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)",
            border: "none",
          }}
        >
          <span style={{ marginTop: "-6px" }}>NEXT</span>
        </button>

      </div>

      {/* Social icons */}
      <div
        className="absolute flex items-center gap-4 social-icons"
        style={{ bottom: "clamp(16px, 4vw, 30px)", right: "clamp(16px, 4vw, 30px)", zIndex: 30 }}
      >
        <a href="https://www.instagram.com/indianscrollfestival/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="5" />
            <circle cx="17.5" cy="6.5" r="1.5" fill="#ffd700" stroke="none" />
          </svg>
        </a>
        <a href="https://x.com/indiascrollfest" target="_blank" rel="noopener noreferrer" aria-label="X">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffd700">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </div>

      {/* Placeholder styles */}
      <style>{`
        input::placeholder {
          color: #FFFFFF;
          text-shadow: 0 0 12.8px #FF0504;
        }
        @media (max-width: 768px) {
          .festival-logo {
            position: static !important;
            display: block !important;
            margin: 16px auto 0 !important;
            width: 60px !important;
            left: auto !important;
            top: auto !important;
          }
          .social-icons {
            position: static !important;
            justify-content: center !important;
            width: 100% !important;
            padding: 16px 0 20px !important;
          }
        }
`}</style>
    </div>
  );
};

export default LandingPage;
