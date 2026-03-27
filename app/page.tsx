import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
// import { Gallery } from "@/components/Gallery";
import { RSVPForm } from "@/components/RSVPForm";
// import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_15%_20%,rgba(162,210,255,0.55),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(255,175,204,0.4),transparent_30%),linear-gradient(180deg,#fff9ef_0%,#f7fbff_45%,#fff2f6_100%)]" />
      <Hero />
      <Timeline />
      {/* <Gallery /> */}
      <RSVPForm />
      {/* <Footer /> */}
    </main>
  );
}
