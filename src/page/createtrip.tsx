import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { generateTrip } from "../service/trip";

const createtrip = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tripData, setTripData] = useState(null);
    const [destination, setDestination] = useState("");
    const [noOfDays, setNoOfDays] = useState("");
    const [budget, setBudget] = useState("Moderate");
    const [travelers, setTravelers] = useState("Couple");


    const handleGenerateTrip = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTripData(null);

        if (!destination || !noOfDays || !budget || !travelers) {
            alert("Please fill in all the fields.");
            return;
        }

        try {

            const data = {
                destination,
                noOfDays,
                budget,
                travelers
            };

            const res: any = await generateTrip(data);

            setTripData(res);
            console.log(tripData)

            alert("Trip generated successfully!");

        } catch (error) {
            console.error(error);
            alert("Failed to generate trip. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">

            {/* 1. INPUT FORM SECTION */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 mb-10">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Tell us your travel preferences 🏕️</h1>
                <p className="text-gray-500 mb-8">Just provide some basic information, and our AI will generate a customized itinerary for you.</p>

                <form onSubmit={handleGenerateTrip} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Destination */}
                    <div className="col-span-2">
                        <label className="block text-gray-700 font-medium mb-2">What is destination of choice?</label>
                        <input
                            type="text"
                            name="destination"
                            placeholder="e.g. Kandy, Sri Lanka"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>

                    {/* Days */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">How many days are you planning?</label>
                        <input
                            type="number"
                            name="noOfDays"
                            placeholder="Ex. 3"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={noOfDays}
                            onChange={(e) => setNoOfDays(e.target.value)}
                            required
                        />
                    </div>

                    {/* Budget */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">What is Your Budget?</label>
                        <select
                            name="budget"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                        >
                            <option value="Cheap">Cheap</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>

                    {/* Travelers */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Who do you plan on traveling with on your next adventure?</label>
                        <select
                            name="travelers"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                            value={travelers}
                            onChange={(e) => setTravelers(e.target.value)}
                        >
                            <option value="Solo">Solo</option>
                            <option value="Couple">Couple</option>
                            <option value="Family">Family</option>
                            <option value="Friends">Friends</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-4">
                        <button
                            disabled={loading}
                            className="w-full bg-black text-white p-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition flex justify-center items-center"
                        >
                            {loading ? "Generating Trip..." : "Generate Trip 🚀"}
                        </button>
                    </div>
                </form>
            </div>

            {/* 2. DISPLAY RESULT SECTION (AI Data පෙන්නන තැන) */}
            {tripData && (
                <div className="max-w-4xl mx-auto">

                    {/* Trip Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl shadow-md mb-6">
                        <h2 className="text-3xl font-bold">{tripData.tripName}</h2>
                        <p className="opacity-90 mt-2">Here is your perfect travel plan!</p>
                    </div>

                    {/* Hotel Recommendations */}
                    {tripData.hotels && (
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">🏨 Recommended Hotels</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {tripData.hotels.map((hotel, index) => (
                                    <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                                        <h4 className="font-bold text-lg text-blue-600">{hotel}</h4>
                                        <p className="text-sm text-gray-500">Highly recommended for your budget.</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Itinerary Timeline */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">📅 Daily Itinerary</h3>
                        {tripData.itinerary.map((dayPlan, index) => (
                            <div key={index} className="mb-6 bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                                <h4 className="text-xl font-bold mb-4 text-gray-700">Day {dayPlan.day}</h4>

                                <div className="space-y-4">
                                    {dayPlan.plan.map((place, idx) => (
                                        <div key={idx} className="flex gap-4 items-start">
                                            <div className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold w-24 text-center">
                                                {place.time}
                                            </div>
                                            <div>
                                                <h5 className="font-bold text-gray-800">{place.place}</h5>
                                                <p className="text-gray-600 text-sm">{place.details}</p>
                                                <p className="text-xs text-orange-500 font-semibold mt-1">💰 {place.ticketPrice}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            )}

        </div>
    );
};

export default createtrip;