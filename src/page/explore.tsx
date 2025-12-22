import { useEffect, useState } from "react";
import { getPublicTrips, cloneTrip } from "../service/trip";
import PublicTripCard from "../components/publictripcard";
import { useSnackbar } from "notistack";
import Swal from 'sweetalert2';

const Explore = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);

    useEffect(() => {
        // User type krala iwara wenakan 0.5 second delay ekak thiynawa
        const delayDebounceFn = setTimeout(() => {
            loadTrips();
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, page]);

    const loadTrips = async () => {
        setLoading(true);
        try {

            const res = await getPublicTrips(page, 6, searchQuery);
            setTrips(res.data.data);
            setTotalPage(res.data.totalPages || 1);

        } catch (error) {
            console.error("Error loading trips:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleClone = async (id: string) => {
        const result = await Swal.fire({
            title: 'Clone this Trip?',
            text: "This trip will be copied to your personal history.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#9333ea', // Purple Color
            cancelButtonColor: '#334155', // Slate Color
            confirmButtonText: 'Yes, Copy it!',
            background: '#0f172a', // Dark Background
            color: '#fff'
        });

        if (result.isConfirmed) {
            try {
                await cloneTrip(id);
                enqueueSnackbar("Trip cloned successfully! Check My Trips.", { variant: 'success' });
            } catch (error) {
                enqueueSnackbar("Failed to clone trip.", { variant: 'error' });
            }
        }
    };

    const handlePrevPage = () => { if (page > 1) setPage(page - 1); };
    const handleNextPage = () => { if (page < totalPage) setPage(page + 1); };

    // Search Handler (Search karankota first page eka yanawa)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-950 p-8 md:p-12 font-sans relative">

            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto relative z-10">

                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                        Explore Community Trips 🌍
                    </h1>
                    <p className="text-slate-400 mt-2">Discover and copy amazing itineraries created by other travelers.</p>
                </div>

                {/* SEARCH BAR */}
                <div className="max-w-md mx-auto mb-12 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search destination (e.g. Nuwara Eliya, Haputale)..."
                        className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-lg backdrop-blur-sm"
                        value={searchQuery}
                        onChange={handleSearchChange} // 👇 අලුත් Handler එක
                    />
                </div>

                {/* CONTENT AREA */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-slate-400">Loading community trips...</p>
                    </div>
                ) : trips.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-sm animate-fade-in-up">
                        <div className="text-6xl mb-4 opacity-50">🔍</div>
                        <h3 className="text-2xl font-bold text-white mb-2">No trips found</h3>
                        <p className="text-slate-400">
                            {searchQuery
                                ? `We couldn't find any trips matching "${searchQuery}"`
                                : "No community trips available yet. Be the first to share!"}
                        </p>
                    </div>
                ) : (
                    <>
                        {/* TRIPS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {trips.map((trip: any) => (
                                <PublicTripCard
                                    key={trip._id}
                                    trip={trip}
                                    handleClone={handleClone}
                                />
                            ))}
                        </div>

                        {/* 👇 PAGINATION UI */}
                        {totalPage > 1 && (
                            <div className="flex justify-center items-center gap-6 pb-8">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={page === 1}
                                    className="px-6 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium 
                                    hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-400 transition-all
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
                                    hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-400 transition-all
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

export default Explore;