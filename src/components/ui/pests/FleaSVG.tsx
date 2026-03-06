export function FleaSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="fleaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5c2b16" />
          <stop offset="100%" stopColor="#241007" />
        </linearGradient>
        <filter id="shadowFlea">
          <feDropShadow dx="2" dy="5" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <style>{`
        .flea-jump {
          animation: fleaJump 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
          transform-origin: 60px 90px;
        }
        @keyframes fleaJump {
          0%, 75%, 100% { transform: translateY(0) scale(1, 1); }
          80% { transform: translateY(8px) scale(1.15, 0.85); }
          85% { transform: translateY(-35px) scale(0.85, 1.15); }
          92% { transform: translateY(0) scale(1.1, 0.9); }
        }
        .flea-kick { animation: flea-kick 2s cubic-bezier(0.25, 1, 0.5, 1) infinite; transform-origin: 50px 80px; }
        @keyframes flea-kick {
          0%, 75%, 100% { transform: rotate(0deg); }
          85% { transform: rotate(20deg); }
        }
      `}</style>
      <g className="flea-jump" filter="url(#shadowFlea)">
        <path className="flea-kick" d="M 50 80 L 35 105 L 55 110" fill="none" stroke="#241007" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M 65 85 L 75 105" fill="none" stroke="#241007" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 75 80 L 90 95" fill="none" stroke="#241007" strokeWidth="3" strokeLinecap="round"/>
        <path d="M 35 70 C 35 35, 75 30, 90 55 C 95 65, 95 80, 85 85 C 65 95, 45 90, 35 70 Z" fill="url(#fleaGrad)"/>
        <circle cx="80" cy="55" r="3" fill="#111" />
        <path d="M 90 65 L 98 75" fill="none" stroke="#241007" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
