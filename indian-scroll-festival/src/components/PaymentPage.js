import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { useFileContext } from "../context/FileContext";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const categoryIcons = {
  Comedy: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Happy mask */}
      <circle cx="22" cy="30" r="16" />
      <circle cx="17" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <circle cx="27" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <path d="M15 34 Q22 42 29 34" />
      {/* Sad mask */}
      <circle cx="42" cy="30" r="16" />
      <circle cx="37" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <circle cx="47" cy="26" r="2" fill="rgba(255,255,255,0.85)" />
      <path d="M35 38 Q42 32 49 38" />
    </svg>
  ),
  Edits: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Scissors */}
      <circle cx="20" cy="48" r="6" />
      <circle cx="44" cy="48" r="6" />
      <line x1="24" y1="44" x2="40" y2="16" />
      <line x1="40" y1="44" x2="24" y2="16" />
    </svg>
  ),
  AI: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Image/landscape icon with sparkle */}
      <rect x="8" y="12" width="48" height="40" rx="4" />
      <circle cx="22" cy="28" r="5" />
      <path d="M8 44 L24 32 L36 40 L48 28 L56 36" />
      {/* Sparkle */}
      <path d="M46 14 L48 8 L50 14 L56 16 L50 18 L48 24 L46 18 L40 16 Z" fill="rgba(255,255,255,0.85)" stroke="none" />
    </svg>
  ),
  Food: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Plate/tray */}
      <rect x="10" y="30" width="44" height="6" rx="2" />
      <rect x="14" y="36" width="36" height="10" rx="2" />
      {/* Sushi/food items */}
      <ellipse cx="24" cy="26" rx="6" ry="5" />
      <ellipse cx="38" cy="26" rx="6" ry="5" />
      <line x1="24" y1="21" x2="24" y2="26" />
      <line x1="38" y1="21" x2="38" y2="26" />
    </svg>
  ),
  Emotional: (
    <svg width="48" height="48" viewBox="0 0 64 64" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Two people hugging */}
      <circle cx="24" cy="16" r="7" />
      <circle cx="40" cy="16" r="7" />
      <path d="M12 52 L12 36 Q12 28 24 28 Q30 28 32 32" />
      <path d="M52 52 L52 36 Q52 28 40 28 Q34 28 32 32" />
      <path d="M20 36 Q32 44 44 36" />
    </svg>
  ),
};

