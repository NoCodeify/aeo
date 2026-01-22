import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { QuizQuestion } from "./QuizQuestion";
import { QuizCapture, type CaptureFormData } from "./QuizCapture";
import { QuizSuccess } from "./QuizSuccess";
import { QUIZ_QUESTIONS, ZAPIER_WEBHOOK_URL } from "../../lib/constants";

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type QuizStep = "questions" | "capture" | "success";

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState<QuizStep>("questions");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setStep("capture");
    }
  };

  const handleBack = () => {
    if (step === "capture") {
      setStep("questions");
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async (data: CaptureFormData) => {
    setIsSubmitting(true);

    const payload = {
      ...data,
      ...answers,
      submittedAt: new Date().toISOString(),
    };

    try {
      if (ZAPIER_WEBHOOK_URL) {
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      setStep("success");
    } catch (error) {
      console.error("Submission error:", error);
      setStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setStep("questions");
    onClose();
  };

  const canProceed = answers[currentQuestion?.id];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="sr-only">AEO Protocol Quiz</DialogTitle>
        </DialogHeader>

        {step === "questions" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>
                Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-surface rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === "questions" && (
            <motion.div
              key={`question-${currentQuestionIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QuizQuestion
                question={currentQuestion.question}
                options={currentQuestion.options}
                selectedValue={answers[currentQuestion.id] || null}
                onSelect={handleSelect}
              />
            </motion.div>
          )}

          {step === "capture" && (
            <QuizCapture onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          )}

          {step === "success" && <QuizSuccess onClose={handleClose} />}
        </AnimatePresence>

        {step !== "success" && (
          <div className="flex justify-between mt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentQuestionIndex === 0 && step === "questions"}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {step === "questions" && (
              <Button onClick={handleNext} disabled={!canProceed}>
                {currentQuestionIndex < QUIZ_QUESTIONS.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
