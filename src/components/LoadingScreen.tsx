import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GREETINGS = [
  { text: "HELLO", lang: "en" },
  { text: "नमस्ते", lang: "hi" },
  { text: "BONJOUR", lang: "fr" },
  { text: "こんにちは", lang: "ja" },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isConstructed, setIsConstructed] = useState(false);
  const [transitionProgress, setTransitionProgress] = useState(0); // 0 (settled) -> 1 (morphing)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }

    // Step 0: Bounding construction lines meet at center
    const constructTimer = setTimeout(() => {
      setIsConstructed(true);
    }, 750);

    return () => clearTimeout(constructTimer);
  }, [onComplete]);

  useEffect(() => {
    if (!isConstructed) return;

    // Orchestrate 4-stage kinetic morphing across the shared typography space (~1100ms cycle)
    const holdTimer = setTimeout(() => {
      setTransitionProgress(1); // initiate kinetic morphing

      const nextTimer = setTimeout(() => {
        if (activeIdx < GREETINGS.length - 1) {
          setActiveIdx((prev) => prev + 1);
          setTransitionProgress(0); // settled in new language
        } else {
          // Finished こんにちは -> smoothly dissolve directly into Hero
          setTimeout(onComplete, 500);
        }
      }, 420);

      return () => clearTimeout(nextTimer);
    }, 750);

    return () => clearTimeout(holdTimer);
  }, [activeIdx, isConstructed, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(30px)", scale: 1.02 }}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#030304] flex items-center justify-center select-none overflow-hidden"
    >

      <div className="absolute w-[800px] h-[800px] rounded-full bg-[#89AACC]/4 blur-[190px] pointer-events-none" />


      <div className="relative z-10 flex items-center justify-center w-full max-w-5xl px-6">

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isConstructed ? 1 : 0,
            opacity: isConstructed ? (transitionProgress === 1 ? 0.6 : 0.35) : 0.8,
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#89AACC] to-white flex-1 origin-right shadow-[0_0_8px_rgba(137,170,204,0.4)]"
        />


        <div className="relative px-6 sm:px-12 flex items-center justify-center min-w-[280px] sm:min-w-[420px] md:min-w-[560px] h-32 overflow-visible">
          {GREETINGS.map((item, index) => {
            const isCurrent = activeIdx === index;
            const isPrev = activeIdx === index + 1;

            return (
              <motion.div
                key={item.text}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: isCurrent ? (transitionProgress === 1 ? 0 : 1) : 0,
                  filter: isCurrent
                    ? transitionProgress === 1
                      ? "blur(22px)"
                      : "blur(0px)"
                    : "blur(22px)",
                  scaleX: isCurrent ? (transitionProgress === 1 ? 1.25 : 1) : 0.9,
                  scaleY: isCurrent ? (transitionProgress === 1 ? 0.8 : 1) : 1.1,
                  letterSpacing: isCurrent ? (transitionProgress === 1 ? "0.25em" : "0.02em") : "-0.05em",
                  y: isCurrent ? (transitionProgress === 1 ? -8 : 0) : 8,
                }}
                transition={{
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <span className="font-multilingual text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white tracking-tight text-center whitespace-nowrap drop-shadow-[0_0_25px_rgba(255,255,255,0.18)]">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>


        <motion.div
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: isConstructed ? 1 : 0,
            opacity: isConstructed ? (transitionProgress === 1 ? 0.6 : 0.35) : 0.8,
          }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-l from-transparent via-[#89AACC] to-white flex-1 origin-left shadow-[0_0_8px_rgba(137,170,204,0.4)]"
        />
      </div>
    </motion.div>
  );
}
