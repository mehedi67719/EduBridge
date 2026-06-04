import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 z-50 flex items-center justify-center p-4">
            {/* Responsive container */}
            <div className="w-full max-w-[90%] xs:max-w-[300px] sm:max-w-[350px] md:max-w-[400px] mx-auto">
                
                {/* Card */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/30 
                                transform transition-all duration-300 hover:scale-105">
                    
                    <div className="flex flex-col items-center gap-4 sm:gap-6">
                        
                        {/* Animated loader */}
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
                                {/* Spinner ring */}
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                                {/* Second spinner for effect */}
                                <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-b-purple-600 animate-spin" 
                                     style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
                                {/* Center dot */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Text section */}
                        <div className="text-center">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                                Loading
                            </h2>
                            <div className="flex justify-center gap-1 mt-2">
                                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-500 rounded-full animate-ping"></span>
                                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></span>
                                <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-pink-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                                Please wait...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Loading;