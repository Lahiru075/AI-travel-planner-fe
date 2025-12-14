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

  // meda menu eke style eka (Dark Mode)
  const getNavLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive
        ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50" // Active Link
        : "text-slate-400 hover:text-white hover:bg-slate-700"
      }`;
  };

  return (

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

              <h1 className="text-xl font-bold leading-none text-white">
                Trip<span className="text-blue-500">Planner</span>
              </h1>
              <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-1">
                AI Powered
              </span>
            </div>
          </div>

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
            <Link to="/profile" className={getNavLinkClass("/profile")}>
              Settings
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