"use client";

// Generated with Gemini 3 Flash Preview + enhanced by Claude
export function HeroBgAnimation() {
  return (
    <svg
      viewBox="0 0 1440 800"
      style={{ pointerEvents: "none", position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <style>{`
        @keyframes drawHex {
          0% { stroke-dashoffset: 400; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -400; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 0; }
          20% { opacity: 0.25; }
          80% { opacity: 0.25; }
          100% { transform: translateY(-820px); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 1.4; transform: scale(1.12); }
        }
        @keyframes driftMist {
          0% { transform: translate(0,0); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translate(180px, -160px); opacity: 0; }
        }
      `}</style>

      {/* Gold radial glows */}
      <ellipse
        cx="350" cy="280" rx="320" ry="220"
        fill="rgba(201,168,76,0.04)"
        style={{ transformOrigin: "350px 280px", animation: "pulseGlow 12s infinite ease-in-out" }}
      />
      <ellipse
        cx="1150" cy="540" rx="400" ry="260"
        fill="rgba(201,168,76,0.04)"
        style={{ transformOrigin: "1150px 540px", animation: "pulseGlow 15s infinite ease-in-out", animationDelay: "-4s" }}
      />

      {/* Mist stream — bottom-left rising */}
      <g fill="rgba(255,255,255,0.06)">
        <ellipse cx="90"  cy="760" rx="110" ry="55" style={{ animation: "driftMist 15s infinite linear" }} />
        <ellipse cx="240" cy="790" rx="95"  ry="48" style={{ animation: "driftMist 18s infinite linear", animationDelay: "-3s" }} />
        <ellipse cx="45"  cy="710" rx="130" ry="65" style={{ animation: "driftMist 20s infinite linear", animationDelay: "-7s" }} />
        <ellipse cx="310" cy="750" rx="105" ry="52" style={{ animation: "driftMist 16s infinite linear", animationDelay: "-10s" }} />
        <ellipse cx="170" cy="690" rx="120" ry="60" style={{ animation: "driftMist 22s infinite linear", animationDelay: "-5s" }} />
      </g>

      {/* Hexagon grid — draw-on stroke animation */}
      <g fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" strokeDasharray="400" strokeDashoffset="400">
        <polygon points="260,150 230,202 170,202 140,150 170,98 230,98"   style={{ animation: "drawHex 8s infinite ease-in-out", animationDelay: "0s" }} />
        <polygon points="560,600 530,652 470,652 440,600 470,548 530,548"  style={{ animation: "drawHex 10s infinite ease-in-out", animationDelay: "-1.5s" }} />
        <polygon points="1160,200 1130,252 1070,252 1040,200 1070,148 1130,148" style={{ animation: "drawHex 9s infinite ease-in-out", animationDelay: "-2.8s" }} />
        <polygon points="1360,700 1330,752 1270,752 1240,700 1270,648 1330,648" style={{ animation: "drawHex 11s infinite ease-in-out", animationDelay: "-5s" }} />
        <polygon points="860,300 830,352 770,352 740,300 770,248 830,248"   style={{ animation: "drawHex 7s infinite ease-in-out", animationDelay: "-3.5s" }} />
        <polygon points="360,750 330,802 270,802 240,750 270,698 330,698"   style={{ animation: "drawHex 12s infinite ease-in-out", animationDelay: "-6s" }} />
        <polygon points="1010,650 980,702 920,702 890,650 920,598 980,598"  style={{ animation: "drawHex 9.5s infinite ease-in-out", animationDelay: "-1s" }} />
        <polygon points="160,450 130,502 70,502 40,450 70,398 130,398"     style={{ animation: "drawHex 13s infinite ease-in-out", animationDelay: "-4.2s" }} />
        <polygon points="720,80 690,132 630,132 600,80 630,28 690,28"      style={{ animation: "drawHex 8.5s infinite ease-in-out", animationDelay: "-2s" }} />
        <polygon points="1280,380 1250,432 1190,432 1160,380 1190,328 1250,328" style={{ animation: "drawHex 11.5s infinite ease-in-out", animationDelay: "-7s" }} />
        <polygon points="490,350 460,402 400,402 370,350 400,298 460,298"   style={{ animation: "drawHex 10.5s infinite ease-in-out", animationDelay: "-0.5s" }} />
        <polygon points="950,480 920,532 860,532 830,480 860,428 920,428"   style={{ animation: "drawHex 7.5s infinite ease-in-out", animationDelay: "-3s" }} />
      </g>

      {/* Botanical particles — float up */}
      <g fill="rgba(1,109,48,0.22)">
        <circle r="4" cx="200"  cy="850" style={{ animation: "floatUp 10s infinite linear" }} />
        <circle r="3" cx="450"  cy="850" style={{ animation: "floatUp 12s infinite linear", animationDelay: "-2s" }} />
        <circle r="5" cx="620"  cy="850" style={{ animation: "floatUp 9s infinite linear", animationDelay: "-5s" }} />
        <circle r="4" cx="850"  cy="850" style={{ animation: "floatUp 14s infinite linear", animationDelay: "-1s" }} />
        <circle r="3" cx="1000" cy="850" style={{ animation: "floatUp 11s infinite linear", animationDelay: "-7s" }} />
        <circle r="5" cx="1150" cy="850" style={{ animation: "floatUp 13s infinite linear", animationDelay: "-4s" }} />
        <circle r="4" cx="1310" cy="850" style={{ animation: "floatUp 10s infinite linear", animationDelay: "-8s" }} />
        <circle r="3" cx="310"  cy="850" style={{ animation: "floatUp 15s infinite linear", animationDelay: "-3s" }} />
        <circle r="4" cx="740"  cy="850" style={{ animation: "floatUp 12.5s infinite linear", animationDelay: "-6s" }} />
        <circle r="3" cx="1080" cy="850" style={{ animation: "floatUp 9.5s infinite linear", animationDelay: "-9s" }} />
      </g>
    </svg>
  );
}
