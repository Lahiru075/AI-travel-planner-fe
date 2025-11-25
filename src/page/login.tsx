import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import travelBg from "../assets/tejas-kotha-ZsaQMa-cQtw-unsplash.jpg";
import { signin } from "../service/user"; 

const login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {

            const res: any = await signin({ email, password });

            await localStorage.setItem("accessToken", res.data.accessToken);
            await localStorage.setItem("refreshToken", res.data.refreshToken);

            // add data to context

            alert("Login Successful! Welcome back 👋");

            if (res.data.role == "ADMIN") {
                navigate("/admindashboard");
            } else {
                navigate("/userdashboard");
            }

        } catch (error: any) {
            console.log(error);
            alert(error.response?.data?.message || "Login Failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">

            <div className="flex bg-white rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full max-h-[600px]">

                {/* LEFT SIDE - Travel Image */}
                <div
                    className="hidden md:flex w-1/2 bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${travelBg})` }}
                >
                    <div className="absolute inset-0  bg-opacity-30"></div>
                    <div className="relative z-10 flex flex-col justify-end p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Welcome Back! ✈️</h1>
                        <p className="text-sm text-gray-200">
                            Ready to plan your next adventure? Log in to access your saved trips.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Login Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Login</h2>
                        <p className="text-gray-500 text-sm">Please enter your details</p>
                    </div>

                    <form className="space-y-6">

                        {/* Email */}
                        <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* Login Button */}
                        <button
                            onClick={handleLogin}
                            className="w-full py-3 rounded-lg text-white font-bold text-lg shadow-lg 
                            transition-all duration-300 transform hover:scale-[1.02] mt-4
                            bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-bold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default login;