"use client";

import { motion } from "framer-motion";

const items = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  title: `回忆片段 ${i + 1}`
}));

export function Gallery() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-8">
      <h2 className="font-display text-3xl text-ink sm:text-4xl">回忆相册</h2>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            className={`group relative overflow-hidden rounded-3xl border border-white/70 bg-white/70 p-2 shadow-lg ${idx % 4 === 0 ? "md:row-span-2" : ""}`}
            whileHover={{ scale: 1.03 }}
          >
            <div className={`rounded-2xl bg-gradient-to-br from-partyBlue/80 via-partyYellow/50 to-partyPink/80 ${idx % 4 === 0 ? "h-[260px]" : "h-[120px] md:h-[160px]"}`} />
            <div className="pointer-events-none absolute inset-2 flex items-end rounded-2xl bg-gradient-to-t from-black/45 via-transparent to-transparent p-3 opacity-0 transition group-hover:opacity-100">
              <p className="text-sm font-medium text-white">{item.title}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
