import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { submissionId, name, email, submissionTitle } =
    location.state || {};
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = () => {
    setLoading(true);
    setError("");

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID || "YOUR_RAZORPAY_KEY_ID",
      amount: 499 * 100, // 499 INR in paise
      currency: "INR",
      name: "Indian Scroll Festival",
      description: "Film Submission Fee",
      handler: async function (response) {
        try {
          // Update submission with payment info
          if (submissionId) {
            const submissionRef = doc(db, "submissions", submissionId);
            await updateDoc(submissionRef, {
              paymentId: response.razorpay_payment_id,
              paymentStatus: "Completed",
              status: "Submitted",
              paidAt: new Date().toISOString(),
            });
          }

          navigate("/confirmation", {
            state: {
              name,
              email,
              submissionTitle,
              paymentId: response.razorpay_payment_id,
            },
          });
        } catch (err) {
          setError("Payment recorded but failed to update submission. Contact support.");
          console.error(err);
        }
      },
      prefill: {
        name: name || "",
        email: email || "",
      },
      theme: {
        color: "#ffd700",
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      setError("Payment gateway not loaded. Please refresh and try again.");
      setLoading(false);
    }
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
            style={{ fontFamily: "Bebas Neue, sans-serif", color: "#ffd700" }}
          >
            ISF
          </span>
        </div>
      </div>

      <h2
        className="text-4xl md:text-5xl mb-2 text-center"
        style={{ fontFamily: "Bebas Neue", color: "#ffd700" }}
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
              style={{ fontFamily: "Bebas Neue", color: "#ffd700" }}
            >
              ₹499
            </span>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-4 py-2 bg-red-900/80 border border-red-500 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <button
          className="btn-festival w-full py-4 text-xl"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "PROCESSING..." : "PAY ₹499 NOW"}
        </button>

        <p className="text-white/40 text-xs text-center mt-4">
          Powered by Razorpay | Secure Payment
        </p>
      </div>

      {/* Zigzag border */}
      <div className="w-full mt-auto zigzag-border" />
    </div>
  );
};

export default PaymentPage;
