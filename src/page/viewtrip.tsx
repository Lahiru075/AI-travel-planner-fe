// import { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { useSnackbar } from 'notistack'
// import { getTripById } from "../service/trip";

// const ViewTrip = () => {
//     const { id } = useParams(); // URL එකෙන් ID එක ගන්නවා
//     const [trip, setTrip] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const { enqueueSnackbar } = useSnackbar();

//     useEffect(() => {
//         const fetchTrip = async () => {
//             try {

//                 if (!id) {
//                     enqueueSnackbar('Trip ID not found!', { variant: 'error' });
//                     return;
//                 }

//                 const res = await getTripById(id);
//                 setTrip(res.data);
//             } catch (error) {
//                 console.error("Error fetching trip details", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (id) fetchTrip();
//     }, [id]);

//     if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading Trip Details...</div>;

//     if (!trip) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Trip Not Found!</div>;

//     const tripDetails = trip.tripData || trip; 

//     return (
//         <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans relative">

//             {/* Background Glow */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

//             <div className="max-w-5xl mx-auto relative z-10 animate-fade-in-up">

//                 {/* Header Banner */}
//                 <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-900 to-slate-900 border border-slate-800 p-8 md:p-12 mb-12 text-center shadow-2xl">
//                     <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
//                     <h1 className="relative text-3xl md:text-5xl font-bold text-white mb-2">{trip.destination}</h1>
//                     <p className="relative text-cyan-300 font-medium tracking-wider uppercase">
//                         {trip.noOfDays} Days • {trip.budget} Budget • {trip.travelers} Trip
//                     </p>
//                 </div>

//                 {/* Hotels Section */}
//                 {tripDetails.hotels && (
//                     <div className="mb-16">
//                         <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
//                             <span className="bg-blue-600/20 p-2 rounded-lg text-blue-400">🏨</span> 
//                             Where to Stay
//                         </h3>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             {tripDetails.hotels.map((hotel: string, index: number) => (
//                                 <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all">
//                                     <h4 className="font-bold text-lg text-white mb-2">{hotel}</h4>
//                                     <p className="text-sm text-slate-400">Recommended Hotel</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* Itinerary Timeline */}
//                 <div className="relative">
//                     <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
//                         <span className="bg-cyan-600/20 p-2 rounded-lg text-cyan-400">📅</span> 
//                         Your Itinerary
//                     </h3>

//                     <div className="space-y-8">
//                         {tripDetails.itinerary?.map((dayPlan: any, index: number) => (
//                             <div key={index} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
//                                 <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
//                                     <span className="bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-lg text-sm">Day {dayPlan.day}</span>
//                                 </div>
//                                 <div className="space-y-6">
//                                     {dayPlan.plan.map((place: any, idx: number) => (
//                                         <div key={idx} className="relative pl-6 border-l-2 border-slate-700">
//                                             <span className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-900 border-2 border-cyan-500 rounded-full"></span>
//                                             <div className="flex justify-between items-start flex-wrap gap-2">
//                                                 <h5 className="font-bold text-white text-lg">{place.place}</h5>
//                                                 <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-slate-700">{place.time}</span>
//                                             </div>
//                                             <p className="text-slate-400 text-sm mt-1">{place.details}</p>
//                                             <p className="text-xs text-blue-400 font-semibold mt-2">
//                                                 🎟️ {place.ticketPrice}
//                                             </p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// };

// export default ViewTrip;


import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { getImage, getTripById } from "../service/trip";

