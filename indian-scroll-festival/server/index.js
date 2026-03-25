const express = require("express");
const cors = require("cors");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// --- Razorpay instance ---
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// --- Supabase instance ---
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// =============================================
// POST /api/create-order
// Creates a Razorpay order for ₹499
// =============================================
app.post("/api/create-order", async (req, res) => {
  try {
    const options = {
      amount: 49900, // ₹499 in paise
      currency: "INR",
      receipt: `isf_${Date.now()}`,
    };
    const order = await razorpay.orders.create(options);
    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order creation failed:", err);
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// =============================================
// POST /api/verify-payment
// Verifies Razorpay signature + inserts into Supabase
// =============================================
app.post("/api/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      formData,
    } = req.body;

    // 1. Verify Razorpay signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    // 2. Check for duplicate submission (idempotency)
    const { data: existing } = await supabase
      .from("submissions")
      .select("id")
      .eq("payment_id", razorpay_payment_id)
      .single();

    if (existing) {
      return res.json({
        success: true,
        message: "Submission already recorded",
        payment_id: razorpay_payment_id,
      });
    }

    // 3. Insert into Supabase only after verified payment
    const { error: insertError } = await supabase.from("submissions").insert({
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      how_heard: formData.howHeard || null,
      submission_title: formData.submissionTitle,
      category: formData.category,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      amount: 499,
      status: "confirmed",
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return res
        .status(500)
        .json({ success: false, message: "Failed to save submission" });
    }

    res.json({
      success: true,
      message: "Payment verified and submission saved",
      payment_id: razorpay_payment_id,
    });
  } catch (err) {
    console.error("Verification error:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

// --- Health check ---
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
