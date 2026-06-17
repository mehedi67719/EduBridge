import React from "react";
import { FileText, Zap, Shield, Star, TrendingUp, Calendar } from "lucide-react";

const AssignmentHeader = ({ totalAssignments }) => {
  return (
    <div className="relative mb-12">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full"></div>
      
      <div className="relative">
        <div className="text-center">
          <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-xl rounded-full px-6 py-3 mb-6 shadow-lg border border-gray-100/50 flex-wrap justify-center">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">📚 Assignment Portal</span>
            <div className="w-px h-5 bg-gray-200"></div>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-indigo-500" />
              <span className="font-semibold text-gray-700">{totalAssignments}</span> Total
            </span>
            <div className="w-px h-5 bg-gray-200"></div>
            <span className="text-sm text-gray-500 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-500" />
              {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
            </span>
          </div>

          <div className="relative">
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-indigo-200/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-pink-200/30 rounded-full blur-2xl"></div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight relative">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
                Assignment Hub
              </span>
            </h1>
          </div>
          
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Track, manage, and submit your academic assignments with ease
          </p>
          
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1.5 border border-indigo-200 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> Smart Tracking
            </span>
            <span className="px-4 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1.5 border border-purple-200 shadow-sm">
              <Shield className="w-3.5 h-3.5" /> Secure Access
            </span>
            <span className="px-4 py-1.5 bg-gradient-to-r from-pink-50 to-pink-100 text-pink-700 rounded-full text-xs font-medium flex items-center gap-1.5 border border-pink-200 shadow-sm">
              <Star className="w-3.5 h-3.5" /> Premium Features
            </span>
            <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-50 to-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center gap-1.5 border border-emerald-200 shadow-sm">
              <TrendingUp className="w-3.5 h-3.5" /> Live Updates
            </span>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AssignmentHeader;