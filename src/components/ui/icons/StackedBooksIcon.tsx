export function StackedBooksIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="25" y="15" width="50" height="70" rx="4" fill="#5D4037" />
      <rect x="25" y="15" width="10" height="70" rx="2" fill="#3E2723" />
      <g stroke="#D4AF37" strokeWidth="1.5" opacity="0.6">
        <line x1="27" y1="30" x2="33" y2="30" />
        <line x1="27" y1="50" x2="33" y2="50" />
        <line x1="27" y1="70" x2="33" y2="70" />
      </g>
      <path d="M45 35 H65 M45 45 H60 M45 55 H65" stroke="white" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
