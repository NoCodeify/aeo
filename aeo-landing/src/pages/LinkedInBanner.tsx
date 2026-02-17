export function LinkedInBanner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Banner at exact LinkedIn dimensions */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "1584px",
          height: "396px",
          backgroundColor: "#0a0a0f",
        }}
      >
        {/* Full background grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1584 396"
          fill="none"
          preserveAspectRatio="none"
        >
          {/* Horizontal lines - 66px apart for square cells */}
          <line x1="0" y1="66" x2="1584" y2="66" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="132" x2="1584" y2="132" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="198" x2="1584" y2="198" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="264" x2="1584" y2="264" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />
          <line x1="0" y1="330" x2="1584" y2="330" stroke="#00d4ff" strokeWidth="0.5" opacity="0.15" />

          {/* Vertical lines - 66px apart for square cells */}
          <line x1="66" y1="0" x2="66" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="132" y1="0" x2="132" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="198" y1="0" x2="198" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="264" y1="0" x2="264" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="330" y1="0" x2="330" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="396" y1="0" x2="396" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="462" y1="0" x2="462" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="528" y1="0" x2="528" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="594" y1="0" x2="594" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="660" y1="0" x2="660" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="726" y1="0" x2="726" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="792" y1="0" x2="792" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="858" y1="0" x2="858" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="924" y1="0" x2="924" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="990" y1="0" x2="990" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1056" y1="0" x2="1056" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1122" y1="0" x2="1122" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1188" y1="0" x2="1188" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1254" y1="0" x2="1254" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1320" y1="0" x2="1320" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1386" y1="0" x2="1386" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1452" y1="0" x2="1452" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
          <line x1="1518" y1="0" x2="1518" y2="396" stroke="#00d4ff" strokeWidth="0.5" opacity="0.12" />
        </svg>

        {/* Background Gradient Orbs */}
        <div
          className="absolute rounded-full blur-[100px] pointer-events-none"
          style={{ width: "300px", height: "300px", top: "-100px", right: "50px", backgroundColor: "rgba(0, 212, 255, 0.2)" }}
        />
        <div
          className="absolute rounded-full blur-[80px] pointer-events-none"
          style={{ width: "250px", height: "250px", bottom: "-80px", left: "200px", backgroundColor: "rgba(139, 92, 246, 0.15)" }}
        />
        <div
          className="absolute rounded-full blur-[90px] pointer-events-none"
          style={{ width: "200px", height: "200px", top: "50px", left: "400px", backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        />

        {/* Left Side - Terminal Mockup */}
        <div
          className="absolute left-10 top-6"
          style={{ opacity: 0.9 }}
        >
          <div
            className="rounded-2xl border border-primary/20 bg-[#0d1117] p-5"
            style={{ width: "520px" }}
          >
            {/* Terminal header dots */}
            <div className="flex gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
              <span
                className="ml-3 font-mono text-white/30"
                style={{ fontSize: "16px" }}
              >
                claude-code
              </span>
            </div>

            {/* Terminal lines */}
            <div className="font-mono space-y-3" style={{ fontSize: "20px", lineHeight: "1.6" }}>
              <div className="flex items-center gap-2">
                <span style={{ color: "#00d4ff" }}>$</span>
                <span className="text-white/70">claude &quot;build the CI/CD pipeline&quot;</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#28c840" }}>&#10003;</span>
                <span className="text-white/50">3 agents deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#28c840" }}>&#10003;</span>
                <span className="text-white/50">Auto-fix pipeline active</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#28c840" }}>&#10003;</span>
                <span className="text-white/50">Customer notifications wired</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span style={{ color: "#00d4ff" }}>$</span>
                <span className="text-white/70">revenue --check</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: "#febc2e" }}>&#9654;</span>
                <span style={{ color: "#00d4ff" }}>$100K ARR</span>
                <span className="text-white/30">and counting</span>
              </div>
            </div>
          </div>
        </div>

        {/* Text Content - Center-Right */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginLeft: "280px" }}>
          <div className="text-center">
            {/* Headline */}
            <h1
              className="font-heading font-bold text-foreground leading-tight"
              style={{ fontSize: "52px" }}
            >
              I Build Business Systems
            </h1>
            <h1
              className="font-heading font-bold leading-tight text-gradient"
              style={{ fontSize: "52px" }}
            >
              With Claude Code
            </h1>

            {/* Subtitle */}
            <p
              className="mt-3 text-foreground/50 font-sans"
              style={{ fontSize: "20px" }}
            >
              SaaS. Agentic Pipelines. Full Infrastructure. DM Me To Build Yours.
            </p>

            {/* URL Pill */}
            <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-primary/40 bg-primary/5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              <span
                className="font-sans font-medium text-foreground"
                style={{ fontSize: "22px" }}
              >
                sohaibahmad.me
              </span>
            </div>
          </div>
        </div>

        {/* Subtle glow bridging chart to text */}
        <div
          className="absolute rounded-full pointer-events-none blur-[80px]"
          style={{
            width: "300px",
            height: "250px",
            right: "250px",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(0, 212, 255, 0.06)",
          }}
        />

        {/* Area Chart - Right Side with fade */}
        <div
          className="absolute right-0 bottom-0"
          style={{
            width: "680px",
            height: "390px",
            maskImage:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.15) 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,1) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.15) 85%, transparent 100%)",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 420 380"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0"
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glowStrong">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.45" />
                <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.2" />
                <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="40%" stopColor="#00d4ff" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#00d4ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5ce1ff" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Main filled area */}
            <path
              d="M 0 350 L 30 340 L 55 348 L 90 325 L 120 335 L 155 305 L 185 318 L 220 275 L 255 290 L 290 230 L 320 210 L 345 155 L 365 120 L 385 60 L 405 35 L 420 15 L 420 380 L 0 380 Z"
              fill="url(#areaFill)"
            />

            {/* The main line */}
            <path
              d="M 0 350 L 30 340 L 55 348 L 90 325 L 120 335 L 155 305 L 185 318 L 220 275 L 255 290 L 290 230 L 320 210 L 345 155 L 365 120 L 385 60 L 405 35 L 420 15"
              stroke="url(#lineGradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#glow)"
            />

            {/* Bright inner line on steep section */}
            <path
              d="M 290 230 L 320 210 L 345 155 L 365 120 L 385 60 L 405 35 L 420 15"
              stroke="#5ce1ff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.5"
            />

            {/* Dots on every point */}
            <circle cx="0" cy="350" r="3" fill="#00d4ff" opacity="0.3" />
            <circle cx="30" cy="340" r="3" fill="#00d4ff" opacity="0.35" />
            <circle cx="55" cy="348" r="3" fill="#00d4ff" opacity="0.35" />
            <circle cx="90" cy="325" r="3" fill="#00d4ff" opacity="0.4" />
            <circle cx="120" cy="335" r="3" fill="#00d4ff" opacity="0.4" />
            <circle cx="155" cy="305" r="3.5" fill="#00d4ff" opacity="0.45" />
            <circle cx="185" cy="318" r="3.5" fill="#00d4ff" opacity="0.45" />
            <circle cx="220" cy="275" r="3.5" fill="#00d4ff" opacity="0.5" />
            <circle cx="255" cy="290" r="3.5" fill="#00d4ff" opacity="0.5" />
            <circle cx="290" cy="230" r="4" fill="#00d4ff" opacity="0.6" />
            <circle cx="320" cy="210" r="4" fill="#00d4ff" opacity="0.65" filter="url(#glow)" />
            <circle cx="345" cy="155" r="4.5" fill="#00d4ff" opacity="0.75" filter="url(#glow)" />
            <circle cx="365" cy="120" r="4.5" fill="#00d4ff" opacity="0.8" filter="url(#glow)" />
            <circle cx="385" cy="60" r="5" fill="#00d4ff" opacity="0.9" filter="url(#glowStrong)" />
            <circle cx="405" cy="35" r="5.5" fill="#5ce1ff" opacity="0.95" filter="url(#glowStrong)" />
            <circle cx="420" cy="15" r="6" fill="#5ce1ff" opacity="1" filter="url(#glowStrong)" />

            {/* Pulse ring on peak */}
            <circle cx="420" cy="15" r="14" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
