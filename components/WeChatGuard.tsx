"use client";

import { useEffect, useState, type ReactNode } from "react";

type WeChatGuardProps = {
  children: ReactNode;
};

export function WeChatGuard({ children }: WeChatGuardProps) {
  const [mounted, setMounted] = useState(false);
  const [isWeChat, setIsWeChat] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setIsWeChat(ua.includes("micromessenger"));
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isWeChat) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20 text-center text-ink">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h1 className="text-2xl font-semibold">请用手机浏览器打开</h1>
          <p className="mt-4 text-sm text-slate-600">点击右上角 ···，选择在浏览器中打开。</p>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
