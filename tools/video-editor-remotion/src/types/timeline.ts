export type LayoutType =
  | "speaker_full"
  | "slide_full"
  | "split_right"
  | "split_left"
  | "split_5050_left"
  | "split_5050_right"
  | "jump_zoom_in"
  | "jump_zoom_out"
  | "jump_cut_in"
  | "jump_cut_out"
  | "zoom_transition_in"
  | "zoom_transition_out"
  | "gradual_zoom"
  | "gif_overlay"
  | "gif_full"
  | "broll_full"
  | "text_overlay"
  | "sfx"
  | "newspaper_flash"
  | "lower_third"
  | "counter_ticker"
  | "comparison_table"
  | "quote_card"
  | "progress_bars"
  | "social_proof_flash"
  | "callout"
  | "glitch"
  | "freeze_frame"
  | "kinetic_type"
  | "light_leak"
  | "screen_shake"
  | "confetti_burst"
  | "typewriter_text"
  | "check_x_mark"
| "circle_timer"
  | "text_reveal_wipe"
  | "bar_chart"
  | "line_chart"
  | "bullet_list"
  | "stat_cards"
  | "pie_chart"
  | "flow_diagram"
  | "treasure_map"
  | "chapter_card"
  | "cta_overlay"
  | "search_bar"
  | "star_rating"
  | "chat_bubbles"
  | "terminal"
  | "code_editor"
  | "browser_mockup"
  | "toggle_switch"
  | "notification_stack"
  | "pricing_card"
  | "countdown_flip"
  | "text_highlight";

export interface BaseEdit {
  type: LayoutType;
  start: number; // seconds
  end: number; // seconds
}

export interface SpeakerFullEdit extends BaseEdit {
  type: "speaker_full";
}

export interface SlideFullEdit extends BaseEdit {
  type: "slide_full";
  content: string; // path to slide image
}

export interface SplitEdit extends BaseEdit {
  type: "split_right" | "split_left";
  content: string; // path to slide image
}

// 50/50 full-bleed split (no padding, no borders, edge-to-edge)
export interface Split5050Edit extends BaseEdit {
  type: "split_5050_left" | "split_5050_right";
  content: string; // path to slide image (generate at 1:1 aspect ratio)
}

// Animated zoom (duration from segment length)
export interface JumpZoomInEdit extends BaseEdit {
  type: "jump_zoom_in";
  zoom?: number; // default 1.2
}

export interface JumpZoomOutEdit extends BaseEdit {
  type: "jump_zoom_out";
  zoom?: number; // default 1.2
}

// Instant zoom cut (no animation)
export interface JumpCutInEdit extends BaseEdit {
  type: "jump_cut_in";
  zoom?: number; // default 1.2
}

export interface JumpCutOutEdit extends BaseEdit {
  type: "jump_cut_out";
}

// Zoom transition (any layout → any layout with continuous zoom)
// fromLayout/toLayout: "speaker_full" | "slide_full" | "split_right" | "split_left"
export interface ZoomTransitionInEdit extends BaseEdit {
  type: "zoom_transition_in";
  content: string; // slide image
  zoom?: number; // default 1.15 - MUST match previous segment's zoom level
  fromLayout?: "slide_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right" | "broll_full"; // default: slide_full
  toLayout?: "speaker_full"; // zoom_in always goes to speaker
}

export interface ZoomTransitionOutEdit extends BaseEdit {
  type: "zoom_transition_out";
  content: string; // slide image
  zoom?: number; // default 1.15 - MUST match previous segment's zoom level
  fromLayout?: "speaker_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right"; // default: speaker_full
  toLayout?: "slide_full" | "split_right" | "split_left" | "split_5050_left" | "split_5050_right" | "broll_full"; // default: slide_full
}

export interface GradualZoomEdit extends BaseEdit {
  type: "gradual_zoom";
  zoomStart?: number;
  zoomEnd?: number;
  direction?: "in" | "out";
}

// GIF overlay on top of speaker video (reaction meme style)
export type GifPosition =
  | "bottom-right"
  | "bottom-left"
  | "top-right"
  | "top-left"
  | "center";

export interface GifOverlayEdit extends BaseEdit {
  type: "gif_overlay";
  content: string; // path to GIF file
  position?: GifPosition; // default: "bottom-right"
  size?: number; // fraction of frame width, default 0.3
}

// Full-screen GIF moment (replaces speaker)
export interface GifFullEdit extends BaseEdit {
  type: "gif_full";
  content: string; // path to GIF file
}

