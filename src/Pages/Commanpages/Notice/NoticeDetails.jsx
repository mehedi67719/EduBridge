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
  Eye,
  Sparkles,
  Heart,
  Share2,
  Bookmark,
  ChevronRight,
  Download,
  ZoomIn,
  MessageCircle,
  TrendingUp
} from "lucide-react";
import { noticedetels } from "../../../API/Notice/Noticedetels";

const NoticeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [notice, setNotice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    if (!priority) return "⚪";
    switch (priority.toLowerCase()) {
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

  const getPriorityLabel = (priority) => {
    if (!priority) return "Normal";
    switch (priority.toLowerCase()) {
      case "high":
        return "High Priority";
      case "medium":
        return "Medium Priority";
      case "low":
        return "Low Priority";
      default:
        return "Normal";
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

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-indigo-200 border-t-indigo-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-indigo-400 animate-pulse" />
            </div>
          </div>
          <p className="text-gray-500 font-medium">Loading notice details...</p>
          <p className="text-sm text-gray-400 mt-1">Please wait</p>
        </div>
      </div>
    );
  }

  if (error || !notice) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-3xl shadow-2xl p-10 max-w-md transform hover:scale-105 transition-transform duration-500">
          <div className="relative inline-block">
            <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-sm">!</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-500 mb-6">{error || "Notice not found"}</p>
          <button
            onClick={() => navigate("/notice")}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 flex items-center gap-2 mx-auto"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Notices
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/notice")}
            className="group flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-all duration-300 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-gray-100"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Notices</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="p-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200 group"
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-indigo-600 text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'} transition-colors duration-300`} />
            </button>
            <button
              onClick={() => window.print()}
              className="p-2.5 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-indigo-200 group"
            >
              <Share2 className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors duration-300" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:shadow-3xl transition-shadow duration-500">
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-4 py-1.5 text-sm font-bold rounded-full ${getPriorityColor(notice.priority)} flex items-center gap-2 shadow-lg`}>
                  <span className="text-base">{getPriorityIcon(notice.priority)}</span>
                  {getPriorityLabel(notice.priority)}
                </span>
                <span className={`px-4 py-1.5 text-sm font-bold rounded-full bg-gradient-to-r ${getCategoryGradient(notice.category)} text-white shadow-lg flex items-center gap-2`}>
                  <span className="text-base">{getCategoryEmoji(notice.category)}</span>
                  {notice.category || "General"}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-3">
                {notice.noticeTitle || "Untitled Notice"}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(notice.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(notice.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                  <Eye className="w-4 h-4" />
                  <span className="capitalize">{notice.status || "Draft"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {notice.targetRoles && notice.targetRoles.length > 0 && (
              <div className="mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base">Target Audience</span>
                  <span className="ml-auto text-xs bg-white px-3 py-1 rounded-full shadow-sm">
                    {notice.targetRoles.length} roles
                  </span>
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {notice.targetRoles.map((role, index) => (
                    <span
                      key={index}
                      className="text-sm bg-white text-indigo-600 px-4 py-2 rounded-xl shadow-sm border border-indigo-100 hover:shadow-md transition-all duration-300 hover:border-indigo-300 hover:scale-105 transform cursor-default"
                    >
                      <span className="mr-1.5">👤</span>
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {notice.imageUrls && notice.imageUrls.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <Image className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base">Attached Images</span>
                  <span className="ml-auto text-xs bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                    {notice.imageUrls.length} images
                  </span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {notice.imageUrls.map((imageUrl, index) => (
                    <div 
                      key={index} 
                      className="relative group cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img
                        src={imageUrl}
                        alt={`Notice image ${index + 1}`}
                        className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/600x400/e0e7ff/6366f1?text=📷+Image+Not+Found";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                        <span className="text-white text-sm font-medium">Image {index + 1}</span>
                        <button className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition-colors">
                          <ZoomIn className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                  <FileText className="w-4 h-4 text-white" />
                </div>
                <span className="text-base">Notice Details</span>
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-indigo-50/50 rounded-2xl p-6 border border-gray-100 hover:border-indigo-200 transition-colors duration-300">
                <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
                  {notice.noticeContent || "No content available"}
                </p>
              </div>
            </div>

            {notice.attachments && notice.attachments.length > 0 && (
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <Paperclip className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-base">Attachments</span>
                  <span className="ml-auto text-xs bg-gray-100 px-3 py-1 rounded-full shadow-sm">
                    {notice.attachments.length} files
                  </span>
                </h3>
                <div className="space-y-2">
                  {notice.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.url}
                      download
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-all duration-300 group border border-gray-100 hover:border-indigo-200 hover:shadow-md"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Paperclip className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors duration-300">
                            {attachment.name || `Attachment ${index + 1}`}
                          </p>
                          <p className="text-xs text-gray-400">Click to download</p>
                        </div>
                      </div>
                      <Download className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 group-hover:translate-y-0.5 transition-all duration-300" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t-2 border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/30">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Created by</p>
                    <p className="font-semibold text-gray-800">
                      {notice.createdBy?.name || notice.createdBy?.email || "Administrator"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 group">
                    <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-500 group-hover:scale-110 transition-all duration-300" />
                    <span className="text-sm text-gray-600 group-hover:text-indigo-600">Like</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-indigo-50 rounded-xl transition-all duration-300 border border-gray-100 hover:border-indigo-200 group">
                    <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-all duration-300" />
                    <span className="text-sm text-gray-600 group-hover:text-indigo-600">Comment</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3 justify-end">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 text-gray-600 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-indigo-300 transition-all duration-300 flex items-center gap-2 group"
              >
                <span className="text-lg">🖨️</span>
                <span>Print</span>
              </button>
              <button
                onClick={() => navigate("/notice")}
                className="px-8 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/30 flex items-center gap-2 group"
              >
                <span>Browse More Notices</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-indigo-400 transition-colors text-sm flex items-center gap-2"
            >
              Close
              <span className="text-xl">✕</span>
            </button>
            <img
              src={selectedImage}
              alt="Full size"
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default NoticeDetails;