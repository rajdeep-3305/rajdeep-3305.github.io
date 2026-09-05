import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles, Layers } from 'lucide-react';
import { ARSENAL_CATEGORIES } from '../data/portfolioData';
import { ArsenalCategory } from '../types/portfolio';

gsap.registerPlugin(ScrollTrigger);

function ArsenalCard({
  category,
  index,
}: {
  category: ArsenalCategory;
  index: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isForeground = category.depth === 'foreground';
  const isBackground = category.depth === 'background';

  const depthClass = isForeground
    ? 'z-30 opacity-100 scale-100 shadow-2xl border-white/20'
    : isBackground
    ? 'z-0 opacity-70 scale-[0.92] blur-[0.3px] border-white/10'
    : 'z-10 opacity-90 scale-[0.96] border-white/15';

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className={`mobile-arsenal-card w-full max-w-[380px] mx-auto rounded-3xl liquid-glass-edge p-6 sm:p-7 backdrop-blur-3xl transition-all duration-500 cursor-pointer relative group overflow-hidden bg-white/[0.025] ${depthClass} hover:opacity-100 hover:scale-100 hover:border-[#89AACC]/60 hover:shadow-cyan-950/40 hover:z-40`}
      style={{
        transform: `rotate(${(index % 2 === 0 ? -1 : 1) * 1.5}deg)`,
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08)_0%,_transparent_65%)] pointer-events-none" />
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-b from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-[#89AACC] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10">
              {category.subtitle}
            </span>
            <span className="text-muted/60 text-[11px] font-mono flex items-center gap-1 group-hover:text-text-primary transition-colors">
              <Sparkles size={11} className={isExpanded ? 'text-[#89AACC]' : ''} />
              {isExpanded ? 'Active' : 'Details'}
            </span>
          </div>

          <h3 className="font-display italic text-2xl sm:text-3xl text-text-primary tracking-tight mb-4 group-hover:translate-x-0.5 transition-transform duration-300">
            {category.title}
          </h3>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {category.primaryTags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/[0.05] text-text-primary/90 border border-white/10 font-medium group-hover:border-white/20 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="pt-3 border-t border-white/10 overflow-hidden"
            >
              <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-2">
                Subsystems & Architecture:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {category.expandedTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-black/60 text-text-primary/80 border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between text-[11px] font-mono text-muted/60 pt-3 mt-auto border-t border-white/5">
          <span className="flex items-center gap-1">
            <Layers size={11} /> TIER: {category.depth.toUpperCase()}
          </span>
          <ChevronDown
            size={13}
            className={`transition-transform duration-300 ${
              isExpanded ? 'rotate-180 text-[#89AACC]' : 'group-hover:translate-y-0.5'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function ToolkitSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Extended spatial workspace journey with zero-jitter pin
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=3600",
        pin: contentRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
      });

      // Stream 1 (Android / Linux Systems) multi-axis displacement
      gsap.to(col1Ref.current, {
        y: -360,
        rotateZ: -1.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 1.2,
        },
      });

      // Stream 2 (Electrical Engineering) multi-axis displacement
      gsap.to(col2Ref.current, {
        y: 360,
        rotateZ: 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3600",
          scrub: 1.2,
        },
      });
    });

    mm.add("(max-width: 767px)", () => {
      gsap.from(".mobile-arsenal-card", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });
    });

    return () => mm.revert();
  }, []);

  const leftColumn = ARSENAL_CATEGORIES.slice(0, 3);
  const rightColumn = ARSENAL_CATEGORIES.slice(3);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg border-t border-stroke/30"
    >
      <div
        ref={contentRef}
        className="h-screen w-full relative overflow-hidden flex items-center justify-center py-6 md:py-0"
      >
        {/* Pinned Central Anchor Title in Spatial Workspace */}
        <div className="md:absolute inset-0 flex items-center justify-center z-20 text-center pointer-events-none px-4 mb-14 md:mb-0">
          <div className="max-w-2xl bg-bg/60 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 rounded-3xl">
            <span className="text-xs text-muted uppercase tracking-[0.3em] mb-4 block font-mono">
              TECHNICAL ARSENAL
            </span>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display italic text-text-primary mb-4 tracking-tight">
              Spatial <span className="text-text-primary/40">systems</span>
            </h2>
            <p className="text-sm sm:text-base text-muted font-light max-w-md mx-auto leading-relaxed">
              Low-level OS architecture, Linux kernel engineering, circuit analysis, and mathematical control theory.
            </p>
          </div>
        </div>

        {/* Floating Multi-Depth Spatial Cards Streams */}
        <div className="md:absolute inset-0 z-30 flex items-center justify-center pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-52 max-w-6xl w-full px-6 pointer-events-auto">
            <div ref={col1Ref} className="flex flex-col gap-6 sm:gap-8 md:pt-40">
              <div className="text-center md:text-left mb-2 hidden md:block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#89AACC]">
                  [ ANDROID / LINUX SYSTEMS ]
                </span>
              </div>
              {leftColumn.map((category, index) => (
                <ArsenalCard key={category.id} category={category} index={index} />
              ))}
            </div>

            <div ref={col2Ref} className="flex flex-col gap-6 sm:gap-8 md:pb-40">
              <div className="text-center md:text-right mb-2 hidden md:block">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                  [ ELECTRICAL ENGINEERING ]
                </span>
              </div>
              {rightColumn.map((category, index) => (
                <ArsenalCard
                  key={category.id}
                  category={category}
                  index={index + leftColumn.length}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
