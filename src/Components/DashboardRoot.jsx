
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
import { Menu } from "lucide-react";
import Sidebar from "./Dashboard/Sidebar";

const DashboardRoot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);
  
      if (width >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
 
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

     
      {(isMobile || isTablet) && !isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

    
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
       
        {(isMobile || isTablet) && !isSidebarOpen && (
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 lg:hidden">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="flex gap-6">
          
        
          <div className="hidden lg:block shrink-0">
            <Sidebar
              isOpen={true}
              device="desktop"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeSidebar={closeSidebar}
            />
          </div>

  
          {isSidebarOpen && (isMobile || isTablet) && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={closeSidebar}
              />
              <div className="relative w-72 h-full z-50">
                <Sidebar
                  isOpen={true}
                  device="mobile"
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  closeSidebar={closeSidebar}
                />
              </div>
            </div>
          )}

        
          <main className="flex-1 min-w-0 overflow-x-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8">
              <Outlet context={{ activeTab, setActiveTab }} />
            </div>
          </main>

        </div>
      </div>

 
      <Footer />
    </div>
  );
};

export default DashboardRoot;