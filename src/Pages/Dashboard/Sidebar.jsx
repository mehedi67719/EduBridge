import React from "react";
import {
  LayoutDashboard,
  UserCircle,
  Settings,
  LogOut,
  GraduationCap,
  X,
  BookOpen,
  Calendar,
  FileText,
  CheckSquare,
  Award,
  MessageCircle,
  Bell,
  HelpCircle,
  Shield,
  Star,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import Useauth from "../../Hooks/Useauth";
import Loading from "../../Components/Loading";


const Sidebar = ({ isOpen = true, device = "desktop", activeTab, setActiveTab, closeSidebar }) => {
  const { dbUser, loading } = Useauth();

  const mainMenuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview", badge: null },
    { id: "subjects", icon: BookOpen, label: "Subjects", badge: "8" },
    { id: "assignments", icon: FileText, label: "Assignments", badge: "3" },
    { id: "attendance", icon: CheckSquare, label: "Attendance", badge: "85%" },
    { id: "results", icon: Award, label: "Results", badge: "3.75" },
    { id: "schedule", icon: Calendar, label: "Schedule", badge: null },
    { id: "messages", icon: MessageCircle, label: "Messages", badge: "2" },
    { id: "notices", icon: Bell, label: "Notices", badge: "3" },
  ];

  const accountMenuItems = [
    { id: "myprofile", icon: UserCircle, label: "My Profile" },
    { id: "settings", icon: Settings, label: "Settings" },
    { id: "help", icon: HelpCircle, label: "Help Center" },
    { id: "privacy", icon: Shield, label: "Privacy" },
  ];

  const quickStats = [
    { label: "Attendance", value: "85%", icon: TrendingUp, progress: 85 },
    { label: "Semester Progress", value: "65%", icon: Calendar, progress: 65 },
  ];

  const getBadgeColor = (badge) => {
    if (badge === "3" || badge === "2") return "bg-red-500";
    if (badge === "85%") return "bg-emerald-500";
    if (badge === "3.75") return "bg-amber-500";
    if (badge === "8") return "bg-blue-500";
    return "bg-gray-500";
  };

  const isMobile = device === "mobile";
  const isDesktop = device === "desktop";
  const showText = isDesktop || isMobile;
  const sidebarWidth = isMobile ? "w-72" : "w-64 lg:w-72";

  if (loading) {
    return (
      <div className={`h-full ${sidebarWidth} flex items-center justify-center`}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={`h-full transition-all duration-300 ease-in-out ${sidebarWidth}`}>
      <div className="h-full overflow-hidden flex flex-col bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-2xl lg:rounded-r-3xl">
        
        <div className="p-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-amber-400 rounded-full blur-lg opacity-50"></div>
                <GraduationCap className="w-7 h-7 lg:w-9 lg:h-9 text-amber-400 relative z-10" />
              </div>
              {showText && (
                <div className="leading-tight">
                  <h1 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-amber-200 bg-clip-text text-transparent">
                    EduBridge
                  </h1>
                  <p className="text-[10px] lg:text-xs text-white/50">Smart Campus System</p>
                </div>
              )}
            </div>

            {isMobile && (
              <button
                onClick={closeSidebar}
                className="p-1.5 rounded-xl hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          
          {showText && dbUser && (
            <div className="mx-3 mt-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-white/10 p-3 lg:p-4">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 text-sm lg:text-lg">
                  {dbUser?.fullName?.charAt(0) || dbUser?.email?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {dbUser?.fullName || dbUser?.email?.split("@")[0] || "User"}
                  </p>
                  <p className="text-[10px] lg:text-xs text-white/60 truncate">
                    {dbUser?.userType || "Student"}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-white/70">CGPA: 3.75</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isDesktop && (
            <div className="mx-3 lg:mx-4 mt-3 lg:mt-4 space-y-2">
              {quickStats.map((stat, idx) => (
                <div key={idx} className="p-2 rounded-lg lg:rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 lg:gap-2">
                      <stat.icon className="w-2.5 h-2.5 text-white/60" />
                      <span className="text-[10px] text-white/70">{stat.label}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-white">{stat.value}</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      style={{ width: `${stat.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="px-3 mt-4">
            {showText && (
              <p className="text-[10px] lg:text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                Main Menu
              </p>
            )}
            <div className="space-y-0.5">
              {mainMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) closeSidebar();
                  }}
                  className={`group w-full flex items-center gap-3 rounded-lg transition-all duration-300 px-3 py-2.5 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {showText && (
                    <>
                      <span className="text-sm font-medium flex-1 text-left">
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${getBadgeColor(item.badge)} text-white shadow-sm flex-shrink-0`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="px-3 mt-4">
            {showText && (
              <p className="text-[10px] lg:text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                Account
              </p>
            )}
            <div className="space-y-0.5">
              {accountMenuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (isMobile) closeSidebar();
                  }}
                  className={`group w-full flex items-center gap-3 rounded-lg transition-all duration-300 px-3 py-2.5 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {showText && (
                    <span className="text-sm font-medium flex-1 text-left">
                      {item.label}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-white/10 bg-gradient-to-t from-indigo-900/50 to-transparent">
          <button
            className="group w-full flex items-center gap-3 rounded-lg transition-all duration-300 px-3 py-2.5 text-white/70 hover:bg-red-500/20 hover:text-red-400"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {showText && (
              <span className="text-sm font-medium flex-1 text-left">
                Logout
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;