import React from "react";
import { Composition } from "remotion";
import { z } from "zod";
import timelineData from "../public/timeline.json";
import { MainVideo } from "./components/MainVideo";
import { NewspaperFlash } from "./components/NewspaperFlash";
import { LowerThird } from "./components/LowerThird";
import { CounterTicker } from "./components/CounterTicker";
import { ComparisonTable } from "./components/ComparisonTable";
import { QuoteCard } from "./components/QuoteCard";
import { ProgressBars } from "./components/ProgressBars";
import { SocialProofFlash } from "./components/SocialProofFlash";
import { CalloutAnnotation } from "./components/CalloutAnnotation";
import { GlitchEffect } from "./components/GlitchEffect";
import { FreezeFrame } from "./components/FreezeFrame";
import { KineticType } from "./components/KineticType";
import { LightLeakOverlay } from "./components/LightLeakOverlay";
import { ScreenShake } from "./components/ScreenShake";
import { ConfettiBurst } from "./components/ConfettiBurst";
import { TypewriterText } from "./components/TypewriterText";
import { CheckXMark } from "./components/CheckXMark";
import { CircleTimer } from "./components/CircleTimer";
import { TextRevealWipe } from "./components/TextRevealWipe";
import { BarChart } from "./components/BarChart";
import { LineChart } from "./components/LineChart";
import { BulletList } from "./components/BulletList";
import { StatCards } from "./components/StatCards";
import { PieChart } from "./components/PieChart";
import { FlowDiagram } from "./components/FlowDiagram";
import { TreasureMap } from "./components/TreasureMap";
import { ChapterCard } from "./components/ChapterCard";
import { CtaOverlay } from "./components/CtaOverlay";
import { SearchBar } from "./components/SearchBar";
import { StarRating } from "./components/StarRating";
import { ChatBubbles } from "./components/ChatBubbles";
import { Terminal } from "./components/Terminal";
import { CodeEditor } from "./components/CodeEditor";
import { BrowserMockup } from "./components/BrowserMockup";
import { ToggleSwitch } from "./components/ToggleSwitch";
import { NotificationStack } from "./components/NotificationStack";
import { PricingCard } from "./components/PricingCard";
import { CountdownFlip } from "./components/CountdownFlip";
import { TextHighlight } from "./components/TextHighlight";
import { VideoConfig, Edit, BgMusicConfig } from "./types/timeline";

// Zod schema for Studio props editing
const EditSchema = z.object({
  type: z.string(),
  start: z.number(),
  end: z.number(),
  content: z.string().optional(),
  text: z.string().optional(),
  style: z.string().optional(),
  zoom: z.number().optional(),
  position: z.string().optional(),
  size: z.number().optional(),
  volume: z.number().optional(),
  color: z.string().optional(),
  _note: z.string().optional(),
}).passthrough();

const BgMusicSchema = z.object({
  src: z.string(),
  startVolume: z.number().optional(),
  mainVolume: z.number().optional(),
  fadeDuration: z.number().optional(),
});

const ConfigSchema = z.object({
  config: z.object({
    speakerVideo: z.string(),
    gridBackground: z.string(),
    timeline: z.array(EditSchema),
    fps: z.number(),
    width: z.number(),
    height: z.number(),
    bgMusic: BgMusicSchema.optional(),
  }),
});

// Default config for studio preview
// Timeline imported directly from public/timeline.json - Vite HMR auto-reloads on change.
const defaultConfig: VideoConfig = {
  speakerVideo: "speaker.mp4",
  gridBackground: "grid-loop.mp4",
  timeline: timelineData as unknown as Edit[],
  fps: 30,
  width: 3840,
  height: 2160,
  bgMusic: {
    src: "sfx/lofi-beat-bg.mp3",
    startVolume: 0.16,
    mainVolume: 0.08,
    fadeDuration: 10,
  },
};

