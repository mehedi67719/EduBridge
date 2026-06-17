import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorComponent = ({ error, onRetry }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center max-w-md mx-auto border border-red-100">
      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Connection Error</h3>
      <p className="text-gray-500 mb-6">{error}</p>
      <button 
        onClick={onRetry} 
        className="px-8 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
      >
        <RefreshCw className="w-5 h-5" /> Try Again
      </button>
    </div>
  );
};

export default ErrorComponent;