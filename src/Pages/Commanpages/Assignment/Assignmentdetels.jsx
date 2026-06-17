import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import {
  ArrowLeft,
  BookOpen,
  User,
  Award,
  Calendar,
  FileText,
  Paperclip,
  Download,
  Upload,
  MessageSquare,
  ThumbsUp,
  Send,
  Lock,
} from "lucide-react";

import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import Useauth from "../../../Hooks/Useauth";
import { loadAssignmentDetails } from "../../../API/Assignment/Loadassignmentdetels";

const Assignmentdetels = () => {
  const { id } = useParams();
  const { dbUser, loading: authLoading } = Useauth();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [comment, setComment] = useState("");

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

      // ✅ safe response handling
      setAssignment(data?.data || data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Failed to load assignment"
      );
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
      });
    } catch {
      return "Invalid date";
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: "bg-green-100 text-green-700",
      pending: "bg-amber-100 text-amber-700",
      submitted: "bg-blue-100 text-blue-700",
      graded: "bg-emerald-100 text-emerald-700",
    };
    return styles[status] || "bg-gray-100 text-gray-600";
  };

  const getPriorityBadge = (priority) => {
    const styles = {
      high: "bg-red-100 text-red-700",
      medium: "bg-yellow-100 text-yellow-700",
      low: "bg-green-100 text-green-700",
    };
    return styles[priority] || "bg-gray-100 text-gray-600";
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4">
        <ErrorComponent error={error} onRetry={fetchData} />
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <FileText className="w-12 h-12 text-gray-300 mb-2" />
        <p className="text-gray-500">Assignment not found</p>
        <Link to="/assignment" className="text-indigo-600 mt-3">
          Back to Assignments
        </Link>
      </div>
    );
  }

  const subjectName =
    assignment.subjects?.[0]?.name ||
    assignment.subjects?.[0] ||
    "General";

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto">

        {/* Back */}
        <Link
          to="/assignment"
          className="inline-flex items-center gap-2 text-gray-600 mb-4"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
            <div className="flex justify-between gap-4">

              <div>
                <div className="flex gap-2 mb-2 flex-wrap">
                  <span className={getStatusBadge(assignment.status) + " px-2 py-1 text-xs rounded"}>
                    {assignment.status}
                  </span>

                  <span className={getPriorityBadge(assignment.priority) + " px-2 py-1 text-xs rounded"}>
                    {assignment.priority}
                  </span>

                  {assignment.isPrivate && (
                    <span className="bg-black/20 px-2 py-1 text-xs rounded flex items-center gap-1">
                      <Lock size={12} /> Private
                    </span>
                  )}
                </div>

                <h1 className="text-2xl font-bold">
                  {assignment.assignmentTitle}
                </h1>

                <p className="text-white/80 text-sm mt-1">
                  {assignment.assignmentDescription}
                </p>
              </div>

              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm">
                <Upload size={16} className="inline mr-1" />
                Submit
              </button>
            </div>

            <div className="flex gap-4 mt-4 text-sm flex-wrap">
              <span><User size={14} /> {assignment.createdBy?.email}</span>
              <span><BookOpen size={14} /> {subjectName}</span>
              <span><Award size={14} /> {assignment.totalMarks} Marks</span>
              <span><Calendar size={14} /> {formatDate(assignment.deadline)}</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6">

            {/* Tabs */}
            <div className="flex gap-4 border-b mb-6">
              {["overview", "resources", "discussion"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 text-sm ${
                    activeTab === tab
                      ? "border-b-2 border-indigo-600 text-indigo-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <p className="text-gray-600 text-sm">
                {assignment.assignmentDescription}
              </p>
            )}

            {/* Resources */}
            {activeTab === "resources" && (
              <div className="space-y-3">
                {assignment.attachments?.map((file, i) => (
                  <div key={i} className="flex justify-between bg-gray-50 p-3 rounded">
                    <span>{file.name}</span>
                    <a href={file.url} target="_blank">
                      <Download size={16} />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Discussion */}
            {activeTab === "discussion" && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setComment("");
                }}
                className="flex gap-2 mt-4"
              >
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="border flex-1 p-2 rounded"
                  placeholder="Write comment..."
                />
                <button className="bg-indigo-600 text-white px-4 rounded">
                  <Send size={16} />
                </button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignmentdetels;