import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

interface QuizSuccessProps {
  onClose: () => void;
}

export function QuizSuccess({ onClose }: QuizSuccessProps) {
  const navigate = useNavigate();

  const handleAccessChecklist = () => {
    onClose();
    navigate("/checklist");
  };

  return (
    <motion.div
      className="text-center space-y-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-center">
        <motion.div
          className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <CheckCircleIcon className="w-10 h-10 text-success" />
        </motion.div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-2">You're In!</h3>
        <p className="text-muted-foreground">
          Your AEO Protocol checklist is ready. Click below to access it now.
        </p>
      </div>

      <Button size="lg" className="w-full" onClick={handleAccessChecklist}>
        Access Your Checklist
        <ArrowRightIcon className="w-4 h-4 ml-2" />
      </Button>

      <p className="text-sm text-muted">
        A copy has also been sent to your email.
      </p>
    </motion.div>
  );
}
