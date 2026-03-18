import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";

const TICKER_TEXT = "INDIA'S FIRST VERTICAL FILM FESTIVAL\u00A0\u00A0\u00A0\u00A0";
const REPEATED = Array(20).fill(TICKER_TEXT).join("");
const EDGE_FONT_SIZE = "63.6px";
const EDGE_COLOR = "rgba(220, 50, 20, 0.6)";
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

const SubmissionForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [file, setFile] = useState(null);
  const [submissionTitle, setSubmissionTitle] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const categories = [
    "Drama",
    "Comedy",
    "Horror",
    "Documentary",
    "Animation",
    "Experimental",
    "Music Video",
    "Other",
  ];

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

  const handleNext = () => {
    if (!name || !email || !contact) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !submissionTitle || !category) {
      setError("Please fill all fields and upload a file.");
      return;
    }

    setUploading(true);
    setError("");

    try {
      const storageRef = ref(storage, `submissions/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(Math.round(progress));
        },
        (uploadError) => {
          setError("Upload failed. Please try again.");
          setUploading(false);
          console.error(uploadError);
        },
        async () => {
          const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);

          const docRef = await addDoc(collection(db, "submissions"), {
            name,
            email,
            contact,
            howHeard,
            submissionTitle,
            fileUrl,
            category,
            status: "Pending",
            createdAt: new Date().toISOString(),
          });

          navigate("/payment", {
            state: {
              submissionId: docRef.id,
              name,
              email,
              submissionTitle,
            },
          });
        }
      );
    } catch (err) {
      setError("Error submitting form. Please try again.");
      setUploading(false);
      console.error(err);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #050505 0%, #0a0000 10%, #1a0000 25%, #3a0000 40%, #6b0000 55%, #a00000 68%, #cc2200 78%, #ff4500 88%, #ff8c00 95%, #ffd700 100%)",
      }}
    >
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
        <div style={{ ...edgeTextStyle, color: "rgba(255, 200, 0, 0.7)", animation: "scrollLeft 35s linear infinite" }}>
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

      {/* Back button — top left */}
      <button
        onClick={() => step === 1 ? navigate("/") : setStep(1)}
        className="absolute bg-transparent border-none cursor-pointer p-0"
        style={{ top: "85px", left: "85px", zIndex: 30 }}
        aria-label="Go back"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#cc2200" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <polyline points="14 16 10 12 14 8" />
        </svg>
      </button>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
        {/* Festival logo — smaller version */}
        <img
          src="/images/festival-logo.png"
          alt="Indian Scroll Festival 2026"
          style={{
            width: "110px",
            height: "150px",
            objectFit: "contain",
            marginBottom: "-20px",
            position: "relative",
            zIndex: 5,
          }}
        />

        {step === 1 ? (
          <>
            {/* Red card container */}
            <div
              style={{
                background: "linear-gradient(180deg, #cc0000 0%, #ee1100 40%, #ff3300 70%, #ff4500 100%)",
                borderRadius: "24px",
                padding: "35px 28px 35px",
                width: "100%",
                maxWidth: "440px",
              }}
            >
              <h2
                className="text-center mb-8"
                style={{
                  fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  color: "#ffd700",
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: "0.05em",
                  margin: "0 0 30px 0",
                }}
              >
                SUBMISSION FORM
              </h2>

              {error && (
                <div className="mb-4 px-4 py-2 bg-black/40 text-red-300 text-center text-sm" style={{ borderRadius: "10px" }}>
                  {error}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="email"
                  placeholder="Email ID"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="tel"
                  placeholder="Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
                <input
                  type="text"
                  placeholder="How'd You Hear About Us?"
                  value={howHeard}
                  onChange={(e) => setHowHeard(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              </div>
            </div>

            {/* NEXT button */}
            <button
              onClick={handleNext}
              className="cursor-pointer border-none"
              style={{
                marginTop: "20px",
                padding: "16px 80px",
                borderRadius: "50px",
                background: "linear-gradient(180deg, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.25) 100%)",
                border: "2px solid rgba(255,215,0,0.3)",
                color: "#ffd700",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                fontWeight: 700,
                letterSpacing: "0.15em",
                boxShadow: "0 0 30px rgba(255,165,0,0.2)",
              }}
            >
              NEXT
            </button>
          </>
        ) : (
          <>
            {/* Step 2: Film details + upload */}
            <div
              style={{
                background: "linear-gradient(180deg, #cc0000 0%, #ee1100 40%, #ff3300 70%, #ff4500 100%)",
                borderRadius: "24px",
                padding: "35px 28px 35px",
                width: "100%",
                maxWidth: "440px",
              }}
            >
              <h2
                className="text-center"
                style={{
                  fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  color: "#ffd700",
                  fontWeight: 700,
                  fontStyle: "italic",
                  letterSpacing: "0.05em",
                  margin: "0 0 30px 0",
                }}
              >
                FILM DETAILS
              </h2>

              {error && (
                <div className="mb-4 px-4 py-2 bg-black/40 text-red-300 text-center text-sm" style={{ borderRadius: "10px" }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <input
                  type="text"
                  placeholder="Film Title"
                  value={submissionTitle}
                  onChange={(e) => setSubmissionTitle(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "16px",
                    color: "#fff",
                    fontSize: "1.05rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "rgba(0,0,0,0.85)",
                    border: "none",
                    borderRadius: "14px",
                    color: category ? "#fff" : "rgba(255,255,255,0.5)",
                    fontSize: "1.1rem",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    textAlign: "center",
                    letterSpacing: "0.05em",
                    outline: "none",
                    boxSizing: "border-box",
                    appearance: "none",
                  }}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat} style={{ background: "#1a0000" }}>
                      {cat}
                    </option>
                  ))}
                </select>

                {/* File Upload */}
                <div
                  style={{
                    background: "rgba(0,0,0,0.85)",
                    borderRadius: "14px",
                    padding: "20px",
                    textAlign: "center",
                    cursor: "pointer",
                    border: "2px dashed rgba(255,215,0,0.3)",
                  }}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    {file ? (
                      <div>
                        <p style={{ color: "#fff", fontFamily: "'Obviously', 'Bebas Neue', sans-serif", margin: 0 }}>{file.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "4px" }}>
                          {(file.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", margin: "0 0 4px 0", fontFamily: "'Obviously', 'Bebas Neue', sans-serif" }}>
                          Upload Your Film
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", margin: 0 }}>
                          Max 200MB | Video files only
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                {/* Upload progress */}
                {uploading && (
                  <div style={{ width: "100%", background: "rgba(0,0,0,0.5)", height: "10px", borderRadius: "5px", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${uploadProgress}%`,
                        height: "100%",
                        background: "linear-gradient(90deg, #ff4500, #ffd700)",
                        transition: "width 0.3s ease",
                      }}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="cursor-pointer border-none"
                  disabled={uploading}
                  style={{
                    marginTop: "8px",
                    padding: "16px 40px",
                    borderRadius: "50px",
                    background: "linear-gradient(180deg, rgba(255,215,0,0.3) 0%, rgba(255,165,0,0.25) 100%)",
                    border: "2px solid rgba(255,215,0,0.3)",
                    color: "#ffd700",
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontFamily: "'Obviously', 'Bebas Neue', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    boxShadow: "0 0 30px rgba(255,165,0,0.2)",
                    width: "100%",
                  }}
                >
                  {uploading ? `UPLOADING... ${uploadProgress}%` : "SUBMIT FILM"}
                </button>

                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", textAlign: "center", marginTop: "4px" }}>
                  Submission fee of ₹499 will be collected on the next page
                </p>
              </form>
            </div>
          </>
        )}
      </div>

      {/* Social icons — bottom right */}
      <div
        className="absolute flex items-center gap-4"
        style={{ bottom: "85px", right: "85px", zIndex: 30 }}
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

      {/* Keyframe animations & fonts */}
      <style>{`
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/fonnts.com-Obviously_Narw.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/fonnts.com-Obviously_Narw.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }
        @font-face {
          font-family: 'Obviously';
          src: url('/fonts/fonnts.com-Obviously_Narw.otf') format('opentype');
          font-weight: 700;
          font-style: normal;
          font-display: swap;
        }

        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        input::placeholder, select option:disabled {
          color: rgba(255, 255, 255, 0.45);
        }
      `}</style>
    </div>
  );
};

export default SubmissionForm;
