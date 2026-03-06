export function SilverfishSVG({ className = "" }: { className?: string }) {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="50%" stopColor="#808080" />
          <stop offset="100%" stopColor="#A9A9A9" />
        </linearGradient>
      </defs>
      <style>{`
        .sf-segment { transform-origin: 60px 20px; animation: sf-wiggle 0.6s ease-in-out infinite alternate; }
        @keyframes sf-wiggle {
          0% { transform: rotate(-3deg) translateX(-1px); }
          100% { transform: rotate(3deg) translateX(1px); }
        }
      `}</style>
      <g transform="translate(0, 10)">
        <ellipse cx="60" cy="25" rx="7" ry="9" fill="url(#silverGrad)" />
        <path d="M57 20 Q40 -5 10 5" fill="none" stroke="#888" strokeWidth="1" />
        <path d="M63 20 Q80 -5 110 5" fill="none" stroke="#888" strokeWidth="1" />
        <g className="sf-segment" style={{ animationDelay: "0s" }}>
          <ellipse cx="60" cy="38" rx="8" ry="6" fill="url(#silverGrad)" />
          <g className="sf-segment" style={{ animationDelay: "0.1s" }}>
            <ellipse cx="60" cy="48" rx="7" ry="5" fill="url(#silverGrad)" />
            <g className="sf-segment" style={{ animationDelay: "0.2s" }}>
              <ellipse cx="60" cy="58" rx="6" ry="5" fill="url(#silverGrad)" />
              <g className="sf-segment" style={{ animationDelay: "0.3s" }}>
                <ellipse cx="60" cy="68" rx="5" ry="5" fill="url(#silverGrad)" />
                <g className="sf-segment" style={{ animationDelay: "0.4s" }}>
                  <ellipse cx="60" cy="78" rx="3" ry="6" fill="url(#silverGrad)" />
                  <path d="M60 84 L60 105 M60 84 L40 100 M60 84 L80 100" fill="none" stroke="#888" strokeWidth="1" />
                </g>
              </g>
            </g>
          </g>
        </g>
        <path d="M52 35 L40 32 M68 35 L80 32 M52 45 L40 45 M68 45 L80 45 M52 55 L42 58 M68 55 L78 58" stroke="#888" strokeWidth="1" />
      </g>
    </svg>
  );
}
