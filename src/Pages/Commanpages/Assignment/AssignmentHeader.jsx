import React from "react";
import { FileText, CircleDot, Zap, Shield, Star } from "lucide-react";

const AssignmentHeader = ({ totalAssignments, pendingAssignments }) => {
  return (
    <div className="relative mb-10">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-3xl rounded-full"></div>
      <div className="relative text-center">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full px-6 py-3 mb-6 shadow-lg border border-white/50 flex-wrap justify-center">
          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">📚 Assignment Portal</span>
          <div className="w-px h-4 bg-gray-300"></div>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <FileText className="w-4 h-4 text-indigo-500" />
            {totalAssignments} Total
          </span>
          <div className="w-px h-4 bg-gray-300"></div>
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <CircleDot className="w-3 h-3 text-indigo-500" />
            {pendingAssignments} Pending
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Assignment Hub
          </span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Track, manage, and submit your academic assignments with ease
        </p>
        
        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium flex items-center gap-1">
            <Zap className="w-3 h-3" /> Smart Tracking
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium flex items-center gap-1">
            <Shield className="w-3 h-3" /> Secure Access
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-medium flex items-center gap-1">
            <Star className="w-3 h-3" /> Premium Features
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentHeader;