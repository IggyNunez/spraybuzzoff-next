export function EarwigSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="earwigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5c4033" />
          <stop offset="100%" stopColor="#2c1e16" />
        </linearGradient>
        <filter id="earwig-shadow">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <style>{`
        .pincer-l { animation: earwig-snapL 1.2s cubic-bezier(0.8, 0, 0.2, 1) infinite; transform-origin: 52px 85px; }
        .pincer-r { animation: earwig-snapR 1.2s cubic-bezier(0.8, 0, 0.2, 1) infinite; transform-origin: 68px 85px; }
        @keyframes earwig-snapL { 0%, 100% { transform: rotate(0deg); } 40%, 60% { transform: rotate(35deg); } }
        @keyframes earwig-snapR { 0%, 100% { transform: rotate(0deg); } 40%, 60% { transform: rotate(-35deg); } }
        .earwig-bob { animation: earwig-bob 2s ease-in-out infinite; }
        @keyframes earwig-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
      `}</style>
      <g filter="url(#earwig-shadow)" className="earwig-bob">
        <path d="M50 40 Q25 30 20 50" fill="none" stroke="#2c1e16" strokeWidth="3" strokeLinecap="round"/>
        <path d="M70 40 Q95 30 100 50" fill="none" stroke="#2c1e16" strokeWidth="3" strokeLinecap="round"/>
        <path d="M52 60 Q25 60 20 75" fill="none" stroke="#2c1e16" strokeWidth="3" strokeLinecap="round"/>
        <path d="M68 60 Q95 60 100 75" fill="none" stroke="#2c1e16" strokeWidth="3" strokeLinecap="round"/>

        <rect x="52" y="35" width="16" height="50" rx="8" fill="url(#earwigGrad)" />
        <circle cx="60" cy="25" r="9" fill="#3a2e26" />

        <path d="M56 20 Q40 0 35 15" fill="none" stroke="#3a2e26" strokeWidth="2" strokeLinecap="round"/>
        <path d="M64 20 Q80 0 85 15" fill="none" stroke="#3a2e26" strokeWidth="2" strokeLinecap="round"/>

        <path className="pincer-l" d="M 52 80 Q 35 105 52 115 Q 47 100 55 85 Z" fill="#2c1e16" />
        <path className="pincer-r" d="M 68 80 Q 85 105 68 115 Q 73 100 65 85 Z" fill="#2c1e16" />
      </g>
    </svg>
  );
}
