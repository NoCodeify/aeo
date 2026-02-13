import React from "react";
import { Audio, Sequence, staticFile, useVideoConfig } from "remotion";
import { Edit, VideoConfig, BgMusicConfig, DataVizLayout } from "../types/timeline";
import { DataVizSplit } from "./DataVizSplit";
import { proxyVideo } from "../use-proxy";
import { SpeakerFull } from "./SpeakerFull";
import { SlideFull } from "./SlideFull";
import { SplitLayout } from "./SplitLayout";
import { Split5050 } from "./Split5050";
import { JumpZoom } from "./JumpZoom";
import { JumpCut } from "./JumpCut";
import { ZoomTransition } from "./ZoomTransition";
import { GradualZoom } from "./GradualZoom";
import { GifOverlay } from "./GifOverlay";
import { GifFull } from "./GifFull";
import { BrollFull } from "./BrollFull";
import { TextOverlay } from "./TextOverlay";
import { NewspaperFlash } from "./NewspaperFlash";
import { LowerThird } from "./LowerThird";
import { CounterTicker } from "./CounterTicker";
import { ComparisonTable } from "./ComparisonTable";
import { QuoteCard } from "./QuoteCard";
import { ProgressBars } from "./ProgressBars";
import { SocialProofFlash } from "./SocialProofFlash";
import { CalloutAnnotation } from "./CalloutAnnotation";
import { GlitchEffect } from "./GlitchEffect";
import { FreezeFrame } from "./FreezeFrame";
import { KineticType } from "./KineticType";
import { LightLeakOverlay } from "./LightLeakOverlay";
import { ScreenShake } from "./ScreenShake";
import { ConfettiBurst } from "./ConfettiBurst";
import { TypewriterText } from "./TypewriterText";
import { CheckXMark } from "./CheckXMark";
import { CircleTimer } from "./CircleTimer";
import { TextRevealWipe } from "./TextRevealWipe";
import { BarChart } from "./BarChart";
import { LineChart } from "./LineChart";
import { BulletList } from "./BulletList";
import { StatCards } from "./StatCards";
import { PieChart } from "./PieChart";
import { FlowDiagram } from "./FlowDiagram";
import { TreasureMap } from "./TreasureMap";
import { ChapterCard } from "./ChapterCard";
import { CtaOverlay } from "./CtaOverlay";
import { SearchBar } from "./SearchBar";
import { ChatBubbles } from "./ChatBubbles";
import { Terminal } from "./Terminal";
import { CodeEditor } from "./CodeEditor";
import { ToggleSwitch } from "./ToggleSwitch";
import { CountdownFlip } from "./CountdownFlip";
import { NotificationStack } from "./NotificationStack";
import { StarRating } from "./StarRating";
import { BrowserMockup } from "./BrowserMockup";
import { PricingCard } from "./PricingCard";
import { TextHighlight } from "./TextHighlight";

interface MainVideoProps {
  config: VideoConfig;
}

export const MainVideo: React.FC<MainVideoProps> = ({ config }) => {
  const { fps } = useVideoConfig();
  const { speakerVideo, gridBackground, timeline } = config;
  const resolvedSpeaker = proxyVideo(speakerVideo);
  const resolvedGrid = proxyVideo(gridBackground);

  return (
    <>
      {/* Background music (lofi default - loops entire video) */}
      {config.bgMusic && (
        <Audio
          src={staticFile(config.bgMusic.src)}
          loop
          volume={(f) => {
            const startVol = config.bgMusic!.startVolume ?? 0.16;
            const mainVol = config.bgMusic!.mainVolume ?? 0.08;
            const fadeFrames = (config.bgMusic!.fadeDuration ?? 10) * fps;
            if (f >= fadeFrames) return mainVol;
            return startVol + (mainVol - startVol) * (f / fadeFrames);
          }}
        />
      )}

      {/* Visual timeline */}
      {timeline.map((edit, index) => {
        const startFrame = Math.round(edit.start * fps);
        const endFrame = Math.round(edit.end * fps);
        const durationInFrames = endFrame - startFrame;

        // Speaker video startFrom (in frames)
        const speakerStartFrom = startFrame;

        return (
          <Sequence
            key={index}
            from={startFrame}
            durationInFrames={durationInFrames}
            name={`${edit.type}-${index}`}
            premountFor={30}
          >
            {renderEdit(edit, resolvedSpeaker, resolvedGrid, speakerStartFrom)}
          </Sequence>
        );
      })}

    </>
  );
};

