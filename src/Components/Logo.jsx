import React from 'react';

const Logo = () => {
    return (
        <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold whitespace-nowrap">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Edu
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Bridge
                </span>
            </h1>
            <p className="text-[8px] lg:text-[10px] text-purple-300/70 hidden sm:block tracking-wider whitespace-nowrap">Smart Campus Management</p>
        </div>
    );
};

export default Logo;