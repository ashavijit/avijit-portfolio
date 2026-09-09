import React from "react";

/**
 * Ambient page backdrop — a carbon spotlight: a soft overhead light above the
 * fold, a vignette pulling the corners down, and a fine carbon speckle for
 * texture. Layer colours live in globals.css so light and dark each get their
 * own palette from the same markup.
 *
 * Pure CSS — no canvas, no rAF loop, no theme hook. Renders on the server.
 */
export default function GridFlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[-1] print:hidden"
    >
      {/* base wash */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--bg-base)" }}
      />

      {/* overhead spotlight */}
      <div
        className="absolute inset-0 opacity-50"
        style={{ backgroundImage: "var(--bg-spot)" }}
      />

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--bg-vignette)" }}
      />

      {/* carbon speckle */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, var(--bg-speck) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />
    </div>
  );
}
