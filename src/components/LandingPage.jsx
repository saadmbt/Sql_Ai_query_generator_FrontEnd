import { FaRocket, FaBolt, FaShieldAlt } from "react-icons/fa";
import sqlServer from "../assets/sql-server.png";
import FAQ from "./FAQ";
export default function LandingPage({ onStart }) {
    return (
        <section className="min-h-screen py-16 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-blue-500 to-purple-600 text-white p-6 relative overflow-hidden" role="main">
            {/* Decorative Blobs */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 opacity-20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <header className="text-center mb-12">
                <img src={sqlServer} alt="SQL Server" className="mx-auto w-28 h-28 mb-6 drop-shadow-2xl rounded-full border-4 border-white/30" />
                <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent drop-shadow-lg">
                    SQL AI Query Generator
                </h1>
                <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-4 font-medium text-indigo-100">
                    Effortlessly generate SQL queries from plain English. Boost productivity and accuracy for all your database needs.
                </p>
                <p className="inline-block text-xs font-bold px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg mb-2">
                    100% Free • No Login Required
                </p>
                <br />
                <button
                    onClick={onStart}
                    aria-label="Start using the service"
                    className="mt-8 px-10 py-4 bg-gradient-to-r from-purple-400 to-indigo-600 text-white font-bold rounded-full shadow-xl hover:scale-105 hover:from-indigo-500 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-white/40 text-lg"
                >
                    <FaRocket className="inline mr-2 mb-1" /> Get Started
                </button>
            </header>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-8">
                <article className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-200">
                    <span className="flex items-center gap-2 bg-indigo-700/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">
                        <FaRocket /> Easy to Use
                    </span>
                    <p className="text-white/90 text-base">Describe your query in plain English and get instant, ready-to-use SQL.</p>
                </article>
                <article className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-200">
                    <span className="flex items-center gap-2 bg-indigo-700/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">
                        <FaBolt /> Fast & Accurate
                    </span>
                    <p className="text-white/90 text-base">AI generates optimized SQL queries in seconds, saving you time and effort.</p>
                </article>
                <article className="bg-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/10 hover:scale-105 transition-transform duration-200">
                    <span className="flex items-center gap-2 bg-indigo-700/90 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 shadow">
                        <FaShieldAlt /> Secure & Fair
                    </span>
                    <p className="text-white/90 text-base">Ads support the service. Your data is never stored or shared. Privacy first.</p>
                </article>
            </section>
            <FAQ />
            <footer className="mt-8 text-xs text-indigo-100 max-w-lg text-center bg-white/10 rounded-xl px-6 py-3 shadow-lg">
                <p>
                    We respect your privacy. No queries or personal data are stored. Please use responsibly and do not submit sensitive information.
                </p>
            </footer>
        </section>
    );
}