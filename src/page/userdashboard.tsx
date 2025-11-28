import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getMyTrips } from "../service/trip";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      if (!user) return;
      try {
        const response = await getMyTrips(0,0);
        setTrips(response.data);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [user]);


  const chartData = trips.slice(0, 5).map((trip: any) => ({
    name: trip.destination.split(",")[0], 
    days: parseInt(trip.noOfDays),
  }));


  const totalTrips = trips.length;
  const totalDays = trips.reduce((acc, trip: any) => acc + parseInt(trip.noOfDays || 0), 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans relative">
      
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. HEADER & ACTION */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b border-slate-800 pb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{user?.name}</span> 👋
            </h1>
            <p className="text-slate-400">Here is your travel overview.</p>
          </div>
          <Link to="/createtrip">
            <button className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all">
              + Plan New Trip
            </button>
          </Link>
        </div>

        {/* 2. STATS & ANALYTICS SECTION (New!) */}
        {trips.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Stats Cards */}
            <div className="space-y-6">
               {/* Total Trips Card */}
               <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex items-center gap-4">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-2xl">✈️</div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{totalTrips}</h3>
                    <p className="text-slate-400 text-sm">Total Trips Planned</p>
                  </div>
               </div>

               {/* Total Days Card */}
               <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex items-center gap-4">
                  <div className="h-12 w-12 bg-cyan-500/20 rounded-xl flex items-center justify-center text-2xl">📅</div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">{totalDays}</h3>
                    <p className="text-slate-400 text-sm">Total Days Traveling</p>
                  </div>
               </div>
            </div>

            {/* CHART SECTION (Graph) */}
            <div className="lg:col-span-2 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-sm">
               <h3 className="text-lg font-bold text-slate-200 mb-4 ml-2">⏳ Trip Duration Overview</h3>
               
               <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #1e293b', color: '#fff' }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        itemStyle={{ color: '#4ade80' }}
                      />
                      <Bar dataKey="days" radius={[6, 6, 0, 0]} barSize={40}>
                        {chartData.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#3b82f6" : "#06b6d4"} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
               </div>
            </div>
          </div>
        )}

        {/* 3. RECENT TRIPS (Limit to 3) */}
        <h2 className="text-xl font-bold text-white mb-6">Recent Trips</h2>
        
        {loading ? (
           <p className="text-slate-400">Loading...</p>
        ) : trips.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-3xl border border-slate-800">
             <h3 className="text-xl text-white font-bold">No trips yet!</h3>
             <p className="text-slate-400 mb-4">Create your first trip to see analytics.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trips.slice(0, 3).map((trip: any, index) => (
              <div 
                key={trip._id} 
                onClick={() => navigate(`/viewtrip/${trip._id}`)}    
                className="group cursor-pointer bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-cyan-500/50 transition-all"
              >
                <div className={`h-32 w-full bg-gradient-to-r ${getGradient(index)} rounded-xl mb-4 relative overflow-hidden`}>
                   <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                </div>
                <h3 className="text-lg font-bold text-white truncate">{trip.destination}</h3>
                <p className="text-sm text-slate-400">{trip.noOfDays} Days • {trip.budget}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const getGradient = (index: number) => {
    const gradients = ["from-blue-600 to-indigo-600", "from-cyan-500 to-blue-500", "from-emerald-500 to-teal-500"];
    return gradients[index % gradients.length];
};

export default UserDashboard;