export function WaspSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="waspGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="30%" stopColor="#000" />
          <stop offset="60%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
        <filter id="waspShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="4" floodOpacity="0.4" />
        </filter>
      </defs>
      <style>{`
        .wasp-body { animation: hoverWasp 0.2s ease-in-out infinite alternate; }
        .wing-l { animation: flapWaspL 0.04s linear infinite alternate; transform-origin: 60px 45px; }
        .wing-r { animation: flapWaspR 0.04s linear infinite alternate; transform-origin: 60px 45px; }
        @keyframes hoverWasp { from { transform: translateY(0); } to { transform: translateY(-4px); } }
        @keyframes flapWaspL { from { transform: rotate(0deg) skewY(0deg); } to { transform: rotate(-30deg) skewY(-10deg); } }
        @keyframes flapWaspR { from { transform: rotate(0deg) skewY(0deg); } to { transform: rotate(30deg) skewY(10deg); } }
      `}</style>
      <g filter="url(#waspShadow)">
        <path className="wing-l" d="M60 45 Q30 10 10 35 Q30 50 60 45" fill="rgba(200, 200, 255, 0.3)" stroke="#fff" />
        <path className="wing-r" d="M60 45 Q90 10 110 35 Q90 50 60 45" fill="rgba(200, 200, 255, 0.3)" stroke="#fff" />
        <g className="wasp-body">
          <path d="M55 50 L35 70 M65 50 L85 70 M58 60 L40 85 M62 60 L80 85" stroke="#000" strokeWidth="2" />
          <circle cx="60" cy="35" r="6" fill="#000" />
          <path d="M58 30 Q50 15 40 20 M62 30 Q70 15 80 20" fill="none" stroke="#000" strokeWidth="1.5" />
          <ellipse cx="60" cy="50" rx="8" ry="10" fill="#000" />
          <path d="M60 60 Q75 80 60 110 Q45 80 60 60" fill="url(#waspGrad)" />
        </g>
      </g>
    </svg>
  );
}
