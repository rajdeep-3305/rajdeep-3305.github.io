import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, CheckCircle2, Waves } from 'lucide-react';
import { CONTROL_SYSTEMS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Derived label values ────────────────────────────────────────────────────
// The SVG annotations and the persistent footer row previously hardcoded their
// numbers, which let them drift out of sync with CONTROL_SYSTEMS (the SVG read
// "Mp≈9.5%" while the parameter grid rendered beside it read "4.8 %"). Deriving
// them from the same data makes divergence impossible.
const paramValue = (modelId: string, needle: string): string =>
  CONTROL_SYSTEMS.find((m) => m.id === modelId)
    ?.parameters.find((p) => p.name.toLowerCase().includes(needle.toLowerCase()))
    ?.value.replace(/\s+/g, '') ?? '';

const OVERSHOOT_LABEL = paramValue('state-space', 'overshoot');
const DAMPING_LABEL   = paramValue('root-locus', 'damping');
const GAIN_MARGIN     = paramValue('root-locus', 'gain margin');
const CROSSOVER_LABEL = paramValue('frequency-response', 'crossover');

export default function ControlSystemsSection() {
  // Only re-renders when the discrete stage changes (0, 1, 2)
  const [activeStage, setActiveStage] = useState(0);
  // Read continuous stage directly from ref for animation math to avoid re-renders.
  const continuousStageRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const path1Ref    = useRef<SVGPathElement>(null);
  const poleRefs    = useRef<(SVGTextElement | null)[]>([]);
  const zeroRef     = useRef<SVGTextElement>(null);
  const axis1XRef   = useRef<SVGLineElement>(null);
  const axis1YRef   = useRef<SVGLineElement>(null);
  const axisLabel1Refs = useRef<(SVGTextElement | null)[]>([]);

  const path2Ref    = useRef<SVGPathElement>(null);
  const line2Ref    = useRef<SVGLineElement>(null);
  const bodeGridRef = useRef<SVGLineElement>(null);
  const axisLabel2Refs = useRef<(SVGTextElement | null)[]>([]);

  const path3Ref    = useRef<SVGPathElement>(null);
  const stepRefLine = useRef<SVGLineElement>(null);
  const axisLabel3Refs = useRef<(SVGTextElement | null)[]>([]);

  // Tracks whether the pinned section has been reached at least once
  const hasEnteredViewRef = useRef(false);

  // GSAP directly drives wrappers to maintain continuous crossfade without per-frame React state.
  const stageWrapRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Cosine opacity falloff ensures seamless crossfade between stages.
  const applyStageCrossfade = (continuousStage: number) => {
    stageWrapRefs.current.forEach((el, i) => {
      if (!el) return;
      const dist = Math.abs(continuousStage - i);
      if (dist >= 1.2) {
        gsap.set(el, { autoAlpha: 0 });
        return;
      }
      gsap.set(el, {
        autoAlpha: Math.cos(Math.min(dist, 1) * Math.PI / 2),
        filter: `blur(${Math.min(dist * 6, 8)}px)`,
      });
    });
  };

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=2800',
        pin: contentRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.6,
        onEnter: () => {
          hasEnteredViewRef.current = true;
        },
        onUpdate: (self) => {
          const continuousStage = self.progress * (CONTROL_SYSTEMS.length - 1);
          continuousStageRef.current = continuousStage;

          applyStageCrossfade(continuousStage);

          const newStage = Math.min(
            CONTROL_SYSTEMS.length - 1,
            Math.floor(self.progress * CONTROL_SYSTEMS.length)
          );
          setActiveStage((prev) => (prev !== newStage ? newStage : prev));
        },
      });
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const setHidden = (el: SVGPathElement | SVGLineElement | null) => {
      if (!el) return;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    };
    setHidden(path1Ref.current);
    setHidden(path2Ref.current);
    setHidden(path3Ref.current);
    setHidden(line2Ref.current);
    setHidden(bodeGridRef.current);
    setHidden(axis1XRef.current);
    setHidden(axis1YRef.current);
    setHidden(stepRefLine.current);

    // Establish stage 0 before first scroll tick (also permanent mobile state).
    applyStageCrossfade(0);

    const allLabels = [
      ...poleRefs.current,
      zeroRef.current,
      ...axisLabel1Refs.current,
      ...axisLabel2Refs.current,
      ...axisLabel3Refs.current,
    ].filter(Boolean);
    if (allLabels.length > 0) gsap.set(allLabels, { opacity: 0 });
  }, []);

  function drawLine(
    el: SVGLineElement | SVGPathElement | null,
    duration: number,
    delay = 0,
    ease = 'power2.out'
  ) {
    if (!el) return;
    const len = el.getTotalLength();
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(el, { strokeDashoffset: 0, duration, delay, ease });
  }

  useEffect(() => {
    if (!hasEnteredViewRef.current || activeStage !== 0) return;

    const tl = gsap.timeline();

    tl.add(() => {
      drawLine(axis1YRef.current, 0.35, 0, 'power1.out');
      drawLine(axis1XRef.current, 0.35, 0.05, 'power1.out');
    });

    tl.add(() => {
      const labels = axisLabel1Refs.current.filter(Boolean);
      gsap.set(labels, { opacity: 0 });
      gsap.to(labels, { opacity: 1, duration: 0.3, stagger: 0.08, delay: 0.05 });
    }, '+=0.25');

    tl.add(() => {
      if (path1Ref.current) {
        const len = path1Ref.current.getTotalLength();
        gsap.set(path1Ref.current, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
        gsap.to(path1Ref.current, { strokeDashoffset: 0, duration: 0.55, ease: 'power2.out' });
      }
    }, '+=0.1');

    tl.add(() => {
      const poles = poleRefs.current.filter(Boolean);
      gsap.set(poles, { opacity: 0 });
      gsap.to(poles, { opacity: 1, duration: 0.4, stagger: 0.12, delay: 0.1 });
      if (zeroRef.current) gsap.to(zeroRef.current, { opacity: 1, duration: 0.4, delay: 0.35 });
    }, '+=0.15');
  }, [activeStage]);

  useEffect(() => {
    if (!hasEnteredViewRef.current || activeStage !== 1) return;

    const tl = gsap.timeline();

    tl.add(() => drawLine(bodeGridRef.current, 0.3, 0, 'power1.out'));

    tl.add(() => drawLine(line2Ref.current, 0.35, 0, 'power1.inOut'), '+=0.2');

    tl.add(() => drawLine(path2Ref.current, 0.85, 0, 'power2.inOut'), '+=0.15');

    tl.add(() => {
      const labels = axisLabel2Refs.current.filter(Boolean);
      gsap.set(labels, { opacity: 0 });
      gsap.to(labels, { opacity: 1, duration: 0.3, stagger: 0.1 });
    }, '+=0.3');
  }, [activeStage]);

  useEffect(() => {
    if (!hasEnteredViewRef.current || activeStage !== 2) return;

    const tl = gsap.timeline();

    tl.add(() => drawLine(stepRefLine.current, 0.3, 0, 'power1.out'));

    tl.add(() => drawLine(path3Ref.current, 1.0, 0, 'power3.out'), '+=0.25');

    tl.add(() => {
      const labels = axisLabel3Refs.current.filter(Boolean);
      gsap.set(labels, { opacity: 0 });
      gsap.to(labels, { opacity: 1, duration: 0.35, stagger: 0.1 });
    }, '+=0.4');
  }, [activeStage]);

  const model = CONTROL_SYSTEMS[activeStage];
  const continuousStage = continuousStageRef.current;

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
        <div
          className="section-fade-top"
          style={{ '--tw-section-from': '#070709' } as React.CSSProperties}
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
              <span>
                {activeStage === 0
                  ? 'Continuous S-Plane Evolution'
                  : activeStage === 1
                  ? 'Bode Frequency Analysis'
                  : 'Transient Step Response'}
              </span>
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
                  style={{ visibility: Math.abs(continuousStage - 0) > 1.5 ? 'hidden' : 'visible' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">

                    <line ref={axis1XRef} x1="160" y1="0" x2="160" y2="110" stroke="#ffffff" strokeOpacity="0.18" />
                    <line ref={axis1YRef} x1="0" y1="55" x2="320" y2="55" stroke="#ffffff" strokeOpacity="0.18" />

                    <text ref={(el) => { poleRefs.current[0] = el; }} x="90" y="59" fill="#89AACC" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>
                    <text ref={(el) => { poleRefs.current[1] = el; }} x="120" y="28" fill="#4E85BF" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>
                    <text ref={(el) => { poleRefs.current[2] = el; }} x="120" y="88" fill="#4E85BF" fontSize="15" fontFamily="monospace" textAnchor="middle">×</text>

                    <text ref={zeroRef} x="70" y="59" fill="#34D399" fontSize="13" fontFamily="monospace" textAnchor="middle">○</text>

                    <path
                      ref={path1Ref}
                      d="M 120,28 L 0,0 M 120,88 L 0,110"
                      stroke="#89AACC"
                      strokeWidth="1.5"
                      strokeOpacity="0.6"
                    />

                    <text ref={(el) => { axisLabel1Refs.current[0] = el; }} x="300" y="50" fill="#888" fontSize="8" fontFamily="monospace">σ (Real)</text>
                    <text ref={(el) => { axisLabel1Refs.current[1] = el; }} x="165" y="12" fill="#888" fontSize="8" fontFamily="monospace">jω (Imag)</text>
                  </svg>
                </motion.div>


                <motion.div
                  animate={{
                    opacity: Math.max(0, 1 - Math.abs(continuousStage - 1) * 1.5),
                    filter: `blur(${Math.abs(continuousStage - 1) * 6}px)`,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ visibility: Math.abs(continuousStage - 1) > 1.5 ? 'hidden' : 'visible' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">

                    <line ref={bodeGridRef} x1="0" y1="30" x2="320" y2="30" stroke="#ffffff" strokeOpacity="0.08" strokeDasharray="3 3" />

                    <line ref={line2Ref} x1="0" y1="65" x2="320" y2="65" stroke="#89AACC" strokeOpacity="0.25" />

                    <path
                      ref={path2Ref}
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

                    <text ref={(el) => { axisLabel2Refs.current[0] = el; }} x="185" y="60" fill="#89AACC" fontSize="8" fontFamily="monospace">0 dB (ω_gc = {CROSSOVER_LABEL})</text>
                    <text ref={(el) => { axisLabel2Refs.current[1] = el; }} x="255" y="98" fill="#888" fontSize="8" fontFamily="monospace">-40 dB/dec</text>
                  </svg>
                </motion.div>


                <motion.div
                  animate={{
                    opacity: Math.max(0, 1 - Math.abs(continuousStage - 2) * 1.5),
                    filter: `blur(${Math.abs(continuousStage - 2) * 6}px)`,
                  }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ visibility: Math.abs(continuousStage - 2) > 1.5 ? 'hidden' : 'visible' }}
                >
                  <svg viewBox="0 0 320 110" className="w-full h-28 overflow-visible">

                    <line ref={stepRefLine} x1="0" y1="55" x2="320" y2="55" stroke="#89AACC" strokeOpacity="0.3" strokeDasharray="4 4" />

                    <path
                      ref={path3Ref}
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

                    <text ref={(el) => { axisLabel3Refs.current[0] = el; }} x="5" y="100" fill="#888" fontSize="8" fontFamily="monospace">t=0</text>
                    <text ref={(el) => { axisLabel3Refs.current[1] = el; }} x="275" y="50" fill="#888" fontSize="8" fontFamily="monospace">t→∞</text>
                    <text ref={(el) => { axisLabel3Refs.current[2] = el; }} x="88" y="12" fill="#89AACC" fontSize="7" fontFamily="monospace">Mp≈{OVERSHOOT_LABEL}</text>
                  </svg>
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-muted pt-2 border-t border-white/5">
                <span>
                  {activeStage === 0
                    ? 'Domain: S-Plane'
                    : activeStage === 1
                    ? 'Domain: Frequency'
                    : 'Domain: Time'}
                </span>
                <span>ζ = {DAMPING_LABEL}</span>
                <span>Margin: {GAIN_MARGIN}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
