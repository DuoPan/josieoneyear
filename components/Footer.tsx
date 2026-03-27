export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-4 pb-14 pt-6 sm:px-8">
      <div className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-lg">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm text-slate-500">微信交流群</p>
            <div className="mt-2 h-24 w-24 rounded-xl border border-dashed border-slate-300 bg-slate-50" />
          </div>
          <p className="font-display text-2xl text-ink">Love from 爸爸妈妈</p>
        </div>
      </div>
    </footer>
  );
}
