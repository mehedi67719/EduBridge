import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  Tag, 
  AlertCircle,
  FileText,
  Paperclip,
  Image,
  Clock,
  User,
  Eye
} from "lucide-react";
import { noticedetels } from "../../../API/Notice/Noticedetels";

const NoticeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticeDetails = async () => {
      if (!id) {
        setError("Notice ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await noticedetels(id);
        setNotice(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching notice:", err);
        setError("Failed to load notice details");
        setNotice(null);
      } finally {
        setLoading(false);
      }
    };
    fetchNoticeDetails();
  }, [id]);

  const getPriorityColor = (priority) => {
    if (!priority) return "bg-gray-100 text-gray-600";
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityIcon = (priority) => {
    if (!priority) return "⚪";
    switch (priority.toLowerCase()) {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-3 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading notice details...</p>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-xl p-8 max-w-md">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-500 text-lg mb-4">{error || "Notice not found"}</p>
          <button
            onClick={() => navigate("/notice")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
          >
            Back to Notices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50/30 py-8">
      <div className="container">
        <button
          onClick={() => navigate("/notice")}
          className="mb-6 flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Notices
        </button>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{getPriorityIcon(notice.priority)}</span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full bg-white/20 backdrop-blur-sm`}>
                {notice.priority || "Normal"} priority
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              {notice.noticeTitle || "Untitled Notice"}
            </h1>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-400">Published Date</p>
                  <p className="font-medium">
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-400">Published Time</p>
                  <p className="font-medium">
                    {notice.createdAt ? new Date(notice.createdAt).toLocaleTimeString() : "N/A"}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Tag className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="font-medium capitalize">{notice.category || "Uncategorized"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Eye className="w-4 h-4 text-indigo-500" />
                <div>
                  <p className="text-xs text-gray-400">Status</p>
                  <p className="font-medium capitalize text-green-600">{notice.status || "Draft"}</p>
                </div>
              </div>
            </div>

            {notice.targetRoles && notice.targetRoles.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-500" />
                  Target Audience
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {notice.targetRoles.map((role, index) => (
                    <span
                      key={index}
                      className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full"
                    >
                      👤 {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {notice.imageUrls && notice.imageUrls.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Image className="w-4 h-4 text-indigo-500" />
                  Attached Images ({notice.imageUrls.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notice.imageUrls.map((imageUrl, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={imageUrl}
                        alt={`Notice image ${index + 1}`}
                        className="w-full h-64 object-cover rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found";
                        }}
                      />
                      <button
                        onClick={() => window.open(imageUrl, '_blank')}
                        className="absolute bottom-2 right-2 bg-black/50 hover:bg-black/70 text-white px-3 py-1 rounded-lg text-xs transition-colors"
                      >
                        View Full Size
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-500" />
                Notice Details
              </h3>
              <div className="bg-gray-50 rounded-xl p-5">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                  {notice.noticeContent || "No content available"}
                </p>
              </div>
            </div>

            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-indigo-500" />
                  Attachments ({notice.attachments.length})
                </h3>
                <div className="space-y-2">
                  {notice.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      download
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors group"
                    >
                      <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-indigo-500" />
                      <span className="text-sm text-gray-600 group-hover:text-indigo-600">
                        {attachment.name || `Attachment ${index + 1}`}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {notice.createdBy && Object.keys(notice.createdBy).length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <User className="w-4 h-4 text-indigo-500" />
                  <span>Created by: </span>
                  <span className="font-medium text-gray-700">
                    {notice.createdBy.name || notice.createdBy.email || "Administrator"}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                🖨️ Print
              </button>
              <button
                onClick={() => navigate("/notice")}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                Browse More Notices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeDetails;