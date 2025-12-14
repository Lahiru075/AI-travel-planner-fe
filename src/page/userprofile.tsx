import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { useSnackbar } from "notistack";
import { updateProfileRequest } from "../service/user";

const UserProfile = () => {
    const { user, setUser } = useAuth();
    const { enqueueSnackbar } = useSnackbar();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setImagePreview(user.profilePicture || null);
        }
    }, [user]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password && password !== confirmPassword) {
            enqueueSnackbar("Passwords do not match!", { variant: "error" });
            return;
        }

        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            if (password) formData.append("password", password);
            if (imageFile) formData.append("image", imageFile);

            const res: any = await updateProfileRequest(formData);
            setUser(res.data);
            enqueueSnackbar("Profile updated successfully!", { variant: "success" });
            setPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            console.error(error);
            enqueueSnackbar(error.response?.data?.message || "Update Failed", { variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-6 md:p-12 font-sans flex justify-center items-center relative overflow-hidden">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-8">
                
                {/* 🟢 LEFT SIDE: Profile Summary Card */}
                <div className="w-full md:w-1/3 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center text-center h-fit sticky top-20">
                    
                    <div 
                        className="relative w-32 h-32 rounded-full border-4 border-slate-700 overflow-hidden cursor-pointer group hover:border-purple-500 transition-all shadow-xl mb-4"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-slate-800 flex items-center justify-center text-5xl text-slate-500 font-bold">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                    
                    <h2 className="text-2xl font-bold text-white mb-1">{user?.name}</h2>
                    <p className="text-slate-400 text-sm mb-4">{user?.email}</p>
                    <div className="px-4 py-1.5 bg-slate-800 rounded-full text-xs font-semibold text-purple-400 border border-slate-700">
                        {user?.role} Account
                    </div>
                </div>

                {/* 🟢 RIGHT SIDE: Edit Form */}
                <div className="w-full md:w-2/3 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Account Settings</h3>
                    
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase">Full Name</label>
                                <input 
                                    type="text" 
                                    className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-slate-400 uppercase">Email Address</label>
                                <input 
                                    type="email" 
                                    className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-slate-800">
                            <p className="text-sm font-medium text-slate-300 mb-4">Security</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase">New Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-slate-400 uppercase">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        placeholder="••••••••"
                                        className="w-full p-3 bg-slate-950/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 flex justify-end">
                            <button 
                                disabled={loading}
                                onClick={handleUpdate}
                                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-purple-500/30 hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;