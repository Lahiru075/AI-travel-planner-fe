import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { generateTrip, saveTrip } from "../service/trip";
import { useSnackbar } from 'notistack'
import { useAuth } from "../context/authContext";

const CreateTrip = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tripData, setTripData] = useState<any>(null);

    const [destination, setDestination] = useState("");
    const [noOfDays, setNoOfDays] = useState("");
    const [budget, setBudget] = useState("Moderate");
    const [travelers, setTravelers] = useState("Couple");
    const [saving, setSaving] = useState(false);
    const { user } = useAuth();

    const { enqueueSnackbar } = useSnackbar();

    const handleGenerateTrip = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTripData(null);

        if (!destination || !noOfDays || !budget || !travelers) {
            enqueueSnackbar('Please fill in all fields!', { variant: 'error' });
            setLoading(false);
            return;
        }

        const noOfDayInt = parseInt(noOfDays);

        if (noOfDayInt < 1 || noOfDayInt > 30) {
            enqueueSnackbar('Number of days should be between 1 and 30!', { variant: 'error' });
            setLoading(false);
            return;
        }

        try {
            const data = { destination, noOfDays, budget, travelers };
            const res: any = await generateTrip(data);
            setTripData(res);
            enqueueSnackbar('Trip generated successfully!', { variant: 'success' });
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to generate trip. Please try again!', { variant: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveTrip = async () => {
        if (!user || !tripData) {
            enqueueSnackbar('User not logged in or trip data not available!', { variant: 'error' });
            return;
        }

        setSaving(true);

        try {
            const data = {
                userId: user._id,
                destination: destination,
                noOfDays: noOfDays,
                budget: budget,
                travelers: travelers,
                tripData: tripData
            };
            
            await saveTrip(data);
            enqueueSnackbar('Trip saved successfully!', { variant: 'success' });

            navigate('/userdashboard');

        } catch (error) {
            enqueueSnackbar('Failed to save trip. Please try again!', { variant: 'error' });
        } finally {
            setSaving(false);
        }

    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans relative overflow-hidden">

            {/* Background Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"></div>

            {/* 1. INPUT FORM SECTION */}
            <div className="relative max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-12 mb-16">

                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
                        Plan Your Dream Trip
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Let our AI architect your perfect journey in seconds.
                    </p>
                </div>

                <form onSubmit={handleGenerateTrip} className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Destination */}
                    <div className="col-span-2">
                        <label className="block text-slate-300 font-semibold mb-2 ml-1">Where do you want to go?</label>
                        <input
                            type="text"
                            placeholder="e.g. Colombo, Sri Lanka"
                            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>

                    {/* Days */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2 ml-1">Duration (Days)</label>
                        <input
                            type="number"
                            placeholder="Ex. 5"
                            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none text-white placeholder-slate-500 transition-all"
                            value={noOfDays}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            required
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-slate-300 font-semibold mb-2 ml-1">Your Budget</label>
                        <select
                            className="w-full p-4 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-cyan-500 outline-none text-white cursor-pointer appearance-none"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        >
                            <option value="Cheap" className="bg-slate-800">💸 Cheap</option>
                            <option value="Moderate" className="bg-slate-800">⚖️ Moderate</option>
                            <option value="Luxury" className="bg-slate-800">💎 Luxury</option>
                        </select>
                    </div>

                    {/* Travelers */}
                    <div className="col-span-2 md:col-span-2">
                        <label className="block text-slate-300 font-semibold mb-2 ml-1">Traveling With</label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Solo', 'Couple', 'Family', 'Friends'].map((item) => (
                                <div
                                    key={item}
                                    onClick={() => setTravelers(item)}
                                    className={`p-3 rounded-xl border cursor-pointer text-center transition-all ${travelers === item
                                        ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                                        : "bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800"
                                        }`}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-6">
                        <button
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 rounded-xl font-bold text-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all transform hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating Magic...
                                </>
                            ) : "Generate Trip 🚀"}
                        </button>
                    </div>
                </form>
            </div>

            {/* 2. DISPLAY RESULT SECTION */}
            {tripData && (
                <div className="max-w-5xl mx-auto animate-fade-in-up">

                    {/* Header Banner */}
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 to-slate-900 border border-slate-800 p-8 md:p-10 mb-12 text-center shadow-2xl group">

                        {/* Background Pattern */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                        {/* Text Content */}
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">{tripData.tripName}</h2>
                            <p className="text-cyan-300 font-medium tracking-wider uppercase text-sm md:text-base">Your Personal AI Itinerary</p>
                        </div>

                        {/* SAVE BUTTON POSITIONING */}
                        {/* SAVE BUTTON POSITIONING */}
                        {/* දැන් මේක කෙලින්ම Text එකට යටින්, මැදට (Center) එනවා */}
                        <div className="mt-8 flex justify-center relative z-20">
                            <button
                                onClick={handleSaveTrip}
                                disabled={saving}
                                className="
                                    group/btn flex items-center gap-2 
                                    px-8 py-3 
                                    bg-white text-slate-900 
                                    font-bold rounded-full 
                                    shadow-[0_0_20px_rgba(255,255,255,0.3)] 
                                    hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] 
                                    hover:scale-105 transition-all duration-300
                                    disabled:opacity-70 disabled:cursor-not-allowed
                                "
                            >
                                {saving ? (
                                    // Saving Spinner
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-slate-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    // Normal State
                                    <>
                                        <span className="text-lg">Save Trip</span>
                                        <span className="bg-slate-200 text-slate-900 p-1.5 rounded-full group-hover/btn:bg-slate-900 group-hover/btn:text-white transition-colors">
                                            💾
                                        </span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>


                    {/* Hotels Section */}
                    {tripData.hotels && (
                        <div className="mb-16">
                            <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                                <span className="bg-blue-600/20 p-2 rounded-lg text-blue-400">🏨</span>
                                Recommended Stays
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {tripData.hotels.map((hotel: string, index: number) => (
                                    <div key={index} className="group bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 hover:shadow-lg transition-all hover:-translate-y-1">
                                        <div className="h-40 bg-slate-800 rounded-xl mb-4 overflow-hidden relative">
                                            {/* Placeholder for Hotel Image */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                                            <div className="absolute bottom-2 left-3 text-4xl">🛏️</div>
                                        </div>
                                        <h4 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors">{hotel}</h4>
                                        <p className="text-sm text-slate-400 mt-2">Perfect match for your budget.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Daily Itinerary (Timeline Style) */}
                    <div className="relative">
                        <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
                            <span className="bg-cyan-600/20 p-2 rounded-lg text-cyan-400">📅</span>
                            Your Journey
                        </h3>

                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-16 bottom-0 w-1 bg-slate-800 hidden md:block"></div>

                        <div className="space-y-12">
                            {tripData.itinerary.map((dayPlan: any, index: number) => (
                                <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                    {/* Empty side for layout balance */}
                                    <div className="hidden md:block flex-1"></div>

                                    {/* Timeline Dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-900 border-4 border-cyan-500 rounded-full z-10 hidden md:block shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>

                                    {/* Content Card */}
                                    <div className="flex-1 bg-slate-900/80 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl shadow-xl hover:border-cyan-500/30 transition-all">
                                        <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                                            <span className="bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-lg text-sm">Day {dayPlan.day}</span>
                                            <h4 className="font-bold text-slate-200">Exploring & Adventure</h4>
                                        </div>

                                        <div className="space-y-6">
                                            {dayPlan.plan.map((place: any, idx: number) => (
                                                <div key={idx} className="relative pl-6 border-l-2 border-slate-800 hover:border-blue-500 transition-colors">
                                                    <span className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-800 border-2 border-blue-500 rounded-full"></span>
                                                    <div className="flex justify-between items-start">
                                                        <h5 className="font-bold text-white text-lg">{place.place}</h5>
                                                        <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-slate-700">{place.time}</span>
                                                    </div>
                                                    <p className="text-slate-400 text-sm mt-1 leading-relaxed">{place.details}</p>
                                                    <p className="text-xs text-blue-400 font-semibold mt-2 flex items-center gap-1">
                                                        🎟️ {place.ticketPrice}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateTrip;