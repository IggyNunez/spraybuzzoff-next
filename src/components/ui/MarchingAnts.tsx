export function MarchingAnts({ className = "" }: { className?: string }) {
  return (
    <svg
      width="100%"
      height="40"
      viewBox="0 0 1000 40"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className={className}
    >
      <defs>
        <pattern id="antPattern" x="0" y="0" width="80" height="40" patternUnits="userSpaceOnUse">
          <style>{`
            @keyframes march-scurry {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-1.5px); }
            }
            .march-ant-body { fill: #333; }
            .march-scurry-legs { animation: march-scurry 0.1s linear infinite alternate; }
          `}</style>
          <g transform="translate(10, 10)">
            <g className="march-scurry-legs">
              <path d="M15 15 Q5 5 -5 15" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M25 15 Q15 20 10 30" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <g className="march-scurry-legs" style={{ animationDelay: "0.05s" }}>
              <path d="M35 15 Q45 5 55 15" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M25 15 Q35 20 40 30" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"/>
            </g>
            <ellipse cx="25" cy="18" rx="5" ry="8" className="march-ant-body" />
            <ellipse cx="12" cy="12" rx="4" ry="6" className="march-ant-body" />
            <ellipse cx="40" cy="22" rx="8" ry="12" className="march-ant-body" />
            <path d="M10 8 Q0 -5 -10 0" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
            <path d="M14 8 Q24 -5 34 0" fill="none" stroke="#333" strokeWidth="1.2" strokeLinecap="round"/>
          </g>
        </pattern>
      </defs>
      <style>{`
        @keyframes march {
          0% { x: 0; }
          100% { x: 80; }
        }
        .marching-line {
          fill: url(#antPattern);
          animation: march 4s linear infinite;
        }
      `}</style>
      <rect className="marching-line" width="100%" height="40" />
    </svg>
  );
}
