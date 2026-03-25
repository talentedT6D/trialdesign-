const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

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

    // 2. Check for duplicate submission
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
      video_url: formData.videoUrl || null,
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
};
