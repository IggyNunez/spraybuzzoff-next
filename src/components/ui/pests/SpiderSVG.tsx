export function SpiderSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <style>{`
        @keyframes spider-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spider-osc {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes spider-osc-alt {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-2deg); }
        }
        .spider-abdomen { transform-origin: 50px 70px; animation: spider-pulse 2s ease-in-out infinite; }
        .spider-legs-a { transform-origin: 50px 45px; animation: spider-osc 1.5s ease-in-out infinite; }
        .spider-legs-b { transform-origin: 50px 45px; animation: spider-osc-alt 1.7s ease-in-out infinite; }
      `}</style>
      <g fill="none" stroke="#1a1a2e" strokeWidth="3" strokeLinecap="round">
        <g className="spider-legs-a">
          <path d="M42,42 C25,30 15,35 10,55" />
          <path d="M58,42 C75,30 85,35 90,55" />
        </g>
        <g className="spider-legs-b">
          <path d="M40,46 C20,45 10,55 8,75" />
          <path d="M60,46 C80,45 90,55 92,75" />
        </g>
        <g className="spider-legs-a">
          <path d="M42,52 C25,60 15,75 22,92" />
          <path d="M58,52 C75,60 85,75 78,92" />
        </g>
        <g className="spider-legs-b">
          <path d="M45,55 C35,75 32,85 40,96" />
          <path d="M55,55 C65,75 68,85 60,96" />
        </g>
      </g>
      <circle className="spider-abdomen" cx="50" cy="70" r="20" fill="#1a1a2e" />
      <circle cx="50" cy="45" r="14" fill="#1a1a2e" />
      <g fill="#ffffff" opacity="0.8">
        <circle cx="46" cy="41" r="1.2" />
        <circle cx="50" cy="40" r="1.2" />
        <circle cx="54" cy="41" r="1.2" />
        <circle cx="43" cy="45" r="1" />
        <circle cx="57" cy="45" r="1" />
        <circle cx="46" cy="49" r="1.1" />
        <circle cx="50" cy="50" r="1.1" />
        <circle cx="54" cy="49" r="1.1" />
      </g>
    </svg>
  );
}
