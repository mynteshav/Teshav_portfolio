import React, { useState } from 'react';
import { NeuralBackground } from './components/NeuralBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export const App: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-dark-950 text-slate-100 selection:bg-sky-500/30 selection:text-white">
      {/* Dynamic interactive neural network canvas */}
      <NeuralBackground />

      {/* Main navigation header */}
      <Navbar onResumeClick={() => setIsResumeOpen(true)} />

      {/* Main content sections */}
      <main className="relative z-10">
        <Hero onResumeClick={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact onResumeClick={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onResumeClick={() => setIsResumeOpen(true)} />

      {/* Modal for viewing/requesting curriculum vitae */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
};

export default App;
