import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cpu,
  Activity,
  ShieldAlert,
  CheckCircle2,
  ArrowRight,
  Radio,
} from 'lucide-react';
import { HARDWARE_EXPERIMENTS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

export default function HardwareLabSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const wavePathRefs = useRef<(SVGPathElement | null)[][]>([[], [], []]);
  // Store total lengths for each path to avoid repeated getTotalLength() calls
  const waveLengthsRef = useRef<(number | null)[][]>([[], [], []]);
  const waveInitRef = useRef(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      if (prefersReducedMotion) return;
      const N = HARDWARE_EXPERIMENTS.length;
      const totalPan = (N - 1) * 100;

      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=3200',
        pin: contentRef.current,
        pinSpacing: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        invalidateOnRefresh: true,
        scrub: 0.8,
        onUpdate: (self) => {
          if (trackRef.current) {
            gsap.set(trackRef.current, {
              xPercent: prefersReducedMotion ? 0 : -totalPan * (2 / 3) * self.progress,
            });
          }

          const progress = self.progress;
          cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const cardCenter = i / (N - 1);
            const dist = Math.abs(progress - cardCenter);
            const scale   = Math.max(0.93, 1 - dist * 0.28);
            const opacity = Math.max(0.55, 1 - dist * 1.5);
            gsap.set(card, { scale, opacity });
          });

          if (!waveInitRef.current) {
            wavePathRefs.current.forEach((cardPaths, ci) => {
              cardPaths.forEach((path, pi) => {
                if (!path) return;
                const len = path.getTotalLength();
                waveLengthsRef.current[ci] = waveLengthsRef.current[ci] || [];
                waveLengthsRef.current[ci][pi] = len;
                gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
              });
            });
            waveInitRef.current = true;
          }

          wavePathRefs.current.forEach((cardPaths, ci) => {
            const cardCenter = ci / (N - 1);
            const dist = Math.min(1, Math.abs(progress - cardCenter));
            cardPaths.forEach((path, pi) => {
              if (!path) return;
              const len = waveLengthsRef.current[ci]?.[pi];
              if (!len) return;
              const dashoffset = len * Math.pow(dist, 0.6);
              gsap.set(path, { strokeDashoffset: dashoffset });
            });
          });
        },
      });

      return () => {
        st.kill();
      };
    });

    mm.add('(max-width: 767px)', () => {
      // On mobile: remove scale/opacity overrides set by desktop logic
      cardRefs.current.forEach((card) => {
        if (card) gsap.set(card, { clearProps: 'scale,opacity' });
      });
      // Reset all waveform paths to fully visible on mobile
      wavePathRefs.current.forEach((cardPaths) => {
        cardPaths.forEach((path) => {
          if (path) gsap.set(path, { clearProps: 'strokeDashoffset,strokeDasharray' });
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="hardware"
      ref={containerRef}
      className="relative w-full bg-[#070709] border-t border-stroke/30"
    >
      <div
        ref={contentRef}
        className="h-screen w-full relative overflow-hidden flex flex-col justify-between py-6 md:py-8"
      >
        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-[11px] text-muted uppercase tracking-[0.25em] font-mono">
                  PHYSICAL SYSTEMS & ELECTRICAL LAB
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-text-primary tracking-tight">
                Hardware <span className="text-text-primary/40">experiments</span>
              </h2>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-muted bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/5">
              <Activity size={13} className="text-emerald-400 animate-pulse" />
              <span>Continuous Film-Strip Reel</span>
            </div>
          </div>
        </div>

        <div className="w-full overflow-x-auto flex-1 flex items-center my-auto py-4">
          <div
            ref={trackRef}
            className="flex flex-row gap-6 md:gap-10 px-6 md:px-12 w-fit select-none"
          >
            {HARDWARE_EXPERIMENTS.map((exp, index) => (
              <div
                key={exp.id}
                ref={(el) => { cardRefs.current[index] = el; }}
                className="w-[85vw] sm:w-[540px] md:w-[680px] lg:w-[780px] flex-shrink-0 rounded-3xl liquid-glass-edge p-6 sm:p-8 border border-white/10 bg-surface/60 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-2xl"
                style={{ transformOrigin: 'center center' }}
              >
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                      REEL 0{index + 1}
                    </span>
                    <span className="text-xs font-mono text-muted">{exp.subtitle}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
                    {exp.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted font-light leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-1.5">
                      Physical Engineering Flow:
                    </span>
                    <div className="flex flex-wrap items-center gap-1.5">
                      {exp.processSteps.map((step, idx) => (
                        <div key={step} className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/[0.04] text-text-primary/90 border border-white/10">
                            {step}
                          </span>
                          {idx < exp.processSteps.length - 1 && (
                            <ArrowRight size={11} className="text-muted/60" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-muted uppercase tracking-wider block mb-1.5">
                      Hardware Components:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.components.map((comp) => (
                        <span
                          key={comp}
                          className="text-xs font-mono px-2.5 py-0.5 rounded-lg bg-black/40 text-text-primary/80 border border-white/5 flex items-center gap-1.5"
                        >
                          <Cpu size={11} className="text-[#89AACC]" />
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 bg-black/80 rounded-2xl p-5 border border-white/10 shadow-inner flex flex-col justify-between gap-4">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                    <span className="text-xs font-mono text-muted uppercase flex items-center gap-1.5">
                      <Radio size={13} className="text-cyan-400" />
                      {index === 0
                        ? 'Waveform: V(t), I(t), P(t)'
                        : index === 1
                        ? 'Gas Concentration Response'
                        : '4-Channel Isolated Relay Timing'}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                      <CheckCircle2 size={12} /> Live Waveform
                    </span>
                  </div>

                  <div className="py-1">
                    {index === 0 ? (
                      <svg viewBox="0 0 320 100" className="w-full h-24 overflow-visible">
                        <line x1="0" y1="50" x2="320" y2="50" stroke="#ffffff" strokeOpacity="0.15" />
                        <path
                          ref={(el) => { wavePathRefs.current[0][0] = el; }}
                          d="M 0,50 Q 40,-10 80,50 T 160,50 T 240,50 T 320,50"
                          fill="none"
                          stroke="#89AACC"
                          strokeWidth="2"
                        />
                        <path
                          ref={(el) => { wavePathRefs.current[0][1] = el; }}
                          d="M 0,50 Q 40,15 80,50 T 160,50 T 240,50 T 320,50"
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2"
                          strokeDasharray="4 2"
                        />
                        <path
                          ref={(el) => { wavePathRefs.current[0][2] = el; }}
                          d="M 0,50 Q 40,5 80,50 T 160,50 T 240,50 T 320,50"
                          fill="none"
                          stroke="#FBBF24"
                          strokeWidth="1.5"
                        />
                        <text x="5" y="12" fill="#89AACC" fontSize="9" fontFamily="monospace">V(t) 230V AC</text>
                        <text x="95" y="12" fill="#34D399" fontSize="9" fontFamily="monospace">I(t) 15A</text>
                        <text x="160" y="12" fill="#FBBF24" fontSize="9" fontFamily="monospace">P(t) = V·I</text>
                      </svg>
                    ) : index === 1 ? (
                      <svg viewBox="0 0 320 100" className="w-full h-24 overflow-visible">
                        <line x1="0" y1="35" x2="320" y2="35" stroke="#F43F5E" strokeOpacity="0.4" strokeDasharray="3 3" />
                        <line x1="0" y1="80" x2="320" y2="80" stroke="#ffffff" strokeOpacity="0.1" />
                        <path
                          ref={(el) => { wavePathRefs.current[1][0] = el; }}
                          d="M 0,80 C 60,80 100,75 140,35 C 170,10 240,10 320,10"
                          fill="none"
                          stroke="#F43F5E"
                          strokeWidth="2.5"
                        />
                        <text x="10" y="30" fill="#F43F5E" fontSize="9" fontFamily="monospace">HSE Alarm (1000 PPM)</text>
                        <text x="150" y="50" fill="#34D399" fontSize="8" fontFamily="monospace">Trip &lt;2.0s</text>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 320 100" className="w-full h-24 overflow-visible">
                        <line x1="0" y1="20" x2="320" y2="20" stroke="#ffffff" strokeOpacity="0.1" />
                        <line x1="0" y1="50" x2="320" y2="50" stroke="#ffffff" strokeOpacity="0.1" />
                        <line x1="0" y1="80" x2="320" y2="80" stroke="#ffffff" strokeOpacity="0.1" />
                        <path
                          ref={(el) => { wavePathRefs.current[2][0] = el; }}
                          d="M 0,20 L 40,20 L 40,8 L 160,8 L 160,20 L 320,20"
                          fill="none"
                          stroke="#38BDF8"
                          strokeWidth="2"
                        />
                        <path
                          ref={(el) => { wavePathRefs.current[2][1] = el; }}
                          d="M 0,50 L 90,50 L 90,38 L 220,38 L 220,50 L 320,50"
                          fill="none"
                          stroke="#818CF8"
                          strokeWidth="2"
                        />
                        <path
                          ref={(el) => { wavePathRefs.current[2][2] = el; }}
                          d="M 0,80 L 140,80 L 140,68 L 280,68 L 280,80 L 320,80"
                          fill="none"
                          stroke="#34D399"
                          strokeWidth="2"
                        />
                        <text x="5" y="16" fill="#38BDF8" fontSize="8" fontFamily="monospace">CH1: PIR High</text>
                        <text x="5" y="46" fill="#818CF8" fontSize="8" fontFamily="monospace">CH2: LDR</text>
                        <text x="5" y="76" fill="#34D399" fontSize="8" fontFamily="monospace">CH3: Opto</text>
                      </svg>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {exp.telemetry.map((t) => (
                      <div key={t.label} className="p-2 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-[9px] font-mono text-muted uppercase block mb-0.5 truncate">
                          {t.label}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-mono font-semibold text-text-primary">
                            {t.value}
                          </span>
                          <span className="text-[9px] font-mono text-muted">{t.unit}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {index === 2 && (
                  <div className="p-2 rounded-xl bg-amber-400/[0.04] border border-amber-400/20 flex items-center gap-2 text-xs font-mono text-amber-200/90">
                    <ShieldAlert size={12} className="text-amber-400 flex-shrink-0" />
                    <span>Optocoupler dielectric isolation verified up to 3750 Vrms.</span>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
