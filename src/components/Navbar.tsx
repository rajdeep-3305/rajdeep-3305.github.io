import { useState, useEffect } from 'react';
import { Send, Github } from 'lucide-react';
import Magnet from './Magnet';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToTarget } from '../hooks/useLenis';

// Defined at module level — stable reference, never causes hook re-attachment
const NAV_SECTION_IDS = ['home', 'systems', 'projects', 'hardware', 'contact'] as const;

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Systems', id: 'systems' },
  { label: 'Work', id: 'projects' },
  { label: 'Lab', id: 'hardware' },
  { label: 'Contact', id: 'contact' },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useActiveSection(NAV_SECTION_IDS as unknown as string[]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    scrollToTarget(`#${id}`);
  };

  return (
    <header
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 transition-all duration-300 pointer-events-none"
    >
      <div
        className={`inline-flex items-center rounded-full liquid-glass-edge px-3 py-2 transition-all duration-300 pointer-events-auto ${
          scrolled
            ? 'shadow-2xl shadow-black/90 bg-surface/90 backdrop-blur-2xl'
            : 'bg-surface/60 backdrop-blur-xl'
        }`}
      >

        <Magnet strength={0.25}>
          <button
            onClick={() => scrollTo('home')}
            aria-label="Rajdeep Biswas — Scroll to top"
            className="group relative w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC]"
          >
            <span className="absolute inset-0 rounded-full accent-gradient group-hover:bg-[linear-gradient(90deg,#4E85BF_0%,#89AACC_100%)] transition-all duration-500 animate-slow-spin" />
            <span className="absolute inset-[2px] rounded-full bg-bg flex items-center justify-center font-display italic text-[12px] sm:text-[13px] text-text-primary group-hover:scale-110 transition-transform duration-300 font-semibold">
              RB
            </span>
          </button>
        </Magnet>

        <div className="w-px h-4 bg-stroke mx-2 hidden sm:block" />


        <nav className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-xs sm:text-sm rounded-full px-2.5 sm:px-3.5 py-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] ${
                  isActive
                    ? 'text-text-primary bg-white/10 font-medium'
                    : 'text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          <a
            href="https://github.com/rajdeep-3305"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Rajdeep Biswas GitHub Profile"
            className="text-xs sm:text-sm rounded-full px-2.5 sm:px-3 py-1.5 text-muted hover:text-text-primary hover:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] hidden md:flex items-center gap-1.5 font-mono"
          >
            <Github size={13} />
            GitHub
          </a>
        </nav>

        <div className="w-px h-4 bg-stroke mx-2 hidden sm:block" />


        <Magnet strength={0.3}>
          <a
            href="https://t.me/casanova_3305"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Send a message on Telegram"
            className="group relative rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm text-text-primary overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#89AACC] flex items-center gap-1 font-medium"
          >
            <span
              className="absolute inset-0 accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ inset: '-2px' }}
            />
            <span className="relative z-10 flex items-center gap-1.5 bg-surface rounded-full backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 border border-white/5 group-hover:border-white/20 transition-colors">
              <Send size={12} className="text-[#89AACC]" />
              Say hi
            </span>
          </a>
        </Magnet>
      </div>
    </header>
  );
}
