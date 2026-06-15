import React from "react";
import { useNavigate } from "react-router";

const Content = ({ notices = [] }) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "high":
        return "🔴";
      case "medium":
        return "🟡";
      case "low":
        return "🟢";
      default:
        return "⚪";
    }
  };

  const handleViewDetails = (id) => {
    if (!id) {
      console.error("Notice ID is missing");
      return;
    }
    navigate(`/notice/details/${id}`);
  };

  if (notices.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="text-gray-500">No notices found</p>
      </div>
    );
  }

  return (
    <div className="p-4 grid gap-4">
      {notices.map((item) => (
        <div
          key={item._id || item.noticeTitle}
          className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 hover:border-indigo-200 cursor-pointer group"
          onClick={() => handleViewDetails(item._id)}
        >
          <div className="flex justify-between items-start gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{getPriorityIcon(item.priority)}</span>
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {item.noticeTitle}
                </h2>
              </div>
            </div>

            <span
              className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                item.priority
              )}`}
            >
              {item.priority}
            </span>
          </div>

          <div className="mt-2 flex gap-2 flex-wrap">
            <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full">
              📁 {item.category}
            </span>

            {item.targetRoles?.slice(0, 2).map((role, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                👤 {role}
              </span>
            ))}
            {item.targetRoles?.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{item.targetRoles.length - 2} more
              </span>
            )}
          </div>

          <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-2">
            {item.noticeContent}
          </p>

          <div className="mt-4 flex justify-between items-center">
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                📅 {new Date(item.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                📍 Status: {item.status}
              </span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleViewDetails(item._id);
              }}
              className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 rounded-lg transition-all duration-300 flex items-center gap-2"
            >
              <span>View Details</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Content;