import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Image as ImageIcon, FileText, Loader2, ChevronRight } from 'lucide-react';
import { fetchJSONPlaceholder } from '../services/api';

export default function JSONExplorer() {
    const [data, setData] = useState([]);
    const [type, setType] = useState('posts');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadData = async (dataType) => {
        setLoading(true);
        setError(null);
        try {
            const result = await fetchJSONPlaceholder(dataType);
            setData(result);
            setType(dataType);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData('posts'); }, []);

    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-card flex flex-col gap-4 w-full max-w-2xl mx-auto col-span-1 md:col-span-2"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <h2 className="text-xl font-bold flex items-center gap-2 text-sky-400">
                    <Database className="w-6 h-6" /> JSONPlaceholder Explorer
                </h2>
                <div className="flex gap-2">
                    {['posts', 'photos'].map((t) => (
                        <button
                            key={t}
                            onClick={() => loadData(t)}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${type === t
                                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-3 min-h-[300px]">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                    </div>
                ) : error ? (
                    <div className="text-red-400 p-8 text-center border border-red-500/20 rounded-xl bg-red-500/5">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {data.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                key={item.id}
                                className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-sky-500/30 transition-colors group"
                            >
                                {type === 'posts' ? (
                                    <div className="flex gap-3">
                                        <FileText className="w-4 h-4 text-sky-500 shrink-0 mt-1" />
                                        <div>
                                            <h3 className="text-sm font-semibold text-white/90 line-clamp-1">{item.title}</h3>
                                            <p className="text-xs text-white/50 line-clamp-2 mt-1">{item.body}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center">
                                        <img src={item.thumbnailUrl} alt={item.title} className="w-12 h-12 rounded-lg bg-white/10" />
                                        <div className="flex-1">
                                            <h3 className="text-xs font-medium text-white/80 line-clamp-2">{item.title}</h3>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-sky-500 transition-colors" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
