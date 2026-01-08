import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getImage } from "../service/trip";

interface TripCardProps {
    trip: any; 
    handleDelete: (id: string) => void; 
}

const TripCardItem = ({ trip, handleDelete }: TripCardProps) => {
    const navigate = useNavigate();
    const [photoUrl, setPhotoUrl] = useState<string | null>(null);
    const [isLoadingImage, setIsLoadingImage] = useState(true);

    useEffect(() => {
        const fetchImage = async () => {
            if (trip?.destination) {
                try {

                    const response = await getImage(trip.destination);
                    
                    if (response.imageUrl) {
                        setPhotoUrl(response.imageUrl);
                    }
                } catch (error) {
                    console.log("Image load failed for:", trip.destination);
                    console.log(isLoadingImage);
                } finally {
                    setIsLoadingImage(false);
                }
            }
        };
        fetchImage();
    }, [trip]);

    return (
        <div className="group bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col h-full cursor-pointer">
            
            <div 
                className="h-48 w-full relative p-6 flex flex-col justify-end overflow-hidden"
                onClick={() => navigate(`/viewtrip/${trip._id}`)}
            >
                {/* 1. Dynamic Image Background */}
                {photoUrl ? (
                    <div 
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${photoUrl})` }}
                    />
                ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-800 transition-transform duration-700 group-hover:scale-110"></div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent opacity-90"></div>

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white drop-shadow-md truncate leading-tight">
                        {trip.destination}
                    </h3>
                    <p className="text-cyan-200 text-sm font-medium mt-1 flex items-center gap-1">
                        ✈️ {trip.travelers} Trip
                    </p>
                </div>

                {/* Days Badge */}
                <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white border border-white/20 shadow-sm z-20">
                    {trip.noOfDays} Days
                </div>
            </div>

            {/* --- CARD BODY SECTION --- */}
            <div className="p-6 flex-1 flex flex-col justify-between relative bg-slate-950/50">
                
                {/* Budget Badge */}
                <div className="mb-6">
                    <div className="flex justify-between items-center text-sm text-slate-400 mb-2">
                        <span>Budget Level:</span>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                            trip.budget === 'Cheap' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                            trip.budget === 'Moderate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                            'bg-purple-500/10 text-purple-400 border-purple-500/20'
                        }`}>
                            {trip.budget}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                    <button
                        className="flex-1 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-semibold hover:bg-cyan-500 hover:text-slate-900 hover:border-cyan-500 transition-all active:scale-95 flex justify-center items-center gap-2 group/btn"
                        onClick={() => navigate(`/viewtrip/${trip._id}`)}
                    >
                        View Plan
                        <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                    
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleDelete(trip._id);
                        }}
                        className="p-2.5 rounded-xl border border-slate-700 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all active:scale-95"
                        title="Delete Trip"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TripCardItem;