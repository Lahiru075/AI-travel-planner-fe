import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useSnackbar } from 'notistack'
import { deleteTrip, getMyTrips } from "../service/trip";

const MyTrips = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    const { enqueueSnackbar } = useSnackbar();

    // Trips Backend එකෙන් ගෙන්වා ගැනීම
    useEffect(() => {
        const fetchTrips = async () => {
            if (!user) return;
            try {
                // Backend Route එක හරියට බලන්න
                const res = await getMyTrips();
                setTrips(res.data);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [user]);

    // Trip එකක් Delete කිරීම (Optional)
    const handleDelete = async (id: string) => {
        if(!window.confirm("Are you sure you want to delete this trip?")) return;
        
        try {

            if (!id || !user) {
                enqueueSnackbar('Trip not found or user not logged in!', { variant: 'error' });
            }

            await deleteTrip(id);

            enqueueSnackbar('Trip deleted successfully!', { variant: 'success' });
            
            setTrips(trips.filter((t: any) => t._id !== id));
        } catch (error) {
            enqueueSnackbar('Failed to delete trip!', { variant: 'error' });
            
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 p-8 md:p-12 font-sans relative">
            
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            My Travel History 🌍
                        </h1>
                        <p className="text-slate-400 mt-2">Manage your saved itineraries and memories.</p>
                    </div>
                    <Link to="/createtrip">
                        <button className="px-6 py-3 bg-white text-slate-900 font-bold rounded-full shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
                            <span>+</span> Create New Trip
                        </button>
                    </Link>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="h-64 bg-slate-900/50 rounded-3xl animate-pulse border border-slate-800"></div>
                        ))}
                    </div>
                ) : trips.length === 0 ? (
                    // Empty State
                    <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-sm">
                        <div className="text-6xl mb-4 opacity-50">🛸</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No trips found!</h3>
                        <p className="text-slate-400 mb-6">You haven't generated any travel plans yet.</p>
                        <Link to="/createtrip" className="text-cyan-400 font-bold hover:underline">Start Planning Now →</Link>
                    </div>
                ) : (
                    // Trips Grid
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {trips.map((trip: any, index) => (
                            <div 
                                key={trip._id} 
                                className="group bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col"
                            >
                                {/* Card Top - Random Gradient Image */}
                                <div className={`h-40 w-full bg-gradient-to-br ${getGradient(index)} relative p-6 flex flex-col justify-end`}>
                                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                                        {trip.noOfDays} Days
                                    </div>
                                    <h3 className="text-2xl font-bold text-white drop-shadow-md truncate">{trip.destination}</h3>
                                </div>

                                {/* Card Body */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex gap-2">
                                            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                                                {trip.budget}
                                            </span>
                                            <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700">
                                                {trip.travelers}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-auto flex gap-3 pt-4 border-t border-slate-800">
                                        <button className="flex-1 py-2.5 bg-blue-600/10 text-blue-400 rounded-xl font-bold hover:bg-blue-600 hover:text-white transition-colors">
                                            View Plan
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(trip._id)}
                                            className="p-2.5 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper function to give different colors to cards
const getGradient = (index: number) => {
    const gradients = [
        "from-blue-500 to-purple-600",
        "from-emerald-500 to-teal-600",
        "from-orange-500 to-red-600",
        "from-pink-500 to-rose-600",
        "from-cyan-500 to-blue-600"
    ];
    return gradients[index % gradients.length];
};

export default MyTrips;