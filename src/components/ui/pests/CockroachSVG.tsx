export function CockroachSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <style>{`
        @keyframes roach-sway-l {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg); }
        }
        @keyframes roach-sway-r {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes roach-twitch {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(0.5px, 0.5px); }
        }
        .roach-ant-l { transform-origin: 48px 28px; animation: roach-sway-l 2s infinite ease-in-out; }
        .roach-ant-r { transform-origin: 52px 28px; animation: roach-sway-r 2s infinite ease-in-out; }
        .roach-leg { animation: roach-twitch 0.4s infinite ease-in-out; }
        .roach-leg-alt { animation: roach-twitch 0.4s infinite ease-in-out -0.2s; }
      `}</style>
      <g fill="#2a1a0a" stroke="#3d2a14" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        {/* Legs */}
        <path className="roach-leg" d="M42 38l-10-5-8 5" fill="none" />
        <path className="roach-leg-alt" d="M58 38l10-5 8 5" fill="none" />
        <path className="roach-leg-alt" d="M38 55l-12 3-8 10" fill="none" />
        <path className="roach-leg" d="M62 55l12 3 8 10" fill="none" />
        <path className="roach-leg" d="M42 72l-12 8-6 10" fill="none" />
        <path className="roach-leg-alt" d="M58 72l12 8 6 10" fill="none" />
        {/* Abdomen - oval */}
        <ellipse cx="50" cy="68" rx="14" ry="20" fill="#2a1a0a" stroke="none" />
        {/* Abdominal segments */}
        <line x1="36" y1="58" x2="64" y2="58" strokeWidth="0.8" opacity="0.5" />
        <line x1="36" y1="65" x2="64" y2="65" strokeWidth="0.8" opacity="0.5" />
        <line x1="37" y1="72" x2="63" y2="72" strokeWidth="0.8" opacity="0.5" />
        <line x1="38" y1="79" x2="62" y2="79" strokeWidth="0.8" opacity="0.5" />
        {/* Pronotum (shield) */}
        <path d="M36 38c0-10 14-13 28 0l-2 14c-8 3-18 3-24 0z" fill="#2a1a0a" stroke="none" />
        {/* Head */}
        <ellipse cx="50" cy="28" rx="8" ry="6" fill="#2a1a0a" stroke="none" />
        {/* Antennae */}
        <path className="roach-ant-l" d="M45 24c-8-10-15-18-22-22" fill="none" strokeWidth="1" />
        <path className="roach-ant-r" d="M55 24c8-10 15-18 22-22" fill="none" strokeWidth="1" />
      </g>
    </svg>
  );
}
