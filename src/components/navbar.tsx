// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setUser } = useAuth();

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//     navigate("/login");
//   };

//   // මැද තියෙන Menu එකේ Style එක (Active vs Inactive)
//   const getNavLinkClass = (path: string) => {
//     const isActive = location.pathname === path;
//     return `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
//         ? "bg-white text-blue-600 shadow-sm"
//         : "text-gray-500 hover:text-gray-900"
//       }`;
//   };

//   return (
//     <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 py-3">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* 1. LEFT SIDE - LOGO */}
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/userdashboard')}>
//             {/* Icon Box */}
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
//               <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </div>

//             {/* Text Block */}
//             <div className="flex flex-col">
//               <h1 className="text-xl font-bold leading-none text-gray-800">
//                 Trip<span className="text-blue-600">Planner</span>
//               </h1>
//               <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
//                 AI Powered
//               </span>
//             </div>
//           </div>

//           {/* 2. CENTER - PILL NAVIGATION */}
//           <div className="hidden md:flex bg-slate-100 p-1.5 rounded-full items-center">
//             <Link to="/userdashboard" className={getNavLinkClass("/userdashboard")}>
//               Dashboard
//             </Link>
//             <Link to="/createtrip" className={getNavLinkClass("/createtrip")}>
//               Create Trip
//             </Link>
//             <Link to="/my-trips" className={getNavLinkClass("/my-trips")}>
//               History
//             </Link>
//           </div>

//           {/* 3. RIGHT SIDE - USER PROFILE */}
//           <div className="flex items-center gap-4">
//             {user ? (
//               <div className="flex items-center gap-4">

//                 {/* User Details (Name & Role) */}
//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-bold text-gray-900 leading-tight">{user.name}</p>
//                   <p className="text-xs text-gray-500 font-medium">{user.email}</p>
//                 </div>

//                 {/* Avatar Circle */}
//                 <div className="h-10 w-10 rounded-full border-2 border-blue-100 flex items-center justify-center text-blue-600 font-bold bg-white shadow-sm">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </div>

//                 {/* Vertical Divider */}
//                 <div className="h-8 w-px bg-gray-200 mx-1"></div>

//                 {/* Logout Icon Button */}
//                 <button
//                   onClick={handleLogout}
//                   className="
//                     px-4 py-2 
//                     rounded-xl 
//                     bg-white 
//                     text-gray-600 
//                     hover:text-red-600 
//                     hover:bg-red-50 
//                     shadow-sm
//                     hover:shadow 
//                     transition-all 
//                     duration-300 
//                     flex items-center gap-2
//                   "
//                   title="Logout"
//                 >
//                   <span>Logout</span>
//                 </button>


//               </div>
//             ) : (
//               <Link to="/login">
//                 <button className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition shadow-lg shadow-gray-200">
//                   Login
//                 </button>
//               </Link>
//             )}
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/authContext";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, setUser } = useAuth();

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     setUser(null);
//     navigate("/login");
//   };

//   // මැද තියෙන Menu එකේ Style එක
//   const getNavLinkClass = (path: string) => {
//     const isActive = location.pathname === path;
//     return `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
//         ? "bg-blue-600 text-white shadow-md" // Active වුනාම Blue Background එකක්
//         : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
//       }`;
//   };

//   return (
//     // 👇 වෙනස්කම මෙතන: bg-white වෙනුවට bg-slate-50/90 දැම්මා
//     <nav className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-gray-200 py-3 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">

//           {/* 1. LEFT SIDE - LOGO */}
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/userdashboard')}>
//             <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200/50">
//               <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
//               </svg>
//             </div>

//             <div className="flex flex-col">
//               <h1 className="text-xl font-bold leading-none text-slate-800">
//                 Trip<span className="text-blue-600">Planner</span>
//               </h1>
//               <span className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
//                 AI Powered
//               </span>
//             </div>
//           </div>

//           {/* 2. CENTER - PILL NAVIGATION */}
//           {/* 👇 Navbar එක අළු පාට නිසා, මේක සුදු (bg-white) කළා කැපිලා පේන්න */}
//           <div className="hidden md:flex bg-white border border-gray-200 p-1.5 rounded-full items-center shadow-sm">
//             <Link to="/userdashboard" className={getNavLinkClass("/userdashboard")}>
//               Dashboard
//             </Link>
//             <Link to="/createtrip" className={getNavLinkClass("/createtrip")}>
//               Create Trip
//             </Link>
//             <Link to="/my-trips" className={getNavLinkClass("/my-trips")}>
//               History
//             </Link>
//           </div>

