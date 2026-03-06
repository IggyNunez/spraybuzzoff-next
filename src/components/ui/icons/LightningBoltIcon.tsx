export function LightningBoltIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="boltGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF8C00" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
        <filter id="boltGlow">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d="M23 4L10 22H20L17 36L30 18H20L23 4Z"
        fill="url(#boltGrad)"
        filter="url(#boltGlow)"
        strokeLinejoin="round"
      />
      <path
        d="M23 4L10 22H20L17 36L30 18H20L23 4Z"
        fill="none"
        stroke="#FFD700"
        strokeWidth="0.5"
        opacity="0.6"
      />
    </svg>
  );
}
