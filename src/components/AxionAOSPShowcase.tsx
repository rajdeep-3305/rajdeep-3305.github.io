import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
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

export default function AxionAOSPShowcase() {
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
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    });

    return () => mm.revert();
  }, []);

  const activeStep = Math.min(
    AXION_LAYERS.length - 1,
    Math.floor(scrollProgress * AXION_LAYERS.length)
  );
  const layer = AXION_LAYERS[activeStep];
  const continuousStage = scrollProgress * (AXION_LAYERS.length - 1);

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
        {/* Soft Ambient Radial Atmosphere */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(78, 133, 191, 0.12) 0%, transparent 70%)`,
          }}
        />

        <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-between h-full py-8 md:py-10">
          {/* Top Header */}
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

          {/* Stage Progress Pill Switcher */}
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

          {/* Main Stage: Left Anchored Physical Device & Right Technical Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">
            {/* Left: One Continuous Physical Device Evolving Internally */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-[260px] sm:w-[290px] md:w-[320px] aspect-[9/19] rounded-[2.2rem] border-[4px] border-[#1c1c1f] shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-black overflow-hidden flex flex-col justify-between p-5">
                {/* Punch-hole camera */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-black rounded-full z-40 border border-white/10" />

                {/* Continuous Morphing Layers Container */}
                <div className="relative w-full h-full pt-6">
                  {/* Layer 0: SystemUI Architecture */}
                  <motion.div
                    animate={{
                      opacity: Math.max(0, 1 - Math.abs(continuousStage - 0) * 1.5),
                      scale: 1 - Math.abs(continuousStage - 0) * 0.08,
                      filter: `blur(${Math.abs(continuousStage - 0) * 8}px)`,
                    }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute inset-0 flex flex-col justify-between py-4 text-center pointer-events-none"
                    style={{ display: Math.abs(continuousStage - 0) > 1.2 ? 'none' : 'flex' }}
                  >
                    <div className="my-auto space-y-4">
                      <div className="w-18 h-18 mx-auto rounded-3xl bg-gradient-to-br from-[#89AACC] to-[#4E85BF] p-0.5 shadow-2xl flex items-center justify-center">
                        <div className="w-full h-full bg-black rounded-[22px] flex items-center justify-center">
                          <span className="font-display italic text-3xl text-[#89AACC] font-bold">ax</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-display italic text-2xl text-white">AxionOS</h3>
                        <p className="text-[11px] font-mono text-muted mt-1">LineageOS Base · Zero Bloat</p>
                      </div>
                    </div>

                    <div className="space-y-1.5 w-full text-left font-mono text-[10px]">
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex justify-between">
                        <span className="text-white">AxBoostFwk</span>
                        <span className="text-emerald-400">Low Latency</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex justify-between">
                        <span className="text-white">SfCpuPolicy</span>
                        <span className="text-[#89AACC]">Frame Sync</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white/[0.04] border border-white/5 flex justify-between">
                        <span className="text-white">Xen PC Mode</span>
                        <span className="text-amber-400">Desktop UI</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Layer 1: Redmi rubyx Hardware Specs */}
                  <motion.div
                    animate={{
                      opacity: Math.max(0, 1 - Math.abs(continuousStage - 1) * 1.5),
                      scale: 1 - Math.abs(continuousStage - 1) * 0.08,
                      filter: `blur(${Math.abs(continuousStage - 1) * 8}px)`,
                    }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute inset-0 flex flex-col justify-between py-3 space-y-3 font-mono pointer-events-none"
                    style={{ display: Math.abs(continuousStage - 1) > 1.2 ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <span className="text-[10px] text-[#89AACC] uppercase tracking-widest block">DEVICE SPECIFICATIONS</span>
                      <h4 className="font-display italic text-xl text-white">Redmi Note 12 Pro 5G</h4>
                      <span className="text-[10px] text-muted">rubyx / MediaTek MT6877</span>
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                        <span className="text-muted block text-[9px]">PROCESSOR</span>
                        <span className="text-white font-semibold">Dimensity 1080 (6nm)</span>
                        <span className="text-muted block text-[9px] mt-0.5">2x A78 2.6GHz + 6x A55 2.0GHz</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                        <div>
                          <span className="text-muted block text-[9px]">DISPLAY</span>
                          <span className="text-white font-semibold">120Hz Dynamic AMOLED</span>
                        </div>
                        <span className="text-emerald-400 text-[10px]">DRM/KMS</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between items-center">
                        <div>
                          <span className="text-muted block text-[9px]">BATTERY / CHARGING</span>
                          <span className="text-white font-semibold">5000mAh / 67W Turbo</span>
                        </div>
                        <span className="text-cyan-400 text-[10px]">Fast Charge</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center text-[10px] text-emerald-300">
                      Android 17 Bring-up Verified
                    </div>
                  </motion.div>

                  {/* Layer 2: Linux 4.19.325 LTS Kernel */}
                  <motion.div
                    animate={{
                      opacity: Math.max(0, 1 - Math.abs(continuousStage - 2) * 1.5),
                      scale: 1 - Math.abs(continuousStage - 2) * 0.08,
                      filter: `blur(${Math.abs(continuousStage - 2) * 8}px)`,
                    }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute inset-0 flex flex-col justify-between py-3 space-y-3 font-mono pointer-events-none"
                    style={{ display: Math.abs(continuousStage - 2) > 1.2 ? 'none' : 'flex' }}
                  >
                    <div className="text-center">
                      <span className="text-[10px] text-[#89AACC] uppercase tracking-widest block">KERNEL ARCHITECTURE</span>
                      <h4 className="font-display italic text-xl text-white">Linux 4.19.325 LTS</h4>
                      <span className="text-[10px] text-muted">Energy Aware Scheduling (EAS)</span>
                    </div>

                    <div className="space-y-1.5 text-[10px]">
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                        <span className="text-white">Scheduler</span>
                        <span className="text-[#89AACC]">EAS Schedutil Custom</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                        <span className="text-white">Memory Subsystem</span>
                        <span className="text-emerald-400">LZ4 + PSI Metrics</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                        <span className="text-white">Process Management</span>
                        <span className="text-amber-400">LMK & BPF Backports</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between">
                        <span className="text-white">Security Patching</span>
                        <span className="text-cyan-400">CIP Patch Integration</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center text-[10px] text-blue-300">
                      Custom MT6877 EAS Kernel
                    </div>
                  </motion.div>

                  {/* Layer 3: GCP & Cloudflare CDN Distribution */}
                  <motion.div
                    animate={{
                      opacity: Math.max(0, 1 - Math.abs(continuousStage - 3) * 1.5),
                      scale: 1 - Math.abs(continuousStage - 3) * 0.08,
                      filter: `blur(${Math.abs(continuousStage - 3) * 8}px)`,
                    }}
                    transition={{ duration: 0.2, ease: "linear" }}
                    className="absolute inset-0 flex flex-col justify-between py-4 text-center font-mono pointer-events-none"
                    style={{ display: Math.abs(continuousStage - 3) > 1.2 ? 'none' : 'flex' }}
                  >
                    <div>
                      <span className="text-[10px] text-[#89AACC] uppercase tracking-widest block">AUTOMATED PIPELINE</span>
                      <h4 className="font-display italic text-xl text-white">OTA Distribution</h4>
                    </div>

                    <div className="space-y-3 my-auto">
                      <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Cloud size={15} className="text-blue-400" />
                          <span className="text-xs text-white font-semibold">GCP Build Server</span>
                        </div>
                        <span className="text-[10px] text-emerald-400">Automated CI</span>
                      </div>

                      <div className="flex justify-center text-muted">
                        <ArrowRight size={13} className="rotate-90 text-[#89AACC]" />
                      </div>

                      <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Server size={15} className="text-amber-400" />
                          <span className="text-xs text-white font-semibold">Cloudflare CDN</span>
                        </div>
                        <span className="text-[10px] text-amber-300">Edge Cache</span>
                      </div>

                      <div className="flex justify-center text-muted">
                        <ArrowRight size={13} className="rotate-90 text-[#89AACC]" />
                      </div>

                      <div className="p-2.5 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone size={15} className="text-emerald-400" />
                          <span className="text-xs text-white font-semibold">rubyx Devices</span>
                        </div>
                        <span className="text-[10px] text-cyan-300">5,142+ Builds</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right: Technical Engineering Narrative & Code Console */}
            <div className="lg:col-span-7 space-y-4">
              <div className="p-6 rounded-3xl liquid-glass-edge bg-surface/60 backdrop-blur-2xl border border-white/10">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
