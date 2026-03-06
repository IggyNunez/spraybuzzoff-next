export function SpiderSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <radialGradient id="spiderBody" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
        <filter id="shadowSpider">
          <feDropShadow dx="2" dy="10" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>
      <style>{`
        .spider-bungee {
          animation: spider-drop 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
        }
        .spider-leg-twitch {
          animation: spider-twitch 0.8s ease-in-out infinite alternate;
          transform-origin: 60px 60px;
        }
        .spider-leg-twitch-alt {
          animation: spider-twitch 0.8s ease-in-out infinite alternate-reverse;
          transform-origin: 60px 60px;
        }
        @keyframes spider-drop {
          0%, 100% { transform: translateY(-40px); }
          50% { transform: translateY(30px); }
        }
        @keyframes spider-twitch {
          0% { transform: scale(1); }
          100% { transform: scale(1.05) rotate(2deg); }
        }
      `}</style>
      <line x1="60" y1="0" x2="60" y2="90" stroke="#ddd" strokeWidth="1" strokeDasharray="2,2" className="spider-bungee" />
      <g className="spider-bungee" filter="url(#shadowSpider)">
        <g className="spider-leg-twitch">
          <path d="M60 60 L30 40 L15 55" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 60 L90 40 L105 55" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 70 L30 80 L20 100" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 70 L90 80 L100 100" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <g className="spider-leg-twitch-alt">
          <path d="M60 65 L25 60 L10 75" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 65 L95 60 L110 75" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 55 L35 30 L25 10" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
          <path d="M60 55 L85 30 L95 10" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <circle cx="60" cy="55" r="8" fill="url(#spiderBody)" />
        <ellipse cx="60" cy="75" rx="14" ry="18" fill="url(#spiderBody)" />
        <path d="M57 70 L63 70 L60 75 L63 80 L57 80 L60 75 Z" fill="#d00" />
      </g>
    </svg>
  );
}