const ViewTrip = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [headerImage, setHeaderImage] = useState(""); // 🖼️ පින්තූරය තියාගන්න state එක


    // 1. Trip Data ගන්න කොටස (පරණ එකමයි)
    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await getTripById(id!);
                setTrip(res.data);

                // Trip එක ආවට පස්සේ පින්තූරය හොයන්න function එක call කරනවා
                if (res.data.destination) {
                    GetPlacePhoto(res.data.destination);
                }

            } catch (error) {
                console.error("Error fetching trip details", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTrip();
    }, [id]);

    // 2. 🖼️ Pexels API එකෙන් Photo එක ගන්න Function එක (New!)
    const GetPlacePhoto = async (query: string) => {
        try {
            // දැන් අපි යවන්නේ අපේම Backend එකට
            const response = await getImage(query);
            if (response.imageUrl) {
                setHeaderImage(response.imageUrl);
            }
        } catch (error) {
            console.error("Image fetch error:", error);
        }
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    if (!trip) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Trip Not Found!</div>;

    const tripDetails = trip.tripData || trip;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans relative">

            <div className="max-w-5xl mx-auto relative z-10 animate-fade-in-up">

                {/* 👇 3. Header එක වෙනස් කළා Image එක පෙන්වන්න */}
                <div className="relative overflow-hidden rounded-3xl border border-slate-800 p-8 md:p-12 mb-12 text-center shadow-2xl h-[400px] flex flex-col justify-center items-center">

                    {/* Dynamic Image Background */}
                    <div
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000"
                        style={{
                            backgroundImage: `url(${headerImage || 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg'})`
                        }}
                    ></div>

                    {/* Dark Overlay (Text එක පේන්න) */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

                    {/* Text Content */}
                    <div className="relative z-10">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                            {trip.destination}
                        </h1>
                        <div className="inline-flex gap-4 flex-wrap justify-center">
                            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm">
                                📅 {trip.noOfDays} Days
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm">
                                💰 {trip.budget} Budget
                            </span>
                            <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white font-medium text-sm">
                                👥 {trip.travelers}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Hotels & Itinerary Sections (පරණ කෝඩ් එකමයි) */}
                {/* ... */}

                {/* (මේ ටික ඔයාගේ පරණ කෝඩ් එකේ තිබ්බ විදිහටම තියන්න) */}
                {tripDetails.hotels && (
                    <div className="mb-16">
                        {/* ... hotels logic ... */}
                        <h3 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                            <span className="bg-blue-600/20 p-2 rounded-lg text-blue-400">🏨</span>
                            Where to Stay
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {tripDetails.hotels.map((hotel: string, index: number) => (
                                <div key={index} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all">
                                    <h4 className="font-bold text-lg text-white mb-2">{hotel}</h4>
                                    <p className="text-sm text-slate-400">Recommended Hotel</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="relative">
                    {/* ... itinerary logic ... */}
                    <h3 className="text-2xl font-bold text-slate-100 mb-8 flex items-center gap-3">
                        <span className="bg-cyan-600/20 p-2 rounded-lg text-cyan-400">📅</span>
                        Your Itinerary
                    </h3>

                    <div className="space-y-8">
                        {tripDetails.itinerary?.map((dayPlan: any, index: number) => (
                            <div key={index} className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                                <div className="flex items-center gap-3 mb-4 border-b border-slate-800 pb-3">
                                    <span className="bg-cyan-500 text-slate-900 font-bold px-3 py-1 rounded-lg text-sm">Day {dayPlan.day}</span>
                                </div>
                                <div className="space-y-6">
                                    {dayPlan.plan.map((place: any, idx: number) => (
                                        <div key={idx} className="relative pl-6 border-l-2 border-slate-700">
                                            <span className="absolute -left-[9px] top-0 w-4 h-4 bg-slate-900 border-2 border-cyan-500 rounded-full"></span>
                                            <div className="flex justify-between items-start flex-wrap gap-2">
                                                <h5 className="font-bold text-white text-lg">{place.place}</h5>
                                                <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-cyan-400 border border-slate-700">{place.time}</span>
                                            </div>
                                            <p className="text-slate-400 text-sm mt-1">{place.details}</p>
                                            <p className="text-xs text-blue-400 font-semibold mt-2">
                                                🎟️ {place.ticketPrice}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewTrip;