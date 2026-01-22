import { useState } from "react";
import { Hero } from "../components/sections/Hero";
import { Problem } from "../components/sections/Problem";
import { OriginStory } from "../components/sections/OriginStory";
import { ChecklistPreview } from "../components/sections/ChecklistPreview";
import { Stats } from "../components/sections/Stats";
import { HowItWorks } from "../components/sections/HowItWorks";
import { Testimonials } from "../components/sections/Testimonials";
import { FAQ } from "../components/sections/FAQ";
import { FinalCTA } from "../components/sections/FinalCTA";
import { QuizModal } from "../components/quiz/QuizModal";
import { StickyCTA } from "../components/shared/StickyCTA";

export function LandingPage() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const openQuiz = () => setIsQuizOpen(true);
  const closeQuiz = () => setIsQuizOpen(false);

  return (
    <main className="min-h-screen">
      <Hero onOpenQuiz={openQuiz} />
      <Problem />
      <OriginStory />
      <ChecklistPreview />
      <Stats />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <FinalCTA onOpenQuiz={openQuiz} />

      <QuizModal isOpen={isQuizOpen} onClose={closeQuiz} />
      <StickyCTA onOpenQuiz={openQuiz} />
    </main>
  );
}
