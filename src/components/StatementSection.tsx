import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const STATEMENT_WORDS = [
  "I BUILD",
  "SYSTEMS",
  "WHERE",
  "HARDWARE",
  "MEETS",
  "SOFTWARE",
];

function Word({
  word,
  index,
  total,
  scrollYProgress,
}: {
  word: string;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const start = index / (total + 1.2);
  const end = (index + 1) / (total + 1.2);
  const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
  const blur = useTransform(scrollYProgress, [start, end], [4, 0]);
  const y = useTransform(scrollYProgress, [start, end], [12, 0]);

  return (
    <motion.span
      style={{ opacity, filter: `blur(${blur}px)`, y }}
      className="inline-block font-display italic tracking-tight mr-4 sm:mr-6 text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-[0.95]"
    >
      {word}
    </motion.span>
  );
}

export default function StatementSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 45%"],
  });

  return (
    <section
      id="statement"
      ref={containerRef}
      className="relative bg-bg py-24 md:py-40 border-t border-stroke/30 overflow-hidden"
    >

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_rgba(137,170,204,0.06)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-10">

        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="w-8 h-px bg-[#89AACC]/60" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
            ENGINEERING PHILOSOPHY
          </span>
        </div>


        <div className="mb-16 md:mb-24 flex flex-wrap items-baseline select-none">
          {STATEMENT_WORDS.map((word, index) => (
            <Word
              key={word}
              word={word}
              index={index}
              total={STATEMENT_WORDS.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-10 border-t border-white/10"
        >
          <div className="md:col-span-4">
            <span className="text-xs uppercase tracking-widest font-mono text-[#89AACC] block mb-2">
              ACADEMIC FOUNDATION
            </span>
            <h3 className="text-2xl font-display italic text-text-primary">
              NIT Durgapur, Electrical Engineering
            </h3>
          </div>

          <div className="md:col-span-8">
            <p className="text-base sm:text-lg text-muted font-light leading-relaxed mb-6">
              An Electrical Engineer working deeply at the convergence of hardware physics and low-level software systems. Grounded in mathematical circuit dynamics, electromechanical control systems, and bare-metal architectures, I specialize in open-source Android OS development, custom Linux kernel optimization, and device bring-up.
            </p>

            <div className="flex flex-wrap gap-2">
              {[
                "Electrical Engineering",
                "Android Platform (AOSP)",
                "Linux Kernel 4.19",
                "Systems Architecture",
                "Control Dynamics",
              ].map((domain) => (
                <span
                  key={domain}
                  className="text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] text-text-primary/90 border border-white/10"
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
