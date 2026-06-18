import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  User,
  Award,
  Calendar,
  FileText,
  Upload,
  MessageSquare,
  Lock,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  FolderOpen,
  Eye,
  Link2,
  Users,
  Building2,
  Tag,
  FileArchive,
  ExternalLink,
  Image,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";
import { loadAssignmentDetails } from "../../../API/Assignment/Loadassignmentdetels";

const Assignmentdetels = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dbUser, loading: authLoading } = Useauth();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      if (!id) {
        setError("Assignment ID is required");
        return;
      }
      const role = dbUser?.userType || "public";
      const data = await loadAssignmentDetails(id, role);
      setAssignment(data?.data || data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load assignment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && dbUser) {
      fetchData();
    }
  }, [id, authLoading, dbUser]);

  const formatDate = (date) => {
    if (!date) return "No deadline";
    try {
      return new Date(date).toLocaleDateString("en-US", {
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
    if (diff < 0) return "Past deadline";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const end = new Date(deadline);
    return now > end;
  };

  const getStatusConfig = (status) => {
    const configs = {
      published: {
        icon: <AlertCircle size={16} />,
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "Published",
      },
      pending: {
        icon: <Clock size={16} />,
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "Pending",
      },
      submitted: {
        icon: <CheckCircle size={16} />,
        bg: "bg-blue-50",
        text: "text-blue-700",
        border: "border-blue-200",
        label: "Submitted",
      },
      graded: {
        icon: <Star size={16} />,
        bg: "bg-purple-50",
        text: "text-purple-700",
        border: "border-purple-200",
        label: "Graded",
      },
    };
    return configs[status] || configs.published;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: {
        bg: "bg-rose-50",
        text: "text-rose-700",
        border: "border-rose-200",
        label: "High",
      },
      medium: {
        bg: "bg-amber-50",
        text: "text-amber-700",
        border: "border-amber-200",
        label: "Medium",
      },
      low: {
        bg: "bg-emerald-50",
        text: "text-emerald-700",
        border: "border-emerald-200",
        label: "Low",
      },
    };
    return configs[priority] || configs.medium;
  };

  const handleSubmitClick = () => {
    if (!isDeadlinePassed(assignment.deadline)) {
      navigate(`/assignment/submit/${id}`);
    }
  };

  const isImageFile = (fileName) => {
    if (!fileName) return false;
    const imageExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".gif",
      ".webp",
      ".bmp",
      ".svg",
    ];
    return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  const subjectName = assignment?.subjects?.[0]?.name || "General";
  const statusConfig = assignment ? getStatusConfig(assignment.status) : null;
  const priorityConfig = assignment ? getPriorityConfig(assignment.priority) : null;
  const timeRemaining = assignment ? getTimeRemaining(assignment.deadline) : null;
  const deadlinePassed = assignment ? isDeadlinePassed(assignment.deadline) : false;

  const renderContent = () => {
    if (loading || authLoading) {
      return (
        <div className="p-12 flex justify-center items-center min-h-[400px]">
          <Loading />
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-8">
          <ErrorComponent error={error} onRetry={fetchData} />
        </div>
      );
    }

    if (!assignment) {
      return (
        <div className="p-12 text-center">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Assignment Not Found
          </h3>
          <p className="text-gray-500 mb-6">
            The assignment you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/assignment"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
          >
            <ArrowLeft size={18} />
            Back to Assignments
          </Link>
        </div>
      );
    }

    return (
      <div className="p-6 md:p-8">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Eye size={18} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Overview</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {assignment.assignmentDescription ||
                  "No description provided."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-700">
                  <CheckCircle size={18} />
                  <span className="text-sm font-medium">Status</span>
                </div>
                <p className="text-emerald-900 font-semibold mt-1">
                  {statusConfig.label}
                </p>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 text-purple-700">
                  <Award size={18} />
                  <span className="text-sm font-medium">Total Marks</span>
                </div>
                <p className="text-purple-900 font-semibold mt-1">
                  {assignment.totalMarks}
                </p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700">
                  <Calendar size={18} />
                  <span className="text-sm font-medium">Deadline</span>
                </div>
                <p className="text-blue-900 font-semibold mt-1">
                  {formatDate(assignment.deadline)}
                </p>
              </div>
              <div
                className={`${deadlinePassed ? "bg-rose-50 border-rose-100" : "bg-emerald-50 border-emerald-100"} rounded-2xl p-4 border`}
              >
                <div
                  className={`flex items-center gap-2 ${deadlinePassed ? "text-rose-700" : "text-emerald-700"}`}
                >
                  <Clock size={18} />
                  <span className="text-sm font-medium">
                    Time Remaining
                  </span>
                </div>
                <p
                  className={`font-semibold mt-1 ${deadlinePassed ? "text-rose-900" : "text-emerald-900"}`}
                >
                  {deadlinePassed
                    ? "⏰ Deadline Passed"
                    : timeRemaining || "No deadline set"}
                </p>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center gap-2 mb-3">
                <Users size={18} className="text-indigo-600" />
                <h3 className="text-sm font-semibold text-indigo-900">
                  Target Roles
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {assignment.targetRoles?.map((role, index) => (
                  <span
                    key={index}
                    className="bg-white/70 backdrop-blur-sm text-indigo-700 px-3 py-1 rounded-full text-xs font-medium border border-indigo-200"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {assignment.assignmentTypes?.length > 0 && (
              <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={18} className="text-amber-600" />
                  <h3 className="text-sm font-semibold text-amber-900">
                    Assignment Types
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {assignment.assignmentTypes.map((type, index) => (
                    <span
                      key={index}
                      className="bg-white/70 backdrop-blur-sm text-amber-700 px-3 py-1 rounded-full text-xs font-medium border border-amber-200"
                    >
                      {type.name || type}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {assignment.referenceLinks?.length > 0 && (
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <Link2 size={18} className="text-blue-600" />
                  <h3 className="text-sm font-semibold text-blue-900">
                    Reference Links
                  </h3>
                </div>
                <div className="space-y-2">
                  {assignment.referenceLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-700 hover:text-blue-800 text-sm bg-white/70 backdrop-blur-sm px-4 py-2 rounded-xl border border-blue-200 hover:shadow transition-all"
                    >
                      <ExternalLink size={14} />
                      <span className="truncate">{link}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
              <FolderOpen size={18} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Resources</h2>
          </div>

          <div className="space-y-4">
            {assignment.attachments?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignment.attachments.map((file, i) => {
                  const isImage = isImageFile(file.name);
                  return (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all group"
                    >
                      {isImage ? (
                        <div className="relative aspect-video bg-gray-100">
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "";
                              e.target.className = "hidden";
                              e.target.parentElement.innerHTML = `
                              <div class="flex items-center justify-center h-full bg-gray-100">
                                <div class="text-center">
                                  <Image size={32} class="text-gray-400 mx-auto mb-2" />
                                  <p class="text-xs text-gray-500">Failed to load image</p>
                                </div>
                              </div>
                            `;
                            }}
                          />
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                            {file.type || "Image"}
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center p-4 gap-3">
                          <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <FileArchive
                              size={20}
                              className="text-emerald-600"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {file.name || `File ${i + 1}`}
                            </p>
                            <p className="text-xs text-gray-500">
                              {file.type || "Unknown"} •{" "}
                              {file.size
                                ? `${(file.size / 1024).toFixed(1)} KB`
                                : "Unknown"}
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="px-4 pb-4 pt-2">
                        <p className="text-xs font-medium text-gray-700 truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {file.size
                            ? `${(file.size / 1024).toFixed(1)} KB`
                            : "Unknown size"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <FolderOpen
                  size={48}
                  className="text-gray-300 mx-auto mb-3"
                />
                <p className="text-gray-500">
                  No resources attached to this assignment.
                </p>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center">
              <MessageSquare size={18} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Discussion
            </h2>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {assignment.comments?.length || 0}
            </span>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="space-y-4">
              {assignment.comments?.length > 0 ? (
                assignment.comments.map((comment, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={16} className="text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-white rounded-xl p-3 border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            {comment.user?.name || "Anonymous"}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <MessageSquare
                    size={48}
                    className="text-gray-300 mx-auto mb-3"
                  />
                  <p className="text-gray-400 text-sm">
                    No comments yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {assignment.secretCode && (
          <div className="mt-6 bg-rose-50 rounded-2xl p-4 border border-rose-200">
            <div className="flex items-center gap-2 text-rose-700">
              <Lock size={18} />
              <span className="text-sm font-medium">Secret Code</span>
            </div>
            <p className="text-rose-900 font-mono text-sm mt-1">
              {assignment.secretCode}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="container">
        <Link
          to="/assignment"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Assignments
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-8 md:p-10 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {assignment && statusConfig && (
                  <span
                    className={`${statusConfig.bg} ${statusConfig.text} px-3 py-1.5 rounded-full text-xs font-medium border ${statusConfig.border} backdrop-blur-sm flex items-center gap-1.5`}
                  >
                    {statusConfig.icon}
                    {statusConfig.label}
                  </span>
                )}

                {assignment && priorityConfig && (
                  <span
                    className={`${priorityConfig.bg} ${priorityConfig.text} px-3 py-1.5 rounded-full text-xs font-medium border ${priorityConfig.border} backdrop-blur-sm`}
                  >
                    {priorityConfig.label} Priority
                  </span>
                )}

                {assignment?.isPrivate && (
                  <span className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/10">
                    <Lock size={14} />
                    Private
                  </span>
                )}

                {assignment && timeRemaining && (
                  <span
                    className={`${deadlinePassed ? "bg-rose-500/20" : "bg-emerald-500/20"} backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border border-white/10`}
                  >
                    <Clock size={14} />
                    {deadlinePassed ? "Deadline Passed" : timeRemaining}
                  </span>
                )}
              </div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
                    {assignment?.assignmentTitle || "Loading..."}
                  </h1>
                </div>

                {assignment && (
                  <button
                    onClick={handleSubmitClick}
                    disabled={deadlinePassed}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 whitespace-nowrap ${
                      deadlinePassed
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-white text-indigo-600 hover:bg-indigo-50"
                    }`}
                  >
                    <Upload size={18} />
                    {deadlinePassed ? "Submission Closed" : "Submit Assignment"}
                  </button>
                )}
              </div>

              {assignment && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <User size={16} className="text-indigo-300" />
                    <span className="truncate">
                      {assignment.createdBy?.fullName || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <Building2 size={16} className="text-indigo-300" />
                    <span className="truncate">
                      {assignment.createdBy?.institutionName || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <BookOpen size={16} className="text-indigo-300" />
                    <span>{subjectName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-indigo-100">
                    <Award size={16} className="text-indigo-300" />
                    <span>{assignment.totalMarks} Marks</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Assignmentdetels;