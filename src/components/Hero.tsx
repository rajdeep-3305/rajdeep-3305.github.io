import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, ExternalLink } from 'lucide-react';
import Navbar from './Navbar';
import Magnet from './Magnet';
import { useHlsVideo } from '../hooks/useHlsVideo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { scrollToTarget } from '../hooks/useLenis';

const HLS_STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Hero() {
  const { videoRef } = useHlsVideo({ src: HLS_STREAM_URL });
  const [roleIndex, setRoleIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const roles = [
    "Android Open Source Contributor",
    "Linux Kernel Developer",
    "Electrical Engineer",
  ];

  const glassPills = ["ANDROID", "LINUX", "ELECTRICAL", "ENGINEERING"];

  useEffect(() => {
    if (prefersReducedMotion) {
      gsap.set(".hero-name-reveal, .hero-fade-in", { opacity: 1, y: 0, filter: "blur(0px)" });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(".hero-name-reveal", {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.3,
        delay: 0.1,
      }).to(
        ".hero-fade-in",
        { opacity: 1, filter: "blur(0px)", y: 0, duration: 1.0, stagger: 0.1 },
        "-=0.9"
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion || isHovered) return;
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [roles.length, prefersReducedMotion, isHovered]);

  const scrollToStatement = () => {
    scrollToTarget('#statement');
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between items-center bg-[#070709] pt-28 pb-12 px-4 select-none"
    >

      <video poster="/assets/axion/hero_main.webp"
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 min-w-full min-h-full transition-opacity duration-1000 ${
          'opacity-35'
        }`}
      />


      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-bg pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-bg via-bg/80 to-transparent pointer-events-none" />


      <Navbar />


      <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center my-auto">

        <div className="hero-fade-in opacity-0 filter blur-[8px] translate-y-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {glassPills.map((pill) => (
            <span
              key={pill}
              className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-text-primary/90 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/15 backdrop-blur-md shadow-sm"
            >
              {pill}
            </span>
          ))}
        </div>


        <h1 className="hero-name-reveal text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-display italic leading-[0.88] tracking-tight text-text-primary mb-5 opacity-0 filter blur-[12px] translate-y-8">
          Rajdeep Biswas
        </h1>


        <h2 className="hero-fade-in opacity-0 filter blur-[8px] translate-y-4 text-xl sm:text-2xl md:text-3xl text-text-primary/90 font-light tracking-tight mb-6">
          Building at the edge of <span className="font-display italic text-text-primary">hardware & software.</span>
        </h2>


        <span className="sr-only">Electrical Engineer and Systems Developer.</span>


        <div
          aria-hidden="true"
          className="hero-fade-in opacity-0 filter blur-[8px] translate-y-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md mb-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#89AACC] animate-pulse" />
          <span className="text-xs sm:text-sm font-mono text-muted">Discipline:</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="text-xs sm:text-sm font-medium text-text-primary min-w-[210px] text-left"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>


        <div className="hero-fade-in opacity-0 filter blur-[8px] translate-y-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Magnet strength={0.25}>
            <button
              onClick={scrollToStatement}
              className="group relative rounded-full text-xs sm:text-sm px-8 py-3.5 bg-white text-bg font-medium transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 shadow-lg shadow-white/10 hover:bg-[#89AACC] hover:text-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] cursor-pointer"
            >
              <span>Explore Systems</span>
              <ArrowDown size={14} className="group-hover:translate-y-0.5 transition-transform" />
            </button>
          </Magnet>

          <Magnet strength={0.25}>
            <a
              href="https://github.com/rajdeep-3305"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-full text-xs sm:text-sm px-8 py-3.5 border border-white/20 bg-white/[0.04] text-text-primary hover:border-white/50 hover:bg-white/[0.08] transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC]"
            >
              <span className="relative z-10 flex items-center gap-2 font-medium">
                GitHub <ExternalLink size={13} />
              </span>
            </a>
          </Magnet>
        </div>
      </div>


      <div className="relative z-10 flex flex-col items-center gap-2 text-center pointer-events-none mt-auto">
        <span className="text-[10px] text-muted uppercase tracking-[0.3em] font-mono">
          SCROLL TO EXPLORE
        </span>
        <div className="w-px h-8 bg-stroke/60 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#89AACC] animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}
