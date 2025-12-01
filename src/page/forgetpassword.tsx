import { useState } from "react";
import { useSnackbar } from "notistack";
import { forgotPasswordRequest } from "../service/user";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await forgotPasswordRequest(email);
            enqueueSnackbar("Check your email for the reset link!", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to send email", { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
                <p className="text-slate-400 mb-6">Enter your email to receive a reset link.</p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition">
                        Send Link
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;