"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * `false` on the server and during the hydration render, `true` afterwards.
 *
 * Use this to gate anything whose value differs between server and client —
 * notably `next-themes`' `resolvedTheme`, which is already populated from
 * localStorage on the client's first render but is undefined on the server.
 * Reading it unguarded produces a hydration mismatch.
 *
 * Preferred over a `useState` + `useEffect` flag: no extra render pass, and it
 * doesn't trip `react-hooks/set-state-in-effect`.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default useHydrated;
