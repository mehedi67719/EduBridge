import React, { useState } from "react";
import {
  Home,
  Bell,
  Calendar,
  FileText,
  CheckSquare,
  Award,
  MessageCircle,
  LayoutDashboard,
  LogIn,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
  Settings,
  UserCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "./Logo";
import Useauth from "../Hooks/Useauth";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { dbUser, loading, logout } = Useauth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Notice", icon: Bell, href: "/notice" },
    { name: "Routine", icon: Calendar, href: "/routine" },
    { name: "Assignment", icon: FileText, href: "/assignment" },
    { name: "Attendance", icon: CheckSquare, href: "/attendance" },
    { name: "Results", icon: Award, href: "/results" },
    { name: "Chat", icon: MessageCircle, href: "/chat" },
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  ];

  const filteredNavLinks = user ? navLinks : navLinks.filter(link => link.name !== "Dashboard");

  if (loading) {
    return (
      <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <Logo />
            <div className="w-8 h-8 rounded-full bg-purple-600/30 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }


  console.log(dbUser)

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 md:py-3">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm xl:text-base whitespace-nowrap group"
              >
                <link.icon className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            {dbUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/40 to-purple-600/40 hover:from-indigo-600/60 hover:to-purple-600/60 border border-indigo-500/30 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <dbUser className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-white text-sm font-medium max-w-[100px] truncate">
                      {dbUser.displayName || dbUser.email?.split('@')[0]}
                    </p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border border-gray-100">
                      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center shadow-md">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-gray-900 truncate">
                              {user.displayName || user.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                          <span>Dashboard</span>
                        </Link>
                        
                        <Link
                          to="/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <UserCircle className="w-4 h-4 text-purple-500" />
                          <span>Profile</span>
                        </Link>
                        
                        <Link
                          to="/settings"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      
                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 font-medium text-sm group"
              >
                <LogIn className="w-4 h-4 group-hover:scale-110 transition-all duration-300" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
            
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsUserMenuOpen(false);
              }}
              className="lg:hidden text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-3 space-y-1 border-t border-purple-500/20 mt-2">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </Link>
            ))}
            
            {!user && (
              <Link
                to="/login"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all duration-300 font-medium mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <LogIn className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;