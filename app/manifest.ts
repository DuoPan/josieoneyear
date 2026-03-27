import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "宝宝一岁生日邀请函",
    short_name: "生日邀请",
    description: "宝宝一岁生日派对邀请页",
    start_url: "/",
    display: "standalone",
    background_color: "#fff7ec",
    theme_color: "#ffafcc",
    lang: "zh-CN",
    icons: [
      {
        src: "/icons/icon-192.svg",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "/icons/icon-512.svg",
        sizes: "512x512",
        type: "image/svg+xml"
      }
    ]
  };
}
