import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, Phone, RefreshCw, Loader2 } from 'lucide-react';
import { fetchUser } from '../services/api';

export default function UserCard() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUser();
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { getUser(); }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring" }}
            className="glass-card flex flex-col gap-6 w-full max-w-md mx-auto relative overflow-hidden"
        >
            <div className="absolute top-0 right-0 p-4">
                <button
                    onClick={getUser}
                    disabled={loading}
                    className="p-2 rounded-full hover:bg-white/10 disabled:opacity-50 transition-colors"
                >
                    <RefreshCw className={`w-5 h-5 text-emerald-400 ${loading ? 'animate-spin' : ''}`} />
                </button>
            </div>

            {loading ? (
                <div className="h-[280px] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white/20" />
                </div>
            ) : error ? (
                <div className="h-[280px] flex items-center justify-center text-red-400 p-4 text-center">
                    {error}
                </div>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-4 text-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                            <img
                                src={user.photo}
                                alt={user.name}
                                className="w-24 h-24 rounded-full border-2 border-emerald-500/30 p-1 relative z-10"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{user.name}</h2>
                            <p className="text-sm text-emerald-400 font-medium">Random User Profile</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 mt-2">
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <Mail className="w-4 h-4 text-emerald-500/70" />
                            <span className="truncate">{user.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <MapPin className="w-4 h-4 text-emerald-500/70" />
                            <span>{user.country}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <Calendar className="w-4 h-4 text-emerald-500/70" />
                            <span>Age: {user.age} yrs</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-white/70">
                            <Phone className="w-4 h-4 text-emerald-500/70" />
                            <span>{user.phone}</span>
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}
