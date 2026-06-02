import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 z-50 flex items-center justify-center">
            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 blur-xl opacity-30 animate-pulse"></div>
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-4 border-indigo-200 border-t-indigo-600 border-r-purple-600 animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Loading...
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                                Please wait while we process your request
                            </p>
                        </div>
                        
                        <div className="flex gap-1 mt-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;