import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import travelBg from "../assets/engin-akyurt-A5P0x7Zfqqw-unsplash.jpg";
import { register } from "../service/user";

const signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignup = async (e: FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const data = {
                name,
                email,
                password,
                confirmPassword
            }

            const res: any = await register(data);

            alert(`Registration successful! Email: ${res.data.email}`);

            navigate('/login');


        } catch (error: any) {
            console.log(error.response.data);
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
                    <div className="absolute inset-0  bg-opacity-20"></div>
                    <div className="relative z-10 flex flex-col justify-end p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">Explore the World 🌍</h1>
                        <p className="text-sm text-gray-200">
                            Join thousands of travelers creating their dream trips with AI.
                        </p>
                    </div>
                </div>

                {/* RIGHT SIDE - Signup Form */}
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                        <p className="text-gray-500 text-sm">Start your journey today</p>
                    </div>


                    <form className="space-y-4">

                        {/* Name */}
                        <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

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

                        {/* Confirm Password (New Field) */}
                        <div>
                            <label className="text-xs font-semibold text-gray-600 uppercase">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className="w-full p-2 border-b-2 border-gray-300 focus:border-blue-500 outline-none transition-colors bg-transparent"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        {/* Submit Button  */}
                        <button
                            onClick={handleSignup}
                            className="w-full py-3 rounded-lg text-white font-bold text-lg shadow-lg 
    transition-all duration-300 transform hover:scale-[1.02] mt-4
    bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-6 text-center text-xs text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 font-bold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default signup;