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
    <div className="h-[100svh] md:h-screen sticky top-0 flex flex-col items-center justify-center pt-6 pb-6 md:pt-16 md:pb-8 px-4">
      <motion.article
        style={{
          scale,
          top: `calc(10% + ${index * 22}px)`,
          background: project.gradient,
        }}
        className="w-full max-w-5xl rounded-3xl liquid-glass-edge p-5 md:p-10 border border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden flex flex-col justify-between min-h-[400px] md:min-h-[520px]"
      >

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(137,170,204,0.12)_0%,_transparent_65%)] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">

          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-lg aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 bg-black/85 shadow-2xl group flex items-center justify-center p-4 md:p-6">
              {index === 0 ? (

                <div className="relative w-full h-full">
                  <img
                    src="/assets/axion/hero_main.webp"
                    alt="AxionOS SystemUI on Redmi Note 12 Pro 5G"
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-2xl" />

                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-[#89AACC] to-[#4E85BF] p-0.5 shadow-lg flex items-center justify-center">
                      <div className="w-full h-full bg-black rounded-[9px] flex items-center justify-center">
                        <span className="font-display italic text-sm text-[#89AACC] font-bold leading-none">ax</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-white/80 flex flex-col">
                      <span>Official AxionOS Visual</span>
                      <span className="text-[8px] text-white/50">Rajdeep: Device Maintainer</span>
                    </span>
                  </div>
                </div>
              ) : index === 1 ? (

                <div className="relative w-full h-full">
                  <img
                    src="/assets/axion/workspace_front.webp"
                    alt="rubyx Device Tree & Android 17 Bringup"
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono text-emerald-300/90 px-2 py-0.5 rounded-lg bg-black/60 border border-emerald-400/20">
                      device/xiaomi/rubyx · Android 17
                    </span>
                  </div>
                </div>
              ) : index === 2 ? (

                <div className="relative w-full h-full">
                  <img
                    src="/assets/axion/kernel_manager.webp"
                    alt="MT6877 Kernel Manager — EAS Scheduler & CPU Policy"
                    className="absolute inset-0 w-full h-full object-cover object-top rounded-2xl"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent rounded-2xl" />
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-mono text-amber-300/90 px-2 py-0.5 rounded-lg bg-black/60 border border-amber-400/20">
                      Linux 4.19.325 LTS · EAS Schedutil
                    </span>
                  </div>
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
