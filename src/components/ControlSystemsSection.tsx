import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, CheckCircle2, Waves } from 'lucide-react';
import { CONTROL_SYSTEMS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function ControlSystemsSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2800",
        pin: contentRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => mm.revert();
  }, []);

  const activeStage = Math.min(
    CONTROL_SYSTEMS.length - 1,
    Math.floor(scrollProgress * CONTROL_SYSTEMS.length)
  );
  const model = CONTROL_SYSTEMS[activeStage];
  const continuousStage = scrollProgress * (CONTROL_SYSTEMS.length - 1);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-[#060608] border-t border-stroke/30"
    >
      <div
        ref={contentRef}
        className="h-screen w-full relative overflow-hidden flex items-center justify-center py-6 md:py-0"
      >

        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.12) 0%, transparent 65%)`,
          }}
        />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full py-8 md:py-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-[11px] text-muted uppercase tracking-[0.25em] font-mono">
                  MATHEMATICAL RIGOR & CONTROL THEORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-text-primary tracking-tight">
                Control <span className="text-text-primary/40">systems</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/5">
              <Compass size={14} className="text-indigo-400" />
              <span>Continuous S-Plane Evolution</span>
            </div>
          </div>


          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-2">
            {CONTROL_SYSTEMS.map((item, index) => {
              const isSelected = activeStage === index;
              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition-all text-left flex items-center justify-between relative overflow-hidden ${
                    isSelected
                      ? 'bg-white/[0.08] border-[#89AACC]/60 shadow-xl shadow-black/60'
                      : 'bg-white/[0.02] border-white/5 opacity-60'
                  }`}
                >
                  <div>
                    <span className="text-[9px] font-mono text-[#89AACC] block leading-none mb-0.5">
                      STAGE 0{index + 1}
                    </span>
                    <h3
                      className={`font-display italic text-base transition-colors ${
                        isSelected ? 'text-text-primary' : 'text-text-primary/70'
                      }`}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <Waves size={15} className={isSelected ? 'text-indigo-300' : 'text-muted'} />
                </div>
              );
            })}
          </div>


          <div className="rounded-3xl liquid-glass-edge p-6 sm:p-8 border border-white/10 bg-surface/50 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">

            <div className="lg:col-span-5">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-mono mb-3">
                Formula: {model.formula}
              </div>

              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
                {model.title}
              </h3>

              <p className="text-xs sm:text-sm text-muted font-light leading-relaxed mb-5">
                {model.description}
              </p>


              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {model.parameters.map((p) => (
                  <div key={p.name} className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-[10px] font-mono text-[#89AACC] block mb-0.5">
                      {p.name}
                    </span>
                    <span className="text-sm font-mono font-semibold text-text-primary block">
                      {p.value}
                    </span>
                    <span className="text-[9px] font-mono text-muted block mt-0.5">
                      {p.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>


            <div className="lg:col-span-7 bg-black/80 rounded-2xl p-5 border border-white/10 shadow-inner flex flex-col justify-between h-full min-h-[260px] relative overflow-hidden">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                <span className="text-xs font-mono text-muted uppercase">
                  {activeStage === 0
                    ? 'S-Plane Pole-Zero Constellation'
                    : activeStage === 1
                    ? 'Bode Logarithmic Frequency Spectrum'
                    : 'Second-Order Transient Step Response'}
                </span>
                <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 size={12} /> Closed-Loop Stable
                </span>
              </div>


              <div className="my-auto py-3 relative h-32 flex items-center justify-center">

                <motion.div
                  animate={{
                    opacity: Math.max(0, 1 - Math.abs(continuousStage - 0) * 1.5),
                    filter: `blur(${Math.abs(continuousStage - 0) * 6}px)`,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ display: Math.abs(continuousStage - 0) > 1.2 ? 'none' : 'flex' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">
                    <line x1="160" y1="0" x2="160" y2="110" stroke="#ffffff" strokeOpacity="0.15" />
                    <line x1="0" y1="55" x2="320" y2="55" stroke="#ffffff" strokeOpacity="0.15" />
                    <text x="90" y="59" fill="#89AACC" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>
                    <text x="120" y="28" fill="#4E85BF" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>
                    <text x="120" y="88" fill="#4E85BF" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>
                    <text x="70" y="59" fill="#34D399" fontSize="13" fontFamily="monospace" textAnchor="middle">○</text>
                    <path
                      d="M 120,28 L 0,0 M 120,88 L 0,110"
                      stroke="#89AACC"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      strokeOpacity="0.6"
                    />
                    <text x="300" y="50" fill="#888" fontSize="8" fontFamily="monospace">σ (Real)</text>
                    <text x="165" y="12" fill="#888" fontSize="8" fontFamily="monospace">jω (Imag)</text>
                  </svg>
                </motion.div>


                <motion.div
                  animate={{
                    opacity: Math.max(0, 1 - Math.abs(continuousStage - 1) * 1.5),
                    filter: `blur(${Math.abs(continuousStage - 1) * 6}px)`,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ display: Math.abs(continuousStage - 1) > 1.2 ? 'none' : 'flex' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">
                    <line x1="0" y1="30" x2="320" y2="30" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="3 3" />
                    <line x1="0" y1="65" x2="320" y2="65" stroke="#89AACC" strokeOpacity="0.25" />
                    <path
                      d="M 0,25 Q 130,28 180,55 T 320,105"
                      fill="none"
                      stroke="url(#bodeGradientControlRefFinal)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="bodeGradientControlRefFinal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#89AACC" />
                        <stop offset="60%" stopColor="#4E85BF" />
                        <stop offset="100%" stopColor="#A2C2E2" />
                      </linearGradient>
                    </defs>
                    <text x="185" y="60" fill="#89AACC" fontSize="8" fontFamily="monospace">0 dB (ω_gc = 12.8 rad/s)</text>
                    <text x="255" y="98" fill="#888" fontSize="8" fontFamily="monospace">-40 dB/dec</text>
                  </svg>
                </motion.div>


                <motion.div
                  animate={{
                    opacity: Math.max(0, 1 - Math.abs(continuousStage - 2) * 1.5),
                    filter: `blur(${Math.abs(continuousStage - 2) * 6}px)`,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ display: Math.abs(continuousStage - 2) > 1.2 ? 'none' : 'flex' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">
                    <line x1="0" y1="55" x2="320" y2="55" stroke="#89AACC" strokeOpacity="0.3" strokeDasharray="4 4" />
                    <path
                      d="M 0,105 C 40,105 60,15 90,35 C 120,53 150,57 180,55 C 220,54 260,55 320,55"
                      fill="none"
                      stroke="url(#stepGradientControlRefFinal)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="stepGradientControlRefFinal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#4E85BF" />
                        <stop offset="50%" stopColor="#89AACC" />
                        <stop offset="100%" stopColor="#A2C2E2" />
                      </linearGradient>
                    </defs>
                  </svg>
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-muted pt-2 border-t border-white/5">
                <span>Domain: S-Plane</span>
                <span>ζ = 0.707</span>
                <span>Margin: +14.2 dB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
