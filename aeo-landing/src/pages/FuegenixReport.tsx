import { ReportCover } from "../components/report/ReportCover";
import { SectionNav } from "../components/report/SectionNav";
import { HeadlineResult } from "../components/report/HeadlineResult";
import { CurrentVisibility } from "../components/report/CurrentVisibility";
import { KeyFindings } from "../components/report/KeyFindings";
import { Achievements } from "../components/report/Achievements";
import { ResultsProof } from "../components/report/ResultsProof";
import { CompetitorPosition } from "../components/report/CompetitorPosition";
import { NextSteps } from "../components/report/NextSteps";

export function FuegenixReport() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto px-4 pb-20">
      <ReportCover />
      <SectionNav />
      <HeadlineResult />
      <CurrentVisibility />
      <KeyFindings />
      <Achievements />
      <ResultsProof />
      <CompetitorPosition />
      <NextSteps />
    </main>
  );
}
