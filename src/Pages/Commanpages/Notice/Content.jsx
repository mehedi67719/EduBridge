import React, { useState } from "react";

const Content = ({ notices = [] }) => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  return (
    <>
      <div className="p-4 grid gap-4">
        {notices.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500">No notices found</p>
          </div>
        ) : (
          notices.map((item) => (
            <div
              key={item._id || item.noticeTitle}
              className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-5 hover:border-indigo-200"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getPriorityIcon(item.priority)}</span>
                    <h2 className="text-lg font-semibold text-gray-800">
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

              {/* Category and Roles */}
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

              {/* Content Preview */}
              <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-2">
                {item.noticeContent}
              </p>

              {/* Footer with Date and View Button */}
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
                  onClick={() => openModal(item)}
                  className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-white border border-indigo-600 hover:bg-indigo-600 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <span>View Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for View Details */}
      {isModalOpen && selectedNotice && (
        <div className="fixed inset-0 z-50 overflow-y-auto" onClick={closeModal}>
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={closeModal}></div>
          
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div 
              className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{getPriorityIcon(selectedNotice.priority)}</span>
                  <h3 className="text-xl font-bold text-gray-800">
                    {selectedNotice.noticeTitle}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                {/* Priority Badge */}
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(selectedNotice.priority)}`}>
                    {selectedNotice.priority} priority
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(selectedNotice.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* Category */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Category</h4>
                  <span className="inline-block text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full">
                    📁 {selectedNotice.category}
                  </span>
                </div>

                {/* Target Roles */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Target Audience</h4>
                  <div className="flex gap-2 flex-wrap">
                    {selectedNotice.targetRoles?.map((role, index) => (
                      <span
                        key={index}
                        className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full"
                      >
                        👤 {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Notice Details</h4>
                  <p className="text-gray-700 leading-relaxed">
                    {selectedNotice.noticeContent}
                  </p>
                </div>

                {/* Status */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Status</h4>
                  <span className="inline-block text-sm bg-green-50 text-green-600 px-3 py-1 rounded-full">
                    {selectedNotice.status}
                  </span>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-100 p-4 flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Content;