"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const balloons = Array.from({ length: 8 }, (_, index) => ({
  id: index,
  left: 8 + index * 11,
  duration: 6 + (index % 3),
  delay: index * 0.2,
  sway: index % 2 === 0 ? 10 : -10
}));

export function Hero() {
  const balloonColors = [
    "from-partyPink to-partyBlue",
    "from-partyPeach to-partyPink",
    "from-partyBlue to-partyYellow",
    "from-partyPink to-partyYellow"
  ];

  return (
    <section className="relative mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col justify-center px-4 pb-20 pt-20 sm:px-8">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {balloons.map((balloon) => (
          <motion.div
            key={balloon.id}
            className="absolute"
            style={{ left: `${balloon.left}%`, bottom: "-4rem" }}
            initial={{ y: 0, x: 0, opacity: 0 }}
            animate={{ y: -560, x: [0, balloon.sway, 0], opacity: [0, 0.95, 0.1] }}
            transition={{ duration: balloon.duration, delay: balloon.delay, repeat: Infinity, ease: "easeOut" }}
          >
            <div className={`relative h-20 w-14 rounded-[999px] bg-gradient-to-b ${balloonColors[balloon.id % balloonColors.length]} opacity-80 shadow-md`}>
              <div className="absolute left-3 top-3 h-4 w-2 rounded-full bg-white/60 blur-[0.5px]" />
              <div className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 rounded-b-md bg-white/60" />
            </div>
            <div className="mx-auto h-12 w-px bg-slate-400/60" />
          </motion.div>
        ))}
      </div>

      <div className="grid items-center gap-8 md:grid-cols-[1.2fr_1fr]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="mb-3 inline-block rounded-full bg-white/70 px-4 py-1 text-sm text-ink shadow-sm">5 月 6 日 金牛座</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl md:text-6xl">
            <span className="name-art name-art-5x pb-4 block">Josie</span>
            宝宝一岁啦！
          </h1>
          <p className="mt-5 max-w-xl text-base text-slate-700 sm:text-lg">一起来庆祝这份成长喜悦。</p>
          {/* <a
            href="#rsvp"
            className="mt-8 inline-flex animate-pulseGlow items-center rounded-full bg-gradient-to-r from-partyPink to-partyBlue px-6 py-3 font-medium text-ink shadow-glow transition hover:scale-[1.02]"
          >
            立即查看邀请详情
          </a> */}
        </motion.div>

        <motion.div
          className="mx-auto w-full max-w-sm rounded-[2rem] border border-white/60 bg-white/70 p-5 shadow-xl backdrop-blur"
          initial={{ opacity: 0, rotateY: -20 }}
          animate={{ opacity: 1, rotateY: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="aspect-square rounded-[1.5rem] bg-[radial-gradient(circle_at_30%_20%,#fff_0,#ffe9f0_45%,#b7dcff_100%)] p-4 shadow-inner">
            <div className="relative h-full overflow-visible rounded-[1.2rem] border border-white/60 bg-white/60">
              <div className="h-full overflow-hidden rounded-[1.2rem]">
                <Image
                  src="/1.gif"
                  alt="Josie 可爱动图"
                  width={640}
                  height={640}
                  className="h-full w-full object-cover object-[58%_50%] md:object-center"
                />
              </div>
              <div aria-hidden className="absolute bottom-[-2rem] right-[-1.1rem] rotate-[-14deg] drop-shadow-[0_10px_18px_rgba(0,0,0,0.3)] md:bottom-[-2.2rem] md:right-[-1.8rem]">
                <Image src="/icons/firecracker.svg" alt="" width={120} height={120} className="h-[5.6rem] w-[5.6rem] md:h-[6.6rem] md:w-[6.6rem]" />
              </div>
            </div>
          </div>
          <div className="mt-5 space-y-2 rounded-2xl border border-amber-200 bg-amber-50/70 p-4">
            <p className="font-medium">时间：2026-05-10 12:00pm</p>
            <p className="font-medium">地点：Josie家</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
