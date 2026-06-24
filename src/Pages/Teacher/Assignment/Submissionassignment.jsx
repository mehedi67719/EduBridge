import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Useauth from "../../../Hooks/Useauth";
import { submissionassignment, submitmarks } from "../../../API/Assignment/Submissionassignment";
import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";

const Submissionassignment = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAssignment, setExpandedAssignment] = useState(null);
  const [marks, setMarks] = useState({});
  const [submittedMarks, setSubmittedMarks] = useState({});
  const [imageView, setImageView] = useState(null);
  const [expandedNotes, setExpandedNotes] = useState({});
  const [submitting, setSubmitting] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      if (!dbUser?.email || !dbUser?.userType) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        const res = await submissionassignment(dbUser.email, dbUser.userType);
        setData(res.data || []);
        
        const existingMarks = {};
        res.data?.forEach((assignment) => {
          assignment.submissions?.forEach((submission) => {
            if (submission.marks !== undefined && submission.marks !== null) {
              existingMarks[submission._id] = submission.marks;
            }
          });
        });
        setSubmittedMarks(existingMarks);
        
      } catch (err) {
        setError(err.message || "Failed to load submissions");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dbUser]);

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    const now = new Date();
    const end = new Date(deadline);
    return now > end;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    const now = new Date();
    const end = new Date(deadline);
    const diff = end - now;
    if (diff < 0) return "⏰ Deadline Passed";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (days > 0) return `${days}d ${hours}h ${minutes}m remaining`;
    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    return `${minutes}m remaining`;
  };

  const handleMarkChange = (submissionId, value, maxMarks) => {
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      const numValue = parseFloat(value);
      if (value !== "" && (isNaN(numValue) || numValue < 0 || numValue > maxMarks)) {
        return;
      }
      setMarks((prev) => ({
        ...prev,
        [submissionId]: value,
      }));
    }
  };

  const handleSubmitMark = async (submissionId, maxMarks) => {
    const markValue = marks[submissionId];
    if (!markValue || markValue === "") {
      Swal.fire({
        icon: "warning",
        title: "Missing Mark",
        text: "Please enter a mark before submitting",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "OK",
      });
      return;
    }

    const numericMark = parseFloat(markValue);
    if (isNaN(numericMark) || numericMark < 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mark",
        text: "Please enter a valid mark",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "OK",
      });
      return;
    }

    if (numericMark > maxMarks) {
      Swal.fire({
        icon: "warning",
        title: "Mark Exceeds Maximum",
        text: `Mark cannot be more than ${maxMarks}. Please enter a valid mark.`,
        confirmButtonColor: "#6366f1",
        confirmButtonText: "OK",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Confirm Submission",
      text: `Are you sure you want to submit ${numericMark} marks?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    });

    if (!confirmResult.isConfirmed) {
      return;
    }

    setSubmitting((prev) => ({ ...prev, [submissionId]: true }));

    try {
      const result = await submitmarks(submissionId, numericMark);

      if (result.success) {
        setSubmittedMarks((prev) => ({
          ...prev,
          [submissionId]: numericMark,
        }));
        setMarks((prev) => ({
          ...prev,
          [submissionId]: "",
        }));

        Swal.fire({
          icon: "success",
          title: "Mark Submitted!",
          text: `Successfully submitted ${numericMark} marks.`,
          timer: 3000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: result.message || "Failed to submit mark. Please try again.",
          confirmButtonColor: "#6366f1",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Failed to submit mark. Please try again.",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "OK",
      });
      console.error("Submit error:", error);
    } finally {
      setSubmitting((prev) => ({ ...prev, [submissionId]: false }));
    }
  };

  const toggleExpand = (assignmentId) => {
    setExpandedAssignment(expandedAssignment === assignmentId ? null : assignmentId);
  };

  const toggleNoteExpand = (submissionId) => {
    setExpandedNotes((prev) => ({
      ...prev,
      [submissionId]: !prev[submissionId],
    }));
  };

  const openImageView = (imageUrl) => {
    setImageView(imageUrl);
  };

  const closeImageView = () => {
    setImageView(null);
  };

  const truncateText = (text, maxLength = 60) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

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
              📋 Assignment Submissions
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Review, evaluate, and manage student submissions
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 flex-wrap">
            <span className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              📚 {data?.length || 0} Assignments
            </span>
            <span className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2 rounded-full text-xs font-medium shadow-sm">
              👥{" "}
              {data?.reduce((acc, item) => acc + (item.submissions?.length || 0), 0) || 0}{" "}
              Submissions
            </span>
          </div>
        </div>
      </div>

      {loading || authLoading ? (
        <Loading />
      ) : data?.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-16 text-center border border-gray-100">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700">No Submissions Yet</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            When students submit assignments, they'll appear here for you to review and grade.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data?.map((item) => {
            const deadlinePassed = isDeadlinePassed(item.assignmentdeadline);
            const timeRemaining = getTimeRemaining(item.assignmentdeadline);
            const totalMarks = parseFloat(item.assignmenttotalmarks) || 100;

            return (
              <div
                key={item.assignmentId}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className="p-4 md:p-5 cursor-pointer hover:bg-gradient-to-r hover:from-indigo-50/30 hover:to-purple-50/30 transition-all duration-300"
                  onClick={() => toggleExpand(item.assignmentId)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-md shadow-indigo-500/20 flex-shrink-0">
                          {item.assignmentTitle?.charAt(0).toUpperCase() || "A"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h2 className="text-base font-bold text-gray-800 truncate">
                            {item.assignmentTitle}
                          </h2>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                              <span className="text-blue-500">📝</span>
                              {item.totalSubmissions} submission
                              {item.totalSubmissions > 1 ? "s" : ""}
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
                              <span className="text-purple-500">📎</span>
                              {item.submissions?.length || 0} files
                            </span>
                            <span className="flex items-center gap-1 text-xs text-gray-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                              <span className="text-amber-500">🏆</span>
                              {totalMarks} Marks
                            </span>
                            <span
                              className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full ${
                                deadlinePassed
                                  ? "bg-rose-50 text-rose-600"
                                  : "bg-emerald-50 text-emerald-600"
                              }`}
                            >
                              <span className={deadlinePassed ? "text-rose-500" : "text-emerald-500"}>
                                {deadlinePassed ? "⏰" : "⏳"}
                              </span>
                              {deadlinePassed ? "Deadline Passed" : timeRemaining}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 hidden sm:inline">
                        {expandedAssignment === item.assignmentId ? "Collapse" : "Expand"}
                      </span>
                      <div
                        className={`text-indigo-400 transition-transform duration-300 ${
                          expandedAssignment === item.assignmentId ? "rotate-180" : ""
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {expandedAssignment === item.assignmentId && (
                  <div className="border-t border-gray-200 bg-gradient-to-b from-gray-50 to-white p-4 md:p-5">
                    {item.submissions?.length === 0 ? (
                      <div className="text-center py-10 text-gray-400">
                        <div className="text-3xl mb-2">📭</div>
                        <p className="text-sm">No submissions for this assignment yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {item.submissions?.map((submission) => {
                          const existingMark = submittedMarks[submission._id] || submission.marks;
                          const isMarked = existingMark !== undefined && existingMark !== null && existingMark > 0;
                          const isImage = submission.fileUrl?.match(/\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i);
                          const isNoteExpanded = expandedNotes[submission._id];
                          const noteText = submission.notes || "";

                          return (
                            <div
                              key={submission._id}
                              className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:border-indigo-200 transition-all duration-300 hover:shadow-md"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className="font-semibold text-gray-800 text-sm">
                                      {submission.submitterName}
                                    </span>
                                    <span
                                      className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                        submission.submitterUserType === "Student"
                                          ? "bg-blue-100 text-blue-700"
                                          : "bg-purple-100 text-purple-700"
                                      }`}
                                    >
                                      {submission.submitterUserType}
                                    </span>
                                    {isMarked && (
                                      <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-0.5">
                                        ✅ {existingMark}/{totalMarks}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[10px] text-gray-400 mt-0.5 flex items-center gap-0.5">
                                    <span>🕐</span>
                                    {formatDate(submission.submittedAt)}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 flex-shrink-0 ml-2">
                                  <p className="text-[10px] text-gray-400">{submission.submitterEmail}</p>
                                </div>
                              </div>

                              {submission.fileUrl && isImage && (
                                <div
                                  className="relative mb-2 rounded-lg overflow-hidden cursor-pointer group"
                                  onClick={() => openImageView(submission.fileUrl)}
                                >
                                  <img
                                    src={submission.fileUrl}
                                    alt={submission.fileName}
                                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <span className="text-white text-[10px] font-medium bg-black/50 px-3 py-1 rounded-full">
                                      🔍 View Full Image
                                    </span>
                                  </div>
                                </div>
                              )}

                              {submission.fileUrl && !isImage && (
                                <a
                                  href={submission.fileUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all mb-2"
                                >
                                  <span>📄</span>
                                  <span className="truncate">{submission.fileName || "View File"}</span>
                                  <span>↗</span>
                                </a>
                              )}

                              {submission.fileName && (
                                <p className="text-[10px] text-gray-400 mb-2 truncate">📎 {submission.fileName}</p>
                              )}

                              {submission.notes && (
                                <div className="mb-2 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                                  <div className="flex items-start gap-1.5">
                                    <span className="text-yellow-600 text-sm">💬</span>
                                    <div className="flex-1">
                                      <p className="text-xs text-gray-700 leading-relaxed">
                                        {isNoteExpanded ? noteText : truncateText(noteText, 80)}
                                      </p>
                                      {noteText.length > 80 && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleNoteExpand(submission._id);
                                          }}
                                          className="text-[10px] text-indigo-600 hover:text-indigo-800 font-medium mt-1"
                                        >
                                          {isNoteExpanded ? "Show less" : "Show more"}
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {deadlinePassed && (
                                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-200">
                                  {!isMarked ? (
                                    <>
                                      <div className="relative flex-1">
                                        <input
                                          type="text"
                                          value={marks[submission._id] || ""}
                                          onChange={(e) =>
                                            handleMarkChange(submission._id, e.target.value, totalMarks)
                                          }
                                          placeholder={`Enter marks (0-${totalMarks})`}
                                          className="w-full px-3 py-1.5 text-xs border-2 border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                                        />
                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-gray-400">
                                          /{totalMarks}
                                        </span>
                                      </div>
                                      <button
                                        onClick={() => handleSubmitMark(submission._id, totalMarks)}
                                        disabled={!marks[submission._id] || marks[submission._id] === "" || submitting[submission._id]}
                                        className={`px-4 py-1.5 rounded-lg font-medium text-white transition-all duration-300 flex items-center gap-1.5 whitespace-nowrap text-xs ${
                                          !marks[submission._id] || marks[submission._id] === "" || submitting[submission._id]
                                            ? "bg-gray-300 cursor-not-allowed opacity-50"
                                            : "bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 shadow-sm hover:shadow"
                                        }`}
                                      >
                                        {submitting[submission._id] ? (
                                          <>
                                            <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting...
                                          </>
                                        ) : (
                                          <>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Submit
                                          </>
                                        )}
                                      </button>
                                    </>
                                  ) : (
                                    <div className="w-full text-center text-xs text-emerald-600 font-medium py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                                      ✅ <span className="font-bold">{existingMark}</span>/{totalMarks} Marks Already Submitted
                                    </div>
                                  )}
                                </div>
                              )}

                              {!deadlinePassed && (
                                <div className="mt-2 pt-2 border-t border-gray-200 text-center text-[10px] text-gray-400">
                                  ⏳ Marks will be available after deadline
                                </div>
                              )}

                              {submission.submitterInstitution && (
                                <p className="text-[10px] text-gray-400 mt-2 flex items-center gap-0.5">
                                  <span>🏛️</span>
                                  {submission.submitterInstitution}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {imageView && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeImageView}
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <button
              onClick={closeImageView}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors text-2xl"
            >
              ✕
            </button>
            <img
              src={imageView}
              alt="Full view"
              className="w-full h-full object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Submissionassignment;