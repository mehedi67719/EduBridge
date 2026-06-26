import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Eye,
  Trash2,
  Edit,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Filter,
  Search,
  Plus,
  X,
  Award,
  BookOpen,
  User,
  Building2,
  FileArchive,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";

const MyUploadedassignment = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockAssignments = [
          {
            id: 1,
            title: "Class Test - Web Development",
            description: "This assignment focuses on developing a responsive and user-friendly web application using React and Tailwind CSS.",
            subject: "Web Development",
            type: "exam",
            deadline: "2026-06-26T20:47",
            totalMarks: 20,
            priority: "high",
            status: "published",
            submissions: 12,
            totalStudents: 25,
            attachments: 3,
            createdAt: "2026-06-18T14:48:21.137Z",
            targetRoles: ["student", "instructor"],
            createdBy: {
              fullName: "Mehedi Hassan",
              email: "meh67719@gmail.com",
              userType: "student",
              institutionName: "Dhaka Polytechnic Institute"
            }
          },
          {
            id: 2,
            title: "Database Design Project",
            description: "Design a complete database schema for a library management system including ER diagram, normalization, and SQL queries.",
            subject: "Database Management",
            type: "project",
            deadline: "2026-07-10T23:59",
            totalMarks: 50,
            priority: "medium",
            status: "published",
            submissions: 8,
            totalStudents: 30,
            attachments: 2,
            createdAt: "2026-06-15T10:30:00",
            targetRoles: ["student"],
            createdBy: {
              fullName: "Dr. Rahman",
              email: "rahman@example.com",
              userType: "instructor",
              institutionName: "Dhaka University"
            }
          },
          {
            id: 3,
            title: "Python Programming Assignment",
            description: "Write Python programs for data structures and algorithms including sorting, searching, and graph algorithms.",
            subject: "Programming",
            type: "assignment",
            deadline: "2026-06-30T23:59",
            totalMarks: 30,
            priority: "medium",
            status: "draft",
            submissions: 0,
            totalStudents: 20,
            attachments: 1,
            createdAt: "2026-06-20T09:15:00",
            targetRoles: ["student"],
            createdBy: {
              fullName: "Prof. Khan",
              email: "khan@example.com",
              userType: "instructor",
              institutionName: "BUET"
            }
          },
          {
            id: 4,
            title: "Mobile App Development - Final Project",
            description: "Develop a complete mobile application using React Native with Firebase backend integration.",
            subject: "Mobile Development",
            type: "project",
            deadline: "2026-07-15T23:59",
            totalMarks: 100,
            priority: "high",
            status: "published",
            submissions: 5,
            totalStudents: 15,
            attachments: 4,
            createdAt: "2026-06-10T14:20:00",
            targetRoles: ["student"],
            createdBy: {
              fullName: "Mehedi Hassan",
              email: "meh67719@gmail.com",
              userType: "student",
              institutionName: "Dhaka Polytechnic Institute"
            }
          },
          {
            id: 5,
            title: "Network Security Lab",
            description: "Implement network security protocols and analyze vulnerabilities in a simulated network environment.",
            subject: "Network Security",
            type: "lab",
            deadline: "2026-06-25T23:59",
            totalMarks: 25,
            priority: "low",
            status: "published",
            submissions: 18,
            totalStudents: 22,
            attachments: 2,
            createdAt: "2026-06-05T11:45:00",
            targetRoles: ["student", "instructor"],
            createdBy: {
              fullName: "Dr. Ahmed",
              email: "ahmed@example.com",
              userType: "instructor",
              institutionName: "DUET"
            }
          }
        ];
        
        setAssignments(mockAssignments);
      } catch (err) {
        setError(err.message || "Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchAssignments();
    }
  }, [authLoading]);

  const formatDate = (dateString) => {
    if (!dateString) return "No deadline";
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "Invalid date";
    }
  };

  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    if (diff < 0) return "⏰ Deadline Passed";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
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

  const getTypeIcon = (type) => {
    const icons = {
      exam: "📝",
      project: "🚀",
      assignment: "📚",
      lab: "🔬",
      quiz: "🧪",
    };
    return icons[type] || "📋";
  };

  const getTypeLabel = (type) => {
    const labels = {
      exam: "Exam",
      project: "Project",
      assignment: "Assignment",
      lab: "Lab",
      quiz: "Quiz",
    };
    return labels[type] || type;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const end = new Date(deadline);
    return now > end;
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || assignment.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setAssignments(assignments.filter(a => a.id !== selectedAssignment.id));
    setShowDeleteModal(false);
    setSelectedAssignment(null);
  };

  const stats = {
    total: assignments.length,
    published: assignments.filter(a => a.status === "published").length,
    draft: assignments.filter(a => a.status === "draft").length,
    totalSubmissions: assignments.reduce((sum, a) => sum + (a.submissions || 0), 0),
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
              📚 My Uploaded Assignments
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track all your uploaded assignments
            </p>
          </div>
          <Link
            to="/create-assignment"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <Plus size={18} />
            Create Assignment
          </Link>
        </div>

     
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 text-center">
            <p className="text-2xl font-bold text-indigo-600">{stats.total}</p>
            <p className="text-xs text-gray-500">Total Assignments</p>
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
            <p className="text-2xl font-bold text-purple-600">{stats.totalSubmissions}</p>
            <p className="text-xs text-gray-500">Total Submissions</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 mb-6 border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments by title, subject, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-sm bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

     
      {filteredAssignments.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700">No Assignments Found</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            {searchTerm || filterStatus !== "all" 
              ? "Try adjusting your search or filter criteria" 
              : "You haven't uploaded any assignments yet. Create your first assignment now!"}
          </p>
          {!searchTerm && filterStatus === "all" && (
            <Link
              to="/create-assignment"
              className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <Plus size={18} />
              Create Assignment
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAssignments.map((assignment) => {
            const deadlinePassed = isDeadlinePassed(assignment.deadline);
            const timeRemaining = getTimeRemaining(assignment.deadline);
            const submissionRate = assignment.totalStudents > 0 
              ? Math.round((assignment.submissions / assignment.totalStudents) * 100) 
              : 0;

            return (
              <div
                key={assignment.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <span className="text-lg">{getTypeIcon(assignment.type)}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                          {getTypeLabel(assignment.type)}
                        </span>
                        {getStatusBadge(assignment.status)}
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityBadge(assignment.priority)}`}>
                          {assignment.priority.charAt(0).toUpperCase() + assignment.priority.slice(1)} Priority
                        </span>
                        {deadlinePassed && assignment.status === "published" && (
                          <span className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                            <AlertCircle size={12} />
                            Deadline Passed
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-base font-bold text-gray-800">
                        {assignment.title}
                      </h3>
                      
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {assignment.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} className="text-indigo-500" />
                          {assignment.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <Award size={12} className="text-purple-500" />
                          {assignment.totalMarks} Marks
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={12} className="text-blue-500" />
                          {formatDate(assignment.deadline)}
                        </span>
                        {timeRemaining && !deadlinePassed && (
                          <span className="flex items-center gap-1 text-emerald-600">
                            <Clock size={12} />
                            {timeRemaining}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-2">
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-gray-400" />
                          <span className="text-xs text-gray-600">
                            {assignment.submissions}/{assignment.totalStudents} submissions
                          </span>
                          <span className="text-xs text-gray-400">
                            ({submissionRate}%)
                          </span>
                        </div>
                        {assignment.attachments > 0 && (
                          <span className="flex items-center gap-1 text-xs text-gray-500">
                            <FileArchive size={12} />
                            {assignment.attachments} files
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          Created: {formatDate(assignment.createdAt)}
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                        <User size={12} />
                        <span>{assignment.createdBy.fullName}</span>
                        <span>•</span>
                        <span>{assignment.createdBy.userType}</span>
                        <span>•</span>
                        <Building2 size={12} />
                        <span>{assignment.createdBy.institutionName}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ml-4 flex-shrink-0">
                      <Link
                        to={`/assignment/${assignment.id}`}
                        className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="View"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        to={`/edit-assignment/${assignment.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(assignment)}
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

                  {/* Progress Bar */}
                  {assignment.status === "published" && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500">Submission Progress</span>
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              submissionRate >= 80 ? "bg-emerald-500" :
                              submissionRate >= 50 ? "bg-amber-500" :
                              "bg-rose-500"
                            }`}
                            style={{ width: `${Math.min(submissionRate, 100)}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">{submissionRate}%</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedAssignment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Delete Assignment</h3>
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
                  Are you sure you want to delete the assignment:
                </p>
                <p className="text-sm font-semibold text-gray-900 mt-1">
                  "{selectedAssignment.title}"
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  This will also remove all submissions for this assignment.
                </p>
                <p className="text-xs text-rose-500 mt-1 font-medium">
                  ⚠️ This action cannot be undone.
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

export default MyUploadedassignment;