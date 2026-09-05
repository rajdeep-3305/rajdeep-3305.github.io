import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import LoadingScreen from './components/LoadingScreen';
import FilmGrain from './components/FilmGrain';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import StatementSection from './components/StatementSection';
import AxionAOSPShowcase from './components/AxionAOSPShowcase';
import ToolkitSection from './components/ToolkitSection';
import ProjectsSection from './components/ProjectsSection';
import HardwareLabSection from './components/HardwareLabSection';
import ControlSystemsSection from './components/ControlSystemsSection';
import StatsSection from './components/StatsSection';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis Smooth Scrolling (respects touch/mobile)
  useLenis();

  return (
    <main className="bg-bg text-text-primary min-h-screen relative selection:bg-[#89AACC]/20 selection:text-white overflow-x-clip">

      <FilmGrain />


      <CustomCursor />


      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>


      <Hero />


      <StatementSection />


      <AxionAOSPShowcase />


      <ToolkitSection />


      <ProjectsSection />


      <HardwareLabSection />


      <ControlSystemsSection />


      <StatsSection />


      <Footer />
    </main>
  );
}

export default App;
