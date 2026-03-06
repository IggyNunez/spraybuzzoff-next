export function CockroachSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="roachShell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#703f23" />
          <stop offset="50%" stopColor="#3d1d0c" />
          <stop offset="100%" stopColor="#1f0e05" />
        </linearGradient>
        <filter id="shadowRoach">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      <style>{`
        .roach-dart { animation: roach-scurry 4s steps(4, end) infinite; }
        .roach-ant-l { animation: roach-whipL 1.5s ease-in-out infinite alternate; transform-origin: 55px 25px; }
        .roach-ant-r { animation: roach-whipR 1.2s ease-in-out infinite alternate; transform-origin: 65px 25px; }
        @keyframes roach-scurry {
          0%, 70% { transform: translate(0, 0); }
          75% { transform: translate(-5px, -5px) rotate(-3deg); }
          85% { transform: translate(5px, 2px) rotate(2deg); }
          100% { transform: translate(0, 0); }
        }
        @keyframes roach-whipL { 0% { transform: rotate(-5deg); } 100% { transform: rotate(15deg); } }
        @keyframes roach-whipR { 0% { transform: rotate(5deg); } 100% { transform: rotate(-15deg); } }
      `}</style>
      <g className="roach-dart" filter="url(#shadowRoach)">
        <path d="M50 40 Q30 30 20 20 M70 40 Q90 30 100 20" fill="none" stroke="#221108" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M50 60 Q25 60 15 65 M70 60 Q95 60 105 65" fill="none" stroke="#221108" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M55 80 Q30 95 25 105 M65 80 Q90 95 95 105" fill="none" stroke="#221108" strokeWidth="2.5" strokeLinecap="round"/>
        <path className="roach-ant-l" d="M55 25 Q40 -10 15 5" fill="none" stroke="#3d1d0c" strokeWidth="1.5" strokeLinecap="round"/>
        <path className="roach-ant-r" d="M65 25 Q80 -10 105 5" fill="none" stroke="#3d1d0c" strokeWidth="1.5" strokeLinecap="round"/>
        <ellipse cx="60" cy="32" rx="14" ry="11" fill="url(#roachShell)" />
        <path d="M46 35 Q38 65 48 95 Q60 105 72 95 Q82 65 74 35 Z" fill="url(#roachShell)" />
        <line x1="60" y1="35" x2="60" y2="98" stroke="#1f0e05" strokeWidth="1.5" />
        <path d="M50 45 Q60 55 60 90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
      </g>
    </svg>
  );
}
