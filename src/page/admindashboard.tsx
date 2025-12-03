import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { getStats } from "../service/admin";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { activateUser, getAllUsers, suspendUser } from "../service/user";
import { deleteTrip, getAllTrips } from "../service/trip";


const AdminDashboard = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [activeTab, setActiveTab] = useState("overview");
    const [stats, setStats] = useState<any>(null);
    const [users, setUsers] = useState([]);
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const [tripPage, setTripPage] = useState(1);
    const [totalTripPage, setTotalTripPage] = useState(1);

    const [userPage, setUserPage] = useState(1);
    const [totalUserPage, setTotalUserPage] = useState(1);

    useEffect(() => {
        loadData();
    }, [activeTab, tripPage, userPage]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === "overview") {
                const res = await getStats();
                setStats(res.data);
            } else if (activeTab === "users") {
                const res = await getAllUsers(userPage, 5);
                setUsers(res.data);
                setTotalUserPage(res?.totalPages || 1);
            } else if (activeTab === "trips") {
                const res = await getAllTrips(tripPage, 5);
                setTrips(res.data);
                setTotalTripPage(res?.totalPages || 1);
            }
        } catch (error) {
            console.error("Failed to load data");
        } finally {
            setLoading(false);
        }
    };

    const handlePrevTripPage = () => { if (tripPage > 1) setTripPage(tripPage - 1); };
    const handleNextTripPage = () => { if (tripPage < totalTripPage) setTripPage(tripPage + 1); };

    const handlePrevUserPage = () => { if (userPage > 1) setUserPage(userPage - 1); };
    const handleNextUserPage = () => { if (userPage < totalUserPage) setUserPage(userPage + 1); };

    // User Suspend/Activate Logic
    const handleUserStatus = async (id: string, currentStatus: string) => {
        try {
            if (currentStatus === "ACTIVE") {
                await suspendUser(id);
                enqueueSnackbar("User Suspended", { variant: "warning" });
            } else {
                await activateUser(id);
                enqueueSnackbar("User Activated", { variant: "success" });
            }
            loadData();
        } catch (error) {
            enqueueSnackbar("Action failed", { variant: "error" });
        }
    };

    // Trip Delete Logic
    const handleDeleteTrip = async (id: string) => {
        if (!window.confirm("Delete this trip permanently?")) return;
        try {
            await deleteTrip(id);
            enqueueSnackbar("Trip deleted", { variant: "success" });
            setTrips(trips.filter((t: any) => t._id !== id));
        } catch (error) {
            enqueueSnackbar("Delete failed", { variant: "error" });
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex font-sans text-slate-200">

            {/* 🟢 SIDEBAR */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col fixed h-full z-20">
                <div className="flex items-center gap-3 mb-10">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">🛡️</div>
                    <h1 className="text-xl font-bold text-white tracking-tight">Admin Panel</h1>
                </div>

                <nav className="space-y-2 flex-1">
                    <SidebarItem label="Overview" icon="📊" active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
                    <SidebarItem label="Manage Users" icon="👥" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
                    <SidebarItem label="All Trips" icon="✈️" active={activeTab === "trips"} onClick={() => setActiveTab("trips")} />
                </nav>

                <button
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login");
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
                >
                    🚪 Logout
                </button>
            </aside>

            {/* 🟢 MAIN CONTENT */}
            <main className="flex-1 ml-64 p-8 md:p-12 bg-slate-950 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-white mb-8 capitalize">{activeTab}</h2>

                    {loading ? (
                        <div className="text-slate-500 animate-pulse">Loading real data...</div>
                    ) : (
                        <>
                            {activeTab === "overview" && stats && (
                                <div className="space-y-8 animate-fade-in-up">

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                                        {/* Total Users */}
                                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 font-medium mb-1">Total Users</p>
                                                <h3 className="text-4xl font-bold text-white">{stats.totalUsers}</h3>
                                            </div>
                                            <div className="p-4 bg-blue-500/20 rounded-2xl text-2xl text-blue-400">👥</div>
                                        </div>

                                        {/* Total Trips */}
                                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 font-medium mb-1">Trips Generated</p>
                                                <h3 className="text-4xl font-bold text-white">{stats.totalTrips}</h3>
                                            </div>
                                            <div className="p-4 bg-emerald-500/20 rounded-2xl text-2xl text-emerald-400">✈️</div>
                                        </div>

                                        {/* Suspended Users */}
                                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex items-center justify-between">
                                            <div>
                                                <p className="text-slate-400 font-medium mb-1">Suspended Users</p>
                                                <h3 className="text-4xl font-bold text-white">{stats.suspendUsers}</h3>
                                            </div>
                                            <div className="p-4 bg-red-500/20 rounded-2xl text-2xl text-red-400">⛔</div>
                                        </div>
                                    </div>

                                    {/* 2. 👇 GRAPH SECTION  */}
                                    <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl">
                                        <h3 className="text-lg font-bold text-white mb-6">
                                            📈 This Month's Activity (Daily Growth)
                                        </h3>

                                        <div className="h-72 w-full">
                                            <ResponsiveContainer width="100%" height="100%">

                                                <AreaChart data={stats.chartData}>
                                                    <defs>
                                                        <linearGradient id="colorTrips" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                                    <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                                                    <YAxis stroke="#64748b" axisLine={false} tickLine={false} allowDecimals={false} />
                                                    <Tooltip
                                                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                                        itemStyle={{ color: '#fff' }}
                                                        cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
                                                    />
                                                    <Area
                                                        type="monotone"
                                                        dataKey="trips"
                                                        stroke="#3b82f6"
                                                        strokeWidth={3}
                                                        fillOpacity={1}
                                                        fill="url(#colorTrips)"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* --- TAB 2: USERS TABLE (REAL USERS) --- */}
                            {activeTab === "users" && (
                                <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
                                    <table className="w-full text-left border-collapse">
                                        <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                                            <tr>
                                                <th className="p-6 font-medium">User</th>
                                                <th className="p-6 font-medium">Role</th>
                                                <th className="p-6 font-medium">Status</th>
                                                <th className="p-6 font-medium text-right">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800">
                                            {users.map((u: any) => (
                                                <tr key={u._id} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="p-6">
                                                        <p className="font-bold text-white">{u.name}</p>
                                                        <p className="text-sm text-slate-500">{u.email}</p>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${u.role === 'ADMIN' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20'}`}>
                                                            {u.role}
                                                        </span>
                                                    </td>
                                                    <td className="p-6">
                                                        <span className={`flex items-center gap-2 text-sm font-medium ${u.status === 'ACTIVE' ? 'text-emerald-400' : 'text-red-400'}`}>
                                                            <span className={`w-2 h-2 rounded-full ${u.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                                                            {u.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-6 text-right">
                                                        {u.role !== 'ADMIN' && (
                                                            <button
                                                                onClick={() => handleUserStatus(u._id, u.status)}
                                                                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${u.status === 'ACTIVE'
                                                                    ? 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white'
                                                                    : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white'
                                                                    }`}
                                                            >
                                                                {u.status === 'ACTIVE' ? "Suspend" : "Activate"}
                                                            </button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {totalUserPage > 1 && (
                                        <div className="flex justify-center items-center gap-6 mt-12 pb-8">
                                            <button
                                                onClick={handlePrevUserPage}
                                                disabled={totalUserPage === 1}
                                                className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                                Previous
                                            </button>

                                            <span className="text-slate-400 font-medium">
                                                Page <span className="text-white font-bold">{userPage}</span> of <span className="text-white font-bold">{totalUserPage}</span>
                                            </span>

                                            <button
                                                onClick={handleNextUserPage}
                                                disabled={userPage === totalTripPage}
                                                className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                Next
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* --- TAB 3: TRIPS TABLE (REAL TRIPS) --- */}
                            {activeTab === "trips" && (
                                <div className="grid grid-cols-1 gap-4">
                                    {trips.map((t: any) => (
                                        <div key={t._id} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center text-2xl">✈️</div>
                                                <div>
                                                    <h3 className="font-bold text-white text-lg">{t.destination}</h3>
                                                    <p className="text-sm text-slate-400">
                                                        Created by: <span className="text-cyan-400">{t.user ? t.user.email : "Unknown"}</span>
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleDeleteTrip(t._id)}
                                                className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}

                                    {totalTripPage > 1 && (
                                        <div className="flex justify-center items-center gap-6 mt-12 pb-8">
                                            <button
                                                onClick={handlePrevTripPage}
                                                disabled={tripPage === 1}
                                                className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                                Previous
                                            </button>

                                            <span className="text-slate-400 font-medium">
                                                Page <span className="text-white font-bold">{tripPage}</span> of <span className="text-white font-bold">{totalTripPage}</span>
                                            </span>

                                            <button
                                                onClick={handleNextTripPage}
                                                disabled={tripPage === totalTripPage}
                                                className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                            >
                                                Next
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

// Sidebar Helper Component
const SidebarItem = ({ label, icon, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${active ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
    >
        <span>{icon}</span> {label}
    </button>
);

export default AdminDashboard;