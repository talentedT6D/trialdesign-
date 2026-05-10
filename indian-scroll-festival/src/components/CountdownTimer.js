import React, { useEffect, useState } from "react";

const DEADLINE = new Date("2026-05-10T23:59:00+05:30").getTime();

const CountdownTimer = () => {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = DEADLINE - now;
  const closed = diff <= 0;

  let label;
  if (closed) {
    label = "SUBMISSIONS CLOSED";
  } else {
    const totalMinutes = Math.floor(diff / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    label = `CLOSES IN ${hours}H ${minutes}M`;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        left: "16px",
        zIndex: 1000,
        padding: "8px 14px",
        background: closed ? "rgba(120,0,0,0.85)" : "rgba(0,0,0,0.7)",
        border: closed ? "1px solid #ff3b3b" : "1px solid rgba(255,215,0,0.5)",
        borderRadius: "999px",
        color: closed ? "#ffdcdc" : "#ffd700",
        fontFamily: "'obviously-narrow', 'Bebas Neue', sans-serif",
        fontSize: "0.85rem",
        letterSpacing: "0.08em",
        boxShadow: closed
          ? "0 0 18px rgba(255,59,59,0.4)"
          : "0 0 18px rgba(255,215,0,0.25)",
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {closed ? label : (
        <>
          <span style={{ color: "#fff", marginRight: "8px" }}>⏳</span>
          {label}
          <span style={{ color: "rgba(255,255,255,0.7)", marginLeft: "8px", fontSize: "0.75rem" }}>
            (11:59 PM today)
          </span>
        </>
      )}
    </div>
  );
};

export default CountdownTimer;
