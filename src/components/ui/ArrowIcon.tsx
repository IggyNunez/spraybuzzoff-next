export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`inline-block w-[1.1em] h-[1.1em] align-[-0.15em] ml-0.5 transition-transform duration-300 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13,6 19,12 13,18" />
    </svg>
  );
}
