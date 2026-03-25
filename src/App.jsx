import { useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import Background from './components/Background';
import DogFinder from './components/DogFinder';
import JokeGenerator from './components/JokeGenerator';
import UserCard from './components/UserCard';
import JSONExplorer from './components/JSONExplorer';
import APIEducation from './components/APIEducation';
import { Sparkles, Terminal, Globe, Github } from 'lucide-react';

function App() {
    const [view, setView] = useState('home'); // 'home' or 'education'
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <div className="relative min-h-screen">
            <Background />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* Header */}
            <nav className="fixed top-0 inset-x-0 z-40 px-6 py-4 flex items-center justify-between glass border-b-0">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
                    <Terminal className="w-6 h-6 text-indigo-400" />
                    <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        API.QUEST
                    </span>
                </div>
                <div className="flex items-center gap-4 md:gap-6 text-sm font-medium text-white/60">
                    <a
                        href="https://github.com/abhinavsingh-hub/3d-api-explorer"
                        target="_blank"
                        className="hover:text-white transition-colors"
                        title="View Repository"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <button
                        onClick={() => setView('education')}
                        className="px-4 py-2 rounded-full bg-white text-slate-950 hover:bg-white/90 transition-all font-bold"
                    >
                        Learn More
                    </button>
                </div>
            </nav>

            <main className="relative z-10">
                <AnimatePresence mode="wait">
                    {view === 'home' ? (
                        <motion.div
                            key="home"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="pt-32 pb-20 px-6 max-w-7xl mx-auto"
                        >
                            {/* Hero Section */}
                            <section className="mb-24 flex flex-col items-center text-center">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                                    <Sparkles className="w-3 h-3" /> Welcome Aboard!
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight">
                                    Public API <br />
                                    <span className="text-indigo-500">Playground</span>
                                </h1>
                                <p className="max-w-xl mx-auto text-lg text-white/50 leading-relaxed mb-10">
                                    Discover, interact, and explore data from across the web.
                                    Built with React, Three.js, and a touch of magic.
                                </p>
                                <div className="flex flex-wrap justify-center gap-4">
                                    <a
                                        href="#explore"
                                        className="px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
                                    >
                                        Start Exploring
                                    </a>
                                    <button
                                        onClick={() => setView('education')}
                                        className="flex items-center gap-2 px-6 py-4 rounded-2xl glass font-medium text-white/80 hover:bg-white/5 transition-colors"
                                    >
                                        <Globe className="w-5 h-5 text-indigo-400" /> Learn Core Concepts
                                    </button>
                                </div>
                            </section>

                            {/* API Grid */}
                            <div id="explore" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
                                <DogFinder />
                                <JokeGenerator />
                                <UserCard />
                                <JSONExplorer />
                            </div>
                        </motion.div>
                    ) : (
                        <APIEducation onBack={() => setView('home')} />
                    )}
                </AnimatePresence>

                {/* Footer */}
                <footer className="mt-40 pt-20 pb-10 border-t border-white/5 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-indigo-400" />
                        <span className="text-lg font-bold text-white/80">API.QUEST</span>
                    </div>
                    <p className="text-sm text-white/30 text-center px-6">
                        &copy; 2026 API Playground. Made with &hearts; for Class Projects.<br />
                        Check the <a href="https://github.com/abhinavsingh-hub/3d-api-explorer" target="_blank" className="text-indigo-400 hover:underline">Source Code</a>.
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default App;
