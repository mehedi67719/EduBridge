import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import {
  FileText,
  Eye,
  Trash2,
  Edit,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Search,
  Plus,
  Mail,
  Building2,
  User,
  Image,
  BookOpen,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";
import { myUploadedNotice } from "../../../API/Notice/myuploadednotice";
import { deleteNotice } from "../../../API/Notice/deletenotice";

const Myuploadednotice = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageView, setImageView] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      if (!dbUser?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await myUploadedNotice(dbUser.email);

        let data = [];
        if (response && response.data) {
          data = Array.isArray(response.data) ? response.data : [response.data];
        } else if (Array.isArray(response)) {
          data = response;
        } else if (response && typeof response === "object") {
          data = [response];
        }

        setNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
        setError(err.message || "Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchNotices();
    }
  }, [dbUser?.email, authLoading]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-rose-100 text-rose-700 border-rose-200",
      medium: "bg-amber-100 text-amber-700 border-amber-200",
      low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return styles[priority] || styles.medium;
  };

  const getStatusBadge = (status) => {
    if (status === "published") {
      return (
        <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
          <CheckCircle size={12} />
          Published
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
        <Clock size={12} />
        Draft
      </span>
    );
  };

  const getAudienceLabel = (audience) => {
    if (!audience || !Array.isArray(audience)) return "All";
    const labels = {
      students: "👨‍🎓 Students",
      teachers: "👨‍🏫 Teachers",
      staff: "👨‍💼 Staff",
      admin: "🛡️ Admin",
      public: "🌍 Public",
      principal: "👨‍💼 Principal",
      chip_instructor: "💻 CHIP Instructor",
      craft_instructor: "🔧 Craft Instructor",
      junior_instructor: "📘 Junior Instructor",
      instructor: "👨‍🏫 Instructor",
    };
    return audience.map(a => labels[a] || a).join(", ");
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = (notice.noticeTitle || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notice.noticeContent || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (noticeId, noticeTitle) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      html: `You are about to delete the notice: <br /> <strong>"${noticeTitle}"</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteNotice(noticeId);
        
        if (response.success) {
          setNotices(notices.filter(n => n._id !== noticeId));
          
          Swal.fire({
            title: 'Deleted!',
            text: 'Notice has been deleted successfully.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: response.message || 'Failed to delete notice.',
            icon: 'error',
            confirmButtonColor: '#3085d6',
          });
        }
      } catch (error) {
        console.error("Delete error:", error);
        Swal.fire({
          title: 'Error!',
          text: error.message || 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };

  const openImageView = (imageUrl) => {
    setImageView(imageUrl);
  };

  const closeImageView = () => {
    setImageView(null);
  };

  const stats = {
    total: notices.length,
    published: notices.filter(n => n.status === "published").length,
    draft: notices.filter(n => n.status === "draft").length,
    totalImages: notices.reduce((sum, n) => sum + (n.imageUrls?.length || 0), 0),
  };

  if (loading || authLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-12 flex justify-center items-center min-h-[400px] border border-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
        <ErrorComponent error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              📢 My Uploaded Notices
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track all your published notices
            </p>
          </div>
          <Link
            to="/create-notice"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus size={18} />
            Create New Notice
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Notices</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
            <p className="text-xs text-gray-500">Published</p>
          </div>
          <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-amber-600">{stats.draft}</p>
            <p className="text-xs text-gray-500">Drafts</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.totalImages}</p>
            <p className="text-xs text-gray-500">Total Images</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
            />
          </div>
          <div className="text-xs text-gray-400">
            {filteredNotices.length} notice{filteredNotices.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700">No Notices Found</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            {searchTerm
              ? "Try adjusting your search criteria"
              : "You haven't uploaded any notices yet. Create your first notice now!"}
          </p>
          {!searchTerm && (
            <Link
              to="/create-notice"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Plus size={18} />
              Create Notice
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {notice.noticeTitle}
                      </h3>
                      {getStatusBadge(notice.status)}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(notice.priority)}`}>
                        {notice.priority ? notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1) : "Medium"} Priority
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {truncateText(notice.noticeContent, 200)}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(notice.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {getAudienceLabel(notice.targetRoles)}
                      </span>
                      {notice.category && (
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {notice.category}
                        </span>
                      )}
                      {notice.imageUrls?.length > 0 && (
                        <span className="flex items-center gap-1">
                          <Image size={12} />
                          {notice.imageUrls.length} image{notice.imageUrls.length > 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <User size={12} className="text-gray-400" />
                      <span>{notice.createdBy?.fullName || "Unknown"}</span>
                      <span>•</span>
                      <span>{notice.createdBy?.userType || "User"}</span>
                      {notice.createdBy?.institutionName && (
                        <>
                          <span>•</span>
                          <Building2 size={12} className="text-gray-400" />
                          <span>{notice.createdBy.institutionName}</span>
                        </>
                      )}
                      {notice.createdBy?.email && (
                        <>
                          <span>•</span>
                          <Mail size={12} className="text-gray-400" />
                          <span>{notice.createdBy.email}</span>
                        </>
                      )}
                    </div>

                    {notice.imageUrls && notice.imageUrls.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {notice.imageUrls.map((url, index) => (
                          <div
                            key={index}
                            className="relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => openImageView(url)}
                          >
                            <img
                              src={url}
                              alt={`Notice image ${index + 1}`}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                              <span className="text-white text-xs font-medium">🔍</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <Link
                      to={`/notice/details/${notice._id}`}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/edit-notice/${notice._id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(notice._id, notice.noticeTitle)}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button
                      className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-all"
                      title="More"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {imageView && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageView}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={closeImageView}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors text-3xl"
            >
              ✕
            </button>
            <img
              src={imageView}
              alt="Full view"
              className="w-full h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Myuploadednotice;