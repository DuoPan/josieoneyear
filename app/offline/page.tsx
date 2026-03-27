import Link from "next/link";

export default function OfflinePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-4xl text-ink">当前离线中</h1>
      <p className="mt-4 text-slate-600">你仍可以查看已缓存的邀请内容，联网后可继续提交报名。</p>
      <Link href="/" className="mt-8 rounded-full bg-partyPink px-6 py-3 font-semibold text-ink transition hover:opacity-90">
        返回邀请页
      </Link>
    </main>
  );
}
