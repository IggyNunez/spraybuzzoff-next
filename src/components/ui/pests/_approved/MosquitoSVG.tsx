export function MosquitoSVG({ className = "" }: { className?: string }) {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <radialGradient id="mosq-abdomenGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c8956c" />
          <stop offset="100%" stopColor="#8b5a2b" />
        </radialGradient>
        <filter id="mosq-shadow">
          <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <style>{`
        .mosq-hover { animation: mosq-drone 3s ease-in-out infinite; }
        .mosq-wing-l { animation: mosq-flapL 0.05s linear infinite alternate; transform-origin: 55px 45px; }
        .mosq-wing-r { animation: mosq-flapR 0.05s linear infinite alternate; transform-origin: 65px 45px; }
        .mosq-blood { animation: mosq-feed 3s ease-in-out infinite; }

        @keyframes mosq-drone { 0%, 100% { transform: translateY(-3px) translateX(1px); } 50% { transform: translateY(3px) translateX(-1px); } }
        @keyframes mosq-flapL { 0% { transform: rotate(-20deg); } 100% { transform: rotate(20deg); } }
        @keyframes mosq-flapR { 0% { transform: rotate(20deg); } 100% { transform: rotate(-20deg); } }
        @keyframes mosq-feed { 0%, 100% { fill: url(#mosq-abdomenGrad); } 50% { fill: #7a2020; } }
      `}</style>
      <g className="mosq-hover">
        <path d="M55 40 Q30 20 20 15 M65 40 Q90 20 100 15" fill="none" stroke="#c8956c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M55 50 Q25 55 15 65 M65 50 Q95 55 105 65" fill="none" stroke="#c8956c" strokeWidth="2" strokeLinecap="round"/>
        <path d="M58 65 Q40 95 30 105 M62 65 Q80 95 90 105" fill="none" stroke="#c8956c" strokeWidth="2" strokeLinecap="round"/>

        <line x1="60" y1="35" x2="60" y2="5" stroke="#d4a96a" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="60" cy="35" r="5" fill="#a0622a" />

        <ellipse cx="60" cy="48" rx="7" ry="10" fill="#8b5a2b" />

        <ellipse className="mosq-blood" cx="60" cy="72" rx="6" ry="18" fill="url(#mosq-abdomenGrad)" />
        <path d="M55 65 L65 65 M54 70 L66 70 M54 75 L66 75 M55 80 L65 80" stroke="#8b5a2b" strokeWidth="1.5"/>
        <ellipse className="mosq-wing-l" cx="42" cy="55" rx="8" ry="25" transform="rotate(45 42 55)" fill="rgba(200, 220, 255, 0.35)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
        <ellipse className="mosq-wing-r" cx="78" cy="55" rx="8" ry="25" transform="rotate(-45 78 55)" fill="rgba(200, 220, 255, 0.35)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
      </g>
    </svg>
  );
}
