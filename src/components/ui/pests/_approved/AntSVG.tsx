export function AntSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="antGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#222" />
          <stop offset="50%" stopColor="#444" />
          <stop offset="100%" stopColor="#111" />
        </linearGradient>
        <filter id="shadowAnt">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <style>{`
        .ant-scurry { animation: ant-scurryAnim 0.15s linear infinite alternate; }
        .ant-antenna-l { animation: ant-searchL 0.6s ease-in-out infinite alternate; transform-origin: 56px 20px; }
        .ant-antenna-r { animation: ant-searchR 0.8s ease-in-out infinite alternate; transform-origin: 64px 20px; }
        @keyframes ant-scurryAnim { 0% { transform: translateY(0px); } 100% { transform: translateY(-2px); } }
        @keyframes ant-searchL { 0% { transform: rotate(-10deg); } 100% { transform: rotate(20deg); } }
        @keyframes ant-searchR { 0% { transform: rotate(10deg); } 100% { transform: rotate(-20deg); } }
      `}</style>
      <g filter="url(#shadowAnt)">
        <g className="ant-scurry">
          <path d="M52 40 Q25 15 15 40" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
          <path d="M68 40 Q95 15 105 40" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
          <path d="M50 55 Q20 50 15 70" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
          <path d="M70 55 Q100 50 105 70" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
          <path d="M55 70 Q25 90 20 105" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
          <path d="M65 70 Q95 90 100 105" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round"/>
        </g>
        <ellipse cx="60" cy="28" rx="9" ry="11" fill="url(#antGrad)" />
        <ellipse cx="60" cy="50" rx="7" ry="13" fill="url(#antGrad)" />
        <ellipse cx="60" cy="80" rx="14" ry="20" fill="url(#antGrad)" />
        <path className="ant-antenna-l" d="M56 20 Q40 -5 25 10" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
        <path className="ant-antenna-r" d="M64 20 Q80 -5 95 10" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
}
