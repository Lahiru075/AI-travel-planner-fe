import { useState } from "react";
import { useSnackbar } from "notistack";
import { forgotPasswordRequest } from "../service/user";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false); 
    const { enqueueSnackbar } = useSnackbar();

    const handleSendEmail = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            await forgotPasswordRequest(email);
            enqueueSnackbar("Check your email for the reset link!", { variant: "success" });
        } catch (error) {
            enqueueSnackbar("Failed to send email", { variant: "error" });
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
                <p className="text-slate-400 mb-6">Enter your email to receive a reset link.</p>
                
                <form className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Enter email"
                        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    
                    <button 
                        disabled={loading} 
                        onClick={handleSendEmail}
                        className={`w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition flex justify-center items-center gap-2 
                        ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {loading ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : (
                            "Send Link"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;