import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Mail, Send } from 'lucide-react';
import Magnet from './Magnet';
import { useHlsVideo } from '../hooks/useHlsVideo';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const HLS_STREAM_URL = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

export default function Footer() {
  const { videoRef, isLoaded } = useHlsVideo({ src: HLS_STREAM_URL });
  const prefersReducedMotion = usePrefersReducedMotion();
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion || !marqueeRef.current) return;

    const anim = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 38,
      ease: "none",
      repeat: -1,
    });

    return () => {
      anim.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <footer id="contact" className="relative bg-[#040406] pt-24 md:pt-36 pb-12 overflow-hidden border-t border-stroke/40">

      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover scale-y-[-1] transition-opacity duration-1000 ${
          isLoaded ? 'opacity-20' : 'opacity-0'
        }`}
      />
      <div className="absolute inset-0 bg-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        <div className="text-center max-w-4xl mx-auto mb-16 select-none">
          <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#89AACC] block mb-4">
            INITIATE CONTACT
          </span>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-display italic text-text-primary tracking-tight leading-[0.9] mb-6">
            CONTACT ME
          </h2>

          <p className="text-sm sm:text-base text-muted font-light max-w-md mx-auto mb-10 leading-relaxed">
            Open for core systems engineering, kernel optimization, and high-impact hardware-software initiatives.
          </p>


          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnet strength={0.25}>
              <a
                href="https://t.me/casanova_3305"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contact Rajdeep Biswas on Telegram"
                className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 bg-white text-bg text-sm font-medium hover:bg-[#89AACC] hover:text-bg transition-all duration-300 hover:scale-105 shadow-lg shadow-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC]"
              >
                <Send size={15} />
                <span className="font-mono">Telegram: @casanova_3305</span>
              </a>
            </Magnet>

            <Magnet strength={0.25}>
              <a
                href="mailto:rajdeepbiswas3305@gmail.com"
                aria-label="Send an email to Rajdeep Biswas"
                className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 border border-white/20 bg-white/[0.04] text-text-primary text-sm font-medium hover:border-white/50 hover:bg-white/[0.08] transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC]"
              >
                <Mail size={15} />
                <span className="font-mono">rajdeepbiswas3305@gmail.com</span>
              </a>
            </Magnet>
          </div>
        </div>


        <div
          aria-hidden="true"
          className="overflow-hidden mb-16 border-y border-white/10 py-5 select-none"
        >
          <div ref={marqueeRef} className="flex whitespace-nowrap w-fit">
            {Array(10)
              .fill("HARDWARE • KERNEL • ANDROID • ELECTRICAL • ")
              .map((text, i) => (
                <span
                  key={i}
                  className="text-3xl sm:text-5xl md:text-6xl font-display italic text-text-primary/10 mx-6"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>


        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a
              href="https://github.com/rajdeep-3305"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] rounded px-1 font-mono"
            >
              <Github size={15} /> github.com/rajdeep-3305
            </a>
            <a
              href="https://t.me/casanova_3305"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] rounded px-1 font-mono"
            >
              <Send size={15} /> t.me/casanova_3305
            </a>
            <a
              href="mailto:rajdeepbiswas3305@gmail.com"
              className="flex items-center gap-2 text-xs sm:text-sm text-muted hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] rounded px-1 font-mono"
            >
              <Mail size={15} /> rajdeepbiswas3305@gmail.com
            </a>
          </div>

          <div className="text-xs font-mono text-muted">
            <span>RAJDEEP BISWAS / 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
