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
    if (isUserMenuOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUserMenuOpen, isMobileMenuOpen]);

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

  const filteredNavLinks = dbUser
    ? navLinks
    : navLinks.filter((l) => l.name !== "Dashboard");

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">

          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-2">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 whitespace-nowrap"
              >
                <link.icon className="w-4 h-4" />
                <span className="text-sm">{link.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">

            {loading ? (
              <div className="w-8 h-8 rounded-full bg-white/20 animate-pulse" />
            ) : dbUser ? (
              <div className="relative z-[9999]">

                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg bg-indigo-600/30 border border-indigo-500/30 max-w-[180px]"
                >
                  <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>

                  <div className="hidden sm:block min-w-0">
                    <p className="text-white text-xs truncate max-w-[90px]">
                      {dbUser.fullName || dbUser.email?.split("@")[0]}
                    </p>
                    {dbUser.userType && (
                      <p className="text-purple-300 text-[10px] truncate max-w-[90px]">
                        {dbUser.userType}
                      </p>
                    )}
                  </div>

                  <ChevronDown className="w-4 h-4 text-white flex-shrink-0" />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-[9998]"
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 w-60 sm:w-56 bg-white rounded-xl shadow-xl z-[9999] overflow-hidden">

                      <div className="px-4 py-3 border-b bg-gray-50">
                        <p className="text-sm font-semibold truncate">
                          {dbUser.fullName || dbUser.email?.split("@")[0]}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {dbUser.email}
                        </p>
                      </div>

                      <Link
                        to="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <UserCircle className="w-4 h-4" />
                        Profile
                      </Link>

                      <Link
                        to="/settings"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 border-t"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500 text-white text-sm"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}

            <button
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsUserMenuOpen(false);
              }}
              className="lg:hidden p-2 text-white"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden py-2 space-y-1 border-t border-purple-500/20">
            {filteredNavLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg"
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}

            {!dbUser && !loading && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-3 bg-indigo-500 text-white rounded-lg"
              >
                <LogIn className="w-5 h-5" />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;