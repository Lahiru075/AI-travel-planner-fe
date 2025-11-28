import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Navbar from "../components/Navbar";  <-- මේක මකන්න හෝ Comment කරන්න

const userdashboard = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // useEffect(() => {
  //   const userString = localStorage.getItem("user");
  //   if (!userString) {
  //     navigate("/login");
  //     return;
  //   }
  //   const loggedUser = JSON.parse(userString);
  //   setUser(loggedUser);
  //   getUserTrips(loggedUser._id);
  // }, []);

  // const getUserTrips = async (userId: string) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/api/trips/user-trips/${userId}`);
  //     setTrips(response.data);
  //   } catch (error) {
  //     console.error("Error fetching trips:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-6xl mx-auto p-8">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Hello, {user?.name} 👋
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Welcome back! Ready to plan your next adventure?
            </p>
          </div>
          <Link to="/create-trip">
            <button className="mt-4 md:mt-0 bg-black text-white px-6 py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition transform hover:scale-105">
              + Plan a New Trip
            </button>
          </Link>
        </div>

        {/* Recent Trips Grid */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">
          Your Recent Trips
        </h2>

        {loading ? (
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                  <div key={n} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
           </div>
        ) : trips.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
             <div className="text-6xl mb-4">🌍</div>
             <h3 className="text-xl font-bold text-gray-800">No trips created yet!</h3>
             <p className="text-gray-500 mb-6">Start by creating your first AI-powered itinerary.</p>
             <Link to="/create-trip" className="text-blue-600 font-bold hover:underline">Create Trip Now →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip: any) => (
              <div key={trip._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 border border-gray-100 cursor-pointer group">
                
                <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500 relative">
                   <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold drop-shadow-md">{trip.destination}</h3>
                   </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                     <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold">
                        {trip.noOfDays} Days
                     </span>
                     <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        {trip.budget} Budget
                     </span>
                  </div>

                  <p className="text-gray-500 text-sm mb-4">
                     Traveling with: <span className="font-semibold text-gray-700">{trip.travelers}</span>
                  </p>

                  <button className="w-full py-2 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition group-hover:border-blue-500 group-hover:text-blue-500">
                    View Itinerary
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default userdashboard;