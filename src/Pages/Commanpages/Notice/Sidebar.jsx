import React, { useState } from "react";
import {
  LayoutGrid,
  ChevronRight,
  Layers,
  FileText,
  Sparkles,
  TrendingUp,
  Menu,
  X,
  Zap,
  Star,
  BookOpen,
  GraduationCap,
  Lightbulb,
  MessageCircle,
  Award
} from "lucide-react";

const Sidebar = ({ category = [], selectcategory, setselectcategory }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getCategoryIcon = (categoryName) => {
    const icons = {
      general: <FileText className="w-4 h-4" />,
      examination: <BookOpen className="w-4 h-4" />,
      event: <Star className="w-4 h-4" />,
      holiday: <Zap className="w-4 h-4" />,
      result: <Award className="w-4 h-4" />,
      meeting: <MessageCircle className="w-4 h-4" />,
      training: <GraduationCap className="w-4 h-4" />,
      seminar: <Lightbulb className="w-4 h-4" />,
    };
    return icons[categoryName?.toLowerCase()] || <FileText className="w-4 h-4" />;
  };

  const getCategoryColor = (categoryName) => {
    const colors = {
      general: "from-blue-500 to-cyan-500",
      examination: "from-violet-500 to-purple-500",
      event: "from-orange-500 to-red-500",
      holiday: "from-emerald-500 to-teal-500",
      result: "from-sky-500 to-blue-500",
      meeting: "from-rose-500 to-pink-500",
      training: "from-indigo-500 to-blue-500",
      seminar: "from-fuchsia-500 to-pink-500",
    };
    return colors[categoryName?.toLowerCase()] || "from-indigo-500 to-purple-500";
  };

  const getCategoryEmoji = (categoryName) => {
    const emojis = {
      general: "📢",
      examination: "📝",
      event: "🎉",
      holiday: "🎊",
      result: "🏆",
      meeting: "🤝",
      training: "💪",
      seminar: "🎓",
    };
    return emojis[categoryName?.toLowerCase()] || "📋";
  };

  const formatCategoryName = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  const CategoriesList = () => (
    <div className="space-y-1.5">
      {category.map((item, index) => {
        const isActive = selectcategory === item._id;
        const categoryName = item._id || "";
        const color = getCategoryColor(categoryName);
        
        return (
          <button
            key={item._id || index}
            onClick={() => {
              setselectcategory(item._id);
              setIsMobileMenuOpen(false);
            }}
            className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
              isActive
                ? `bg-gradient-to-r ${color} text-white shadow-lg`
                : "hover:bg-gray-50 text-gray-600 hover:translate-x-1"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-indigo-50"
              }`}>
                <div className={isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-500"}>
                  {getCategoryIcon(categoryName)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-medium transition-colors duration-300 truncate block ${
                  isActive ? "text-white" : "text-gray-700 group-hover:text-indigo-600"
                }`}>
                  {formatCategoryName(categoryName)}
                </span>
                <span className={`text-[10px] truncate block ${isActive ? "text-white/70" : "text-gray-400"}`}>
                  {getCategoryEmoji(categoryName)} {categoryName}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {isActive && <Sparkles className="w-3 h-3 text-white animate-pulse flex-shrink-0" />}
              <ChevronRight className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                isActive ? "text-white translate-x-1" : "text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
              }`} />
            </div>
          </button>
        );
      })}
    </div>
  );

  return (
    <>
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div className="text-left min-w-0 flex-1">
              <h2 className="font-bold text-gray-800 text-sm truncate">Categories</h2>
              <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                {selectcategory === "all" ? "All Notices" : formatCategoryName(selectcategory)}
              </p>
            </div>
          </div>
          {isMobileMenuOpen ? (
            <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
          ) : (
            <Menu className="w-5 h-5 text-gray-500 flex-shrink-0" />
          )}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden mb-4 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 max-h-80 overflow-y-auto animate-slideDown">
          <button
            onClick={() => {
              setselectcategory("all");
              setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 mb-2 ${
              selectcategory === "all"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
                : "bg-gray-50 text-gray-700 hover:bg-indigo-50"
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                selectcategory === "all" ? "bg-white/20" : "bg-white shadow-sm"
              }`}>
                <LayoutGrid className={`w-5 h-5 ${selectcategory === "all" ? "text-white" : "text-indigo-600"} flex-shrink-0`} />
              </div>
              <div className="flex-1 min-w-0">
                <span className={`text-sm font-semibold block truncate ${selectcategory === "all" ? "text-white" : "text-gray-800"}`}>
                  All Notices
                </span>
                <span className={`text-[10px] block truncate ${selectcategory === "all" ? "text-white/70" : "text-gray-400"}`}>
                  View all updates
                </span>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 flex-shrink-0 ${selectcategory === "all" ? "text-white" : "text-gray-400"}`} />
          </button>
          <CategoriesList />
        </div>
      )}

      <div className="hidden lg:block bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-5 hover:shadow-2xl transition-all duration-300">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100/80">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 flex-shrink-0">
            <Layers className="w-7 h-7 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-gray-800 text-lg truncate">Categories</h2>
            <p className="text-xs text-gray-400 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
              {category.length} categories available
            </p>
          </div>
        </div>

        <button
          onClick={() => setselectcategory("all")}
          className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 mb-4 ${
            selectcategory === "all"
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl transform hover:scale-[1.02]"
              : "bg-gray-50 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200 border border-transparent"
          }`}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
              selectcategory === "all" ? "bg-white/20" : "bg-white shadow-sm"
            }`}>
              <LayoutGrid className={`w-5 h-5 ${selectcategory === "all" ? "text-white" : "text-indigo-600"} flex-shrink-0`} />
            </div>
            <div className="text-left min-w-0 flex-1">
              <span className={`text-sm font-bold block truncate ${selectcategory === "all" ? "text-white" : "text-gray-800"}`}>
                All Notices
              </span>
              <p className={`text-[10px] truncate ${selectcategory === "all" ? "text-white/70" : "text-gray-400"}`}>
                View all updates
              </p>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${selectcategory === "all" ? "text-white translate-x-1" : "text-gray-400"}`} />
        </button>

        <div className="space-y-1.5 max-h-[400px] overflow-y-auto overflow-x-hidden custom-scroll">
          {category.map((item, index) => {
            const isActive = selectcategory === item._id;
            const categoryName = item._id || "";
            const color = getCategoryColor(categoryName);
            
            return (
              <button
                key={item._id || index}
                onClick={() => setselectcategory(item._id)}
                className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 ${
                  isActive
                    ? `bg-gradient-to-r ${color} text-white shadow-lg`
                    : "hover:bg-gray-50 text-gray-600 hover:translate-x-1"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                    isActive ? "bg-white/20" : "bg-gray-100 group-hover:bg-indigo-50"
                  }`}>
                    <div className={isActive ? "text-white" : "text-gray-500 group-hover:text-indigo-500"}>
                      {getCategoryIcon(categoryName)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium transition-colors duration-300 truncate block ${
                      isActive ? "text-white" : "text-gray-700 group-hover:text-indigo-600"
                    }`}>
                      {formatCategoryName(categoryName)}
                    </span>
                    <span className={`text-[10px] truncate block ${isActive ? "text-white/70" : "text-gray-400"}`}>
                      {getCategoryEmoji(categoryName)} Category
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {isActive && <Sparkles className="w-3 h-3 text-white animate-pulse flex-shrink-0" />}
                  <ChevronRight className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                    isActive ? "text-white translate-x-1" : "text-gray-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                  }`} />
                </div>
              </button>
            );
          })}
        </div>

        {category.length > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-100/80">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <h3 className="text-xs font-bold text-gray-700 truncate">Popular Categories</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {category.slice(0, 5).map((item, idx) => {
                const isActive = selectcategory === item._id;
                const categoryName = item._id || "";
                const color = getCategoryColor(categoryName);
                
                return (
                  <button
                    key={item._id || idx}
                    onClick={() => setselectcategory(item._id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${color} text-white shadow-md`
                        : "bg-gray-100 text-gray-700 hover:bg-indigo-100 hover:text-indigo-600 hover:shadow-sm"
                    }`}
                  >
                    <span className="flex-shrink-0">{getCategoryEmoji(categoryName)}</span>
                    <span className="truncate">{formatCategoryName(categoryName)}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .custom-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #4f46e5, #9333ea);
        }
      `}</style>
    </>
  );
};

export default Sidebar;