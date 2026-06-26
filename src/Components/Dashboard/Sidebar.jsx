
import {
  LayoutDashboard,
  UserCircle,
  Settings,
  LogOut,
  GraduationCap,
  X,
  Calendar,
  FileText,
  Bell,
  HelpCircle,
  Shield,
  Star,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { MdAssignmentTurnedIn, MdOutlineAssignmentReturned } from "react-icons/md";
import Loading from "../Loading";
import Logo from "../Logo";
import Useauth from "../../Hooks/Useauth";
import { TbBellCheck } from "react-icons/tb";

const Sidebar = ({ isOpen = true, device = "desktop", activeTab, setActiveTab, closeSidebar }) => {
  const { dbUser, loading } = Useauth();
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { id: "overview", icon: LayoutDashboard, label: "Overview", badge: null, path: "/dashboard" },
    { id: "uploadNotice", icon: Bell, label: "Upload Notice", badge: null, path: "/dashboard/upload-notice" },
    { id: "myuploadedNotice", icon: TbBellCheck, label: "My Uploaded Notice", badge: null, path: "/dashboard/my-uploaded-notice" },
    { id: "uploadAssignment", icon: FileText, label: "Upload Assignment", badge: null, path: "/dashboard/upload-assignment" },
    { id: "myuploadedAssignment", icon: MdAssignmentTurnedIn, label: "My Uploaded Assignment", badge: null, path: "/dashboard/my-uploaded-assignment" },
    { id: "submissionassignment", icon: MdOutlineAssignmentReturned, label: "Submission Assignment", badge: null, path: "/dashboard/submission-assignment" },
    { id: "uploadRoutine", icon: Calendar, label: "Upload Routine", badge: null, path: "/dashboard/upload-routine" },
    
    
  ];

  const accountMenuItems = [
    { id: "myprofile", icon: UserCircle, label: "My Profile", path: "/dashboard/profile" },
    { id: "settings", icon: Settings, label: "Settings", path: "/dashboard/settings" },
    { id: "help", icon: HelpCircle, label: "Help Center", path: "/dashboard/help" },
    { id: "privacy", icon: Shield, label: "Privacy", path: "/dashboard/privacy" },
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

 
  const getActiveTabFromPath = () => {
    const currentPath = location.pathname;
    const foundItem = mainMenuItems.find(item => item.path === currentPath);
    if (foundItem) return foundItem.id;
    const foundAccountItem = accountMenuItems.find(item => item.path === currentPath);
    if (foundAccountItem) return foundAccountItem.id;
    return "overview";
  };

  const currentActiveTab = getActiveTabFromPath();

  const handleNavigation = (path, id) => {
    setActiveTab(id);
    navigate(path);
    if (isMobile) closeSidebar();
  };

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
              {showText && <Logo/>}
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
                    {dbUser?.userType || "Student"} • {dbUser?.institutionName || ""}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
                    <span className="text-[10px] text-white/70">
                      {dbUser?.department ? `${dbUser.department}` : "CSE"}
                    </span>
                  </div>
                </div>
              </div>
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
                  onClick={() => handleNavigation(item.path, item.id)}
                  className={`group w-full flex items-center gap-3 rounded-lg transition-all duration-300 px-3 py-2.5 ${
                    currentActiveTab === item.id
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
                  onClick={() => handleNavigation(item.path, item.id)}
                  className={`group w-full flex items-center gap-3 rounded-lg transition-all duration-300 px-3 py-2.5 ${
                    currentActiveTab === item.id
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
              navigate("/login");
              if (isMobile) closeSidebar();
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