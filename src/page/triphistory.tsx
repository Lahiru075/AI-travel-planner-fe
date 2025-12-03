import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useSnackbar } from 'notistack';
import { deleteTrip, getMyTrips } from "../service/trip";
import TripCardItem from "../components/tripcarditem"; 

const MyTrips = () => {
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    // Pagination States
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    const { enqueueSnackbar } = useSnackbar();

    //  Fetch Trips Logic
    useEffect(() => {
        const fetchTrips = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const res = await getMyTrips(page, 6); 
                setTrips(res.data);
                setTotalPage(res?.totalPages || 1);
            } catch (error) {
                console.error("Error fetching trips", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [user, page]);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return;

        try {
            await deleteTrip(id);
            enqueueSnackbar('Trip deleted successfully!', { variant: 'success' });
            
            setTrips(trips.filter((t: any) => t._id !== id));
        } catch (error) {
            enqueueSnackbar('Failed to delete trip!', { variant: 'error' });
        }
    };

    const handlePrevPage = () => { if (page > 1) setPage(page - 1); };
    const handleNextPage = () => { if (page < totalPage) setPage(page + 1); };

    return (
        <div className="min-h-screen bg-slate-950 p-8 md:p-12 font-sans relative">

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                            My Travel History
                        </h1>
                        <p className="text-slate-400 mt-2">Manage your saved itineraries and memories.</p>
                    </div>
                    <Link to="/createtrip">
                        <button className="mt-6 md:mt-0 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2">
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
                    <>
                        {/* ✅ Trips Grid with Image Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {trips.map((trip: any) => (
                                <TripCardItem 
                                    key={trip._id} 
                                    trip={trip} 
                                    handleDelete={handleDelete} 
                                />
                            ))}
                        </div>

                        {/* ✅ Pagination UI */}
                        {totalPage > 1 && (
                            <div className="flex justify-center items-center gap-6 mt-12 pb-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                    Previous
                                </button>

                                <span className="text-slate-400 font-medium">
                                    Page <span className="text-white font-bold">{page}</span> of <span className="text-white font-bold">{totalPage}</span>
                                </span>

                                <button
                                    onClick={handleNextPage}
                                    disabled={page === totalPage}
                                    className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-cyan-500/10 hover:border-cyan-500 hover:text-cyan-400 transition-all
                                    disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    Next
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default MyTrips;