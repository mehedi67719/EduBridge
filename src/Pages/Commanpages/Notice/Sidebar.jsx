import React from "react";
import {
  LayoutGrid,
  Tag,
  TrendingUp,
  ChevronRight,
  Bell,
  Calendar,
  Megaphone,
  Clock,
  Award,
  Users,
  Sparkles,
  BookOpen,
  GraduationCap,
  Heart,
  Layers
} from "lucide-react";

const Sidebar = ({ category, selectcategory, setselectcategory }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "Examination": Calendar,
      "Event": Megaphone,
      "Holiday": Clock,
      "Result": Award,
      "Meeting": Users,
      "Workshop": Sparkles,
      "Training": BookOpen,
      "Seminar": GraduationCap,
      "General": Bell
    };
    const Icon = iconMap[categoryName] || Tag;
    return <Icon className="w-4 h-4" />;
  };

  const getCategoryGradient = (categoryName) => {
    const gradientMap = {
      "Examination": "from-violet-500 to-purple-600",
      "Event": "from-orange-500 to-red-600",
      "Holiday": "from-emerald-500 to-teal-600",
      "Result": "from-sky-500 to-blue-600",
      "Meeting": "from-rose-500 to-pink-600",
      "Workshop": "from-amber-500 to-yellow-600",
      "Training": "from-indigo-500 to-blue-600",
      "Seminar": "from-fuchsia-500 to-pink-600",
      "General": "from-gray-500 to-gray-600"
    };
    return gradientMap[categoryName] || "from-indigo-500 to-purple-600";
  };

  const getCategoryColor = (categoryName) => {
    const colorMap = {
      "Examination": "text-violet-500",
      "Event": "text-orange-500",
      "Holiday": "text-emerald-500",
      "Result": "text-sky-500",
      "Meeting": "text-rose-500",
      "Workshop": "text-amber-500",
      "Training": "text-indigo-500",
      "Seminar": "text-fuchsia-500",
      "General": "text-gray-500"
    };
    return colorMap[categoryName] || "text-indigo-500";
  };

  const getCategoryBgLight = (categoryName) => {
    const bgMap = {
      "Examination": "bg-violet-50",
      "Event": "bg-orange-50",
      "Holiday": "bg-emerald-50",
      "Result": "bg-sky-50",
      "Meeting": "bg-rose-50",
      "Workshop": "bg-amber-50",
      "Training": "bg-indigo-50",
      "Seminar": "bg-fuchsia-50",
      "General": "bg-gray-50"
    };
    return bgMap[categoryName] || "bg-indigo-50";
  };

  const totalNotices = category.reduce((sum, item) => sum + (item.count || 0), 0);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-5 sticky top-24 border border-gray-100">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
        <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-bold text-gray-800 text-lg">Categories</h2>
          <p className="text-xs text-gray-400">Filter by category</p>
        </div>
      </div>

      <button
        onClick={() => setselectcategory("all")}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-300 mb-2 ${
          selectcategory === "all"
            ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg"
            : "bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
            selectcategory === "all" ? "bg-white/20" : "bg-white shadow-sm"
          }`}>
            <LayoutGrid className={`w-4 h-4 ${selectcategory === "all" ? "text-white" : "text-cyan-500"}`} />
          </div>
          <div className="text-left">
            <span className={`text-sm font-semibold ${selectcategory === "all" ? "text-white" : "text-gray-800"}`}>
              All Notices
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
            selectcategory === "all" ? "bg-white/20 text-white" : "bg-indigo-100 text-indigo-600"
          }`}>
            {totalNotices}
          </span>
          <ChevronRight className={`w-3.5 h-3.5 ${selectcategory === "all" ? "text-white" : "text-gray-400"}`} />
        </div>
      </button>

      <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
        {category.map((item, index) => {
          const isActive = selectcategory === item._id;
          const gradient = getCategoryGradient(item._id);
          const colorClass = getCategoryColor(item._id);
          const bgLight = getCategoryBgLight(item._id);
          
          return (
            <button
              key={index}
              onClick={() => setselectcategory(item._id)}
              className={`group w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-300 ${
                isActive
                  ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                  : `hover:${bgLight} text-gray-600`
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? "bg-white/20" : bgLight
                }`}>
                  <div className={isActive ? "text-white" : colorClass}>
                    {getCategoryIcon(item._id)}
                  </div>
                </div>
                <span className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-700"}`}>
                  {item._id}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-lg ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}>
                  {item.count || 0}
                </span>
                <ChevronRight className={`w-3 h-3 transition-all duration-300 ${
                  isActive ? "text-white translate-x-0.5" : "text-gray-400 opacity-0 group-hover:opacity-100"
                }`} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-5 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-3.5 h-3.5 text-white" />
          </div>
          <h3 className="text-xs font-bold text-gray-800">Trending</h3>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {category.slice(0, 6).map((item, idx) => {
            const bgLight = getCategoryBgLight(item._id);
            const colorClass = getCategoryColor(item._id);
            return (
              <button
                key={idx}
                onClick={() => setselectcategory(item._id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 ${bgLight} rounded-lg text-xs font-medium transition-all duration-300 hover:shadow-sm`}
              >
                <span className={colorClass}>{getCategoryIcon(item._id)}</span>
                <span className="text-gray-700">{item._id}</span>
                <span className="text-gray-400 text-[10px]">{item.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-3 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 rounded-full">
          <Heart className="w-3 h-3 text-rose-400" />
          <span className="text-[10px] text-gray-500">Stay updated</span>
        </div>
      </div>

      <style>{`
        .custom-scroll::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366f1, #a855f7);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default Sidebar;