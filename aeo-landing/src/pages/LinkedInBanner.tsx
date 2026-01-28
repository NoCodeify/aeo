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
          className="absolute rounded-full bg-primary/20 blur-[100px] pointer-events-none"
          style={{ width: "300px", height: "300px", top: "-100px", right: "50px" }}
        />
        <div
          className="absolute rounded-full bg-accent/15 blur-[80px] pointer-events-none"
          style={{ width: "250px", height: "250px", bottom: "-80px", left: "200px" }}
        />
        <div
          className="absolute rounded-full bg-secondary/10 blur-[90px] pointer-events-none"
          style={{ width: "200px", height: "200px", top: "50px", left: "400px" }}
        />

        {/* Left Side - AI Chat Bubble */}
        <div
          className="absolute left-10 top-6"
          style={{
            opacity: 0.9,
          }}
        >
          {/* Chat interface mockup */}
          <div
            className="rounded-2xl border border-primary/20 bg-primary/5 p-6"
            style={{ width: "480px" }}
          >
            {/* Chat header dots */}
            <div className="flex gap-2 mb-5">
              <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/25" />
              <div className="w-2.5 h-2.5 rounded-full bg-primary/15" />
            </div>

            {/* Query with icon */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#00d4ff">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <span
                className="font-sans font-medium text-foreground/80"
                style={{ fontSize: "24px" }}
              >
                What's the best in my <span className="text-primary">category</span>?
              </span>
            </div>

          </div>
        </div>

        {/* Text Content - Center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ marginLeft: "300px" }}>
          <div className="text-center">
            {/* Headline */}
            <h1
              className="font-heading font-bold text-foreground leading-tight"
              style={{ fontSize: "54px" }}
            >
              Become The Brand
            </h1>
            <h1
              className="font-heading font-bold leading-tight text-gradient"
              style={{ fontSize: "54px" }}
            >
              ChatGPT Recommends
            </h1>

            {/* Arrow */}
            <div className="mt-3 flex justify-center">
              <svg
                width="20"
                height="12"
                viewBox="0 0 20 12"
                fill="none"
              >
                <path
                  d="M2 2 L10 10 L18 2"
                  stroke="#00d4ff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* URL Pill */}
            <div className="mt-3 inline-flex items-center gap-2 px-5 py-2 rounded-xl border border-primary/40 bg-primary/5">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-80"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span
                className="font-sans font-medium text-foreground"
                style={{ fontSize: "24px" }}
              >
                AEOprotocol.ai
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
              <filter id="glowWide">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feMerge>
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
              <linearGradient id="areaFill2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Main filled area */}
            <path
              d="M 0 350 L 30 340 L 55 348 L 90 325 L 120 335 L 155 305 L 185 318 L 220 275 L 255 290 L 290 230 L 320 210 L 345 155 L 365 120 L 385 60 L 405 35 L 420 15 L 420 380 L 0 380 Z"
              fill="url(#areaFill)"
            />

            {/* The main line - 16 points, random volatile, trending up */}
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
