export function SproutIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }} className={className}>
      <defs>
        <radialGradient id="siLeafGlow" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#D4FC79" />
          <stop offset="100%" stopColor="#155724" />
        </radialGradient>
        <filter id="siNaturalShadow">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" />
        </filter>
      </defs>
      <style>{`
        @keyframes si-sproutGrowth {
          0%, 100% { transform: rotate(-3deg) scale(1); }
          50% { transform: rotate(4deg) scale(1.02); }
        }
        .si-main-stem {
          animation: si-sproutGrowth 5s ease-in-out infinite;
          transform-origin: 60px 110px;
        }
      `}</style>
      <g className="si-main-stem" filter="url(#siNaturalShadow)">
        <path d="M60 110 Q60 70 55 35" fill="none" stroke="#064E3B" strokeWidth="5" strokeLinecap="round" />
        <g transform="translate(55, 35) rotate(-15)">
          <path d="M0 0 C-25 -10 -35 -40 0 -65 C35 -40 25 -10 0 0" fill="url(#siLeafGlow)" />
          <path d="M0 -5 Q-5 -30 0 -60" fill="none" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
        </g>
        <g transform="translate(60, 75) rotate(45)">
          <path d="M0 0 C-15 -10 -20 -25 0 -35 C20 -25 15 -10 0 0" fill="#66BB6A" />
        </g>
      </g>
    </svg>
  );
}