// Calculate total duration from timeline
const calculateDuration = (timeline: Edit[], fps: number): number => {
  if (timeline.length === 0) return fps * 10; // 10 seconds default
  const lastEdit = timeline[timeline.length - 1];
  return Math.ceil(lastEdit.end * fps);
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo as any}
        schema={ConfigSchema}
        durationInFrames={calculateDuration(defaultConfig.timeline, defaultConfig.fps)}
        fps={defaultConfig.fps}
        width={defaultConfig.width}
        height={defaultConfig.height}
        defaultProps={{ config: defaultConfig }}
        calculateMetadata={async ({ props }: any) => {
          const { config } = props;
          return {
            durationInFrames: calculateDuration(config.timeline, config.fps),
            fps: config.fps,
            width: config.width,
            height: config.height,
            props: { config },
          };
        }}
      />
      {/* === Standalone previews (no speaker video needed) === */}
      <Composition
        id="NewspaperFlashPreview"
        component={NewspaperFlash as any}
        durationInFrames={105}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ keyword: "AI Search" }}
      />
      <Composition
        id="LowerThirdPreview"
        component={LowerThird as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ title: "Sohaib Khaliq", subtitle: "Founder, Claudify" }}
      />
      <Composition
        id="CounterTickerPreview"
        component={CounterTicker as any}
        durationInFrames={90}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ from: 0, to: 10000, prefix: "$", suffix: "/mo", label: "Monthly Revenue" }}
      />
      <Composition
        id="ComparisonTablePreview"
        component={ComparisonTable as any}
        durationInFrames={180}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          leftLabel: "Traditional SEO",
          rightLabel: "AEO Protocol",
          rows: [
            { left: "Optimizes for Google", right: "Optimizes for AI", rightWins: true },
            { left: "Blue links", right: "Direct answers", rightWins: true },
            { left: "Keyword stuffing", right: "Entity-first content", rightWins: true },
            { left: "Months to rank", right: "Days to appear", rightWins: true },
          ],
        }}
      />
      <Composition
        id="QuoteCardPreview"
        component={QuoteCard as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          quote: "By 2027, 50% of searches will be zero-click, answered directly by AI.",
          attribution: "Gartner",
          role: "Research Report, 2026",
        }}
      />
      <Composition
        id="ProgressBarsPreview"
        component={ProgressBars as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "LLM Visibility Score",
          bars: [
            { label: "ChatGPT", value: 78 },
            { label: "Perplexity", value: 62 },
            { label: "Gemini", value: 43 },
            { label: "Claude", value: 31 },
          ],
        }}
      />
      <Composition
        id="SocialProofFlashPreview"
        component={SocialProofFlash as any}
        durationInFrames={105}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ keyword: "AEO" }}
      />
      <Composition
        id="CalloutPreview"
        component={CalloutAnnotation as any}
        durationInFrames={90}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ text: "Look at this!", position: "top-right", arrowDirection: "down" }}
      />
      <Composition
        id="GlitchPreview"
        component={GlitchEffect as any}
        durationInFrames={5}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{}}
      />
      <Composition
        id="FreezeFramePreview"
        component={FreezeFrame as any}
        durationInFrames={45}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ text: "Wait what?", style: "record_scratch" }}
      />
      <Composition
        id="KineticTypePreview"
        component={KineticType as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ words: "If you're not visible in AI you don't exist" }}
      />
      <Composition
        id="LightLeakPreview"
        component={LightLeakOverlay as any}
        durationInFrames={45}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ seed: 3, hueShift: 30 }}
      />
      {/* === New Motion Effects === */}
      <Composition
        id="ScreenShakePreview"
        component={ScreenShake as any}
        durationInFrames={15}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ intensity: 0.7, style: "impact" }}
      />
      <Composition
        id="ConfettiBurstPreview"
        component={ConfettiBurst as any}
        durationInFrames={75}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ density: 1.0 }}
      />
      <Composition
        id="TypewriterTextPreview"
        component={TypewriterText as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ text: "The future of search is AI-powered answers.", speed: 12 }}
      />
      <Composition
        id="CheckXMarkPreview"
        component={CheckXMark as any}
        durationInFrames={45}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ markType: "check", position: "center" }}
      />
      <Composition
        id="CircleTimerPreview"
        component={CircleTimer as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ color: "#e63946", label: "Time Left", showNumbers: true }}
      />
      <Composition
        id="TextRevealWipePreview"
        component={TextRevealWipe as any}
        durationInFrames={60}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{ text: "GAME CHANGER", direction: "left", style: "center" }}
      />
      {/* === New Data Viz Templates === */}
      <Composition
        id="BarChartPreview"
        component={BarChart as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "Monthly Revenue by Channel",
          bars: [
            { label: "YouTube", value: 4200, color: "#e63946" },
            { label: "LinkedIn", value: 8500, color: "#457b9d" },
            { label: "Community", value: 3100, color: "#2a9d8f" },
            { label: "Consulting", value: 6700, color: "#e76f51" },
          ],
        }}
      />
      <Composition
        id="LineChartPreview"
        component={LineChart as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "Growth Over Time",
          points: [
            { label: "Jan", value: 12 },
            { label: "Feb", value: 19 },
            { label: "Mar", value: 28 },
            { label: "Apr", value: 35 },
            { label: "May", value: 52 },
            { label: "Jun", value: 71 },
          ],
          lineColor: "#e63946",
          showDots: true,
        }}
      />
      <Composition
        id="BulletListPreview"
        component={BulletList as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "What You Get",
          items: [
            "Weekly live implementation calls",
            "14 custom Claude Code agents",
            "Private community access",
            "Done-for-you templates",
          ],
          icon: "check",
          color: "#22c55e",
        }}
      />
      <Composition
        id="StatCardsPreview"
        component={StatCards as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          cards: [
            { value: "$10.2K", label: "Monthly Revenue", trend: "up", trendValue: "+23%", color: "#22c55e" },
            { value: "439", label: "Paid Members", trend: "up", trendValue: "+12%", color: "#457b9d" },
            { value: "97%", label: "Retention Rate", trend: "up", trendValue: "+5%", color: "#2a9d8f" },
            { value: "4.8", label: "Avg Rating", color: "#e76f51" },
          ],
        }}
      />
      <Composition
        id="PieChartPreview"
        component={PieChart as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "Revenue Breakdown",
          segments: [
            { label: "Consulting", value: 45, color: "#e63946" },
            { label: "Community", value: 30, color: "#457b9d" },
            { label: "YouTube", value: 15, color: "#2a9d8f" },
            { label: "Other", value: 10, color: "#e76f51" },
          ],
          donut: false,
        }}
      />
      <Composition
        id="FlowDiagramPreview"
        component={FlowDiagram as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          nodes: [
            { label: "Audit", description: "LLM visibility check" },
            { label: "Playbook", description: "Action items" },
            { label: "Execute", description: "Implement changes" },
            { label: "Monitor", description: "Track results" },
          ],
          accentColor: "#e63946",
          direction: "horizontal",
        }}
      />
      <Composition
        id="TreasureMapPreview"
        component={TreasureMap as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "THE ROADMAP",
          nodes: [
            { label: "Audit", description: "Find gaps" },
            { label: "Playbook", description: "Plan actions" },
            { label: "Execute", description: "Implement" },
            { label: "Monitor", description: "Track results" },
            { label: "Treasure!", description: "AI visibility" },
          ],
          accentColor: "#c0392b",
        }}
      />
      {/* === Chapter Card + CTA Overlay === */}
      <Composition
        id="ChapterCardPreview"
        component={ChapterCard as any}
        durationInFrames={90}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          title: "The Problem",
          number: 1,
          subtitle: "Why traditional SEO is dying",
          accentColor: "#e63946",
        }}
      />
      <Composition
        id="CtaOverlayPreview"
        component={CtaOverlay as any}
        durationInFrames={180}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          text: "Free AEO Quiz",
          subtitle: "Link in Description",
          style: "offer",
          accentColor: "#e63946",
        }}
      />
      {/* === Interactive Animation Components === */}
      <Composition
        id="SearchBarPreview"
        component={SearchBar as any}
        durationInFrames={240}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          query: "best AI assistant 2026",
          engine: "chatgpt",
          results: ["ChatGPT says Claude and GPT lead the pack", "Based on benchmarks, Claude excels at coding"],
        }}
      />
      <Composition
        id="StarRatingPreview"
        component={StarRating as any}
        durationInFrames={150}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          rating: 4.8,
          label: "Google Reviews",
          reviewCount: "1,247 reviews",
          color: "#fbbf24",
        }}
      />
      <Composition
        id="ChatBubblesPreview"
        component={ChatBubbles as any}
        durationInFrames={240}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          messages: [
            { role: "user", text: "Best hair transplant clinic?" },
            { role: "ai", text: "Based on reviews, Clinica Fuegenix is highly rated." },
            { role: "user", text: "What about pricing?" },
          ],
          aiName: "ChatGPT",
        }}
      />
      <Composition
        id="TerminalPreview"
        component={Terminal as any}
        durationInFrames={240}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          commands: [
            { input: "claude --help", output: "Claude Code v1.0\nUsage: claude [options]" },
            { input: "claude 'fix the bug'" },
          ],
        }}
      />
      <Composition
        id="CodeEditorPreview"
        component={CodeEditor as any}
        durationInFrames={240}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          code: "const audit = await runAudit({\n  brand: 'Acme',\n  category: 'SaaS'\n});",
          language: "TypeScript",
          highlightLines: [1, 2],
        }}
      />
      <Composition
        id="BrowserMockupPreview"
        component={BrowserMockup as any}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          url: "chatgpt.com",
          pageTitle: "ChatGPT",
          content: ["What is AEO?", "Answer Engine Optimization is the practice of optimizing content for AI-powered search engines."],
        }}
      />
      <Composition
        id="ToggleSwitchPreview"
        component={ToggleSwitch as any}
        durationInFrames={90}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          labelOff: "Traditional SEO",
          labelOn: "AEO Protocol",
          accentColor: "#22c55e",
        }}
      />
      <Composition
        id="NotificationStackPreview"
        component={NotificationStack as any}
        durationInFrames={180}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          notifications: [
            { title: "New Member", body: "Sarah joined Claudify" },
            { title: "Payment", body: "$97.00 received" },
            { title: "New Member", body: "Marcus joined Claudify" },
          ],
          accentColor: "#e63946",
        }}
      />
      <Composition
        id="PricingCardPreview"
        component={PricingCard as any}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          name: "Claudify Pro",
          price: "$97",
          period: "/mo",
          features: ["Weekly live calls", "14 custom agents", "Community access", "Done-for-you templates"],
          badge: "Most Popular",
          accentColor: "#e63946",
        }}
      />
      <Composition
        id="CountdownFlipPreview"
        component={CountdownFlip as any}
        durationInFrames={120}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          from: 10,
          to: 3,
          label: "Spots Left",
          color: "#e63946",
        }}
      />
      <Composition
        id="TextHighlightPreview"
        component={TextHighlight as any}
        durationInFrames={210}
        fps={30}
        width={3840}
        height={2160}
        defaultProps={{
          paragraph: "By 2027, over 50% of all searches will be zero-click, answered directly by AI without users visiting any website.",
          highlight: "50% of all searches will be zero-click",
          accentColor: "#e63946",
        }}
      />
    </>
  );
};
