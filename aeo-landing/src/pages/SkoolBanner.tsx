export function SkoolBanner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Skool banner: 1084x576 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "1084px",
          height: "576px",
          backgroundColor: "#0a0a0f",
        }}
      >
        {/* Background grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1084 576"
          fill="none"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 8 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i + 1) * 64}
              x2="1084"
              y2={(i + 1) * 64}
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.12"
            />
          ))}
          {Array.from({ length: 16 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={(i + 1) * 64}
              y1="0"
              x2={(i + 1) * 64}
              y2="576"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.08"
            />
          ))}
        </svg>

        {/* Gradient orbs */}
        <div
          className="absolute rounded-full blur-[120px] pointer-events-none"
          style={{ width: "400px", height: "400px", top: "-80px", right: "100px", backgroundColor: "rgba(0, 212, 255, 0.15)" }}
        />
        <div
          className="absolute rounded-full blur-[100px] pointer-events-none"
          style={{ width: "300px", height: "300px", bottom: "-60px", left: "150px", backgroundColor: "rgba(139, 92, 246, 0.12)" }}
        />
        <div
          className="absolute rounded-full blur-[90px] pointer-events-none"
          style={{ width: "250px", height: "250px", top: "200px", left: "500px", backgroundColor: "rgba(59, 130, 246, 0.08)" }}
        />

        {/* Growth chart - right side with fade */}
        <div
          className="absolute right-0 bottom-0"
          style={{
            width: "700px",
            height: "560px",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,0.8) 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 570 540"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0"
          >
            <defs>
              <radialGradient id="sk-dotGlow">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="sk-dotGlowStrong">
                <stop offset="0%" stopColor="#5ce1ff" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="sk-areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.18" />
                <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="sk-lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15" />
                <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.7" />
                <stop offset="75%" stopColor="#00d4ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5ce1ff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path
              d="M 0 510 L 30 508 L 55 512 L 85 505 L 115 508 L 150 500 L 180 490 L 205 495 L 240 475 L 270 480 L 305 455 L 335 462 L 370 420 L 405 430 L 440 360 L 470 320 L 495 240 L 515 180 L 535 100 L 555 55 L 570 25 L 570 540 L 0 540 Z"
              fill="url(#sk-areaFill)"
            />
            {/* Main line */}
            <path
              d="M 0 510 L 30 508 L 55 512 L 85 505 L 115 508 L 150 500 L 180 490 L 205 495 L 240 475 L 270 480 L 305 455 L 335 462 L 370 420 L 405 430 L 440 360 L 470 320 L 495 240 L 515 180 L 535 100 L 555 55 L 570 25"
              stroke="url(#sk-lineGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Bright accent on steep section */}
            <path
              d="M 440 360 L 470 320 L 495 240 L 515 180 L 535 100 L 555 55 L 570 25"
              stroke="#5ce1ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.5"
            />

            {/* New faint dots (5 added points) */}
            <circle cx="0" cy="510" r="2" fill="#00d4ff" opacity="0.12" />
            <circle cx="30" cy="508" r="2" fill="#00d4ff" opacity="0.15" />
            <circle cx="55" cy="512" r="2.5" fill="#00d4ff" opacity="0.18" />
            <circle cx="85" cy="505" r="2.5" fill="#00d4ff" opacity="0.2" />
            <circle cx="115" cy="508" r="2.5" fill="#00d4ff" opacity="0.22" />

            {/* Original dots (shifted +150) */}
            <circle cx="240" cy="475" r="3" fill="#00d4ff" opacity="0.35" />
            <circle cx="305" cy="455" r="3" fill="#00d4ff" opacity="0.4" />
            <circle cx="370" cy="420" r="3.5" fill="#00d4ff" opacity="0.5" />
            <circle cx="440" cy="360" r="4" fill="#00d4ff" opacity="0.6" />
            <circle cx="470" cy="320" r="4" fill="url(#sk-dotGlow)" />
            <circle cx="470" cy="320" r="4" fill="#00d4ff" opacity="0.65" />
            <circle cx="495" cy="240" r="10" fill="url(#sk-dotGlowStrong)" />
            <circle cx="495" cy="240" r="4.5" fill="#00d4ff" opacity="0.75" />
            <circle cx="515" cy="180" r="11" fill="url(#sk-dotGlowStrong)" />
            <circle cx="515" cy="180" r="5" fill="#00d4ff" opacity="0.8" />
            <circle cx="535" cy="100" r="12" fill="url(#sk-dotGlowStrong)" />
            <circle cx="535" cy="100" r="5" fill="#5ce1ff" opacity="0.9" />
            <circle cx="555" cy="55" r="14" fill="url(#sk-dotGlowStrong)" />
            <circle cx="555" cy="55" r="5.5" fill="#5ce1ff" opacity="0.95" />
            <circle cx="570" cy="25" r="16" fill="url(#sk-dotGlowStrong)" />
            <circle cx="570" cy="25" r="6" fill="#5ce1ff" opacity="1" />
            <circle cx="570" cy="25" r="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.3" />
          </svg>
        </div>

        {/* Terminal mockup - bottom left */}
        <div className="absolute left-10 bottom-8" style={{ opacity: 0.9 }}>
          <div
            className="rounded-2xl border border-primary/20 bg-[#0d1117]/90 backdrop-blur-sm p-5"
            style={{ width: "320px" }}
          >
            <div className="flex gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
              <span className="ml-3 font-mono text-white/30" style={{ fontSize: "14px" }}>
                claude-code
              </span>
            </div>

            <div className="font-mono space-y-2" style={{ fontSize: "16px", lineHeight: "1.6" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "#00d4ff" }}>$</span>
                <span className="text-white/70">claude &quot;build the pipeline&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#28c840" }}>&#10003;</span>
                <span className="text-white/50">3 agents deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#28c840" }}>&#10003;</span>
                <span className="text-white/50">CI/CD pipeline active</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#febc2e" }}>&#9654;</span>
                <span style={{ color: "#00d4ff" }}>$100K ARR</span>
                <span className="text-white/30">and counting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text content - center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginLeft: "80px" }}>
          <div className="text-center">
            <h1
              className="font-heading font-bold text-foreground leading-tight"
              style={{ fontSize: "56px" }}
            >
              Build Real Systems
            </h1>
            <h1
              className="font-heading font-bold leading-tight text-gradient"
              style={{ fontSize: "56px" }}
            >
              With Claude Code
            </h1>
            <p
              className="mt-2 text-foreground/50 font-sans"
              style={{ fontSize: "20px" }}
            >
              SaaS. Agentic Pipelines. Full Infrastructure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
