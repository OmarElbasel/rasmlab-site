/* Lightweight, code-drawn visuals for each service panel. */

export function WebVisual() {
  return (
    <div className="svc-visual relative aspect-[4/3] w-full overflow-clip rounded-2xl border border-line bg-ink-2">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-paper/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <span className="label ml-4 rounded-full bg-paper/5 px-3 py-1 text-[0.6rem] text-paper/50">rasmlab.studio</span>
      </div>
      <div className="grid grid-cols-5 gap-3 p-5">
        <div className="col-span-3 space-y-2">
          <div className="h-7 w-11/12 animate-[shimmer_3s_ease-in-out_infinite] rounded bg-paper/80" />
          <div className="h-7 w-2/3 animate-[shimmer_3s_ease-in-out_0.2s_infinite] rounded bg-paper/80" />
          <div className="mt-4 h-2 w-full rounded bg-paper/15" />
          <div className="h-2 w-5/6 rounded bg-paper/15" />
          <div className="h-2 w-4/6 rounded bg-paper/15" />
          <div className="mt-4 h-8 w-28 rounded-full bg-accent" />
        </div>
        <div className="col-span-2 aspect-square animate-[spin_14s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--accent),var(--accent-2),var(--ink-2),var(--accent))] blur-[2px]" />
      </div>
      <pre className="label absolute inset-x-5 bottom-4 overflow-clip text-[0.6rem] leading-relaxed text-paper/40">
{`<Hero motion="expo.out" scroll="lenis" />
const site = await build({ fast: true, beautiful: true })`}
      </pre>
    </div>
  );
}

export function AppVisual() {
  return (
    <div className="svc-visual relative flex aspect-[4/3] w-full items-center justify-center overflow-clip rounded-2xl border border-line bg-ink-2">
      <div className="relative h-[86%] aspect-[9/19] rounded-[2rem] border-[6px] border-paper/80 bg-ink p-3">
        <div className="mx-auto mb-4 h-4 w-16 rounded-full bg-paper/80" />
        <div className="space-y-2.5">
          <div className="h-20 rounded-xl bg-gradient-to-br from-accent to-accent-2" />
          <div className="h-10 rounded-xl bg-paper/10" />
          <div className="h-10 rounded-xl bg-paper/10" />
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square rounded-lg bg-paper/10" />
            <div className="aspect-square rounded-lg bg-accent/80" />
            <div className="aspect-square rounded-lg bg-paper/10" />
          </div>
        </div>
      </div>
      <div className="absolute left-[8%] top-[18%] animate-[float_5s_ease-in-out_infinite] rounded-xl bg-paper px-4 py-3 text-ink shadow-2xl">
        <div className="label text-[0.6rem]">New order</div>
        <div className="text-lg font-semibold">+ 1,284</div>
      </div>
      <div className="absolute bottom-[16%] right-[8%] animate-[float_6s_ease-in-out_1s_infinite] rounded-xl bg-accent px-4 py-3 text-ink shadow-2xl">
        <div className="label text-[0.6rem]">Rating</div>
        <div className="text-lg font-semibold">4.9 ★</div>
      </div>
    </div>
  );
}

export function AIVisual() {
  const cells = Array.from({ length: 24 });
  return (
    <div className="svc-visual relative aspect-[4/3] w-full overflow-clip rounded-2xl border border-line bg-ink-2 p-5">
      <div className="grid h-full grid-cols-6 grid-rows-4 gap-2">
        {cells.map((_, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              background: `conic-gradient(from ${i * 37}deg, var(--accent), var(--accent-2), var(--paper), var(--accent))`,
              animation: `morph 4s ease-in-out ${(i % 6) * 0.15 + Math.floor(i / 6) * 0.2}s infinite alternate`,
              opacity: 0.35 + ((i * 7) % 10) / 16,
            }}
          />
        ))}
      </div>
      <div className="label absolute bottom-5 left-5 rounded-full bg-ink/80 px-3 py-1.5 text-[0.6rem] text-paper/70 backdrop-blur">
        prompt → “a brand world made of light” ▍
      </div>
    </div>
  );
}
