import { useEffect, useState } from "react";
import { getImage } from "../service/trip";

interface PublicTripProps {
    trip: any;
    handleClone: (id: string) => void;
}

const PublicTripCard = ({ trip, handleClone }: PublicTripProps) => {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            if (trip?.destination) {
                try {
                    const response = await getImage(trip.destination);
                    
                    if (response.imageUrl) setPhotoUrl(response.imageUrl);

                } catch (error) { console.log("Image error"); }
            }
        };
        fetchImage();
    }, [trip]);

    return (
        <div className="group bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-purple-500/50 hover:shadow-2xl transition-all duration-300 flex flex-col h-full">

            {/* Card Top */}
            <div className="h-48 w-full relative p-6 flex flex-col justify-end overflow-hidden group-hover:scale-105 transition-transform duration-500">
                {photoUrl ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoUrl})` }} />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-800"></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md truncate">{trip.destination}</h3>
                    <p className="text-purple-200 text-xs font-medium mt-1 flex items-center gap-1">
                        By: {trip.user?.name || "Unknown Traveler"}
                    </p>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-slate-900/50">
                <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">{trip.noOfDays} Days</span>
                    <span className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">{trip.budget}</span>
                </div>

                {/* CLONE BUTTON */}
                <button
                    onClick={() => handleClone(trip._id)}
                    className="w-full py-2.5 rounded-xl border border-purple-500/50 text-purple-300 font-semibold hover:bg-purple-600 hover:text-white transition-all flex justify-center items-center gap-2 shadow-lg shadow-purple-900/20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    Clone to My Trips
                </button>
            </div>
        </div>
    );
};

export default PublicTripCard;