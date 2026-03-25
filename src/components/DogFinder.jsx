import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dog, Copy, RefreshCw, Loader2 } from 'lucide-react';
import { fetchDog } from '../services/api';

export default function DogFinder() {
    const [dog, setDog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);

    const getDog = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDog();
            setDog(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getDog(); }, []);

    const copyUrl = () => {
        if (dog) {
            navigator.clipboard.writeText(dog.image);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-card flex flex-col gap-4 w-full max-w-md mx-auto"
        >
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-400">
                    <Dog className="w-6 h-6" /> Dog Finder
                </h2>
                <button
                    onClick={getDog}
                    disabled={loading}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-white/5 border border-white/10 group">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    </div>
                ) : error ? (
                    <div className="absolute inset-0 flex items-center justify-center text-red-400 p-4 text-center text-sm">
                        {error}
                    </div>
                ) : (
                    <>
                        <img
                            src={dog.image}
                            alt={dog.breed}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-slate-950/80 to-transparent">
                            <p className="text-sm font-medium text-white/90">Breed: {dog.breed}</p>
                        </div>
                    </>
                )}
            </div>

            <button
                onClick={copyUrl}
                disabled={!dog || loading}
                className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/30 transition-all font-medium text-sm text-indigo-300 active:scale-95"
            >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied URL!' : 'Copy Image URL'}
            </button>
        </motion.div>
    );
}
