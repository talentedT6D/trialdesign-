import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

const ConfirmationPage = () => {
  const location = useLocation();
  const { name, submissionTitle, paymentId } = location.state || {};
  const [copied, setCopied] = useState(false);

  const referralLink = `${window.location.origin}?ref=${paymentId || "ISF2026"}`;

  const handleCopyReferral = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #1a0000 20%, #8b0000 45%, #ff4500 75%, #ffd700 100%)",
      }}
    >
      {/* Logo */}
      <div className="mb-6 flex justify-center">
        <div
          className="w-16 h-16 border-2 flex items-center justify-center"
          style={{ borderColor: "#ffd700" }}
        >
          <span
            className="text-3xl font-bold"
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            ISF
          </span>
        </div>
      </div>

      <h2
        className="text-5xl md:text-7xl mb-2 text-center"
        style={{
          fontFamily: "Bebas Neue",
          color: "#ffd700",
          textShadow: "0 0 30px rgba(255,215,0,0.5)",
        }}
      >
        SUBMISSION
      </h2>
      <h2
        className="text-5xl md:text-7xl mb-6 text-center"
        style={{
          fontFamily: "Bebas Neue",
          color: "#ffd700",
          textShadow: "0 0 30px rgba(255,215,0,0.5)",
        }}
      >
        CONFIRMED
      </h2>

      <p className="text-white/80 text-lg text-center max-w-md mb-2">
        Your film will be featured on the big screen!
      </p>

      {/* Submission Details */}
      <div
        className="w-full max-w-md mt-6 p-6"
        style={{ background: "rgba(0,0,0,0.5)", border: "2px solid #ff0000" }}
      >
        <div className="space-y-3">
          {name && (
            <div className="flex justify-between text-white/70">
              <span>Filmmaker</span>
              <span className="text-white font-semibold">{name}</span>
            </div>
          )}
          {submissionTitle && (
            <div className="flex justify-between text-white/70">
              <span>Film Title</span>
              <span className="text-white font-semibold">
                {submissionTitle}
              </span>
            </div>
          )}
          {paymentId && (
            <div className="flex justify-between text-white/70">
              <span>Payment ID</span>
              <span className="text-white font-semibold text-sm">
                {paymentId}
              </span>
            </div>
          )}
          <div className="flex justify-between text-white/70">
            <span>Status</span>
            <span
              className="font-bold"
              style={{ color: "#00ff00" }}
            >
              Confirmed
            </span>
          </div>
        </div>
      </div>

      {/* Refer a Friend */}
      <div className="w-full max-w-md mt-6">
        <p
          className="text-center mb-3 text-xl"
          style={{ fontFamily: "Bebas Neue", color: "#ffd700" }}
        >
          REFER A FRIEND
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="input-festival flex-1 text-sm"
          />
          <button
            className="btn-festival px-6 text-sm"
            onClick={handleCopyReferral}
          >
            {copied ? "COPIED!" : "COPY"}
          </button>
        </div>
      </div>

      <Link to="/" className="mt-8">
        <button className="btn-festival px-10 py-3 text-lg">
          BACK TO HOME
        </button>
      </Link>

      {/* Zigzag border */}
      <div className="w-full mt-auto zigzag-border" />
    </div>
  );
};

export default ConfirmationPage;
