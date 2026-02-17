import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { LandingPage } from "./pages/LandingPage";
import { FuegenixReport } from "./pages/FuegenixReport";
import { LinkedInBanner } from "./pages/LinkedInBanner";
import { YouTubeBanner } from "./pages/YouTubeBanner";
import { ChecklistPage } from "./pages/ChecklistPage";
import { WhatIsAEO } from "./pages/WhatIsAEO";
import { AEOvsSEO } from "./pages/AEOvsSEO";
import { HowToOptimizeForChatGPT } from "./pages/HowToOptimizeForChatGPT";
import { First50WordsRule } from "./pages/First50WordsRule";
import { TenRunConsistencyTest } from "./pages/TenRunConsistencyTest";
import { CaseStudyFuegenix } from "./pages/CaseStudyFuegenix";
import { ThreeLayerChatGPTArchitecture } from "./pages/ThreeLayerChatGPTArchitecture";
import { HundredBrandsAudit } from "./pages/HundredBrandsAudit";
import { GlossaryAEO } from "./pages/GlossaryAEO";
import { AEOAudit } from "./pages/AEOAudit";
import { AEOConsulting } from "./pages/AEOConsulting";
import { Learn } from "./pages/Learn";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn" element={<Learn />} />
      <Route path="/checklist" element={<ChecklistPage />} />
      <Route path="/what-is-aeo" element={<WhatIsAEO />} />
      <Route path="/aeo-vs-seo" element={<AEOvsSEO />} />
      <Route path="/how-to-optimize-for-chatgpt" element={<HowToOptimizeForChatGPT />} />
      <Route path="/first-50-words-rule" element={<First50WordsRule />} />
      <Route path="/10-run-consistency-test" element={<TenRunConsistencyTest />} />
      <Route path="/case-study/fuegenix" element={<CaseStudyFuegenix />} />
      <Route path="/3-layer-chatgpt-architecture" element={<ThreeLayerChatGPTArchitecture />} />
      <Route path="/100-brands-audit" element={<HundredBrandsAudit />} />
      <Route path="/glossary/answer-engine-optimization" element={<GlossaryAEO />} />
      <Route path="/aeo-audit" element={<AEOAudit />} />
      <Route path="/aeo-consulting" element={<AEOConsulting />} />
      <Route path="/report/fuegenix" element={<FuegenixReport />} />
      <Route path="/banner" element={<LinkedInBanner />} />
      <Route path="/yt-banner" element={<YouTubeBanner />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}

export default App;
