import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ExternalLink,
  Layers,
  Cpu,
  Download,
  GitCommit,
  Smartphone,
  Code2,
  Cloud,
  Server,
  ArrowRight,
} from 'lucide-react';
import { AXION_LAYERS } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

// ─── Asset map ───────────────────────────────────────────────────────────────
// Each entry maps to one AxionOS layer. Images are actual AxionOS screenshots
// from the project that Rajdeep Biswas maintains as Official Device Maintainer.
// Attribution: AxionOS project (github.com/AxionAOSP). Rajdeep's role: Official
// Device Maintainer for Redmi Note 12 Pro 5G (rubyx) — builds are his work.
const LAYER_ASSETS = [
  '/assets/axion/hero_main.webp',
  '/assets/axion/depth1.webp',
  '/assets/axion/kernel_manager.webp',
  '/assets/axion/theme_store_1.webp',
] as const;

export default function AxionAOSPShowcase() {
  const [activeStep, setActiveStep] = useState(0);

  const scrollProgressRef = useRef(0);
  const continuousStageRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const phoneContainerRef = useRef<HTMLDivElement>(null);
  const phoneFrameRef = useRef<HTMLDivElement>(null);
  const layer0Ref = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    [layer1Ref, layer2Ref, layer3Ref].forEach((ref) => {
      if (ref.current) {
        gsap.set(ref.current, {
          opacity: 0,
          visibility: 'hidden',
          scale: 0.94,
          y: 28,
        });
      }
    });

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
        scrub: 0.5,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          const continuousStage = self.progress * (AXION_LAYERS.length - 1);
          continuousStageRef.current = continuousStage;

          if (phoneFrameRef.current) {
            gsap.set(phoneFrameRef.current, {
              rotateY: prefersReducedMotion ? 0 : (1 - self.progress * 2) * 3,
            });
          }

          // Crossfade math driven by signed distance from continuousStage.
          // Cosine opacity falloff ensures seamless crossfade (no dark gap at midpoint).
          // Y displacement creates rising/sinking entrance based on signed distance.
          const layers = [layer0Ref.current, layer1Ref.current, layer2Ref.current, layer3Ref.current];

          layers.forEach((layerRef, i) => {
            if (!layerRef) return;

            const signedDist = continuousStage - i;
            const absDist    = Math.abs(signedDist);

            // Cull layers > 1.2 units away for performance.
            if (absDist >= 1.2) {
              gsap.set(layerRef, { visibility: 'hidden', opacity: 0 });
              return;
            }

            const opacity = Math.cos(Math.min(absDist, 1) * Math.PI / 2);

            const scale = 1 - absDist * 0.055;

            const blur = Math.min(absDist * 8, 12);

            const yOffset = -signedDist * 28;

            gsap.set(layerRef, {
              visibility: 'visible',
              opacity,
              scale,
              filter: `blur(${blur}px)`,
              y: yOffset,
            });
          });

          // Limit React state updates to discrete stage changes.
          const newStep = Math.min(
            AXION_LAYERS.length - 1,
            Math.floor(self.progress * AXION_LAYERS.length)
          );
          setActiveStep((prev) => (prev !== newStep ? newStep : prev));
        },
      });
    });

    mm.add('(max-width: 767px)', () => {
      // Mobile: Hide layers 1-3 explicitly. clearProps leaves layers stacked where only the DOM-last child is visible.
      if (layer0Ref.current) {
        gsap.set(layer0Ref.current, {
          clearProps: 'opacity,scale,filter,y,visibility',
          display: 'block',
        });
      }
      [layer1Ref, layer2Ref, layer3Ref].forEach((ref) => {
        if (ref.current) gsap.set(ref.current, { display: 'none' });
      });
      if (phoneFrameRef.current) gsap.set(phoneFrameRef.current, { clearProps: 'rotateY' });
    });

    return () => mm.revert();
  }, []);

  const layer = AXION_LAYERS[activeStep];

  const icons = [
    <Layers key="layers" size={16} />,
    <Smartphone key="phone" size={16} />,
    <Cpu key="cpu" size={16} />,
    <Download key="download" size={16} />,
  ];

  return (
    <section
      id="systems"
      ref={containerRef}
      className="relative w-full bg-[#050507] border-t border-stroke/30"
    >
      <div
        ref={contentRef}
        className="h-screen w-full relative overflow-hidden flex items-center justify-center py-6 md:py-0"
      >
       
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(78, 133, 191, 0.12) 0%, transparent 70%)`,
          }}
        />
       
        <div
          className="section-fade-top"
          style={{ '--tw-section-from': '#030304' } as React.CSSProperties}
        />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full py-8 md:py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[11px] uppercase tracking-[0.25em] font-mono text-[#89AACC]">
                  OPEN SOURCE OPERATING SYSTEM
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-display italic text-text-primary tracking-tight">
                AxionAOSP <span className="text-text-primary/40">rubyx</span>
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3.5 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/10 font-mono text-xs text-muted">
                <span className="flex items-center gap-1 text-text-primary font-medium">
                  <Download size={13} className="text-[#89AACC]" />
                  5,142+ Builds
                </span>
                <div className="w-px h-3 bg-white/20" />
                <span className="flex items-center gap-1 text-text-primary font-medium">
                  <GitCommit size={13} className="text-emerald-400" />
                  1,100+ Commits
                </span>
              </div>

              <a
                href="https://github.com/AxionAOSP"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 hover:border-white/30 text-text-primary transition-all flex items-center gap-1.5"
              >
                Axion Org <ExternalLink size={12} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2">
            {AXION_LAYERS.map((l, index) => {
              const isActive = activeStep === index;
              return (
                <div
                  key={l.step}
                  className={`flex items-center gap-2.5 p-2 rounded-2xl border transition-all text-left ${
                    isActive
                      ? 'bg-white/[0.08] border-[#89AACC]/60 shadow-lg shadow-black/50'
                      : 'bg-white/[0.02] border-white/5 opacity-60'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center transition-colors ${
                      isActive ? 'bg-[#89AACC] text-bg font-semibold' : 'bg-white/5 text-muted'
                    }`}
                  >
                    {icons[index]}
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[9px] font-mono text-muted block leading-none mb-0.5">
                      STAGE {l.step}
                    </span>
                    <span
                      className={`text-xs font-medium truncate block ${
                        isActive ? 'text-text-primary' : 'text-muted'
                      }`}
                    >
                      {l.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">

            {/* perspective is set via CSS transform-style: preserve-3d on the wrapper */}
            <div
              className="lg:col-span-5 flex flex-col items-center justify-center"
              ref={phoneContainerRef}
              style={{ perspective: '1200px' }}
            >
              <div
                ref={phoneFrameRef}
                className="relative w-[240px] sm:w-[270px] md:w-[300px] aspect-[9/19] rounded-[2.4rem] shadow-[0_30px_80px_rgba(0,0,0,0.95),0_0_0_4px_#1c1c1f] bg-black overflow-hidden"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40 border border-white/10" />

                <div
                  className="absolute inset-0 z-30 pointer-events-none rounded-[2rem]"
                  style={{
                    background:
                      'linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 35%)',
                  }}
                />

                <div className="absolute inset-0">

                  <div
                    ref={layer0Ref}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <img
                      src={LAYER_ASSETS[0]}
                      alt="AxionOS SystemUI — homescreen on Redmi Note 12 Pro 5G"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                      <div className="text-[9px] font-mono text-[#89AACC] uppercase tracking-widest">
                        AxionOS Platform Architecture
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono">
                          <span className="text-white block">AxBoostFwk</span>
                          <span className="text-emerald-400">Low Latency</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono">
                          <span className="text-white block">SfCpuPolicy</span>
                          <span className="text-[#89AACC]">Frame Sync</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono">
                          <span className="text-white block">Xen PC Mode</span>
                          <span className="text-amber-400">Desktop UI</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/60 border border-white/10 text-[9px] font-mono">
                          <span className="text-white block">LineageOS Base</span>
                          <span className="text-muted">Zero Bloat</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={layer1Ref}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <img
                      src={LAYER_ASSETS[1]}
                      alt="AxionOS depth visual — rubyx hardware layer (Redmi Note 12 Pro 5G)"
                      className="absolute inset-0 w-full h-full object-cover object-center"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                      <div className="text-[9px] font-mono text-[#89AACC] uppercase tracking-widest">
                        Device Tree · MediaTek MT6877
                      </div>
                      <div className="space-y-1">
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">Dimensity 1080 (6nm)</span>
                          <span className="text-[#89AACC]">A78 × 2</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">120Hz AMOLED</span>
                          <span className="text-emerald-400">DRM/KMS</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">67W Turbo Charge</span>
                          <span className="text-cyan-400">5000mAh</span>
                        </div>
                      </div>
                      <div className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-300 text-center">
                        Android 17 Bring-up Verified
                      </div>
                    </div>
                  </div>

                  <div
                    ref={layer2Ref}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <img
                      src={LAYER_ASSETS[2]}
                      alt="AxionOS kernel manager — EAS scheduler and CPU governor UI"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/20" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                      <div className="text-[9px] font-mono text-[#89AACC] uppercase tracking-widest">
                        Linux 4.19.325 LTS Kernel
                      </div>
                      <div className="space-y-1">
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">EAS Schedutil</span>
                          <span className="text-[#89AACC]">Custom</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">LZ4 + PSI Metrics</span>
                          <span className="text-emerald-400">Active</span>
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex justify-between">
                          <span className="text-white">CIP Security Patches</span>
                          <span className="text-amber-400">Integrated</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={layer3Ref}
                    className="absolute inset-0 pointer-events-none"
                  >
                    <img
                      src={LAYER_ASSETS[3]}
                      alt="AxionOS OTA and theme delivery interface — 5,142+ builds distributed"
                      className="absolute inset-0 w-full h-full object-cover object-top"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/25" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5">
                      <div className="text-[9px] font-mono text-[#89AACC] uppercase tracking-widest">
                        Automated OTA Pipeline
                      </div>
                      <div className="space-y-1">
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex items-center gap-2">
                          <Cloud size={10} className="text-blue-400 flex-shrink-0" />
                          <span className="text-white">GCP Build Server</span>
                          <span className="ml-auto text-emerald-400">CI Active</span>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight size={10} className="rotate-90 text-[#89AACC]/60" />
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex items-center gap-2">
                          <Server size={10} className="text-amber-400 flex-shrink-0" />
                          <span className="text-white">Cloudflare CDN</span>
                          <span className="ml-auto text-amber-300">Edge Cache</span>
                        </div>
                        <div className="flex justify-center">
                          <ArrowRight size={10} className="rotate-90 text-[#89AACC]/60" />
                        </div>
                        <div className="p-1.5 rounded-lg bg-black/70 border border-white/10 text-[9px] font-mono flex items-center gap-2">
                          <Smartphone size={10} className="text-emerald-400 flex-shrink-0" />
                          <span className="text-white">rubyx Devices</span>
                          <span className="ml-auto text-cyan-300">5,142+ Builds</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <p className="mt-3 text-[9px] font-mono text-muted/50 text-center max-w-[200px] leading-relaxed">
                Screenshots: AxionOS project · Rajdeep is Official Device Maintainer
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4"
                >
                  <div className="p-6 rounded-3xl liquid-glass-edge bg-surface/60 backdrop-blur-2xl border border-white/10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-muted border border-white/10 uppercase">
                        {layer.productContext}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-medium">
                        {layer.myRole}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary mb-2">
                      {layer.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-muted font-light leading-relaxed mb-4 whitespace-pre-line">
                      {layer.description}
                    </p>

                    <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 mb-4">
                      <span className="text-[10px] font-mono text-[#89AACC] uppercase tracking-wider block mb-1">
                        Technical Scope & Implementation:
                      </span>
                      <p className="text-xs text-text-primary/90 font-light leading-relaxed whitespace-pre-line">
                        {layer.myContribution}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {layer.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-text-primary/80 border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-3 border-t border-white/10">
                      {layer.telemetry.map((item) => (
                        <div key={item.key} className="p-2.5 rounded-xl bg-black/50 border border-white/5">
                          <span className="text-[10px] font-mono text-muted block mb-0.5 uppercase truncate">
                            {item.key}
                          </span>
                          <span className="text-xs font-mono font-medium text-text-primary block truncate">
                            {item.val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {layer.codeSnippet && (
                    <div className="rounded-3xl border border-white/10 bg-black/90 p-4 shadow-2xl backdrop-blur-xl font-mono">
                      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                          <span className="text-[11px] text-muted ml-2">
                            {layer.codeSnippet.filename}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-muted">
                          <Code2 size={11} className="text-[#89AACC]" />
                          <span>{layer.codeSnippet.language.toUpperCase()}</span>
                        </div>
                      </div>

                      <pre className="text-[11px] text-text-primary/80 overflow-x-auto leading-relaxed max-h-[130px] select-text">
                        <code>{layer.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