// Wrap data viz in 50/50 split with speaker when layout is split_left/split_right
function withSplitLayout(
  layout: DataVizLayout | undefined,
  speakerVideo: string,
  speakerStartFrom: number,
  renderViz: (speakerSrc?: string) => React.ReactNode,
): React.ReactNode {
  const isSplit = layout && layout !== "full";
  // In split mode, don't pass speakerSrc to viz (wrapper handles speaker + audio)
  const viz = renderViz(isSplit ? undefined : speakerVideo);
  if (!isSplit) return viz;
  return (
    <DataVizSplit
      speakerSrc={speakerVideo}
      startFrom={speakerStartFrom}
      side={layout === "split_left" ? "left" : "right"}
    >
      {viz}
    </DataVizSplit>
  );
}

function renderEdit(
  edit: Edit,
  speakerVideo: string,
  gridBackground: string,
  speakerStartFrom: number
): React.ReactNode {
  switch (edit.type) {
    case "speaker_full":
      return (
        <SpeakerFull
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "slide_full":
      return (
        <SlideFull
          slideSrc={edit.content}
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "split_right":
      return (
        <SplitLayout
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          side="right"
          startFrom={speakerStartFrom}
        />
      );

    case "split_left":
      return (
        <SplitLayout
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          side="left"
          startFrom={speakerStartFrom}
        />
      );

    case "split_5050_left":
      return (
        <Split5050
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          side="left"
          startFrom={speakerStartFrom}
        />
      );

    case "split_5050_right":
      return (
        <Split5050
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          side="right"
          startFrom={speakerStartFrom}
        />
      );

    case "jump_zoom_in":
      return (
        <JumpZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
          direction="in"
        />
      );

    case "jump_zoom_out":
      return (
        <JumpZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
          direction="out"
        />
      );

    // Instant zoom cut (no animation)
    case "jump_cut_in":
      return (
        <JumpCut
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.2}
        />
      );

    case "jump_cut_out":
      return (
        <JumpCut
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoom={1.0}
        />
      );

    // Zoom transition (any layout → any layout with continuous zoom)
    case "zoom_transition_in":
      return (
        <ZoomTransition
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.15}
          direction="in"
          fromLayout={edit.fromLayout}
          toLayout={edit.toLayout}
        />
      );

    case "zoom_transition_out":
      return (
        <ZoomTransition
          speakerSrc={speakerVideo}
          slideSrc={edit.content}
          gridSrc={gridBackground}
          startFrom={speakerStartFrom}
          zoom={edit.zoom ?? 1.15}
          direction="out"
          fromLayout={edit.fromLayout}
          toLayout={edit.toLayout}
        />
      );

    case "gradual_zoom":
      return (
        <GradualZoom
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          zoomStart={edit.zoomStart ?? 1.0}
          zoomEnd={edit.zoomEnd ?? 1.1}
        />
      );

    case "gif_overlay":
      return (
        <GifOverlay
          speakerSrc={speakerVideo}
          gifSrc={edit.content}
          startFrom={speakerStartFrom}
          position={edit.position ?? "bottom-right"}
          size={edit.size ?? 0.3}
        />
      );

    case "gif_full":
      return (
        <GifFull
          gifSrc={edit.content}
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "broll_full":
      return (
        <BrollFull
          brollSrc={edit.content}
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
        />
      );

    case "text_overlay":
      return (
        <TextOverlay
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          text={edit.text}
          style={edit.style ?? "caption"}
          color={edit.color}
          glow={edit.glow}
        />
      );

    case "sfx":
      return (
        <Audio
          src={staticFile(`sfx/${edit.content}.mp3`)}
          volume={edit.volume ?? 0.5}
        />
      );

    case "newspaper_flash":
      return (
        <NewspaperFlash
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          keyword={edit.keyword}
          headlines={edit.headlines}
          highlightColor={edit.highlightColor}
        />
      );

    case "lower_third":
      return (
        <LowerThird
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          title={edit.title}
          subtitle={edit.subtitle}
          accentColor={edit.accentColor}
        />
      );

    case "counter_ticker":
      return (
        <CounterTicker
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          from={edit.from}
          to={edit.to}
          prefix={edit.prefix}
          suffix={edit.suffix}
          label={edit.label}
          color={edit.color}
        />
      );

    case "comparison_table":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <ComparisonTable
          speakerSrc={src}
          startFrom={speakerStartFrom}
          leftLabel={edit.leftLabel}
          rightLabel={edit.rightLabel}
          rows={edit.rows}
          accentColor={edit.accentColor}
          winnerSide={edit.winnerSide}
        />
      ));

    case "quote_card":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <QuoteCard
          speakerSrc={src}
          startFrom={speakerStartFrom}
          quote={edit.quote}
          attribution={edit.attribution}
          role={edit.role}
          accentColor={edit.accentColor}
        />
      ));

    case "progress_bars":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <ProgressBars
          speakerSrc={src}
          startFrom={speakerStartFrom}
          bars={edit.bars}
          title={edit.title}
        />
      ));

    case "social_proof_flash":
      return (
        <SocialProofFlash
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          keyword={edit.keyword}
          posts={edit.posts}
          platform={edit.platform}
          highlightColor={edit.highlightColor}
        />
      );

    case "callout":
      return (
        <CalloutAnnotation
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          text={edit.text}
          position={edit.position}
          arrowDirection={edit.arrowDirection}
          color={edit.color}
        />
      );

    case "glitch":
      return (
        <GlitchEffect
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          intensity={edit.intensity}
        />
      );

    case "freeze_frame":
      return (
        <FreezeFrame
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          text={edit.text}
          style={edit.style}
        />
      );

    case "kinetic_type":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <KineticType
          speakerSrc={src}
          startFrom={speakerStartFrom}
          words={edit.words}
          color={edit.color}
          size={edit.size}
        />
      ));

    case "light_leak":
      return (
        <LightLeakOverlay
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          seed={edit.seed}
          hueShift={edit.hueShift}
        />
      );

    case "screen_shake":
      return (
        <ScreenShake
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          intensity={edit.intensity}
          style={edit.style}
        />
      );

    case "confetti_burst":
      return (
        <ConfettiBurst
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          colors={edit.colors}
          density={edit.density}
        />
      );

    case "typewriter_text":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <TypewriterText
          speakerSrc={src}
          startFrom={speakerStartFrom}
          text={edit.text}
          speed={edit.speed}
          cursorColor={edit.cursorColor}
        />
      ));

    case "check_x_mark":
      return (
        <CheckXMark
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          markType={edit.markType}
          color={edit.color}
          size={edit.size}
          position={edit.position}
        />
      );

    case "circle_timer":
      return (
        <CircleTimer
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          color={edit.color}
          label={edit.label}
          showNumbers={edit.showNumbers}
        />
      );

    case "text_reveal_wipe":
      return (
        <TextRevealWipe
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          text={edit.text}
          direction={edit.direction}
          style={edit.style}
          color={edit.color}
        />
      );

    case "bar_chart":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <BarChart
          speakerSrc={src}
          startFrom={speakerStartFrom}
          bars={edit.bars}
          title={edit.title}
          maxValue={edit.maxValue}
        />
      ));

    case "line_chart":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <LineChart
          speakerSrc={src}
          startFrom={speakerStartFrom}
          points={edit.points}
          title={edit.title}
          lineColor={edit.lineColor}
          showDots={edit.showDots}
        />
      ));

    case "bullet_list":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <BulletList
          speakerSrc={src}
          startFrom={speakerStartFrom}
          items={edit.items}
          icon={edit.icon}
          title={edit.title}
          color={edit.color}
        />
      ));

    case "stat_cards":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <StatCards
          speakerSrc={src}
          startFrom={speakerStartFrom}
          cards={edit.cards}
        />
      ));

    case "pie_chart":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <PieChart
          speakerSrc={src}
          startFrom={speakerStartFrom}
          segments={edit.segments}
          title={edit.title}
          donut={edit.donut}
        />
      ));

    case "flow_diagram":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <FlowDiagram
          speakerSrc={src}
          startFrom={speakerStartFrom}
          nodes={edit.nodes}
          accentColor={edit.accentColor}
          direction={edit.direction}
        />
      ));

    case "treasure_map":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <TreasureMap
          speakerSrc={src}
          startFrom={speakerStartFrom}
          nodes={edit.nodes}
          accentColor={edit.accentColor}
          title={edit.title}
        />
      ));

    case "chapter_card":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <ChapterCard
          speakerSrc={src}
          startFrom={speakerStartFrom}
          title={edit.title}
          number={edit.number}
          subtitle={edit.subtitle}
          accentColor={edit.accentColor}
        />
      ));

    case "cta_overlay":
      return (
        <CtaOverlay
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          text={edit.text}
          subtitle={edit.subtitle}
          style={edit.style}
          accentColor={edit.accentColor}
        />
      );

    case "toggle_switch":
      return (
        <ToggleSwitch
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          labelOff={edit.labelOff}
          labelOn={edit.labelOn}
          startsOn={edit.startsOn}
          accentColor={edit.accentColor}
        />
      );

    case "countdown_flip":
      return (
        <CountdownFlip
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          from={edit.from}
          to={edit.to}
          label={edit.label}
          suffix={edit.suffix}
          color={edit.color}
        />
      );

    case "notification_stack":
      return (
        <NotificationStack
          speakerSrc={speakerVideo}
          startFrom={speakerStartFrom}
          notifications={edit.notifications}
          accentColor={edit.accentColor}
        />
      );

    case "star_rating":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <StarRating
          speakerSrc={src}
          startFrom={speakerStartFrom}
          rating={edit.rating}
          label={edit.label}
          reviewCount={edit.reviewCount}
          color={edit.color}
        />
      ));

    case "search_bar":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <SearchBar
          speakerSrc={src}
          startFrom={speakerStartFrom}
          query={edit.query}
          engine={edit.engine}
          results={edit.results}
          accentColor={edit.accentColor}
        />
      ));

    case "chat_bubbles":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <ChatBubbles
          speakerSrc={src}
          startFrom={speakerStartFrom}
          messages={edit.messages}
          aiName={edit.aiName}
          accentColor={edit.accentColor}
        />
      ));

    case "terminal":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <Terminal
          speakerSrc={src}
          startFrom={speakerStartFrom}
          commands={edit.commands}
          prompt={edit.prompt}
          accentColor={edit.accentColor}
        />
      ));

    case "code_editor":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <CodeEditor
          speakerSrc={src}
          startFrom={speakerStartFrom}
          code={edit.code}
          language={edit.language}
          highlightLines={edit.highlightLines}
          accentColor={edit.accentColor}
        />
      ));

    case "browser_mockup":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <BrowserMockup
          speakerSrc={src}
          startFrom={speakerStartFrom}
          url={edit.url}
          pageTitle={edit.pageTitle}
          content={edit.content}
          accentColor={edit.accentColor}
        />
      ));

    case "pricing_card":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <PricingCard
          speakerSrc={src}
          startFrom={speakerStartFrom}
          name={edit.name}
          price={edit.price}
          period={edit.period}
          features={edit.features}
          badge={edit.badge}
          accentColor={edit.accentColor}
        />
      ));

    case "text_highlight":
      return withSplitLayout(edit.layout, speakerVideo, speakerStartFrom, (src) => (
        <TextHighlight
          speakerSrc={src}
          startFrom={speakerStartFrom}
          paragraph={edit.paragraph}
          highlight={edit.highlight}
          accentColor={edit.accentColor}
        />
      ));

    default:
      return null;
  }
}
