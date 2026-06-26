import React, { useState, useEffect } from "react";
import { Link } from "react-router";
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
  Download,
  Share2,
  Filter,
  Search,
  Plus,
  X,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";

const Myuploadednotice = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Mock data - Replace with actual API call
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockNotices = [
          {
            id: 1,
            title: "Semester Final Exam Schedule 2026",
            description: "The semester final examination schedule has been published. All students are requested to check their exam dates and venues.",
            type: "exam",
            priority: "high",
            targetAudience: ["students", "teachers"],
            createdAt: "2026-06-20T10:30:00",
            updatedAt: "2026-06-21T14:20:00",
            attachments: 3,
            views: 245,
            status: "published",
            department: "Computer Science",
            createdBy: {
              name: "Dr. Ahmed Hasan",
              role: "Principal",
            },
          },
          {
            id: 2,
            title: "Faculty Meeting - June 2026",
            description: "All faculty members are requested to attend the monthly faculty meeting on June 25, 2026 at 10:00 AM in the conference room.",
            type: "meeting",
            priority: "medium",
            targetAudience: ["teachers", "admin"],
            createdAt: "2026-06-18T09:15:00",
            updatedAt: "2026-06-19T16:45:00",
            attachments: 1,
            views: 89,
            status: "published",
            department: "Administration",
            createdBy: {
              name: "Prof. Rahman",
              role: "Dean",
            },
          },
          {
            id: 3,
            title: "Holiday Notice - Eid ul-Adha",
            description: "The institution will remain closed from June 28 to July 2, 2026 on the occasion of Eid ul-Adha. Classes will resume on July 3, 2026.",
            type: "holiday",
            priority: "high",
            targetAudience: ["students", "teachers", "staff"],
            createdAt: "2026-06-15T08:00:00",
            updatedAt: "2026-06-16T11:30:00",
            attachments: 0,
            views: 512,
            status: "published",
            department: "General",
            createdBy: {
              name: "Dr. Ahmed Hasan",
              role: "Principal",
            },
          },
          {
            id: 4,
            title: "Project Submission Deadline Extended",
            description: "The deadline for final year project submission has been extended to July 15, 2026. Students must submit their projects by the new deadline.",
            type: "academic",
            priority: "medium",
            targetAudience: ["students"],
            createdAt: "2026-06-14T13:45:00",
            updatedAt: "2026-06-14T13:45:00",
            attachments: 2,
            views: 178,
            status: "draft",
            department: "Computer Science",
            createdBy: {
              name: "Dr. Ahmed Hasan",
              role: "Principal",
            },
          },
          {
            id: 5,
            title: "Library Timing Update",
            description: "The library will remain open 24/7 from June 20, 2026 for exam preparation. Students can access the library at any time.",
            type: "general",
            priority: "low",
            targetAudience: ["students"],
            createdAt: "2026-06-12T11:00:00",
            updatedAt: "2026-06-13T09:20:00",
            attachments: 0,
            views: 67,
            status: "published",
            department: "General",
            createdBy: {
              name: "Prof. Khan",
              role: "Librarian",
            },
          },
        ];
        
        setNotices(mockNotices);
      } catch (err) {
        setError(err.message || "Failed to load notices");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchNotices();
    }
  }, [authLoading]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-rose-100 text-rose-700 border-rose-200",
      medium: "bg-amber-100 text-amber-700 border-amber-200",
      low: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return styles[priority] || styles.medium;
  };

  const getTypeIcon = (type) => {
    const icons = {
      exam: "📝",
      meeting: "🤝",
      holiday: "🎉",
      academic: "📚",
      general: "📢",
    };
    return icons[type] || "📋";
  };

  const getTypeLabel = (type) => {
    const labels = {
      exam: "Exam",
      meeting: "Meeting",
      holiday: "Holiday",
      academic: "Academic",
      general: "General",
    };
    return labels[type] || type;
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
    const labels = {
      students: "👨‍🎓 Students",
      teachers: "👨‍🏫 Teachers",
      staff: "👨‍💼 Staff",
      admin: "🛡️ Admin",
    };
    return audience.map(a => labels[a] || a).join(", ");
  };

  const filteredNotices = notices.filter((notice) => {
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || notice.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (notice) => {
    setSelectedNotice(notice);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setNotices(notices.filter(n => n.id !== selectedNotice.id));
    setShowDeleteModal(false);
    setSelectedNotice(null);
  };

  const stats = {
    total: notices.length,
    published: notices.filter(n => n.status === "published").length,
    draft: notices.filter(n => n.status === "draft").length,
    totalViews: notices.reduce((sum, n) => sum + (n.views || 0), 0),
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
      {/* Header */}
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

        {/* Stats */}
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
            <p className="text-2xl font-bold text-purple-600">{stats.totalViews}</p>
            <p className="text-xs text-gray-500">Total Views</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm bg-white"
            >
              <option value="all">All Types</option>
              <option value="exam">Exam</option>
              <option value="meeting">Meeting</option>
              <option value="holiday">Holiday</option>
              <option value="academic">Academic</option>
              <option value="general">General</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notices List */}
      {filteredNotices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700">No Notices Found</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            {searchTerm || filterType !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "You haven't uploaded any notices yet. Create your first notice now!"}
          </p>
          {!searchTerm && filterType === "all" && (
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
              key={notice.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="text-lg">{getTypeIcon(notice.type)}</span>
                      <h3 className="text-base font-bold text-gray-800 truncate">
                        {notice.title}
                      </h3>
                      {getStatusBadge(notice.status)}
                    </div>
                    
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {notice.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {formatDate(notice.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={12} />
                        {getAudienceLabel(notice.targetAudience)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {notice.views} views
                      </span>
                      {notice.attachments > 0 && (
                        <span className="flex items-center gap-1">
                          <FileText size={12} />
                          {notice.attachments} files
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(notice.priority)}`}>
                        {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                      </span>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <span>By: {notice.createdBy.name}</span>
                      <span>•</span>
                      <span>{notice.createdBy.role}</span>
                      {notice.department && (
                        <>
                          <span>•</span>
                          <span>{notice.department}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                    <Link
                      to={`/notice/${notice.id}`}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                      title="View"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      to={`/edit-notice/${notice.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(notice)}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedNotice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Delete Notice</h3>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle size={20} className="text-rose-600" />
              </div>
              <div>
                <p className="text-sm text-gray-700">
                  Are you sure you want to delete the notice:
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  "{selectedNotice.title}"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  This action cannot be undone.
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Myuploadednotice;