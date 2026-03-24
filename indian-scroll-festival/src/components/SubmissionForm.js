import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SubmissionForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state || {};
  const [name] = useState(userInfo.name || "");
  const [email] = useState(userInfo.email || "");
  const [file, setFile] = useState(null);
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size <= 200 * 1024 * 1024) {
      setFile(selectedFile);
      setError("");
    } else {
      setFile(null);
      setError("File size must be under 200MB.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.size <= 200 * 1024 * 1024) {
      setFile(droppedFile);
      setError("");
    } else {
      setFile(null);
      setError("File size must be under 200MB.");
    }
  };

  const handleSubmit = () => {
    if (!file || !submissionTitle) {
      setError("Please fill all fields and upload a file.");
      return;
    }
    navigate("/payment", {
      state: { name, email, submissionTitle },
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
            width: "639px",
            minHeight: "600px",
            maxWidth: "90vw",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >

          {/* Back button */}
          <button
            onClick={() => navigate("/")}
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

          {error && (
            <div
              className="mb-4 px-4 py-2 bg-black/40 text-red-300 text-center text-sm"
              style={{ borderRadius: "10px", position: "relative", zIndex: 2 }}
            >
              {error}
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "18px", position: "relative", zIndex: 2 }}>
            {/* Submission Title */}
            <input
              type="text"
              placeholder="Submission Title"
              value={submissionTitle}
              onChange={(e) => setSubmissionTitle(e.target.value)}
              required
              style={inputStyle}
            />

            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              style={{
                background: "rgba(0,0,0,0.65)",
                borderRadius: "16px",
                padding: "30px 20px",
                textAlign: "center",
                cursor: "pointer",
                border: dragging ? "1px solid rgba(255,215,0,0.5)" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              {file ? (
                <div>
                  <p style={{ color: "#fff", fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif", fontSize: "1.1rem", margin: 0 }}>
                    {file.name}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "8px" }}>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div>
                  <p style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "1.2rem",
                    margin: "0 0 4px 0",
                    fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                    letterSpacing: "0.05em",
                  }}>
                    Upload Submission
                  </p>
                  <p style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.8rem",
                    margin: "0 0 20px 0",
                    fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                  }}>
                    (Click Or Drag And Drop)
                  </p>
                  {/* Upload icon */}
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ margin: "0 auto 20px" }}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <polyline points="8 12 12 8 16 12" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                  </svg>
                  <p style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.8rem",
                    margin: 0,
                    fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                    letterSpacing: "0.03em",
                    lineHeight: "1.5",
                  }}>
                    Submissions Must Be Under 120 Seconds In Duration
                    <br />
                    And Smaller Than 200 MB In File Size.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* NEXT button */}
        <button
          onClick={handleSubmit}
          className="cursor-pointer border-none"
          style={{
            marginTop: "28px",
            width: "639px",
            maxWidth: "90vw",
            height: "69px",
            padding: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: "1",
            borderRadius: "50px",
            background: "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)",
            color: "#000000",
            fontSize: "51px",
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

export default SubmissionForm;
