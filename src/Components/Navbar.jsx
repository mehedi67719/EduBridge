import React, { useState } from 'react';
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
  X
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', icon: Home, href: '/' },
    { name: 'Notice', icon: Bell, href: '/notice' },
    { name: 'Routine', icon: Calendar, href: '/routine' },
    { name: 'Assignment', icon: FileText, href: '/assignment' },
    { name: 'Attendance', icon: CheckSquare, href: '/attendance' },
    { name: 'Results', icon: Award, href: '/results' },
    { name: 'Chat', icon: MessageCircle, href: '/chat' },
    { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
    { name: 'Login', icon: LogIn, href: '/login' },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-xl sticky top-0 z-50 border-b border-purple-500/20">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Edu</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Bridge</span>
            </h1>
            <p className="text-[10px] text-purple-300/70 hidden sm:block tracking-wider">Smart Campus Management</p>
          </div>

          <div className="hidden md:flex space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium text-sm lg:text-base group"
              >
                <link.icon className="w-4 h-4 group-hover:scale-110 group-hover:text-cyan-400 transition-all duration-300" />
                <span className="group-hover:tracking-wide transition-all duration-300">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none p-2 rounded-lg hover:bg-white/10 transition-all duration-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1">
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