/**
 * Rasmlab mark: a geometric lowercase "r" closed by a diamond full stop, the
 * nuqta, the pen dot Arabic calligraphers measure every letter in. Same
 * geometry as app/icon.svg. Uses currentColor so it follows the nav's
 * mix-blend-difference; pass `accent` to paint the nuqta in the brand orange.
 */
export function LogoMark({ className, accent = false }: { className?: string; accent?: boolean }) {
  return (
    <svg viewBox="13 16 39 33.5" className={className} fill="currentColor" aria-hidden>
      <path d="M14 48V33a16 16 0 0 1 16-16h4v11h-4a5 5 0 0 0-5 5v15Z" />
      <path d="M44.5 35.5 51 42l-6.5 6.5L38 42Z" className={accent ? "fill-accent" : undefined} />
    </svg>
  );
}
