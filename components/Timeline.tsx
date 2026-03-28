"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

type TimelineItem = {
  month: number;
  title: string;
  description: string;
  media: [string];
};

type PetalOffset = {
  x: number;
  y: number;
  r: number;
};

const baseMedia: [string] = ["/baby-photos/placeholder-1.svg"];
const firstMonthMedia: [string] = ["/baby-photos/1.1.mp4"];
const secondMonthMedia: [string] = ["/baby-photos/2.1.mp4"];
const thirdMonthMedia: [string] = ["/baby-photos/3.1.mp4"];
const fourthMonthMedia: [string] = ["/baby-photos/4.1.mp4"];
const fifthMonthMedia: [string] = ["/baby-photos/5.1.mp4"];
const sixthMonthMedia: [string] = ["/baby-photos/6.1.mp4"];
const seventhMonthMedia: [string] = ["/baby-photos/7.1.mp4"];
const eighthMonthMedia: [string] = ["/baby-photos/8.1.mp4"];
const ninthMonthMedia: [string] = ["/baby-photos/9.1.mp4"];
const tenthMonthMedia: [string] = ["/baby-photos/10.1.mp4"];

const monthDescriptions = [
  "这是个摇晃的世界。。。",
  "锻炼身体，努力抬头。",
  "终于能看清爸妈了，露出了微笑。",
  "前庭运动+哄娃神器，爱上了旋转和飞翔。",
  "不仅能抬头，还能抗住两枚口水弹",
  "初尝辅食，爱了爱了！",
  "吃饱喝好，备战高考。",
  "I人社交练习中。",
  "电量扩容，可以出门吃饭了。",
  "匍匐前进，向怀抱冲刺！",
  "。",
  "。"
];

const items: TimelineItem[] = Array.from({ length: 12 }, (_, i) => {
  const month = i + 1;
  const media =
    month === 1
      ? firstMonthMedia
      : month === 2
        ? secondMonthMedia
        : month === 3
          ? thirdMonthMedia
          : month === 4
            ? fourthMonthMedia
            : month === 5
              ? fifthMonthMedia
              : month === 6
                ? sixthMonthMedia
                : month === 7
                  ? seventhMonthMedia
                  : month === 8
                    ? eighthMonthMedia
                    : month === 9
                      ? ninthMonthMedia
                      : month === 10
                        ? tenthMonthMedia
            : baseMedia;
  return {
    month,
    title: `第 ${month} 月`,
    description: monthDescriptions[i],
    media
  };
});
const INITIAL_VISIBLE_MONTHS = 4;
const MONTHS_PER_BATCH = 4;

function isVideoSrc(src: string) {
  return /\.(mp4|webm|mov)$/i.test(src);
}

function seededRandom(seed: number) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildMonthPetalLayout(month: number, petalCount: number): PetalOffset[] {
  const rand = seededRandom(month * 97);
  const arcStart = -120;
  const arcEnd = 120;
  const step = petalCount > 1 ? (arcEnd - arcStart) / (petalCount - 1) : 0;
  const groupShift = (rand() * 20) - 10;

  return Array.from({ length: petalCount }, (_, idx) => {
    const baseAngle = arcStart + idx * step;
    const angleJitter = (rand() * 12) - 6;
    const radiusJitter = (rand() * 20) - 10;
    const rotateJitter = (rand() * 18) - 9;
    const radius = 108 + radiusJitter;
    const angle = (baseAngle + groupShift + angleJitter) * (Math.PI / 180);

    return {
      x: Math.round(Math.cos(angle) * radius),
      y: Math.round(Math.sin(angle) * radius),
      r: Math.round((baseAngle / 4) + rotateJitter)
    };
  });
}

function TimelinePhotoBloom({
  media,
  onPhotoClick
}: {
  media: string[];
  onPhotoClick: (photoIndex: number) => void;
}) {
  return (
    <div className="relative mx-auto h-60 w-full max-w-[22rem] md:h-64 md:w-64 md:max-w-none">
      {/* Blossom effect kept for future restore.
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-partyPink/25 blur-xl md:h-52 md:w-52"
        animate={{ opacity: active ? 0.95 : 0, scale: active ? 1.15 : 0.6 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      ...petal media map block...
      */}

      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <button
          type="button"
          className="relative h-52 w-[calc(100%-0.5rem)] appearance-none overflow-hidden rounded-2xl border-0 border-transparent bg-transparent p-0 shadow-none transition hover:scale-105 md:h-52 md:w-[calc(100%-0.5rem)]"
          onClick={(event) => {
            event.stopPropagation();
            onPhotoClick(0);
          }}
          aria-label="查看主照片"
        >
          {isVideoSrc(media[0]) ? (
            <video
              className="h-full w-full object-cover"
              muted
              loop
              autoPlay
              playsInline
              webkit-playsinline="true"
              x5-playsinline="true"
              x5-video-player-type="h5"
              x5-video-player-fullscreen="false"
              preload="metadata"
              poster="/baby-photos/placeholder-1.svg"
            >
              <source src={media[0]} />
            </video>
          ) : (
            <Image src={media[0]} alt="主成长照片" fill sizes="(min-width: 768px) 160px, 92vw" className="object-cover" />
          )}
        </button>
      </div>
    </div>
  );
}

type ModalState = {
  month: number;
  media: string[];
  activeIndex: number;
};