// Full-screen B-roll video (replaces speaker visual, speaker audio continues)
export interface BrollFullEdit extends BaseEdit {
  type: "broll_full";
  content: string; // path to b-roll video file
}

// Text overlay on top of speaker video
// 3 styles: "caption" (bottom), "center" (big center), "heading" (top area)
export type TextStyle = "caption" | "center" | "heading";

// Data viz layout: full-screen (default) or 50/50 split with speaker
export type DataVizLayout = "full" | "split_left" | "split_right";

export interface TextOverlayEdit extends BaseEdit {
  type: "text_overlay";
  text: string; // 1-3 words max
  style?: TextStyle; // default: "caption"
  color?: string; // default: "#ffffff"
  glow?: boolean; // default: true
}

// Sound effect (audio-only overlay, no visual - plays on top of current layout)
export interface SfxEdit extends BaseEdit {
  type: "sfx";
  content: string; // sfx name: "boop" or "click"
  volume?: number; // 0-1, default 0.5
}

// Newspaper flash - rapid cycling through newspaper clippings with keyword highlighted
export interface NewspaperFlashEdit extends BaseEdit {
  type: "newspaper_flash";
  keyword: string; // the word/phrase highlighted in each headline
  headlines?: string[]; // optional custom headlines - auto-generates if omitted
  highlightColor?: string; // default: "#fde047" (yellow marker)
}

// Lower third - name/title bar overlay on speaker
export interface LowerThirdEdit extends BaseEdit {
  type: "lower_third";
  title: string; // name
  subtitle: string; // role
  accentColor?: string; // default: "#e63946"
}

// Counter ticker - animated counting number
export interface CounterTickerEdit extends BaseEdit {
  type: "counter_ticker";
  from?: number; // default: 0
  to: number;
  prefix?: string; // e.g. "$"
  suffix?: string; // e.g. "/mo"
  label?: string; // optional text above number
  color?: string;
}

// Comparison table - two-column side-by-side
export interface ComparisonRow {
  left: string;
  right: string;
  rightWins?: boolean;
}

export interface ComparisonTableEdit extends BaseEdit {
  type: "comparison_table";
  leftLabel: string;
  rightLabel: string;
  rows: ComparisonRow[];
  accentColor?: string;
  layout?: DataVizLayout;
  winnerSide?: "left" | "right";
}

