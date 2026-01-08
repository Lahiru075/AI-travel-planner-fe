import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import travelBg from "../assets/davide-ragusa-QbDkhVZ80To-unsplash.jpg";
import { register } from "../service/user";
import { useSnackbar } from 'notistack'

const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!name || !email || !password || !confirmPassword) {
            enqueueSnackbar('Please fill in all fields!', { variant: 'error' });
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            enqueueSnackbar('Passwords do not match.!', { variant: 'error' });
            setLoading(false);
            return;
        }

        try {
            const data = { name, email, password, confirmPassword };
            const res: any = await register(data);
            console.log(res)

            enqueueSnackbar('User registered successfully', { variant: 'success' });
            navigate('/login');

        } catch (error: any) {
            console.log(error.response?.data);
            enqueueSnackbar('Registeration Failed. Please try again!', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        // 1. FULL PAGE BACKGROUND
        <div 
            className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat font-sans"
            style={{ backgroundImage: `url(${travelBg})` }}
        >
            {/* 2. DARK OVERLAY */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]"></div>

            {/* 3. GLASS FORM CARD (Wider width: max-w-lg) */}
            <div className="relative z-10 w-full max-w-lg p-6 m-4">
                
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6 md:p-10">
                    
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 mb-4 shadow-lg shadow-blue-500/10">
                            <span className="text-3xl">🌍</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
                        <p className="text-slate-300 text-sm">Join us to plan your dream trip with AI</p>
                    </div>

                    <form className="space-y-4">

                        {/* Name Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Full Name</label>
                            <input
                                type="text"
                                className="w-full p-3 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Email</label>
                            <input
                                type="email"
                                className="w-full p-3 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Password</label>
                            <input
                                type="password"
                                className="w-full p-3 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Confirm Password</label>
                            <input
                                type="password"
                                className="w-full p-3 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Signup Button */}
                        <button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-900/20
                            transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6
                            bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400
                            border border-white/10
                            disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : "Create Account"}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                        <p className="text-slate-400 text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all">
                                Login here
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Signup;