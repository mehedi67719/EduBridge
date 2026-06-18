import React, { useState } from "react";
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
  Eye,
  EyeOff,
} from "lucide-react";

const Submitassignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [file, setFile] = useState(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");

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

    setIsSubmitting(true);
    setError("");

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSuccess(true);
      setTimeout(() => {
        navigate(`/assignment/${id}`);
      }, 3000);
    } catch (err) {
      setError("Failed to submit assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
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
      return <FileText size={24} className="text-blue-500" />;
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

  const assignmentData = {
    title: "Class Test",
    subject: "Web Development",
    deadline: "2026-06-26T20:47",
    totalMarks: 20,
    instructor: "Mehedi Hassan",
  };

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

  const timeRemaining = getTimeRemaining(assignmentData.deadline);
  const deadlinePassed = new Date() > new Date(assignmentData.deadline);

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
              <p className="text-gray-500 mb-6">
                The deadline for this assignment has passed. You can no longer submit your work.
              </p>
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
              <p className="text-gray-500 mb-2">
                Your assignment has been submitted successfully.
              </p>
              <p className="text-sm text-gray-400">
                Redirecting you back to assignment details...
              </p>
              <div className="mt-6 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full animate-pulse" style={{ width: "100%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Upload size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Submit Assignment</h1>
                    <p className="text-sm text-gray-500">Upload your work before the deadline</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload Area */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload File
                      <span className="text-red-500 ml-1">*</span>
                    </label>

                    {!file ? (
                      <div
                        className={`relative border-2 border-dashed rounded-2xl p-8 transition-all ${
                          dragActive
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 bg-gray-50 hover:border-indigo-400"
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
                          <p className="text-gray-600 font-medium mb-1">
                            Drag and drop your file here
                          </p>
                          <p className="text-sm text-gray-400">
                            or <span className="text-indigo-600 font-medium">browse</span> to upload
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            Supported formats: PDF, DOC, DOCX, JPG, PNG, ZIP (Max 10MB)
                          </p>
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
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={removeFile}
                            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                          >
                            <X size={20} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    )}

                    {error && (
                      <div className="mt-3 flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-2 rounded-xl">
                        <AlertCircle size={18} />
                        <span className="text-sm">{error}</span>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                      placeholder="Any additional information about your submission..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !file}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
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

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 sticky top-6">
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Assignment Details</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 font-medium">Title</label>
                    <p className="text-sm font-medium text-gray-900 mt-1">{assignmentData.title}</p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Subject</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <BookOpen size={14} className="text-indigo-500" />
                      {assignmentData.subject}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Total Marks</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <Award size={14} className="text-purple-500" />
                      {assignmentData.totalMarks}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Deadline</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <Calendar size={14} className="text-blue-500" />
                      {formatDate(assignmentData.deadline)}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Time Remaining</label>
                    <div className={`mt-1 inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${
                      timeRemaining && parseInt(timeRemaining) < 1
                        ? "bg-rose-50 text-rose-700"
                        : "bg-emerald-50 text-emerald-700"
                    }`}>
                      <Clock size={14} />
                      <span className="text-sm font-medium">{timeRemaining}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 font-medium">Instructor</label>
                    <p className="text-sm text-gray-700 mt-1 flex items-center gap-2">
                      <User size={14} className="text-indigo-500" />
                      {assignmentData.instructor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex items-start gap-2 text-xs text-gray-500 bg-amber-50 p-3 rounded-xl border border-amber-100">
                      <Lock size={14} className="text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>Your submission is secure and will only be visible to your instructor.</span>
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