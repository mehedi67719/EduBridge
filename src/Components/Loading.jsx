import React from 'react';

const Loading = () => {
    return (
        <div className="w-full h-full flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-3">
          
        
                <div className="relative">
                    <div className="w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-3 border-indigo-200 border-t-indigo-600 animate-spin"></div>
                        <div className="absolute inset-0 rounded-full border-3 border-purple-200 border-b-purple-600 animate-spin" 
                             style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                        </div>
                    </div>
                </div>
                
           
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-600">Loading</span>
                    <span className="inline-block w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></span>
                    <span className="inline-block w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                    <span className="inline-block w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                </div>
            </div>
        </div>
    );
};

export default Loading;