"use client";

export function AnimatedSprayCan({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <style>{`
        @keyframes spray-mist-1 {
          0% { cy: 80; cx: 148; opacity: 0; }
          15% { opacity: 0.5; }
          100% { cy: 15; cx: 168; opacity: 0; }
        }
        @keyframes spray-mist-2 {
          0% { cy: 80; cx: 148; opacity: 0; }
          15% { opacity: 0.5; }
          100% { cy: 10; cx: 180; opacity: 0; }
        }
        @keyframes spray-mist-3 {
          0% { cy: 80; cx: 148; opacity: 0; }
          15% { opacity: 0.4; }
          100% { cy: 30; cx: 160; opacity: 0; }
        }
        @keyframes spray-mist-4 {
          0% { cy: 80; cx: 148; opacity: 0; }
          15% { opacity: 0.5; }
          100% { cy: 5; cx: 190; opacity: 0; }
        }
        @keyframes spray-mist-5 {
          0% { cy: 80; cx: 148; opacity: 0; }
          15% { opacity: 0.4; }
          100% { cy: 40; cx: 172; opacity: 0; }
        }
        @keyframes spray-nozzle-press {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(3px); }
        }
        .mist-1 { animation: spray-mist-1 1.5s infinite ease-out 0s; }
        .mist-2 { animation: spray-mist-2 1.5s infinite ease-out 0.3s; }
        .mist-3 { animation: spray-mist-3 1.5s infinite ease-out 0.6s; }
        .mist-4 { animation: spray-mist-4 1.5s infinite ease-out 0.9s; }
        .mist-5 { animation: spray-mist-5 1.5s infinite ease-out 1.2s; }
        .spray-nozzle { animation: spray-nozzle-press 1.5s infinite ease-in-out; }
      `}</style>

      {/* Mist particles */}
      <circle className="mist-1" cx="148" cy="80" r="4" fill="white" opacity="0" />
      <circle className="mist-2" cx="148" cy="80" r="5" fill="white" opacity="0" />
      <circle className="mist-3" cx="148" cy="80" r="3" fill="white" opacity="0" />
      <circle className="mist-4" cx="148" cy="80" r="6" fill="white" opacity="0" />
      <circle className="mist-5" cx="148" cy="80" r="4" fill="white" opacity="0" />

      {/* Can body */}
      <rect x="60" y="110" width="80" height="165" rx="10" fill="#1a3a2a" />
      {/* Can shoulder */}
      <path d="M60 120 Q60 95 100 95 Q140 95 140 120" fill="#1a3a2a" />
      {/* Can bottom cap */}
      <ellipse cx="100" cy="275" rx="40" ry="6" fill="#0f2318" />

      {/* Label stripe */}
      <rect x="60" y="145" width="80" height="45" fill="#c9a84c" opacity="0.15" rx="2" />
      {/* Brand stripe */}
      <rect x="60" y="155" width="80" height="3" fill="#c9a84c" opacity="0.4" />
      <rect x="60" y="179" width="80" height="3" fill="#c9a84c" opacity="0.4" />

      {/* Nozzle assembly */}
      <g className="spray-nozzle" style={{ transformOrigin: "100px 90px" }}>
        <rect x="85" y="78" width="30" height="20" rx="3" fill="#c9a84c" />
        {/* Nozzle tip pointing right */}
        <rect x="115" y="82" width="20" height="8" rx="2" fill="#c9a84c" />
        <circle cx="135" cy="86" r="3" fill="#0f2318" />
      </g>

      {/* Top cap */}
      <ellipse cx="100" cy="95" rx="40" ry="7" fill="#0f2318" />
    </svg>
  );
}
