import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getImage, getTripById, getWeather } from "../service/trip";

const ViewTrip = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [headerImage, setHeaderImage] = useState("");
    const [weather, setWeather] = useState<any>(null);

    useEffect(() => {
        const fetchTrip = async () => {
            try {
                const res = await getTripById(id!);
                setTrip(res.data);

                if (res.data.destination) {
                    GetPlacePhoto(res.data.destination);
                    fetchWeather(res.data.destination);
                }

            } catch (error) {
                console.error("Error fetching trip details", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchTrip();
    }, [id]);

    const GetPlacePhoto = async (query: string) => {
        try {
            const response = await getImage(query);
            if (response.imageUrl) {
                setHeaderImage(response.imageUrl);
            }
        } catch (error) {
            console.error("Image fetch error:", error);
        }
    };


    const fetchWeather = async (location: string) => {
        try {
            const city = location.split(",")[0];
            const res = await getWeather(city);
            setWeather(res);
        } catch (error) {
            console.log("Weather fetch failed");
        }
    };

    const getPackingTip = (condition: string, temp: number) => {
        const lowerCond = condition.toLowerCase();

        if (lowerCond.includes("rain") || lowerCond.includes("drizzle") || lowerCond.includes("thunderstorm")) {
            return "☔ It's rainy! Make sure to take an umbrella or a raincoat.";
        }

        if (lowerCond.includes("snow")) {
            return "🧥 Snowy weather! Carry a thick jacket and gloves.";
        }

        if (lowerCond.includes("clear") || lowerCond.includes("sunny")) {
            if (temp > 30) {
                return "🥵 It's very hot! Bring sunscreen, a hat, and a water bottle.";
            }
            return "😎 Perfect weather for outdoor activities!";
        }

        if (lowerCond.includes("clouds")) {
            if (temp < 20) {
                return "☁️ It's cloudy and a bit cold. A light jacket is recommended.";
            }
            return "🌤️ Cloudy but fine. Wear comfortable shoes.";
        }

        if (temp < 15) return "🧣 It's cold. Wear warm clothes.";
        if (temp > 28) return "☀️ Hot weather. Wear light clothing.";

        return "🎒 Pack your standard travel essentials.";
    };


    const handlePrint = () => {
        window.print();
    };

    if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
    if (!trip) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Trip Not Found!</div>;

    const tripDetails = trip.tripData || trip;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans relative">

            <div className="max-w-5xl mx-auto relative z-10 animate-fade-in-up">

                <div className="flex justify-between items-center mb-6">
                    <div></div>

                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 transition-all shadow-sm active:scale-95 print:hidden"
                    >
                        <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download PDF
                    </button>
                </div>

                <div className="relative overflow-hidden rounded-3xl border border-slate-800 p-8 md:p-12 mb-12 text-center shadow-2xl min-h-[450px] flex flex-col justify-center items-center group">

                    <div
                        className="absolute top-0 left-0 w-full h-full bg-cover bg-center transition-all duration-1000 group-hover:scale-105"
                        style={{
                            backgroundImage: `url(${headerImage || 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg'})`
                        }}
                    ></div>

                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

                    <div className="relative z-10 w-full">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-2xl tracking-tight">
                            {trip.destination}
                        </h1>

                        <div className="inline-flex gap-4 flex-wrap justify-center mb-6">
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

                        {weather && (
                            <div className="flex flex-col items-center animate-fade-in-up mt-4">
                                <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-lg hover:bg-black/50 transition-colors">
                                    <img
                                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                        alt="weather icon"
                                        className="w-12 h-12"
                                    />
                                    <div className="text-left">
                                        <p className="text-2xl font-bold text-white leading-none">{weather.temp}°C</p>
                                        <p className="text-sm text-slate-300 capitalize">{weather.description}</p>
                                    </div>
                                </div>

                                <div className="mt-4 bg-gradient-to-r from-blue-600/90 to-cyan-600/90 px-5 py-2 rounded-full text-sm font-semibold text-white shadow-lg flex items-center gap-2 border border-white/20">
                                    <span>💡</span> {getPackingTip(weather.condition, weather.temp)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Hotels Section */}
                {tripDetails.hotels && (
                    <div className="mb-16">
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

                {/* Itinerary Section */}
                <div className="relative">
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