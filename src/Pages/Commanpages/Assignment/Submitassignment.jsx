import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import {
  ArrowLeft,
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  Paperclip,
  Calendar,
  Clock,
  User,
  BookOpen,
  Award,
  Send,
  Lock,
  Building2,
  Image,
  Loader2,
  Cloud,
  Mail,
  Briefcase,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";
import { loadAssignmentDetails } from "../../../API/Assignment/Loadassignmentdetels";
import { submitAssignment } from "../../../API/Assignment/Submitassignment";
import useCloudinaryUpload from "../../../Hooks/useCloudinaryUpload";

const Submitassignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dbUser, loading: authLoading } = Useauth();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { uploadImage, loading: uploadLoading, error: uploadError } = useCloudinaryUpload();

  const getUserTypeLabel = (userType) => {
    const types = {
      student: "Student",
      instructor: "Instructor",
      chip_instructor: "CHIP Instructor",
      craft_instructor: "Craft Instructor",
      junior_instructor: "Junior Instructor",
      principal: "Principal",
      admin: "Admin",
      public: "Public"
    };
    return types[userType] || userType || "User";
  };

  const canSubmit = () => {
    if (!assignment || !dbUser) return false;
    const targetRoles = assignment.targetRoles || [];
    if (targetRoles.length === 0) return true;
    return targetRoles.includes(dbUser.userType);
  };

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
    if (diff < 0) return "Deadline Passed";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const end = new Date(deadline);
    return now > end;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const maxSize = 10 * 1024 * 1024;
      if (selectedFile.size > maxSize) {
        setError("File size should be less than 10MB");
        return;
      }
      setFile(selectedFile);
      setError("");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const maxSize = 10 * 1024 * 1024;
      if (droppedFile.size > maxSize) {
        setError("File size should be less than 10MB");
        return;
      }
      setFile(droppedFile);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to submit");
      return;
    }

    if (!canSubmit()) {
      setError("You don't have permission to submit this assignment");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const imageUrl = await uploadImage(file);
      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!imageUrl) {
        throw new Error(uploadError || "Failed to upload file");
      }

      const submissionData = {
        assignmentId: id,
        assignmentTitle: assignment.assignmentTitle,
        assignmentdeadline:assignment.deadline,
        assignmenttotalmarks:assignment.totalMarks,
        assignmentCreatorEmail: assignment.createdBy?.email || "Unknown",
        assignmentCreatorName: assignment.createdBy?.fullName || assignment.createdBy?.name || "Unknown",
        assignmentCreatorInstitution: assignment.createdBy?.institutionName || "Unknown",
        submitterId: dbUser?._id || dbUser?.id || dbUser?.userId,
        submitterName: dbUser?.fullName || dbUser?.name || "Unknown",
        submitterEmail: dbUser?.email || "Unknown",
        submitterUserType: dbUser?.userType || "Unknown",
        submitterUserTypeLabel: getUserTypeLabel(dbUser?.userType),
        submitterInstitution: dbUser?.institutionName || "N/A",
        submitterDepartment: dbUser?.department || "N/A",
        submitterPhone: dbUser?.phone || "N/A",
        fileUrl: imageUrl,
        fileName: file.name,
        fileSize: file.size,
        notes: notes,
        submittedAt: new Date().toISOString()
      };

      const response = await submitAssignment(submissionData);
      console.log("Submission response:", response);

      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/assignment/${id}`);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (fileName) => {
    if (!fileName) return <FileText size={24} />;
    const ext = fileName.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) {
      return <Image size={24} className="text-blue-500" />;
    }
    if (["pdf"].includes(ext)) {
      return <FileText size={24} className="text-red-500" />;
    }
    if (["doc", "docx"].includes(ext)) {
      return <FileText size={24} className="text-blue-600" />;
    }
    if (["zip", "rar", "7z"].includes(ext)) {
      return <FileText size={24} className="text-yellow-500" />;
    }
    return <FileText size={24} className="text-gray-500" />;
  };

  const isImageFile = (fileName) => {
    if (!fileName) return false;
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".bmp", ".svg"];
    return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
  };

  if (loading || authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 flex justify-center items-center min-h-[400px]">
              <Loading />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !assignment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-8">
              <ErrorComponent error={error} onRetry={fetchData} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container">
          <Link
            to={`/assignment`}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Assignments
          </Link>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText size={40} className="text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Assignment Not Found</h2>
              <p className="text-gray-500 mb-6">The assignment you're looking for doesn't exist or has been removed.</p>
              <Link
                to={`/assignment`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={18} />
                Back to Assignments
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const deadlinePassed = isDeadlinePassed(assignment.deadline);
  const timeRemaining = getTimeRemaining(assignment.deadline);
  const hasPermission = canSubmit();

  if (!hasPermission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container max-w-3xl mx-auto">
          <Link
            to={`/assignment/${id}`}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Assignment
          </Link>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock size={40} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Access Denied</h2>
              <p className="text-gray-500 mb-2">You don't have permission to submit this assignment.</p>
              <p className="text-sm text-gray-400 mb-6">This assignment is only for: {assignment.targetRoles?.join(", ") || "No specific roles"}</p>
              <Link
                to={`/assignment/${id}`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={18} />
                Back to Assignment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (deadlinePassed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container max-w-3xl mx-auto">
          <Link
            to={`/assignment/${id}`}
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium transition-colors group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Assignment
          </Link>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={40} className="text-rose-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Submission Closed</h2>
              <p className="text-gray-500 mb-2">The deadline for this assignment has passed.</p>
              <p className="text-gray-500 mb-6">You can no longer submit your work for <strong>"{assignment.assignmentTitle}"</strong>.</p>
              <Link
                to={`/assignment/${id}`}
                className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                <ArrowLeft size={18} />
                Back to Assignment
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
        <div className="container max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-12 text-center">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">Assignment Submitted!</h2>
              <p className="text-gray-500 mb-2">Your assignment <strong>"{assignment.assignmentTitle}"</strong> has been submitted successfully.</p>
              <p className="text-sm text-gray-400">Redirecting you back to assignment details...</p>
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const subjectName = assignment.subjects?.[0]?.name || "General";
  const assignmentCreator = assignment.createdBy || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 md:p-8">
      <div className="container max-w-4xl mx-auto">
        <Link
          to={`/assignment/${id}`}
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to Assignment
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Upload size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Submit Assignment</h1>
                    <p className="text-sm text-gray-500">{assignment.assignmentTitle}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File <span className="text-red-500 ml-1">*</span>
                    </label>

                    {!file ? (
                      <div
                        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                          dragActive ? "border-indigo-500 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:border-indigo-400"
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <input
                          type="file"
                          id="file-upload"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={handleFileChange}
                        />
                        <div className="text-center">
                          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Paperclip size={28} className="text-indigo-600" />
                          </div>
                          <p className="text-gray-600 font-medium mb-1">Drag and drop your file here</p>
                          <p className="text-sm text-gray-400">
                            or <span className="text-indigo-600 font-medium">browse</span> to upload
                          </p>
                          <p className="text-xs text-gray-400 mt-2">Supported formats: Images, PDF, DOC, DOCX, ZIP (Max 10MB)</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                              {getFileIcon(file.name)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{file.name}</p>
                              <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                              {isImageFile(file.name) && (
                                <p className="text-xs text-emerald-600 mt-0.5">Image file - Will be uploaded to Cloudinary</p>
                              )}
                            </div>
                          </div>
                          <button type="button" onClick={removeFile} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                            <X size={20} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    )}

                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Uploading...</span>
                          <span className="text-gray-600">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}

                    {uploadError && (
                      <div className="mt-3 flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl">
                        <AlertCircle size={18} />
                        <span className="text-sm">{uploadError}</span>
                      </div>
                    )}

                    {error && (
                      <div className="mt-3 flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl">
                        <AlertCircle size={18} />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      placeholder="Any additional information about your submission..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !file || uploadLoading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting || uploadLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        {uploadLoading ? "Uploading..." : "Submitting..."}
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Submit Assignment
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 sticky top-6">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Assignment Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Title</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{assignment.assignmentTitle}</p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Subject</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <BookOpen size={14} className="text-indigo-500" />
                      {subjectName}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Total Marks</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <Award size={14} className="text-purple-500" />
                      {assignment.totalMarks || 0}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Deadline</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <Calendar size={14} className="text-blue-500" />
                      {formatDate(assignment.deadline)}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Time Remaining</label>
                    <div className={`mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      timeRemaining && timeRemaining.includes("h") ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                    }`}>
                      <Clock size={14} />
                      <span className="text-sm font-medium">{timeRemaining}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Created By</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <User size={14} className="text-indigo-500" />
                      {assignmentCreator?.fullName || assignmentCreator?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 ml-6">
                      <Mail size={12} className="text-gray-400" />
                      {assignmentCreator?.email || "No email"}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Submitter</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <User size={14} className="text-emerald-500" />
                      {dbUser?.fullName || dbUser?.name || "Unknown"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 ml-6">
                      <Briefcase size={12} className="text-gray-400" />
                      {getUserTypeLabel(dbUser?.userType)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 ml-6">
                      <Mail size={12} className="text-gray-400" />
                      {dbUser?.email || "No email"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-2 ml-6">
                      <Building2 size={12} className="text-gray-400" />
                      {dbUser?.institutionName || "N/A"}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-xs text-gray-500 bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <Lock size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Your submission is secure and will only be visible to your instructor.</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 p-3 rounded-xl border border-blue-100">
                      <Cloud size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>Files are uploaded securely to Cloudinary cloud storage.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Submitassignment;