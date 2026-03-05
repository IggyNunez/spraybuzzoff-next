export function AntSVG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <style>{`
        @keyframes ant-sway-l {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-8deg); }
        }
        @keyframes ant-sway-r {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(8deg); }
        }
        @keyframes ant-twitch {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(0.5px, 0.5px); }
        }
        .ant-antenna-l { transform-origin: 48px 28px; animation: ant-sway-l 2s infinite ease-in-out; }
        .ant-antenna-r { transform-origin: 52px 28px; animation: ant-sway-r 2s infinite ease-in-out; }
        .ant-leg { animation: ant-twitch 0.4s infinite ease-in-out; }
        .ant-leg-alt { animation: ant-twitch 0.4s infinite ease-in-out -0.2s; }
      `}</style>
      <g fill="#111" stroke="#111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path className="ant-leg" d="M42 38l-10-5-8 5" fill="none" />
        <path className="ant-leg-alt" d="M58 38l10-5 8 5" fill="none" />
        <path className="ant-leg-alt" d="M38 55l-12 3-8 10" fill="none" />
        <path className="ant-leg" d="M62 55l12 3 8 10" fill="none" />
        <path className="ant-leg" d="M42 75l-12 10-5 10" fill="none" />
        <path className="ant-leg-alt" d="M58 75l12 10 5 10" fill="none" />
        <ellipse cx="50" cy="65" rx="15" ry="22" />
        <path d="M36 38c0-10 14-15 28 0l-4 10c-8 4-16 4-20 0z" />
        <circle cx="50" cy="30" r="5" />
        <path className="ant-antenna-l" d="M48 28c-8-10-18-18-30-23" fill="none" />
        <path className="ant-antenna-r" d="M52 28c8-10 18-18 30-23" fill="none" />
      </g>
    </svg>
  );
}
