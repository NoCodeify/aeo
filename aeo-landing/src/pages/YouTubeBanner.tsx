export function YouTubeBanner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Full upload size: 2560x1440. Safe area for all devices: 1546x423 centered */}
      <div
        className="relative overflow-hidden border-2 border-red-500"
        style={{
          width: "2560px",
          height: "1440px",
          backgroundColor: "#0a0a0f",
        }}
      >
        {/* Full background grid */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 2560 1440"
          fill="none"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 17 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i + 1) * 80}
              x2="2560"
              y2={(i + 1) * 80}
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.12"
            />
          ))}
          {Array.from({ length: 31 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={(i + 1) * 80}
              y1="0"
              x2={(i + 1) * 80}
              y2="1440"
              stroke="#00d4ff"
              strokeWidth="0.5"
              opacity="0.08"
            />
          ))}
        </svg>

        {/* Background Gradient Orbs */}
        <div
          className="absolute rounded-full blur-[200px] pointer-events-none"
          style={{ width: "600px", height: "600px", top: "100px", right: "300px", backgroundColor: "rgba(0, 212, 255, 0.15)" }}
        />
        <div
          className="absolute rounded-full blur-[160px] pointer-events-none"
          style={{ width: "500px", height: "500px", bottom: "100px", left: "400px", backgroundColor: "rgba(139, 92, 246, 0.1)" }}
        />
        <div
          className="absolute rounded-full blur-[180px] pointer-events-none"
          style={{ width: "400px", height: "400px", top: "400px", left: "800px", backgroundColor: "rgba(59, 130, 246, 0.08)" }}
        />

        {/* Chart - spans full width, full height so it crosses into safe area */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: "none",
            WebkitMaskImage: "none",
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            fill="none"
            className="absolute inset-0"
          >
            <defs>
              <radialGradient id="yt-dotGlow">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="yt-dotGlowStrong">
                <stop offset="0%" stopColor="#5ce1ff" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#00d4ff" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="yt-areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                <stop offset="30%" stopColor="#00d4ff" stopOpacity="0.18" />
                <stop offset="60%" stopColor="#00d4ff" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.01" />
              </linearGradient>
              <linearGradient id="yt-lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.2" />
                <stop offset="20%" stopColor="#00d4ff" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#00d4ff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#5ce1ff" stopOpacity="1" />
              </linearGradient>
            </defs>

            <g transform="translate(0, -30)">
            {/* Filled area - irregular spacing, clusters, plateaus, real chart feel */}
            <path
              d="M 0 560 L 15 555 L 35 558 L 50 548 L 58 550 L 80 535 L 95 540 L 110 530 L 140 532 L 155 520 L 165 525 L 190 510 L 210 518 L 225 505 L 240 512 L 268 495 L 280 502 L 310 485 L 325 490 L 335 478 L 360 482 L 380 465 L 395 470 L 410 455 L 425 462 L 445 448 L 452 452 L 475 438 L 500 442 L 515 428 L 540 435 L 555 418 L 570 425 L 590 408 L 618 412 L 635 395 L 650 402 L 665 385 L 690 378 L 705 370 L 720 358 L 732 362 L 755 340 L 770 335 L 788 310 L 798 318 L 815 295 L 830 285 L 842 270 L 858 250 L 872 238 L 885 215 L 900 195 L 912 175 L 928 148 L 940 125 L 955 95 L 968 68 L 982 42 L 1000 15 L 1000 600 L 0 600 Z"
              fill="url(#yt-areaFill)"
            />

            {/* Main line */}
            <path
              d="M 0 560 L 15 555 L 35 558 L 50 548 L 58 550 L 80 535 L 95 540 L 110 530 L 140 532 L 155 520 L 165 525 L 190 510 L 210 518 L 225 505 L 240 512 L 268 495 L 280 502 L 310 485 L 325 490 L 335 478 L 360 482 L 380 465 L 395 470 L 410 455 L 425 462 L 445 448 L 452 452 L 475 438 L 500 442 L 515 428 L 540 435 L 555 418 L 570 425 L 590 408 L 618 412 L 635 395 L 650 402 L 665 385 L 690 378 L 705 370 L 720 358 L 732 362 L 755 340 L 770 335 L 788 310 L 798 318 L 815 295 L 830 285 L 842 270 L 858 250 L 872 238 L 885 215 L 900 195 L 912 175 L 928 148 L 940 125 L 955 95 L 968 68 L 982 42 L 1000 15"
              stroke="url(#yt-lineGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Bright inner line on steep section */}
            <path
              d="M 755 340 L 770 335 L 788 310 L 798 318 L 815 295 L 830 285 L 842 270 L 858 250 L 872 238 L 885 215 L 900 195 L 912 175 L 928 148 L 940 125 L 955 95 L 968 68 L 982 42 L 1000 15"
              stroke="#5ce1ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity="0.5"
            />

            {/* Dots - irregular spacing, clusters, plateaus */}
            <circle cx="0" cy="560" r="2.5" fill="#00d4ff" opacity="0.15" />
            <circle cx="15" cy="555" r="2.5" fill="#00d4ff" opacity="0.16" />
            <circle cx="35" cy="558" r="2.5" fill="#00d4ff" opacity="0.17" />
            <circle cx="50" cy="548" r="2.5" fill="#00d4ff" opacity="0.19" />
            <circle cx="58" cy="550" r="2.5" fill="#00d4ff" opacity="0.19" />
            <circle cx="80" cy="535" r="2.5" fill="#00d4ff" opacity="0.21" />
            <circle cx="95" cy="540" r="2.5" fill="#00d4ff" opacity="0.22" />
            <circle cx="110" cy="530" r="3" fill="#00d4ff" opacity="0.23" />
            <circle cx="140" cy="532" r="3" fill="#00d4ff" opacity="0.24" />
            <circle cx="155" cy="520" r="3" fill="#00d4ff" opacity="0.26" />
            <circle cx="165" cy="525" r="3" fill="#00d4ff" opacity="0.26" />
            <circle cx="190" cy="510" r="3" fill="#00d4ff" opacity="0.28" />
            <circle cx="210" cy="518" r="3" fill="#00d4ff" opacity="0.28" />
            <circle cx="225" cy="505" r="3" fill="#00d4ff" opacity="0.3" />
            <circle cx="240" cy="512" r="3" fill="#00d4ff" opacity="0.3" />
            <circle cx="268" cy="495" r="3" fill="#00d4ff" opacity="0.32" />
            <circle cx="280" cy="502" r="3" fill="#00d4ff" opacity="0.32" />
            <circle cx="310" cy="485" r="3.5" fill="#00d4ff" opacity="0.34" />
            <circle cx="325" cy="490" r="3.5" fill="#00d4ff" opacity="0.34" />
            <circle cx="335" cy="478" r="3.5" fill="#00d4ff" opacity="0.36" />
            <circle cx="360" cy="482" r="3.5" fill="#00d4ff" opacity="0.36" />
            <circle cx="380" cy="465" r="3.5" fill="#00d4ff" opacity="0.38" />
            <circle cx="395" cy="470" r="3.5" fill="#00d4ff" opacity="0.38" />
            <circle cx="410" cy="455" r="3.5" fill="#00d4ff" opacity="0.4" />
            <circle cx="425" cy="462" r="3.5" fill="#00d4ff" opacity="0.4" />
            <circle cx="445" cy="448" r="3.5" fill="#00d4ff" opacity="0.42" />
            <circle cx="452" cy="452" r="3.5" fill="#00d4ff" opacity="0.42" />
            <circle cx="475" cy="438" r="4" fill="#00d4ff" opacity="0.44" />
            <circle cx="500" cy="442" r="4" fill="#00d4ff" opacity="0.44" />
            <circle cx="515" cy="428" r="4" fill="#00d4ff" opacity="0.46" />
            <circle cx="540" cy="435" r="4" fill="#00d4ff" opacity="0.46" />
            <circle cx="555" cy="418" r="4" fill="#00d4ff" opacity="0.48" />
            <circle cx="570" cy="425" r="4" fill="#00d4ff" opacity="0.48" />
            <circle cx="590" cy="408" r="4" fill="#00d4ff" opacity="0.5" />
            <circle cx="618" cy="412" r="4" fill="#00d4ff" opacity="0.5" />
            <circle cx="635" cy="395" r="4" fill="#00d4ff" opacity="0.52" />
            <circle cx="650" cy="402" r="4" fill="#00d4ff" opacity="0.52" />
            <circle cx="665" cy="385" r="4" fill="#00d4ff" opacity="0.54" />
            <circle cx="690" cy="378" r="4" fill="#00d4ff" opacity="0.55" />
            <circle cx="705" cy="370" r="4" fill="#00d4ff" opacity="0.56" />

            {/* Glowing dots - subtle glow */}
            <circle cx="720" cy="358" r="9" fill="url(#yt-dotGlow)" />
            <circle cx="720" cy="358" r="4.5" fill="#00d4ff" opacity="0.58" />
            <circle cx="732" cy="362" r="9" fill="url(#yt-dotGlow)" />
            <circle cx="732" cy="362" r="4.5" fill="#00d4ff" opacity="0.58" />
            <circle cx="755" cy="340" r="9" fill="url(#yt-dotGlow)" />
            <circle cx="755" cy="340" r="4.5" fill="#00d4ff" opacity="0.6" />
            <circle cx="770" cy="335" r="10" fill="url(#yt-dotGlow)" />
            <circle cx="770" cy="335" r="4.5" fill="#00d4ff" opacity="0.62" />
            <circle cx="788" cy="310" r="10" fill="url(#yt-dotGlow)" />
            <circle cx="788" cy="310" r="5" fill="#00d4ff" opacity="0.65" />
            <circle cx="798" cy="318" r="10" fill="url(#yt-dotGlow)" />
            <circle cx="798" cy="318" r="5" fill="#00d4ff" opacity="0.65" />
            <circle cx="815" cy="295" r="10" fill="url(#yt-dotGlow)" />
            <circle cx="815" cy="295" r="5" fill="#00d4ff" opacity="0.68" />
            <circle cx="830" cy="285" r="10" fill="url(#yt-dotGlow)" />
            <circle cx="830" cy="285" r="5" fill="#00d4ff" opacity="0.7" />
            <circle cx="842" cy="270" r="11" fill="url(#yt-dotGlow)" />
            <circle cx="842" cy="270" r="5" fill="#00d4ff" opacity="0.72" />

            {/* Strong glow dots - steep section */}
            <circle cx="858" cy="250" r="12" fill="url(#yt-dotGlowStrong)" />
            <circle cx="858" cy="250" r="5" fill="#00d4ff" opacity="0.75" />
            <circle cx="872" cy="238" r="12" fill="url(#yt-dotGlowStrong)" />
            <circle cx="872" cy="238" r="5" fill="#00d4ff" opacity="0.78" />
            <circle cx="885" cy="215" r="13" fill="url(#yt-dotGlowStrong)" />
            <circle cx="885" cy="215" r="5.5" fill="#00d4ff" opacity="0.8" />
            <circle cx="900" cy="195" r="13" fill="url(#yt-dotGlowStrong)" />
            <circle cx="900" cy="195" r="5.5" fill="#00d4ff" opacity="0.82" />
            <circle cx="912" cy="175" r="13" fill="url(#yt-dotGlowStrong)" />
            <circle cx="912" cy="175" r="5.5" fill="#5ce1ff" opacity="0.84" />
            <circle cx="928" cy="148" r="14" fill="url(#yt-dotGlowStrong)" />
            <circle cx="928" cy="148" r="5.5" fill="#5ce1ff" opacity="0.86" />
            <circle cx="940" cy="125" r="14" fill="url(#yt-dotGlowStrong)" />
            <circle cx="940" cy="125" r="6" fill="#5ce1ff" opacity="0.88" />
            <circle cx="955" cy="95" r="15" fill="url(#yt-dotGlowStrong)" />
            <circle cx="955" cy="95" r="6" fill="#5ce1ff" opacity="0.9" />
            <circle cx="968" cy="68" r="15" fill="url(#yt-dotGlowStrong)" />
            <circle cx="968" cy="68" r="6" fill="#5ce1ff" opacity="0.93" />
            <circle cx="982" cy="42" r="16" fill="url(#yt-dotGlowStrong)" />
            <circle cx="982" cy="42" r="6.5" fill="#5ce1ff" opacity="0.96" />
            <circle cx="1000" cy="15" r="18" fill="url(#yt-dotGlowStrong)" />
            <circle cx="1000" cy="15" r="7" fill="#5ce1ff" opacity="1" />

            {/* Pulse ring on peak */}
            <circle cx="1000" cy="15" r="16" fill="none" stroke="#00d4ff" strokeWidth="1.5" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* Safe area guide (1546x423 centered) - faint border for dev */}
        <div
          className="absolute border border-dashed border-white/5 pointer-events-none"
          style={{
            width: "1546px",
            height: "423px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
          }}
        />

        {/* === TEXT CONTENT within safe area (centered 1546x423) === */}
        <div
          className="absolute flex items-center"
          style={{
            width: "1546px",
            height: "423px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
          }}
        >
          {/* LEFT - Terminal mockup */}
          <div className="flex-shrink-0" style={{ opacity: 0.95 }}>
            <div
              className="rounded-2xl border border-primary/20 bg-[#0d1117]/90 backdrop-blur-sm p-6"
              style={{ width: "440px" }}
            >
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#febc2e" }} />
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#28c840" }} />
                <span className="ml-3 font-mono text-white/30" style={{ fontSize: "15px" }}>
                  claude-code
                </span>
              </div>

              <div className="font-mono space-y-2.5" style={{ fontSize: "18px", lineHeight: "1.6" }}>
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

          {/* CENTER+RIGHT - Text content */}
          <div className="flex flex-col items-center justify-center ml-6 px-8">
            <div className="text-center">
              <h1
                className="font-heading font-bold text-foreground leading-tight"
                style={{ fontSize: "58px" }}
              >
                Build Real Systems
              </h1>
              <h1
                className="font-heading font-bold leading-tight text-gradient"
                style={{ fontSize: "58px" }}
              >
                With Claude Code
              </h1>
              <p
                className="mt-3 text-foreground/50 font-sans"
                style={{ fontSize: "22px" }}
              >
                SaaS. Agentic Pipelines. Full Infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
