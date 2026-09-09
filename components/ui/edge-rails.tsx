import React from "react";

/**
 * The vertical gutters that frame every page — a measurement-rule motif
 * (hairline + regular ticks) rather than a diagonal hatch.
 * Rendered once per page so the treatment only has to change in one place.
 */
const rail =
  "absolute top-0 h-full w-6 border-x border-x-(--pattern-fg) " +
  "bg-[repeating-linear-gradient(to_bottom,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_1px,transparent_14px)] " +
  "bg-size-[9px_100%] bg-no-repeat bg-fixed opacity-55 dark:opacity-15";

export default function EdgeRails() {
  return (
    <>
      <div className={`${rail} left-0 bg-left`} aria-hidden="true" />
      <div className={`${rail} right-0 bg-right`} aria-hidden="true" />
    </>
  );
}
