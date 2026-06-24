import React from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  Users,
  Tag,
  Eye,
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Clock,
  MessageCircle,
  TrendingUp,
  Sparkles,
} from "lucide-react";

const Content = ({ notices = [], currentPage, totalPages, onPageChange }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/30";
      case "medium":
        return "bg-gradient-to-r from-amber-500 to-yellow-500 text-white shadow-lg shadow-amber-500/30";
      case "low":
        return "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/30";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-500/30";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "⚡";
      case "medium":
        return "📌";
      case "low":
        return "✨";
      default:
        return "📄";
    }
  };

  const getCategoryGradient = (category) => {
    const gradients = {
      general: "from-blue-500 to-cyan-500",
      examination: "from-violet-500 to-purple-500",
      event: "from-orange-500 to-red-500",
      holiday: "from-emerald-500 to-teal-500",
      result: "from-sky-500 to-blue-500",
      meeting: "from-rose-500 to-pink-500",
      training: "from-indigo-500 to-blue-500",
      seminar: "from-fuchsia-500 to-pink-500",
      career: "from-green-500 to-emerald-500",
      workshop: "from-amber-500 to-yellow-500"
    };
    return gradients[category?.toLowerCase()] || "from-indigo-500 to-purple-500";
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      general: "📢",
      examination: "📝",
      event: "🎉",
      holiday: "🎊",
      result: "🏆",
      meeting: "🤝",
      training: "💪",
      seminar: "🎓",
      career: "💼",
      workshop: "🔧"
    };
    return emojis[category?.toLowerCase()] || "📋";
  };

  const handleViewDetails = (id) => {
    if (!id) return;
    navigate(`/notice/details/${id}`);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <button
          key="first"
          onClick={() => onPageChange(1)}
          className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pages.push(
          <span key="dots1" className="px-2 text-gray-400">...</span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105 ${
            currentPage === i
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30"
              : "border border-gray-200 hover:bg-gray-50 hover:border-indigo-300"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="dots2" className="px-2 text-gray-400">...</span>
        );
      }
      pages.push(
        <button
          key="last"
          onClick={() => onPageChange(totalPages)}
          className="px-3 py-1.5 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (!notices.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="relative">
          <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center animate-pulse">
            <svg className="w-16 h-16 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-2">No notices found</h3>
        <p className="text-gray-500 text-center max-w-sm">
          Stay tuned! New announcements and updates will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-5">
      {notices.map((item, index) => (
        <div
          key={item._id}
          className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-gray-100 hover:border-indigo-200"
          onClick={() => handleViewDetails(item._id)}
          style={{
            animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
          }}
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="p-6">
            <div className="flex justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 transform group-hover:scale-110 transition-transform duration-300">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 line-clamp-1">
                    {item.noticeTitle}
                  </h2>
                </div>
              </div>

              <div className={`px-3 py-1.5 text-xs font-bold rounded-full ${getPriorityColor(item.priority)} flex items-center gap-1.5 shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                <span className="text-sm">{getPriorityIcon(item.priority)}</span>
                <span>{item.priority?.toUpperCase() || "NORMAL"}</span>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap mb-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-gradient-to-r ${getCategoryGradient(item.category)} text-white shadow-md`}>
                <span className="text-sm">{getCategoryEmoji(item.category)}</span>
                {item.category || "General"}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-100">
                <Tag className="w-3.5 h-3.5" />
                {item.category || "General"}
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-purple-50 text-purple-700 rounded-full border border-purple-100">
                <Users className="w-3.5 h-3.5" />
                {item.targetRoles?.length || 0} roles
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-full border border-green-100">
                <Eye className="w-3.5 h-3.5" />
                {item.status || "Active"}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-700 transition-colors duration-300">
                {item.noticeContent}
              </p>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  }) : "N/A"}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1.5 rounded-lg">
                  <Clock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{item.createdAt ? new Date(item.createdAt).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "N/A"}</span>
                </div>
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails(item._id);
                }}
                className="group/btn px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all duration-300 flex items-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30"
              >
                <span>Read More</span>
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="flex flex-col items-center gap-4 pt-6 pb-2 border-t border-gray-200">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-1.5">
              {renderPageNumbers()}
            </div>

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-500" />
              Page {currentPage} of {totalPages}
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-indigo-500" />
              {notices.length} notices on this page
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Content;