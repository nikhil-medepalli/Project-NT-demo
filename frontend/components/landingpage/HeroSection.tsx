"use client";
import { motion } from "motion/react";

const HeroSection = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  return (
    <section className="relative px-8 pt-32 pb-24 max-w-5xl mx-auto flex flex-col items-center text-center">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[background/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="relative z-10"
      >
        <motion.div
          variants={fadeUp}
          className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#1A1D24] bg-[#1A1D24]/50 text-xs font-semibold tracking-widest text-primary uppercase"
        >
          For the Working Professional
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
        >
          Maximize your leave. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-white/70 via-primary/70 to-white/70">
            Experience India.
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Stop losing hours to generic travel blogs and decision fatigue. We
          engineer expert-curated, personalized travel strategies across
          India—optimized around your schedule, budget, and limited PTO.
        </motion.p>

        <motion.div variants={fadeUp}>
          <button className="group relative px-8 py-4 bg-transparent text-primary font-semibold text-lg rounded overflow-hidden border border-primary transition-all hover:bg-primary hover:text-[#0B0E14] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]">
            Explore Destinations
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
export default HeroSection;
