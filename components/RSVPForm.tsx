"use client";

import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type SubmitState = { type: "idle" } | { type: "error"; message: string } | { type: "success"; total: number };

export function RSVPForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [guests, setGuests] = useState<"1" | "2" | "3" | "4" | "5">("1");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>({ type: "idle" });

  useEffect(() => {
    fetch("/api/rsvp-count")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.totalConfirmed === "number") setTotal(d.totalConfirmed);
      })
      .catch(() => {
        setTotal(null);
      });
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSubmitState({ type: "idle" });

    const payload = { name: name.trim(), guests: Number(guests), website: "" };
    const res = await fetch("/api/rsvp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    setLoading(false);

    if (!res.ok || !data.ok) {
      setSubmitState({ type: "error", message: data.error ?? "提交失败，请稍后再试" });
      return;
    }

    setSubmitState({ type: "success", total: data.totalConfirmed });
    setTotal(data.totalConfirmed);
    setName("");
    setGuests("1");
  }

  return (
    <section id="rsvp" className="mx-auto w-full max-w-6xl px-4 pb-24 pt-10 sm:px-8">
      <div className="rsvp-card relative overflow-hidden rounded-3xl border border-white/70 p-6 shadow-xl">
        <div aria-hidden className="rsvp-sticker rsvp-sticker-a">
          🎈
        </div>
        <div aria-hidden className="rsvp-sticker rsvp-sticker-b">
          🧸
        </div>
        <div aria-hidden className="rsvp-sticker rsvp-sticker-c">
          ✨
        </div>

        <h2 className="font-display text-3xl text-ink">确认出席 🎂</h2>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rsvp-jelly-btn mt-6 rounded-full px-6 py-3 font-semibold text-ink transition hover:scale-[1.03] active:scale-[0.98]"
        >
          打开报名弹窗
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.form
              className="rsvp-modal relative w-full max-w-md rounded-3xl border border-white/80 p-6 shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSubmit}
            >
              <div className="mb-2 flex items-center gap-2 text-sm text-slate-700">
                <span>🎉</span>
                <span>🍼</span>
                <span>🎁</span>
                <span>✨</span>
              </div>
              <h3 className="font-display text-2xl text-ink">报名信息</h3>
              <label className="mt-4 block text-sm font-medium text-slate-700">
                姓名
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  minLength={2}
                  maxLength={40}
                  className="rsvp-input mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-partyPink focus:ring"
                  placeholder="请输入姓名"
                />
              </label>

              <label className="mt-4 block text-sm font-medium text-slate-700">
                人数
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value as "1" | "2" | "3" | "4" | "5")}
                  className="rsvp-input mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 outline-none ring-partyPink focus:ring"
                >
                  <option value="1">1 人</option>
                  <option value="2">2 人</option>
                  <option value="3">3 人</option>
                  <option value="4">4 人</option>
                  <option value="5">5 人+</option>
                </select>
              </label>

              <input type="text" name="website" autoComplete="off" tabIndex={-1} className="hidden" />

              {submitState.type === "error" ? <p className="rsvp-bubble-error mt-3 rounded-2xl px-3 py-2 text-sm">{submitState.message}</p> : null}
              {submitState.type === "success" ? (
                <p className="rsvp-bubble-success mt-3 rounded-2xl px-3 py-2 text-sm">收到！期待您来~</p>
              ) : null}

              <div className="mt-6 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="rsvp-jelly-btn flex-1 rounded-full px-5 py-2.5 font-semibold text-ink disabled:opacity-60"
                >
                  {loading ? "提交中..." : "确认出席"}
                </button>
                <button
                  type="button"
                  className="rsvp-secondary-btn rounded-full px-4 py-2.5 text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  关闭
                </button>
              </div>
            </motion.form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