export function Timeline() {
  const [activeMonth, setActiveMonth] = useState<number | null>(null);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_MONTHS);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = useMemo(() => items.slice(0, visibleCount), [visibleCount]);
  // Blossom layout retained for future restore:
  // const monthLayouts = useMemo(
  //   () =>
  //     Object.fromEntries(
  //       items.map((item) => [item.month, buildMonthPetalLayout(item.month, item.media.length - 1)])
  //     ) as Record<number, PetalOffset[]>,
  //   []
  // );

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target) return;
    if (visibleCount >= items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry.isIntersecting) return;
        setVisibleCount((prev) => Math.min(prev + MONTHS_PER_BATCH, items.length));
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [visibleCount]);

  useEffect(() => {
    if (!modal) return;
    if (!isVideoSrc(modal.media[modal.activeIndex])) return;

    const imageSources = modal.media.filter((src, index) => index !== modal.activeIndex && !isVideoSrc(src));
    if (imageSources.length === 0) return;

    // When current slide is video, warm up sibling images for fast switching.
    imageSources.forEach((src) => {
      const img = new window.Image();
      img.decoding = "async";
      img.src = src;
    });
  }, [modal]);

  function openModal(month: number, media: string[], activeIndex: number) {
    const firstVideoIndex = media.findIndex((item) => isVideoSrc(item));
    const startIndex = firstVideoIndex >= 0 ? firstVideoIndex : activeIndex;
    setModal({ month, media, activeIndex: startIndex });
    setModalLoading(true);
  }

  function closeModal() {
    setModal(null);
    setModalLoading(false);
  }

  function moveSlide(direction: 1 | -1) {
    setModal((prev) => {
      if (!prev) return prev;
      const nextIndex = (prev.activeIndex + direction + prev.media.length) % prev.media.length;
      setModalLoading(true);
      return { ...prev, activeIndex: nextIndex };
    });
  }

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-0 py-16 md:px-8">
        {/* <div className="px-4 md:px-0">
          <h2 className="font-display text-3xl text-ink sm:text-4xl">成长时间线</h2>
          <p className="mt-2 text-slate-600">沿着时间线，看宝宝每个月的小变化</p>
        </div> */}

        <div className="relative mt-12">
          <svg
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-24 -translate-x-1/2 md:block"
            viewBox="0 0 100 1200"
            preserveAspectRatio="none"
          >
            <path d="M50 0 C 84 120, 18 240, 50 360 C 82 480, 24 600, 50 720 C 78 840, 20 960, 50 1080 C 70 1140, 44 1200, 50 1200" fill="none" stroke="#14b8e6" strokeWidth="3" />
          </svg>

          <div className="space-y-12 md:space-y-10">
            {visibleItems.map((item, index) => {
              const isLeft = index % 2 === 0;
              // const isActive = activeMonth === item.month;

              return (
                <div
                  key={item.month}
                  className="grid items-center gap-4 md:grid-cols-[1fr_64px_1fr]"
                  onMouseEnter={() => setActiveMonth(item.month)}
                  onMouseLeave={() => setActiveMonth(null)}
                >
                  <article
                    className={`bg-transparent rounded-none md:bg-white/85 p-4 shadow-lg backdrop-blur transition md:rounded-3xl md:border ${isLeft ? "md:col-start-1" : "md:col-start-3"}`}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <TimelinePhotoBloom
                        media={item.media}
                        onPhotoClick={(photoIndex) => openModal(item.month, item.media, photoIndex)}
                      />
                      <div className="text-center sm:text-left">
                        <p className="text-sm font-semibold text-sky-600">Month {item.month}</p>
                        <h3 className="mt-1 text-xl font-semibold text-ink">{item.title}</h3>
                        <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                      </div>
                    </div>
                  </article>

                  <div className="relative mx-auto hidden h-full min-h-16 w-16 md:block">
                    <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-sky-500 shadow" />
                    <span className={`absolute top-1/2 h-px w-8 bg-slate-300 ${isLeft ? "left-0 -translate-x-full" : "right-0 translate-x-full"}`} />
                  </div>
                </div>
              );
            })}
            {visibleCount < items.length ? <div ref={loadMoreRef} className="h-10" aria-hidden /> : null}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {modal ? (
          <motion.div
            className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="relative w-full max-w-4xl rounded-3xl bg-white p-4 shadow-2xl sm:p-6"
              initial={{ scale: 0.95, y: 8, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 8, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-sky-600">
                  Month {modal.month} · {modal.activeIndex + 1} / {modal.media.length}
                </p>
                <button type="button" className="rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600" onClick={closeModal}>
                  关闭
                </button>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-100">
                {modalLoading ? (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-white/60 backdrop-blur-[1px]">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-partyBlue/30 border-t-partyPink" />
                  </div>
                ) : null}
                {isVideoSrc(modal.media[modal.activeIndex]) ? (
                  <video
                    className="h-full w-full object-cover"
                    controls
                    autoPlay
                    playsInline
                    webkit-playsinline="true"
                    x5-playsinline="true"
                    x5-video-player-type="h5"
                    x5-video-player-fullscreen="false"
                    preload="metadata"
                    poster="/baby-photos/placeholder-1.svg"
                    onCanPlay={() => setModalLoading(false)}
                  >
                    <source src={modal.media[modal.activeIndex]} />
                  </video>
                ) : (
                  <Image
                    src={modal.media[modal.activeIndex]}
                    alt={`第 ${modal.activeIndex + 1} 张照片`}
                    fill
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover"
                    onLoadingComplete={() => setModalLoading(false)}
                  />
                )}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  onClick={() => moveSlide(-1)}
                >
                  ← 上一张
                </button>
                <button
                  type="button"
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  onClick={() => moveSlide(1)}
                >
                  下一张 →
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
