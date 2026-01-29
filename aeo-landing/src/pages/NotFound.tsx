import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { GradientOrb } from "../components/shared/GradientOrb";
import {
  HomeIcon,
  BookOpenIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <GradientOrb className="top-20 -left-32" color="primary" size="xl" blur="lg" />
      <GradientOrb className="bottom-20 -right-32" color="secondary" size="lg" blur="lg" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-8xl md:text-9xl font-bold text-gradient heading-3d-glow">
            404
          </span>
        </motion.div>

        <motion.h1
          className="text-2xl md:text-3xl font-bold mt-6 mb-4 heading-3d"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-muted-foreground mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link to="/">
            <Button size="lg">
              <HomeIcon className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/learn">
            <Button variant="outline" size="lg">
              <BookOpenIcon className="w-4 h-4 mr-2" />
              Browse Resources
            </Button>
          </Link>
        </motion.div>

        <motion.div
          className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="font-bold mb-4">Popular Pages</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-left">
            <Link
              to="/what-is-aeo"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <CheckCircleIcon className="w-4 h-4 text-primary" />
              What is AEO?
            </Link>
            <Link
              to="/checklist"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <CheckCircleIcon className="w-4 h-4 text-primary" />
              130+ Point Checklist
            </Link>
            <Link
              to="/aeo-vs-seo"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <CheckCircleIcon className="w-4 h-4 text-primary" />
              AEO vs SEO
            </Link>
            <Link
              to="/case-study/fuegenix"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <CheckCircleIcon className="w-4 h-4 text-primary" />
              Case Study: 0% to 90%
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
