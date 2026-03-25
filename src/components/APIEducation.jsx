import { motion } from 'framer-motion';
import { BookOpen, Code2, Link, Zap, ArrowLeft } from 'lucide-react';

export default function APIEducation({ onBack }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="max-w-4xl mx-auto py-20 px-6"
        >
            <button
                onClick={onBack}
                className="group flex items-center gap-2 text-indigo-400 hover:text-white transition-colors mb-12 font-bold uppercase tracking-wider text-xs"
            >
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Playground
            </button>

            <header className="mb-20">
                <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                    Understanding <span className="text-indigo-500">APIs</span>
                </h1>
                <p className="text-xl text-white/50 leading-relaxed max-w-2xl">
                    Learn how systems talk to each other and how you can harness the power of web services in your own applications.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Simple Definition */}
                <section className="glass-card flex flex-col gap-4">
                    <BookOpen className="w-8 h-8 text-indigo-400" />
                    <h2 className="text-2xl font-bold">What is an API?</h2>
                    <p className="text-white/60 leading-relaxed">
                        API stands for **Application Programming Interface**. Think of it as a waiter in a restaurant.
                        You (the client) place an order (request), and the waiter (API) takes it to the kitchen (server)
                        and brings back your food (response).
                    </p>
                </section>

                {/* How to use */}
                <section className="glass-card flex flex-col gap-4">
                    <Code2 className="w-8 h-8 text-emerald-400" />
                    <h2 className="text-2xl font-bold">How to use them?</h2>
                    <p className="text-white/60 leading-relaxed">
                        Most modern APIs use **HTTP requests**. You send a request to a URL, and the server sends back
                        information, usually in **JSON** format.
                    </p>
                    <div className="bg-slate-900/50 p-3 rounded-lg border border-white/5 font-mono text-xs text-indigo-300">
                        fetch('https://api.example.com/data')<br />
                        &nbsp;&nbsp;.then(res =&gt; res.json())<br />
                        &nbsp;&nbsp;.then(data =&gt; console.log(data));
                    </div>
                </section>

                {/* Integration */}
                <section className="glass-card flex flex-col gap-4">
                    <Link className="w-8 h-8 text-sky-400" />
                    <h2 className="text-2xl font-bold">Integration Steps</h2>
                    <ol className="list-decimal list-inside text-white/60 space-y-2 text-sm">
                        <li>Find a reliable API (like Dog CEO or RandomUser).</li>
                        <li>Get an API Key (if required).</li>
                        <li>Test endpoints using tools like Hoppscotch or Postman.</li>
                        <li>Use <code className="text-sky-300">fetch()</code> or <code className="text-sky-300">axios</code> to call it in your code.</li>
                        <li>Parse the JSON response and update your UI.</li>
                    </ol>
                </section>

                {/* Why APIs? */}
                <section className="glass-card flex flex-col gap-4">
                    <Zap className="w-8 h-8 text-amber-400" />
                    <h2 className="text-2xl font-bold">Why use APIs?</h2>
                    <p className="text-white/60 leading-relaxed">
                        APIs allow you to focus on building your app's unique features without reinventing
                        the wheel. Need weather data? Use an API. Need payment processing? Use an API.
                    </p>
                </section>
            </div>

            <footer className="mt-20 pt-10 border-t border-white/5">
                <p className="text-center text-white/20 text-sm">
                    Part of the API Playground Project &bull; Built with React & Three.js
                </p>
            </footer>
        </motion.div>
    );
}
