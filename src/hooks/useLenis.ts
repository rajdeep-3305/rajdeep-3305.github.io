import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Module-level singleton prevents native scrollIntoView() conflicts with Lenis easing.
let lenisInstance: Lenis | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

/**
 * Scroll to a CSS selector, element, or numeric offset using Lenis when active,
 * falling back to native scrollIntoView on mobile/touch where Lenis is disabled.
 */
export function scrollToTarget(
  target: string | HTMLElement | number,
  offset = 0,
): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
  } else {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    gsap.config({ force3D: true, nullTargetWarn: false });
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: true,
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
    });
    ScrollTrigger.defaults({
      anticipatePin: 1,
      fastScrollEnd: true,
    });

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Two-pass ScrollTrigger refresh catches font load completion and late dynamic heights.
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    // Disable Lenis on mobile/touch to preserve native momentum scrolling
    if (prefersReducedMotion || isTouchDevice || isMobile) {
      return () => clearTimeout(timer);
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenisInstance = lenis;

    // Connect Lenis to GSAP ScrollTrigger — Lenis drives ScrollTrigger.update
    // through its scroll event, keeping both systems in sync on the same frame
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    return () => {
      clearTimeout(timer);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      lenisRef.current = null;
      lenisInstance = null;
    };
  }, []);

  return lenisRef;
}
