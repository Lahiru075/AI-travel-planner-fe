import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import travelBg from "../assets/pexels-chiecharon-913215.jpg";
import { getMyDetails, googleAuth, signin } from "../service/user";
import { useAuth } from "../context/authContext";
import { useSnackbar } from 'notistack'
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const navigate = useNavigate();
    const { user, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    

    // const handleLogin = async (e: FormEvent) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     if (!email || !password) {
    //         enqueueSnackbar('Please fill in all fields!', { variant: 'error' });
    //         setLoading(false);
    //         return;
    //     }

    //     try {
    //         const res: any = await signin({ email, password });

    //         await localStorage.setItem("accessToken", res.data.accessToken);
    //         await localStorage.setItem("refreshToken", res.data.refreshToken);

    //         const details = await getMyDetails();

    //         if (details.data.status == "SUSPEND") {
    //             enqueueSnackbar('Please activate your account first!', { variant: 'error' });
    //             setLoading(false);
    //             return;
    //         }

    //         setUser(details.data);

    //         enqueueSnackbar('User logged in successfully!', { variant: 'success' });

    //         if (res.data.role == "ADMIN") {
    //             navigate("/admindashboard");
    //         } else {
    //             navigate("/userdashboard");
    //         }

    //     } catch (error: any) {
    //         console.log(error);
    //         enqueueSnackbar(error.response?.data?.message || "Login Failed", { variant: 'error' });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!email || !password) {
            enqueueSnackbar('Please fill in all fields!', { variant: 'error' });
            setLoading(false);
            return;
        }

        try {
            const res: any = await signin({ email, password });
            await processLogin(res);
        } catch (error: any) {
            console.log(error);
            console.log(user);
            enqueueSnackbar(error.response?.data?.message || "Login Failed", { variant: 'error' });
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (credentialResponse: any) => {
        setLoading(true);
        try {
            const token = credentialResponse.credential; // google eken dunna id eka gannawa..
            const res: any = await googleAuth(token); // token ekath ekkama backend ekata yawanawa..
            await processLogin(res);
        } catch (error: any) {
            console.error("Google Login Error", error);
            enqueueSnackbar(error.response?.data?.message || "Google Login Failed", { variant: 'error' });
            setLoading(false);
        }
    };

    const processLogin = async (res: any) => {
        await localStorage.setItem("accessToken", res.data.accessToken);
        await localStorage.setItem("refreshToken", res.data.refreshToken);

        const details = await getMyDetails();

        if (details.data.status == "SUSPEND") {
            enqueueSnackbar('Your account is suspended!', { variant: 'error' });
            setLoading(false);
            return;
        }

        setUser(details.data);
        enqueueSnackbar('Logged in successfully!', { variant: 'success' });

        if (res.data.role == "ADMIN") {
            navigate("/admindashboard");
        } else {
            navigate("/userdashboard");
        }
        setLoading(false);
    };


    return (
        // 1. FULL PAGE BACKGROUND SECTION
        <div
            className="min-h-screen w-full flex items-center justify-center relative bg-cover bg-center bg-no-repeat font-sans"
            style={{ backgroundImage: `url(${travelBg})` }}
        >
            {/* 2. DARK OVERLAY (To make text readable) */}
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px]"></div>

            {/* 3. GLASS FORM CARD */}
            <div className="relative z-10 w-full max-w-lg p-8 m-3">

                {/* Glass Container */}
                <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8 md:p-10">

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-block p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-white/10 mb-4 shadow-lg shadow-blue-500/10">
                            <span className="text-3xl">✈️</span>
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Welcome Back</h2>
                        <p className="text-slate-300 text-sm">Continue your journey with AI Planner</p>
                    </div>

                    <form className="space-y-6">

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    className="w-full p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300 group-hover:border-slate-600"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-cyan-300 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <input
                                    type="password"
                                    name="password"
                                    className="w-full p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl focus:bg-slate-900/70 focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none text-white placeholder-slate-500 transition-all duration-300 group-hover:border-slate-600"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-cyan-400 hover:underline">Forgot Password?</Link>
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            disabled={loading}
                            className="w-full py-3 rounded-xl text-white font-bold text-lg shadow-lg shadow-blue-900/20
                            transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-6
                            bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400
                            border border-white/10
                            disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                        >
                            {loading ? (
                                <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : "Sign In"}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-slate-700 flex-1"></div>
                        <span className="text-slate-400 text-xs font-medium uppercase">Or continue with</span>
                        <div className="h-px bg-slate-700 flex-1"></div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleLogin
                            onSuccess={handleGoogleLogin}
                            onError={() => enqueueSnackbar("Google Login Failed", { variant: 'error' })}
                            theme="filled_black"
                            shape="pill"
                            size="large"
                            width="100%"
                            text="signin_with"
                        />
                    </div>

                    {/* Footer */}
                    <div className="mt-8 pt-6 border-t border-white/10 text-center">
                        <p className="text-slate-400 text-sm">
                            New here?{" "}
                            <Link to="/signup" className="text-cyan-400 font-bold hover:text-cyan-300 hover:underline transition-all">
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;