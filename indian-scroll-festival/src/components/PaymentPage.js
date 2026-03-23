import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { name, email, submissionTitle } = location.state || {};

  const handleContinue = () => {
    navigate("/confirmation", {
      state: {
        name,
        email,
        submissionTitle,
      },
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{
        background:
          "linear-gradient(180deg, #0a0a0a 0%, #1a0000 30%, #8b0000 60%, #ff4500 85%, #ffd700 100%)",
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
            style={{ fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif", color: "#ffd700" }}
          >
            ISF
          </span>
        </div>
      </div>

      <h2
        className="text-4xl md:text-5xl mb-2 text-center"
        style={{ fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif", color: "#ffd700" }}
      >
        PAYMENT
      </h2>

      {/* Payment Card */}
      <div
        className="w-full max-w-md mt-8 p-8"
        style={{ background: "rgba(0,0,0,0.6)", border: "2px solid #ff0000" }}
      >
        <div className="space-y-4 mb-8">
          <div className="flex justify-between text-white/70">
            <span>Film Title</span>
            <span className="text-white font-semibold">
              {submissionTitle || "Your Film"}
            </span>
          </div>
          <div className="flex justify-between text-white/70">
            <span>Filmmaker</span>
            <span className="text-white font-semibold">{name || "—"}</span>
          </div>
          <div
            className="h-px w-full"
            style={{ background: "rgba(255,0,0,0.3)" }}
          />
          <div className="flex justify-between items-center">
            <span className="text-white/70">Submission Fee</span>
            <span
              className="text-3xl font-bold"
              style={{ fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif", color: "#ffd700" }}
            >
              ₹499
            </span>
          </div>
        </div>

        <button
          className="btn-festival w-full py-4 text-xl"
          onClick={handleContinue}
        >
          CONTINUE
        </button>

        <p className="text-white/40 text-xs text-center mt-4">
          Payment integration coming soon
        </p>
      </div>

      {/* Zigzag border */}
      <div className="w-full mt-auto zigzag-border" />
    </div>
  );
};

export default PaymentPage;
