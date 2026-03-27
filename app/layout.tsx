import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { CursorGlow } from "@/components/CursorGlow";
import { SWRegister } from "@/components/SWRegister";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "700"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "宝宝一岁生日邀请函",
  description: "欢迎来参加宝宝一岁生日派对，期待和你一起庆祝。",
  openGraph: {
    title: "宝宝一岁生日邀请函",
    description: "欢迎来参加宝宝一岁生日派对，期待和你一起庆祝。",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body className={`${playfair.variable} ${poppins.variable} bg-slate-50 text-ink antialiased`}>
        <CursorGlow />
        <SWRegister />
        {children}
      </body>
    </html>
  );
}
