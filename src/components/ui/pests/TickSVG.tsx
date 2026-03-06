export function TickSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="bloodGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#8b0000" />
          <stop offset="100%" stopColor="#2b1a1a" />
        </radialGradient>
        <filter id="shadowTick">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      <style>{`
        .tick-engorge { animation: tick-swell 4s ease-in-out infinite; transform-origin: 60px 55px; }
        .tick-leg-wiggle { animation: tick-writhe 1s ease-in-out infinite alternate; transform-origin: 60px 55px; }
        @keyframes tick-swell {
          0%, 100% { transform: scale(1); fill: #2b1a1a; }
          50% { transform: scale(1.15); fill: url(#bloodGrad); }
        }
        @keyframes tick-writhe { 0% { transform: rotate(-3deg); } 100% { transform: rotate(3deg); } }
      `}</style>
      <g filter="url(#shadowTick)">
        <g className="tick-leg-wiggle">
          <path d="M40 40 L20 30" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M35 50 L15 50" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M38 60 L18 70" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M45 70 L25 85" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M80 40 L100 30" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M85 50 L105 50" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M82 60 L102 70" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
          <path d="M75 70 L95 85" stroke="#1a1010" strokeWidth="4" strokeLinecap="round"/>
        </g>
        <ellipse className="tick-engorge" cx="60" cy="55" rx="22" ry="30" />
        <path d="M48 32 Q60 50 72 32 Q60 18 48 32 Z" fill="#111" />
      </g>
    </svg>
  );
}
