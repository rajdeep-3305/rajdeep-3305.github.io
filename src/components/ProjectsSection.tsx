import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, GitBranch, Terminal, Layers } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  total: number;
  scrollYProgress: any;
}) {
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const start = index / total;
  const scale = useTransform(scrollYProgress, [start, 1], [1, targetScale]);

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center pt-16 pb-8 px-4">
      <motion.article
        style={{
          scale,
          top: `calc(10% + ${index * 22}px)`,
          background: project.gradient,
        }}
        className="w-full max-w-5xl rounded-3xl liquid-glass-edge p-6 sm:p-10 border border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between min-h-[480px] sm:min-h-[520px]"
      >

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(137,170,204,0.12)_0%,_transparent_65%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-black/85 shadow-2xl group flex items-center justify-center p-6">
              {index === 0 ? (

                <div className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#89AACC] to-[#4E85BF] p-0.5 shadow-xl flex items-center justify-center">
                    <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center">
                      <span className="font-display italic text-2xl text-[#89AACC] font-bold">ax</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-display italic text-2xl text-white">AxionAOSP</h4>
                    <p className="text-xs font-mono text-muted">Redmi Note 12 Pro 5G Official Builds</p>
                  </div>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    5,142+ Downloads Recorded
                  </span>
                </div>
              ) : index === 1 ? (

                <div className="w-full font-mono text-xs space-y-2 select-text">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-muted">
                    <span>device/xiaomi/rubyx</span>
                    <span className="text-[#89AACC]">Android 17</span>
                  </div>
                  <p className="text-emerald-400 text-[11px]">
                    + TARGET_ARCH := arm64 (Dimensity 1080)
                  </p>
                  <p className="text-white/80 text-[11px]">
                    + TARGET_USES_DRM_DISPLAY := true (120Hz)
                  </p>
                  <p className="text-muted text-[10px]">
                    + SELinux Enforcing (0 denials) · Camera HIDL
                  </p>
                </div>
              ) : index === 2 ? (

                <div className="w-full font-mono text-xs space-y-2 select-text">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-muted">
                    <span>kernel/xiaomi/mt6877</span>
                    <span className="text-amber-400">Linux 4.19.325 LTS</span>
                  </div>
                  <p className="text-cyan-300 text-[11px]">
                    + EAS Schedutil CPU Energy Model Tuning
                  </p>
                  <p className="text-white/80 text-[11px]">
                    + LZ4 Fast Compression & PSI Memory Tracking
                  </p>
                  <p className="text-muted text-[10px]">
                    + Low Memory Killer (LMK) & BPF Subsystem
                  </p>
                </div>
              ) : (

                <div className="w-full font-mono text-xs space-y-2 select-text text-left">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-muted">
                    <span>android-porting-guide</span>
                    <span className="text-[#89AACC]">23+ Stars</span>
                  </div>
                  <p className="text-white text-[11px]">
                    # Reproducible Android ROM, GSI & Kernel Porting
                  </p>
                  <p className="text-muted text-[10px]">
                    Step-by-step documentation for custom ROM developers
                  </p>
                </div>
              )}


              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/60">
                <span className="flex items-center gap-1">
                  <Layers size={10} className="text-[#89AACC]" />
                  {project.category}
                </span>
                <span>SYSTEM 0{index + 1}</span>
              </div>
            </div>
          </div>


          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>

              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-[#89AACC] px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  SYSTEM 0{index + 1}
                </span>
                <a
                  href={project.links[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-text-primary transition-all border border-white/10"
                >
                  <ExternalLink size={14} />
                </a>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display italic text-text-primary tracking-tight mb-1">
                {project.title}
              </h3>

              {project.subtitle && (
                <span className="text-xs font-mono text-muted block mb-3">
                  {project.subtitle}
                </span>
              )}

              <p className="text-xs text-muted font-light leading-relaxed mb-4">
                {project.description}
              </p>


              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-text-primary/80 border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>


            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-3">
                {project.metrics?.slice(0, 2).map((m) => (
                  <div key={m.label} className="text-xs font-mono">
                    <span className="text-muted text-[10px] block">{m.label}</span>
                    <span className="font-semibold text-text-primary">{m.value}</span>
                  </div>
                ))}
              </div>

              <a
                href={project.links[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-mono px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-text-primary transition-all border border-white/10"
              >
                <GitBranch size={12} />
                Inspect
              </a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="projects" ref={containerRef} className="relative bg-bg py-20 border-t border-stroke/30">
      <div className="max-w-6xl mx-auto px-6 md:px-10 mb-12">
        <div className="flex items-center gap-3 mb-3">
          <Terminal size={14} className="text-[#89AACC]" />
          <span className="text-xs text-muted uppercase tracking-[0.3em] font-mono">
            ENGINEERING REPOSITORIES
          </span>
        </div>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-display italic text-text-primary tracking-tight">
          Featured <span className="text-text-primary/40">systems</span>
        </h2>
        <p className="text-sm sm:text-base text-muted font-light mt-1.5 max-w-xl">
          Progressive sticky showcase of kernel architectures, custom Android OS bring-ups, and open-source documentation.
        </p>
      </div>

      {PROJECTS.map((project, index) => (
        <ProjectCard
          key={project.id}
          project={project}
          index={index}
          total={PROJECTS.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </section>
  );
}
