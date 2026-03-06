export function QuestionMarkIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="qmVineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4CAF50" />
          <stop offset="100%" stopColor="#1B5E20" />
        </linearGradient>
      </defs>
      <style>{`
        @keyframes qm-pulseSeed {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.1); filter: brightness(1.3); }
        }
        .qm-pulsing-seed {
          animation: qm-pulseSeed 2s ease-in-out infinite;
          transform-origin: 50px 80px;
        }
      `}</style>
      <g>
        <path d="M45 25 C55 20 75 25 70 42 C65 55 50 58 50 70" fill="none" stroke="url(#qmVineGrad)" strokeWidth="9" strokeLinecap="round" />
        <path d="M48 28 C55 24 68 28 65 38" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse className="qm-pulsing-seed" cx="50" cy="85" rx="5" ry="7" fill="#1B5E20" />
      </g>
    </svg>
  );
}
