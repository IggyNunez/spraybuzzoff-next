export function ShieldIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00BFFF" />
          <stop offset="50%" stopColor="#0080FF" />
          <stop offset="100%" stopColor="#0040CC" />
        </linearGradient>
        <linearGradient id="shieldShine" x1="0%" y1="0%" x2="60%" y2="60%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M20 3L5 9V20C5 28 12 34.5 20 37C28 34.5 35 28 35 20V9L20 3Z"
        fill="url(#shieldGrad)"
      />
      <path
        d="M20 3L5 9V20C5 28 12 34.5 20 37C28 34.5 35 28 35 20V9L20 3Z"
        fill="url(#shieldShine)"
      />
      <path
        d="M20 3L5 9V20C5 28 12 34.5 20 37C28 34.5 35 28 35 20V9L20 3Z"
        fill="none"
        stroke="#00BFFF"
        strokeWidth="0.8"
        opacity="0.5"
      />
      <path
        d="M13 20L18 25L27 16"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
