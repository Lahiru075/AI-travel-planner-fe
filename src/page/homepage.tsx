import { Link } from "react-router-dom";
import travelBg from "../assets/pexels-daniel-jurin-358265-2245411.jpg"; 

const homepage = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-cyan-500/30">
      
      {/* 1. HERO SECTION (Full Screen) */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        
        {/* Background Image & Overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
            style={{ backgroundImage: `url(${travelBg})` }}
        ></div>
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/60 to-slate-950"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-10">
            
            {/* AI Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-slate-700 mb-8 hover:border-cyan-500/50 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                </span>
                <span className="text-sm font-medium text-cyan-300 tracking-wide uppercase">AI Powered Travel Planner</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight">
                Travel Smarter, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-gradient-x">
                    Not Harder.
                </span>
            </h1>

            {/* Subtext */}
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the future of travel. Tell us where you want to go, and our AI will build a personalized, day-by-day itinerary in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <Link to="/createtrip">
                    <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full text-lg shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        Start Planning Free 🚀
                    </button>
                </Link>
                <Link to="/login">
                    <button className="px-10 py-4 bg-white/5 text-white font-bold rounded-full text-lg backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group">
                        Sign In 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </Link>
            </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* 2. HOW IT WORKS SECTION */}
      <div className="py-24 bg-slate-950 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How it Works</h2>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">Generate your perfect trip in 3 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-900 via-cyan-900 to-blue-900 z-0"></div>

                {/* Step 1 */}
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500">
                        📍
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">1. Pick Destination</h3>
                    <p className="text-slate-400 leading-relaxed">Choose your dream location and how many days you want to explore.</p>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500 delay-100">
                        💸
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">2. Set Budget</h3>
                    <p className="text-slate-400 leading-relaxed">Select your budget and who you are traveling with (Solo, Family, etc.).</p>
                </div>

                {/* Step 3 */}
                <div className="relative z-10 text-center group">
                    <div className="w-24 h-24 mx-auto bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-2xl group-hover:border-cyan-500/50 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-500 delay-200">
                        ✨
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">3. Get Itinerary</h3>
                    <p className="text-slate-400 leading-relaxed">Our AI instantly generates a full day-by-day plan with hotels and places.</p>
                </div>
            </div>
        </div>
      </div>

      {/* 3. FEATURES GRID */}
      <div className="py-24 bg-slate-900/30 border-y border-slate-900 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature Card 1 */}
                <div className="p-8 md:p-12 rounded-[2rem] bg-slate-950 border border-slate-800 hover:border-slate-700 transition-colors">
                    <h3 className="text-3xl font-bold text-white mb-4">Why use AI? 🤖</h3>
                    <p className="text-slate-400 text-lg leading-relaxed mb-6">
                        Traditional travel planning takes hours of research. Our AI analyzes thousands of data points to create the perfect schedule for you in seconds.
                    </p>
                    <ul className="space-y-3 text-slate-300">
                        <li className="flex items-center gap-3">✅ <span className="text-slate-400">Personalized recommendations</span></li>
                        <li className="flex items-center gap-3">✅ <span className="text-slate-400">Budget optimization</span></li>
                        <li className="flex items-center gap-3">✅ <span className="text-slate-400">Time-saving efficiency</span></li>
                    </ul>
                </div>

                {/* Feature Card 2 */}
                <div className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-slate-800 flex flex-col justify-center items-center text-center">
                    <h3 className="text-3xl font-bold text-white mb-4">Ready to go? 🌏</h3>
                    <p className="text-slate-400 text-lg mb-8">
                        Join thousands of travelers who are exploring the world smarter.
                    </p>
                    <Link to="/createtrip">
                        <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-cyan-50 transition-colors">
                            Plan My Trip Now
                        </button>
                    </Link>
                </div>
             </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="py-10 bg-slate-950 text-center border-t border-slate-900">
        <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
            <span className="text-2xl">✈️</span>
            <span className="font-bold text-xl tracking-tight">TripPlanner.ai</span>
        </div>
        <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} AI Trip Planner. Built with ❤️ for travelers.
        </p>
      </footer>
      
    </div>
  );
};

export default homepage;