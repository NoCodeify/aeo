export function SkoolIcon() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Skool icon: 128x128, rendered at 512x512 for quality */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          width: "512px",
          height: "512px",
          backgroundColor: "#0a0a0f",
          borderRadius: "0px",
        }}
      >
        {/* Background glow */}
        <div
          className="absolute rounded-full blur-[80px] pointer-events-none"
          style={{ width: "300px", height: "300px", top: "20px", left: "20px", backgroundColor: "rgba(0, 212, 255, 0.18)" }}
        />
        <div
          className="absolute rounded-full blur-[60px] pointer-events-none"
          style={{ width: "250px", height: "250px", bottom: "30px", right: "30px", backgroundColor: "rgba(139, 92, 246, 0.14)" }}
        />

        {/* Terminal prompt >_ */}
        <svg
          width="320"
          height="280"
          viewBox="0 0 320 280"
          fill="none"
          className="relative z-10"
        >
          <defs>
            <linearGradient id="icon-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          {/* > chevron */}
          <path
            d="M 30 40 L 140 120 L 30 200"
            stroke="url(#icon-grad)"
            strokeWidth="32"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* _ cursor */}
          <rect
            x="170"
            y="194"
            width="120"
            height="32"
            rx="16"
            fill="url(#icon-grad)"
          />
        </svg>
      </div>
    </div>
  );
}
