export function HouseIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M20 50 L50 20 L80 50 V85 H20 Z" fill="#F1F8E9" stroke="#2E7D32" strokeWidth="2" />
      <path d="M20 50 L50 20 L80 50" fill="#A5D6A7" fillOpacity="0.4" />
      <path d="M50 85 V70 M50 75 Q60 70 65 75" fill="none" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
      <rect x="44" y="70" width="12" height="15" rx="1" fill="#2E7D32" fillOpacity="0.1" />
    </svg>
  );
}
