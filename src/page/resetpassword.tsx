import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { resetPasswordRequest } from "../service/user";

const ResetPassword = () => {
    const { token } = useParams(); 
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (token) {
                await resetPasswordRequest(token, password);
                enqueueSnackbar("Password Reset Successfully!", { variant: "success" });
                navigate("/login");
            }
        } catch (error) {
            enqueueSnackbar("Failed to reset password", { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="bg-slate-900/80 p-8 rounded-3xl border border-slate-800 w-full max-w-md">
                <h2 className="text-2xl font-bold text-white mb-4">New Password</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="password" 
                        placeholder="Enter new password"
                        className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white outline-none focus:border-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition">
                        Update Password
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;