// Quote card - stylized quote with attribution
export interface QuoteCardEdit extends BaseEdit {
  type: "quote_card";
  quote: string;
  attribution: string;
  role?: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

// Progress bars - horizontal stat bars with animated fill
export interface ProgressBar {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
}

export interface ProgressBarsEdit extends BaseEdit {
  type: "progress_bars";
  bars: ProgressBar[];
  title?: string;
  layout?: DataVizLayout;
}

// Social proof flash - rapid cycling tweet/post cards
export interface SocialPost {
  username: string;
  handle: string;
  text: string;
}

export interface SocialProofFlashEdit extends BaseEdit {
  type: "social_proof_flash";
  keyword: string;
  posts?: SocialPost[];
  platform?: "twitter" | "linkedin";
  highlightColor?: string;
}

// Callout annotation - arrow + text label overlay
export type CalloutPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type ArrowDirection = "down" | "up" | "left" | "right";

export interface CalloutEdit extends BaseEdit {
  type: "callout";
  text: string;
  position?: CalloutPosition; // default: "top-right"
  arrowDirection?: ArrowDirection; // default: "down"
  color?: string;
}

// Glitch effect - quick digital distortion (3-5 frames)
export interface GlitchEdit extends BaseEdit {
  type: "glitch";
  intensity?: number; // 0-1, default 0.5
}

// Freeze frame - hold speaker with desaturation
export interface FreezeFrameEdit extends BaseEdit {
  type: "freeze_frame";
  text?: string; // optional annotation
  style?: "record_scratch" | "pause"; // default: "pause"
}

// Kinetic typography - words appear one at a time
export interface KineticTypeEdit extends BaseEdit {
  type: "kinetic_type";
  words: string; // split by spaces
  color?: string;
  size?: "large" | "huge"; // default: "large"
  layout?: DataVizLayout;
}

// Light leak overlay - cinematic light leak on speaker video
export interface LightLeakEdit extends BaseEdit {
  type: "light_leak";
  seed?: number; // shape variation, default: 3
  hueShift?: number; // color: 0=warm orange, 240=cool blue, default: 30
}

// Screen shake - transform on speaker video
export interface ScreenShakeEdit extends BaseEdit {
  type: "screen_shake";
  intensity?: number; // 0-1, default 0.5
  style?: "impact" | "earthquake" | "subtle"; // default: "impact"
}

// Confetti burst - particle overlay on speaker
export interface ConfettiBurstEdit extends BaseEdit {
  type: "confetti_burst";
  colors?: string[];
  density?: number; // default 1.0
}

// Typewriter text - full-screen monospace typing
export interface TypewriterTextEdit extends BaseEdit {
  type: "typewriter_text";
  text: string;
  speed?: number; // chars/sec, default 12
  cursorColor?: string;
  layout?: DataVizLayout;
}

// Check or X mark - SVG overlay on speaker
export interface CheckXMarkEdit extends BaseEdit {
  type: "check_x_mark";
  markType: "check" | "x";
  color?: string;
  size?: number;
  position?: "center" | "top-right" | "top-left";
}

// Circle timer - countdown circle overlay on speaker
export interface CircleTimerEdit extends BaseEdit {
  type: "circle_timer";
  color?: string;
  label?: string;
  showNumbers?: boolean; // default true
}

// Text reveal wipe - clip-path text reveal on speaker
export interface TextRevealWipeEdit extends BaseEdit {
  type: "text_reveal_wipe";
  text: string;
  direction?: "left" | "right" | "top" | "bottom"; // default "left"
  style?: TextStyle;
  color?: string;
}

// Bar chart - vertical bars (full-screen)
export interface BarChartBar {
  label: string;
  value: number;
  color?: string;
}

export interface BarChartEdit extends BaseEdit {
  type: "bar_chart";
  bars: BarChartBar[];
  title?: string;
  maxValue?: number;
  layout?: DataVizLayout;
}

// Line chart - SVG line (full-screen)
export interface LineChartPoint {
  label: string;
  value: number;
}

export interface LineChartEdit extends BaseEdit {
  type: "line_chart";
  points: LineChartPoint[];
  title?: string;
  lineColor?: string;
  showDots?: boolean;
  layout?: DataVizLayout;
}

// Bullet list - animated items (full-screen)
export interface BulletListEdit extends BaseEdit {
  type: "bullet_list";
  items: string[];
  icon?: "check" | "arrow" | "number" | "dot"; // default "check"
  title?: string;
  color?: string;
  layout?: DataVizLayout;
}

// Stat cards - grid of metric cards (full-screen)
export interface StatCard {
  value: string;
  label: string;
  trend?: "up" | "down";
  trendValue?: string;
  color?: string;
}

export interface StatCardsEdit extends BaseEdit {
  type: "stat_cards";
  cards: StatCard[];
  layout?: DataVizLayout;
}

// Pie chart - animated segments (full-screen)
export interface PieSegment {
  label: string;
  value: number;
  color: string;
}

export interface PieChartEdit extends BaseEdit {
  type: "pie_chart";
  segments: PieSegment[];
  title?: string;
  donut?: boolean; // default false
  layout?: DataVizLayout;
}

// Flow diagram - linear node flow (full-screen)
export interface FlowNode {
  label: string;
  description?: string;
}

export interface FlowDiagramEdit extends BaseEdit {
  type: "flow_diagram";
  nodes: FlowNode[];
  accentColor?: string;
  direction?: "horizontal" | "vertical"; // default "horizontal"
  layout?: DataVizLayout;
}

// Treasure map - winding dashed path with X marks the spot
export interface TreasureMapNode {
  label: string;
  description?: string;
}

export interface TreasureMapEdit extends BaseEdit {
  type: "treasure_map";
  nodes: TreasureMapNode[];
  accentColor?: string;
  title?: string;
  layout?: DataVizLayout;
}

// Chapter card - full-screen section header between topics
export type CtaStyleType = "offer" | "subscribe" | "next_video";

export interface ChapterCardEdit extends BaseEdit {
  type: "chapter_card";
  title: string;
  number?: number;
  subtitle?: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

// CTA overlay - animated call-to-action on speaker video
export interface CtaOverlayEdit extends BaseEdit {
  type: "cta_overlay";
  text: string;
  subtitle?: string;
  style?: CtaStyleType;
  accentColor?: string;
}

// Search bar with query typing + results appearing
export type SearchEngine = "google" | "chatgpt" | "gemini";

export interface SearchBarEdit extends BaseEdit {
  type: "search_bar";
  query: string;
  engine?: SearchEngine;
  results?: string[];
  accentColor?: string;
  layout?: DataVizLayout;
}

// Star rating with animated fill
export interface StarRatingEdit extends BaseEdit {
  type: "star_rating";
  rating: number; // supports 4.5
  label?: string;
  reviewCount?: string;
  color?: string;
  layout?: DataVizLayout;
}

// Chat bubbles like iMessage/ChatGPT
export interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

export interface ChatBubblesEdit extends BaseEdit {
  type: "chat_bubbles";
  messages: ChatMessage[];
  aiName?: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

// Terminal with commands typing in + output
export interface TerminalCommand {
  input: string;
  output?: string;
}

export interface TerminalEdit extends BaseEdit {
  type: "terminal";
  commands: TerminalCommand[];
  prompt?: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

// VS Code-style code editor with typing
export interface CodeEditorEdit extends BaseEdit {
  type: "code_editor";
  code: string;
  language?: string;
  highlightLines?: number[];
  accentColor?: string;
  layout?: DataVizLayout;
}

// Chrome browser frame with URL typing + page content
export interface BrowserMockupEdit extends BaseEdit {
  type: "browser_mockup";
  url: string;
  pageTitle?: string;
  content: string[];
  accentColor?: string;
  layout?: DataVizLayout;
}

// iOS toggle switch with spring flip
export interface ToggleSwitchEdit extends BaseEdit {
  type: "toggle_switch";
  labelOff: string;
  labelOn: string;
  startsOn?: boolean;
  accentColor?: string;
}

// iOS-style notification stack from top
export interface NotificationItem {
  title: string;
  body: string;
  icon?: string;
}

export interface NotificationStackEdit extends BaseEdit {
  type: "notification_stack";
  notifications: NotificationItem[];
  accentColor?: string;
}

// Pricing card with features + mouse click selection
export interface PricingCardEdit extends BaseEdit {
  type: "pricing_card";
  name: string;
  price: string;
  period?: string;
  features: string[];
  badge?: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

// Airport departure board flip-clock countdown
export interface CountdownFlipEdit extends BaseEdit {
  type: "countdown_flip";
  from: number;
  to: number;
  label?: string;
  suffix?: string;
  color?: string;
}

// Text with mouse drag highlight + zoom
export interface TextHighlightEdit extends BaseEdit {
  type: "text_highlight";
  paragraph: string;
  highlight: string;
  accentColor?: string;
  layout?: DataVizLayout;
}

export type Edit =
  | SpeakerFullEdit
  | SlideFullEdit
  | SplitEdit
  | Split5050Edit
  | JumpZoomInEdit
  | JumpZoomOutEdit
  | JumpCutInEdit
  | JumpCutOutEdit
  | ZoomTransitionInEdit
  | ZoomTransitionOutEdit
  | GradualZoomEdit
  | GifOverlayEdit
  | GifFullEdit
  | BrollFullEdit
  | TextOverlayEdit
  | SfxEdit
  | NewspaperFlashEdit
  | LowerThirdEdit
  | CounterTickerEdit
  | ComparisonTableEdit
  | QuoteCardEdit
  | ProgressBarsEdit
  | SocialProofFlashEdit
  | CalloutEdit
  | GlitchEdit
  | FreezeFrameEdit
  | KineticTypeEdit
  | LightLeakEdit
  | ScreenShakeEdit
  | ConfettiBurstEdit
  | TypewriterTextEdit
  | CheckXMarkEdit
| CircleTimerEdit
  | TextRevealWipeEdit
  | BarChartEdit
  | LineChartEdit
  | BulletListEdit
  | StatCardsEdit
  | PieChartEdit
  | FlowDiagramEdit
  | TreasureMapEdit
  | ChapterCardEdit
  | CtaOverlayEdit
  | SearchBarEdit
  | StarRatingEdit
  | ChatBubblesEdit
  | TerminalEdit
  | CodeEditorEdit
  | BrowserMockupEdit
  | ToggleSwitchEdit
  | NotificationStackEdit
  | PricingCardEdit
  | CountdownFlipEdit
  | TextHighlightEdit;

export interface BgMusicConfig {
  src: string; // path relative to public/, e.g. "sfx/lofi-beat-bg.mp3"
  startVolume?: number; // volume at start, default 0.16 (16%)
  mainVolume?: number; // volume after fade, default 0.08 (8%)
  fadeDuration?: number; // seconds to fade from startVolume to mainVolume, default 10
}

export interface VideoConfig {
  speakerVideo: string;
  gridBackground: string;
  timeline: Edit[];
  fps: number;
  width: number;
  height: number;
  bgMusic?: BgMusicConfig;
}
