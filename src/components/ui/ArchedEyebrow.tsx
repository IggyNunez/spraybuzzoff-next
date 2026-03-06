export function ArchedEyebrow({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "light";
}) {
  return (
    <div className={`section-eyebrow-arch ${variant === "light" ? "section-eyebrow-arch--light" : ""} ${className}`}>
      <svg viewBox="0 0 300 50" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <path id="eyebrowArc" d="M30,42 Q150,2 270,42" fill="none" />
        </defs>
        <text>
          <textPath href="#eyebrowArc" startOffset="50%" textAnchor="middle">
            {children}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
