"use client";

import { useEffect } from "react";

export function SWRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    const ua = window.navigator.userAgent.toLowerCase();
    const isWeChat = ua.includes("micromessenger");

    if (isWeChat) {
      // WeChat webview can behave poorly with service-worker-mediated media requests.
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister().catch(() => {
            // Best-effort cleanup.
          });
        });
      });
      return;
    }

    navigator.serviceWorker.register("/sw.js").catch(() => {
      // No-op: offline support is best-effort.
    });
  }, []);

  return null;
}