const CategoryCard = ({ cat, category, setCategory }) => (
  <button
    onClick={() => setCategory(cat)}
    style={{
      flex: 1,
      padding: "clamp(12px, 2.5vw, 18px) clamp(8px, 1.5vw, 12px)",
      background: category === cat ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.3)",
      border: category === cat ? "2px solid rgba(255,255,255,0.5)" : "1px solid rgba(255,255,255,0.15)",
      borderRadius: "16px",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "8px",
      transition: "all 0.2s ease",
      boxSizing: "border-box",
    }}
  >
    <span
      style={{
        fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
        fontSize: "clamp(0.85rem, 2.5vw, 1.05rem)",
        color: "#fff",
        letterSpacing: "0.04em",
      }}
    >
      {cat}
    </span>
    {categoryIcons[cat]}
  </button>
);

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getFile, clearFile } = useFileContext();
  const { name, email, contact, igHandle, howHeard, submissionTitle } = location.state || {};
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [promoCode, setPromoCode] = useState("");
  const [promoValid, setPromoValid] = useState(false);
  const [promoType, setPromoType] = useState(null);

  const categories = ["Comedy", "Edits", "AI", "Food", "Emotional"];

  const BASE_PRICE = 499;
  const finalPrice = promoType === "free" ? 0 : promoType === "discount50" ? 449 : BASE_PRICE;

  // Hash-based promo validation (code is never stored as plaintext)
  const validatePromo = async (code) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(code);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    if (hashHex === "8cded609a38270f75a967f8e9c3c78898c2e3d23c19f7dfcff5431ab3d42f088") return "free";
    if (hashHex === "99041e13cb3bb09a46435ee497e166b31cc3a51f1f0ebd58f4f84a65c1537e19") return "free";
    if (hashHex === "9c563598531cb1b2ddbddfdca1e6d95e10345f2d3605a1cfdc11190d549cc86d") return "discount50";
    return null;
  };

  const handlePromoChange = async (e) => {
    const code = e.target.value;
    setPromoCode(code);
    if (code.length > 0) {
      const type = await validatePromo(code);
      setPromoType(type);
      setPromoValid(!!type);
    } else {
      setPromoType(null);
      setPromoValid(false);
    }
  };

  const handleSubmit = async () => {
    if (!category) {
      setError("Please pick a category.");
      return;
    }
    if (loading) return;

    setLoading(true);
    setError("");

    // Step 1: Upload video FIRST (before payment)
    let videoUrl = null;
    let uploadedPath = null;
    const file = getFile();
    if (file) {
      setUploading(true);
      setUploadProgress(0);

      // Simulate progress since Supabase JS client doesn't expose upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((p) => (p < 90 ? p + 2 : p));
      }, 500);

      try {
        const fileExt = file.name.split(".").pop();
        const fileName = `temp_${Date.now()}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("submissions")
          .upload(fileName, file, { cacheControl: "3600", upsert: false });

        clearInterval(progressInterval);

        if (uploadError || !uploadData) {
          setError("Video upload failed. Please try again.");
          setLoading(false);
          setUploading(false);
          return;
        }

        uploadedPath = uploadData.path;
        const { data: urlData } = supabase.storage
          .from("submissions")
          .getPublicUrl(uploadData.path);
        videoUrl = urlData.publicUrl;
        setUploadProgress(100);

        // Small pause to show 100%
        await new Promise((r) => setTimeout(r, 300));
      } catch {
        clearInterval(progressInterval);
        setError("Video upload failed. Please try again.");
        setLoading(false);
        setUploading(false);
        return;
      }

      setUploading(false);
    }

    // Step 2: If promo code grants free entry, skip payment
    if (promoType === "free") {
      try {
        const { error: insertError } = await supabase.from("submissions").insert({
          name: name || "",
          email: email || "",
          contact: contact || "",
          ig_handle: igHandle || null,
          how_heard: howHeard || null,
          submission_title: submissionTitle || "",
          category,
          video_url: videoUrl,
          payment_id: `promo_${Date.now()}`,
          order_id: `promo_${Date.now()}`,
          amount: 0,
          status: "confirmed_promo",
        });

        if (insertError) {
          setError("Save failed. Please try again.");
          setLoading(false);
          return;
        }

        clearFile();
        navigate("/confirmation", {
          state: { name, email, submissionTitle, category, paymentId: "PROMO" },
        });
        return;
      } catch {
        setError("Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    }

    // Step 3: Open Razorpay Checkout
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: finalPrice * 100,
      currency: "INR",
      name: "Indian Scroll Festival",
      description: "Submission Fee",
      prefill: {
        name: name || "",
        email: email || "",
        contact: contact || "",
      },
      theme: {
        color: "#cc2200",
      },
      handler: async function (response) {
        try {
          const paymentId = response.razorpay_payment_id;

          // Step 3: Save form data + already-uploaded video URL to Supabase
          const { error: insertError } = await supabase.from("submissions").insert({
            name: name || "",
            email: email || "",
            contact: contact || "",
            ig_handle: igHandle || null,
            how_heard: howHeard || null,
            submission_title: submissionTitle || "",
            category,
            video_url: videoUrl,
            payment_id: paymentId,
            order_id: response.razorpay_order_id || `direct_${Date.now()}`,
            amount: finalPrice,
            status: "confirmed",
          });

          if (insertError) {
            setError("Save failed. Contact support with payment ID: " + paymentId);
            setLoading(false);
            return;
          }

          // Step 4: Go to confirmation
          clearFile();
          navigate("/confirmation", {
            state: {
              name,
              email,
              submissionTitle,
              category,
              paymentId,
            },
          });
        } catch {
          setError("Something went wrong after payment. Contact support.");
          setLoading(false);
        }
      },
      modal: {
        ondismiss: async function () {
          // Payment cancelled — delete the uploaded video
          if (uploadedPath) {
            try {
              await supabase.storage.from("submissions").remove([uploadedPath]);
            } catch {
              // ignore cleanup errors
            }
          }
          setLoading(false);
        },
      },
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", async function (resp) {
        // Payment failed — delete the uploaded video
        if (uploadedPath) {
          try {
            await supabase.storage.from("submissions").remove([uploadedPath]);
          } catch {
            // ignore
          }
        }
        setError(resp.error?.description || "Payment failed. Please try again.");
        setLoading(false);
      });
      rzp.open();
    } catch {
      setError("Could not open payment. Please try again.");
      setLoading(false);
    }
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
            padding: "clamp(20px, 4vw, 30px) clamp(16px, 3.5vw, 32px) clamp(28px, 5vw, 40px)",
            width: "100%",
            maxWidth: "535px",
            position: "relative",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            overflow: "hidden",
          }}
        >

          {/* Back button + Title wrapper */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", width: "fit-content" }}>
              <button
                onClick={() => navigate("/submission", { state: { name, email, contact, igHandle, howHeard, submissionTitle } })}
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
                  margin: "0 0 24px 0",
                  textShadow: "none",
                  position: "relative",
                  zIndex: 2,
                }}
              >
            SUBMISSION FORM
              </h2>
            </div>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
              fontSize: "1.15rem",
              color: "rgba(255,255,255,0.85)",
              textAlign: "center",
              letterSpacing: "0.04em",
              margin: "0 0 24px 0",
              position: "relative",
              zIndex: 2,
            }}
          >
            Pick From A Category Below
          </p>

          {/* Category Cards Grid - Row 1: Comedy, Edits, AI */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(8px, 2vw, 16px)",
              position: "relative",
              zIndex: 2,
              marginBottom: "16px",
            }}
          >
            {categories.slice(0, 3).map((cat) => (
              <CategoryCard key={cat} cat={cat} category={category} setCategory={setCategory} />
            ))}
          </div>

          {/* Category Cards Grid - Row 2: Food, Emotional (centered, matching row 1 card widths) */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(8px, 2vw, 16px)",
              position: "relative",
              zIndex: 2,
              width: "67%",
              margin: "0 auto",
            }}
          >
            {categories.slice(3).map((cat) => (
              <CategoryCard key={cat} cat={cat} category={category} setCategory={setCategory} />
            ))}
          </div>
        </div>

        {/* Promo Code */}
        <div
          style={{
            marginTop: "16px",
            width: "100%",
            maxWidth: "535px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Promo Code (optional)"
            value={promoCode}
            onChange={handlePromoChange}
            style={{
              width: "100%",
              padding: "14px 20px",
              background: "rgba(0,0,0,0.5)",
              border: promoValid ? "1px solid #00cc00" : "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              color: promoValid ? "#00cc00" : "#fff",
              fontSize: "0.95rem",
              fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
              textAlign: "center",
              letterSpacing: "0.05em",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
          {promoValid && (
            <span
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#00cc00",
                fontSize: "1.2rem",
              }}
            >
              ✓
            </span>
          )}
        </div>

        {/* Upload progress bar */}
        {uploading && (
          <div
            style={{
              marginTop: "16px",
              width: "100%",
              maxWidth: "535px",
            }}
          >
            <div
              style={{
                fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                color: "#ffd700",
                fontSize: "0.95rem",
                textAlign: "center",
                marginBottom: "8px",
                letterSpacing: "0.05em",
              }}
            >
              UPLOADING VIDEO... {uploadProgress}%
            </div>
            <div
              style={{
                width: "100%",
                height: "10px",
                background: "rgba(0,0,0,0.5)",
                borderRadius: "5px",
                overflow: "hidden",
                border: "1px solid rgba(255,215,0,0.3)",
              }}
            >
              <div
                style={{
                  width: `${uploadProgress}%`,
                  height: "100%",
                  background: "linear-gradient(90deg, #ffd700 0%, #ff8c00 100%)",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
            <div
              style={{
                fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                textAlign: "center",
                marginTop: "8px",
              }}
            >
              Please don't close this page.
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            style={{
              marginTop: "16px",
              padding: "12px 20px",
              background: "rgba(0,0,0,0.5)",
              borderRadius: "12px",
              color: "#ff6b6b",
              textAlign: "center",
              fontSize: "0.95rem",
              fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
              letterSpacing: "0.03em",
              width: "100%",
              maxWidth: "535px",
              boxSizing: "border-box",
            }}
          >
            {error}
          </div>
        )}

        {/* PAY 499 AND SUBMIT button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="cursor-pointer border-none"
          style={{
            marginTop: error ? "12px" : "28px",
            width: "100%",
            maxWidth: "535px",
            height: "clamp(54px, 9vw, 69px)",
            padding: "0 clamp(16px, 4vw, 40px)",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50px",
            background: loading
              ? "rgba(200,180,160,0.6)"
              : category
                ? "linear-gradient(180deg, #ffd700 0%, #e6c200 100%)"
                : "rgba(200,180,160,0.4)",
            color: loading
              ? "rgba(80,50,40,0.8)"
              : category ? "#000000" : "rgba(80,50,40,0.6)",
            fontSize: "clamp(20px, 2.8vw, 30px)",
            overflow: "hidden",
            fontFamily: "'obviously-wide', 'Bebas Neue', sans-serif",
            fontWeight: 900,
            letterSpacing: "0.03em",
            lineHeight: "1",
            textAlign: "center",
            boxShadow: !loading && category
              ? "0 0 30px rgba(255,215,0,0.6), 0 0 60px rgba(255,215,0,0.3), 0 4px 80px rgba(255,200,0,0.4)"
              : "none",
            border: "none",
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          <span style={{ marginTop: "-4px" }}>
            {uploading ? "UPLOADING..." : loading ? "PROCESSING..." : promoType === "free" ? "SUBMIT FREE" : `PAY ${finalPrice} AND SUBMIT`}
          </span>
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

      <style>{`
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

export default PaymentPage;
