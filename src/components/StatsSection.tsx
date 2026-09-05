import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Activity } from 'lucide-react';
import { STATS } from '../data/portfolioData';

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800; // ms
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="bg-bg py-20 md:py-28 border-t border-stroke/30">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Activity size={14} className="text-[#89AACC] animate-pulse" />
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-muted">
              SYSTEMS TELEMETRY & IMPACT
            </span>
          </div>
          <span className="text-xs font-mono text-muted/60 hidden sm:block">
            VERIFIED OPEN-SOURCE METRICS
          </span>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {STATS.map((stat, i) => {
            const isPlus = stat.value.includes('+');
            const suffix = isPlus ? '+' : '';

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-3xl liquid-glass-edge bg-surface/30 border border-white/10 flex flex-col justify-between min-h-[190px] hover:border-[#89AACC]/40 transition-colors"
              >
                <div className="text-5xl sm:text-6xl font-display italic accent-gradient-text tracking-tight mb-4 flex items-baseline">
                  <AnimatedCounter target={stat.numericValue} suffix={suffix} />
                </div>

                <div>
                  <div className="text-sm font-medium text-text-primary uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-muted font-light font-mono">
                    {stat.sublabel}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
