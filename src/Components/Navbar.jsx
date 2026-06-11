import React, { useState, useEffect } from "react";
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
  Shield,
  HelpCircle,
  CreditCard,
  Bookmark,
  Star,
  Activity,
  Users
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
      console.error(error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const body = document.body;
    if (isUserMenuOpen || isMobileMenuOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [isUserMenuOpen, isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Notice", icon: Bell, href: "/notice" },
    { name: "Routine", icon: Calendar, href: "/routine" },
    { name: "Assignment", icon: FileText, href: "/assignment" },
    { name: "Results", icon: Award, href: "/results" },
    { name: "Chat", icon: MessageCircle, href: "/chat" },
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  ];

  const dropdownLinks = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard", color: "text-indigo-600" },
    { name: "My Profile", icon: UserCircle, href: "/profile", color: "text-gray-700" },
    { name: "Settings", icon: Settings, href: "/settings", color: "text-gray-700" },
    { name: "Upload Notice", icon: Bell, href: "/upload-notice", color: "text-gray-700" },
    { name: "Upload Assignment", icon: FileText, href: "/upload-asssignment", color: "text-gray-700" },
    { name: "My Activities", icon: Activity, href: "/activities", color: "text-gray-700" },
    { name: "Saved Items", icon: Bookmark, href: "/saved", color: "text-gray-700" },
    { name: "Achievements", icon: Star, href: "/achievements", color: "text-amber-600" },
    { name: "Referrals", icon: Users, href: "/referrals", color: "text-gray-700" },
    { name: "Billing", icon: CreditCard, href: "/billing", color: "text-gray-700" },
    { name: "Help Center", icon: HelpCircle, href: "/help", color: "text-gray-700" },
    { name: "Privacy & Security", icon: Shield, href: "/privacy", color: "text-gray-700" },
  ];

  const filteredNavLinks = dbUser
    ? navLinks
    : navLinks.filter((l) => l.name !== "Dashboard");

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
      
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

     
          <div className="hidden lg:flex items-center justify-center flex-1 px-4">
            <div className="flex items-center gap-1 xl:gap-2">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 whitespace-nowrap"
                >
                  <link.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{link.name}</span>
                </Link>
              ))}
            </div>
          </div>

  
          <div className="flex items-center gap-2 sm:gap-3">
            {loading ? (
              <div className="w-9 h-9 rounded-full bg-white/20 animate-pulse" />
            ) : dbUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/30 hover:bg-indigo-600/50 transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>

                  <div className="hidden sm:block text-left">
                    <p className="text-white text-sm font-medium truncate max-w-[120px]">
                      {dbUser.fullName || dbUser.email?.split("@")[0]}
                    </p>
                    {dbUser.userType && (
                      <p className="text-purple-300 text-xs truncate max-w-[120px]">
                        {dbUser.userType}
                      </p>
                    )}
                  </div>

                  <ChevronDown className={`w-4 h-4 text-white transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

       
                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl z-50 overflow-hidden animate-fadeIn">
              
                      <div className="px-4 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {dbUser.fullName || dbUser.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-600 truncate mt-0.5">
                          {dbUser.email}
                        </p>
                        {dbUser.userType && (
                          <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                            {dbUser.userType}
                          </span>
                        )}
                      </div>

                
                      <div className="py-2 max-h-[400px] overflow-y-auto">
                        {dropdownLinks.map((link) => (
                          <Link
                            key={link.name}
                            to={link.href}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors duration-150"
                          >
                            <link.icon className={`w-4 h-4 ${link.color}`} />
                            <span className="text-gray-700">{link.name}</span>
                          </Link>
                        ))}

                        <div className="border-t my-1"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}

    
            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsUserMenuOpen(false);
              }}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

 
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-purple-500/20 animate-slideDown">
            <div className="space-y-1">
              {filteredNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors duration-200"
                >
                  <link.icon className="w-5 h-5" />
                  <span className="text-base font-medium">{link.name}</span>
                </Link>
              ))}

              {!dbUser && !loading && (
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg mt-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span className="text-base font-medium">Login</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>


      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Navbar;