//           {/* 3. RIGHT SIDE - USER PROFILE */}
//           <div className="flex items-center gap-4">
//             {user ? (
//               <div className="flex items-center gap-4">

//                 <div className="text-right hidden sm:block">
//                   <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
//                   <p className="text-xs text-gray-500 font-medium">{user.email}</p>
//                 </div>

//                 {/* Avatar with White Border to separate from gray background */}
//                 <div className="h-10 w-10 rounded-full border-2 border-white ring-1 ring-gray-200 flex items-center justify-center text-blue-600 font-bold bg-white shadow-sm">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </div>

//                 <div className="h-8 w-px bg-gray-300 mx-1"></div>

//                 <button
//                   onClick={handleLogout}
//                   className="
//                     px-4 py-2 
//                     rounded-xl 
//                     bg-white 
//                     border border-gray-200
//                     text-gray-600 
//                     hover:text-red-600 
//                     hover:bg-red-50 
//                     hover:border-red-100
//                     shadow-sm
//                     hover:shadow 
//                     transition-all 
//                     duration-300 
//                     flex items-center gap-2
//                     font-medium
//                     text-sm
//                   "
//                   title="Logout"
//                 >
//                   <span>Logout</span>
//                 </button>

//               </div>
//             ) : (
//               <Link to="/login">
//                 <button className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition shadow-lg">
//                   Login
//                 </button>
//               </Link>
//             )}
//           </div>

//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/login");
  };

  // මැද Menu එකේ Style (Dark Mode)
  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" // Active Link
        : "text-slate-400 hover:text-white hover:bg-slate-700"
      }`;
  };

  return (
    // 👇 Background එක Dark කළා (bg-slate-900)
    <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* 1. LEFT SIDE - LOGO */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/userdashboard')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-900/20">
              <svg className="w-6 h-6 transform -rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>

            <div className="flex flex-col">
              {/* Text එක සුදු කළා */}
              <h1 className="text-xl font-bold leading-none text-white">
                Trip<span className="text-blue-500">Planner</span>
              </h1>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
                AI Powered
              </span>
            </div>
          </div>

          {/* 2. CENTER - PILL NAVIGATION */}
          {/* Background එක Slate-800 (Navbar එකට වඩා චුට්ටක් ලා පාටයි) */}
          <div className="hidden md:flex bg-slate-800 border border-slate-700 p-1.5 rounded-full items-center">
            <Link to="/userdashboard" className={getNavLinkClass("/userdashboard")}>
              Dashboard
            </Link>
            <Link to="/createtrip" className={getNavLinkClass("/createtrip")}>
              Create Trip
            </Link>
            <Link to="/triphistory" className={getNavLinkClass("/triphistory")}>
              History
            </Link>
            <Link to="/explore" className={getNavLinkClass("/explore")}>
              Explore
            </Link>
          </div>

          {/* 3. RIGHT SIDE - USER PROFILE */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">

                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-xs text-slate-400 font-medium">{user.email}</p>
                </div>

                {/* Avatar */}
                <div className="h-10 w-10 rounded-full border-2 border-slate-700 flex items-center justify-center text-white font-bold bg-slate-800">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                {/* Vertical Divider (Dark Gray) */}
                <div className="h-8 w-px bg-slate-700 mx-1"></div>

                {/* Logout Button (Dark Style) */}
                <button
                  onClick={handleLogout}
                  className="
                    px-4 py-2 
                    rounded-xl 
                    bg-slate-800 
                    border border-slate-700
                    text-slate-300 
                    hover:text-white 
                    hover:bg-red-600/20 
                    hover:border-red-500/50
                    hover:text-red-400
                    transition-all 
                    duration-300 
                    flex items-center gap-2
                    font-medium
                    text-sm
                  "
                  title="Logout"
                >
                  <span>Logout</span>
                </button>

              </div>
            ) : (
              <Link to="/login">
                <button className="bg-white text-slate-900 px-5 py-2.5 rounded-full text-sm font-bold hover:bg-slate-200 transition shadow-lg">
                  Login
                </button>
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;