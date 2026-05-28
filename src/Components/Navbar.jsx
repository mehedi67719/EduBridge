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
} from "lucide-react";
import { Link } from "react-router";
import Logo from "./Logo";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Notice", icon: Bell, href: "/notice" },
    { name: "Routine", icon: Calendar, href: "/routine" },
    { name: "Assignment", icon: FileText, href: "/assignment" },
    { name: "Attendance", icon: CheckSquare, href: "/attendance" },
    { name: "Results", icon: Award, href: "/results" },
    { name: "Chat", icon: MessageCircle, href: "/chat" },
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Login", icon: LogIn, href: "/login" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex items-center justify-between py-2 w-full">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>

          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1 xl:gap-2 px-2 xl:px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm xl:text-base whitespace-nowrap group"
              >
                <link.icon className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-hide">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hidden md:flex lg:hidden flex-shrink-0 items-center gap-1 px-1.5 py-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 text-xs whitespace-nowrap group"
              >
                <link.icon className="w-3.5 h-3.5 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                <span>{link.name === "Assignment" ? "Assign" : link.name === "Attendance" ? "Attend" : link.name === "Dashboard" ? "Board" : link.name === "Results" ? "Result" : link.name}</span>
              </a>
            ))}
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-2 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;