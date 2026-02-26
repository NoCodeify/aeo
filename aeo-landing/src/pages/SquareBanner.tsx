export function SquareBanner() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8">
      {/* Square banner: 1080x1080 */}
      <div
        className="relative overflow-hidden"
        style={{
          width: "1080px",
          height: "1080px",
          backgroundColor: "#f0f4f8",
        }}
      >
        {/* Background grid - light version */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1080 1080"
          fill="none"
          preserveAspectRatio="none"
        >
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={(i + 1) * 72}
              x2="1080"
              y2={(i + 1) * 72}
              stroke="#00a8cc"
              strokeWidth="0.5"
              opacity="0.12"
            />
          ))}
          {Array.from({ length: 14 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={(i + 1) * 72}
              y1="0"
              x2={(i + 1) * 72}
              y2="1080"
              stroke="#00a8cc"
              strokeWidth="0.5"
              opacity="0.08"
            />
          ))}
        </svg>

        {/* Gradient orbs - light, pastel versions */}
        <div
          className="absolute rounded-full blur-[160px] pointer-events-none"
          style={{ width: "500px", height: "500px", top: "-80px", right: "60px", backgroundColor: "rgba(0, 212, 255, 0.18)" }}
        />
        <div
          className="absolute rounded-full blur-[140px] pointer-events-none"
          style={{ width: "400px", height: "400px", bottom: "-60px", left: "100px", backgroundColor: "rgba(139, 92, 246, 0.12)" }}
        />
        <div
          className="absolute rounded-full blur-[120px] pointer-events-none"
          style={{ width: "350px", height: "350px", top: "300px", left: "400px", backgroundColor: "rgba(59, 130, 246, 0.1)" }}
        />
      </div>
    </div>
  );
}
