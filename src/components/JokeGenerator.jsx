import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, RefreshCcw, Loader2 } from 'lucide-react';
import { fetchJoke } from '../services/api';

export default function JokeGenerator() {
    const [joke, setJoke] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getJoke = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchJoke();
            setJoke(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getJoke(); }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring" }}
            className="glass-card flex flex-col gap-4 w-full max-w-md mx-auto"
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2 text-amber-400">
                    <MessageSquareQuote className="w-6 h-6" /> Random Joke
                </h2>
            </div>

            <div className="min-h-[140px] flex flex-col justify-center gap-4 relative">
                {loading ? (
                    <div className="flex items-center justify-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    </div>
                ) : error ? (
                    <div className="text-red-400 p-4 text-center text-sm border border-red-500/20 rounded-xl bg-red-500/5">
                        {error}
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-lg font-medium leading-relaxed text-white/90 italic">
                            "{joke.setup}"
                        </p>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={joke.punchline}
                            className="text-amber-300 font-semibold border-l-2 border-amber-500/50 pl-4"
                        >
                            {joke.punchline}
                        </motion.p>
                    </div>
                )}
            </div>

            <button
                onClick={getJoke}
                disabled={loading}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/30 transition-all font-medium text-sm text-amber-300 active:scale-95 disabled:opacity-50"
            >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Next Joke
            </button>
        </motion.div>
    );
}
