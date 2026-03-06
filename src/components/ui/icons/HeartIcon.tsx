export function HeartIcon({ className = "" }: { className?: string }) {
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
        <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#7FFF00" />
          <stop offset="50%" stopColor="#32CD32" />
          <stop offset="100%" stopColor="#006400" />
        </radialGradient>
        <radialGradient id="heartShine" cx="35%" cy="30%" r="40%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M20 34C20 34 5 25 5 14.5C5 10.4 8.1 7 12 7C14.8 7 17.2 8.7 18.6 11C19.2 12 20.8 12 21.4 11C22.8 8.7 25.2 7 28 7C31.9 7 35 10.4 35 14.5C35 25 20 34 20 34Z"
        fill="url(#heartGrad)"
      />
      <path
        d="M20 34C20 34 5 25 5 14.5C5 10.4 8.1 7 12 7C14.8 7 17.2 8.7 18.6 11C19.2 12 20.8 12 21.4 11C22.8 8.7 25.2 7 28 7C31.9 7 35 10.4 35 14.5C35 25 20 34 20 34Z"
        fill="url(#heartShine)"
      />
      <path
        d="M20 34C20 34 5 25 5 14.5C5 10.4 8.1 7 12 7C14.8 7 17.2 8.7 18.6 11C19.2 12 20.8 12 21.4 11C22.8 8.7 25.2 7 28 7C31.9 7 35 10.4 35 14.5C35 25 20 34 20 34Z"
        fill="none"
        stroke="#32CD32"
        strokeWidth="0.8"
        opacity="0.6"
      />
    </svg>
  );
}
