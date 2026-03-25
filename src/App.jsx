import { motion, useScroll, useSpring } from 'framer-motion';
import Background from './components/Background';
import DogFinder from './components/DogFinder';
import JokeGenerator from './components/JokeGenerator';
import UserCard from './components/UserCard';
import JSONExplorer from './components/JSONExplorer';
import { Sparkles, Terminal, Globe } from 'lucide-react';

function App() {
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
                <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-indigo-400" />
                    <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                        API.QUEST
                    </span>
                </div>
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white/60">
                    <a href="#explore" className="hover:text-white transition-colors">Explore</a>
                    <a href="https://github.com" target="_blank" className="hover:text-white transition-colors">GitHub</a>
                    <button className="px-4 py-2 rounded-full bg-white text-slate-950 hover:bg-white/90 transition-all font-bold">
                        Deploy Now
                    </button>
                </div>
            </nav>

            <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="mb-24 flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles className="w-3 h-3" /> Built with Antigravity
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
                            <div className="flex items-center gap-2 px-6 py-4 rounded-2xl glass font-medium text-white/80">
                                <Globe className="w-5 h-5 text-indigo-400" /> API Explorer v1.0
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* API Grid */}
                <div id="explore" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 items-start">
                    <DogFinder />
                    <JokeGenerator />
                    <UserCard />
                    <JSONExplorer />
                </div>

                {/* Footer */}
                <footer className="mt-40 pt-20 border-t border-white/5 flex flex-col items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-5 h-5 text-indigo-400" />
                        <span className="text-lg font-bold text-white/80">API.QUEST</span>
                    </div>
                    <p className="text-sm text-white/30">
                        &copy; 2026 API Playground. Made with &hearts; for Class Projects.
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default App;
