import React, { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle,
  Clock,
  Award,
  Search,
  Lock,
  BookOpen,
  User,
  ChevronRight,
  Sparkles,
  Key,
  Eye,
  EyeOff,
  Shield,
  Grid,
  List,
  X,
  ExternalLink,
  ArrowUpRight,
  Gift,
  Crown,
  ChevronDown,
  ChevronLeft,
  AlertCircle
} from "lucide-react";
import Loading from "../../../Components/Loading";
import ErrorComponent from "../../../Components/ErrorComponent";
import AssignmentHeader from "./AssignmentHeader";
import AssignmentCard from "./AssignmentCard";
import { loadassignment } from "../../../API/Assignment/Loadassignment";
import Useauth from "../../../Hooks/Useauth";

const Assignment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [secretCode, setSecretCode] = useState("");
  const [secretAssignment, setSecretAssignment] = useState(null);
  const [showSecret, setShowSecret] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [showPassword, setShowPassword] = useState(false);
  const [secretError, setSecretError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [subjects, setSubjects] = useState(["All"]);

  const { dbUser, loading: authLoading } = Useauth();

  useEffect(() => {
    if (!authLoading) {
      fetchAssignments();
    }
  }, [searchTerm, selectedSubject, currentPage, authLoading, dbUser]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const role = dbUser?.userType || "public";
      const search = searchTerm.trim();
      const page = currentPage;
      const secretcode = secretCode.trim();
      const subject = selectedSubject === "all" ? "" : selectedSubject;
      
      const data = await loadassignment(role, search, page, secretcode, subject);
      
      if (data && data.data) {
        const transformed = data.data.map((item) => {
          const subjectName = item.subjects?.[0] || "General";
          return {
            id: item._id,
            title: item.assignmentTitle || "Untitled Assignment",
            description: item.assignmentDescription || "No description provided",
            subject: typeof subjectName === 'string' ? subjectName : subjectName?.name || "General",
            semester: "General",
            deadline: item.deadline || null,
            totalMarks: parseInt(item.totalMarks) || 0,
            teacher: item.createdBy?.fullName || "Teacher",
            secretCode: item.secretCode || null,
            status: item.status || "pending",
            priority: item.priority || "medium",
            attachments: item.attachments?.length || 0,
            isPrivate: item.isPrivate || false,
            targetRoles: item.targetRoles || [],
          };
        });
        setAssignments(transformed);
        
        if (data.total) {
          setTotalAssignments(data.total);
          setTotalPages(Math.ceil(data.total / (data.limit || 10)));
        } else {
          setTotalAssignments(transformed.length);
          setTotalPages(1);
        }
        
        if (data.subjects) {
          const subjectList = ["All", ...data.subjects.filter(s => typeof s === 'string')];
          setSubjects(subjectList);
        }
      } else {
        setAssignments([]);
        setTotalAssignments(0);
        setTotalPages(1);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Failed to load assignments. Please try again.");
      setLoading(false);
    }
  };

  const handleSecretSearch = () => {
    if (!secretCode.trim()) {
      setSecretError("Please enter a secret code");
      setTimeout(() => setSecretError(""), 3000);
      return;
    }
    fetchAssignments();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSecretSearch();
  };

  const stats = [
    { icon: FileText, label: "Total", value: totalAssignments, color: "from-blue-500 to-indigo-500", bg: "bg-blue-50", text: "text-blue-600" },
    { icon: Clock, label: "Pending", value: assignments.filter(a => a.status === "pending").length, color: "from-amber-500 to-orange-500", bg: "bg-amber-50", text: "text-amber-600" },
    { icon: CheckCircle, label: "Submitted", value: assignments.filter(a => a.status === "submitted").length, color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50", text: "text-emerald-600" },
    { icon: Award, label: "Graded", value: assignments.filter(a => a.status === "graded").length, color: "from-purple-500 to-pink-500", bg: "bg-purple-50", text: "text-purple-600" },
  ];

  const getStatusConfig = (status) => {
    const configs = {
      pending: { icon: Clock, label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
      submitted: { icon: CheckCircle, label: "Submitted", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
      graded: { icon: Award, label: "Graded", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" }
    };
    return configs[status] || configs.pending;
  };

  const getPriorityConfig = (priority) => {
    const configs = {
      high: { label: "High", bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
      medium: { label: "Medium", bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
      low: { label: "Low", bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" }
    };
    return configs[priority] || configs.medium;
  };

  const getSemesterBadge = (semester) => {
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const formatDate = (date) => {
    if (!date) return "No deadline";
    try {
      return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Invalid date";
    }
  };

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSubject("all");
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 p-4 md:p-6 lg:p-8">
      <div className="container">
        <AssignmentHeader
          totalAssignments={totalAssignments} 
          pendingAssignments={assignments.filter(a => a.status === "pending").length} 
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 hover:border-transparent hover:-translate-y-2">
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
              <div className="relative flex items-center gap-4">
                <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-7 h-7 ${stat.text}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </div>

        <div className="relative mb-8">
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200/50 bg-gray-50/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 text-gray-700"
                />
              </div>
              
              <div className="flex gap-3 flex-wrap">
                <div className="relative">
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-5 py-3.5 pr-10 rounded-xl border border-gray-200/50 bg-gray-50/50 focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100/50 transition-all duration-300 text-gray-600 appearance-none cursor-pointer min-w-[150px]"
                  >
                    {subjects.map((subject) => (
                      <option key={subject} value={subject}>
                        {subject === "All" ? "All Subjects" : subject}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                <div className="flex gap-1 bg-gray-100/50 rounded-xl p-1">
                  <button onClick={() => setViewMode("grid")} className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === "grid" ? "bg-white shadow-md text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
                    <Grid className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode("list")} className={`p-2.5 rounded-lg transition-all duration-300 ${viewMode === "list" ? "bg-white shadow-md text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-5 flex-wrap">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/20">
                  <Lock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Secret Assignment Access</h2>
                  <p className="text-white/80 text-sm">Enter secret code to unlock hidden assignments</p>
                </div>
                <div className="ml-auto hidden md:block">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10">
                    <Gift className="w-4 h-4 text-white/60" />
                    <span className="text-white/60 text-sm">Exclusive</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Key className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter secret code..."
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/20 transition-all duration-300"
                  />
                  <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <button onClick={handleSecretSearch} className="px-8 py-3.5 bg-white text-indigo-600 rounded-xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center">
                  <Sparkles className="w-5 h-5" /> Unlock
                </button>
              </div>

              {secretError && (
                <div className="mt-4 flex items-center gap-2 text-red-200 bg-red-500/20 backdrop-blur-sm rounded-xl px-4 py-3 animate-shake">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{secretError}</span>
                </div>
              )}
            </div>
          </div>

          {secretAssignment && showSecret && (
            <div className="mt-5 animate-slideDown">
              <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-indigo-200 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-1.5 rounded-bl-2xl text-sm font-medium flex items-center gap-2 shadow-lg">
                  <Shield className="w-4 h-4" /> Secret
                </div>
                <div className="relative flex items-start gap-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800">{secretAssignment.title}</h3>
                    <p className="text-gray-600 mt-1">{secretAssignment.description}</p>
                    <div className="flex flex-wrap gap-4 mt-3 text-sm">
                      <span className="flex items-center gap-1.5 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/50">
                        <BookOpen className="w-4 h-4 text-indigo-500" /> {secretAssignment.subject}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/50">
                        <User className="w-4 h-4 text-indigo-500" /> {secretAssignment.teacher}
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-600 bg-white/60 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/50">
                        <Award className="w-4 h-4 text-indigo-500" /> {secretAssignment.totalMarks} Marks
                      </span>
                    </div>
                    <button className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> View <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => setShowSecret(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {error ? (
          <ErrorComponent error={error} onRetry={fetchAssignments} />
        ) : loading || authLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : assignments.length > 0 ? (
          <>
            <div className={viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-5"}>
              {assignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  assignment={assignment}
                  statusConfig={getStatusConfig(assignment.status)}
                  priorityConfig={getPriorityConfig(assignment.priority)}
                  semesterBadgeColor={getSemesterBadge(assignment.semester)}
                  formatDate={formatDate}
                />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-8">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || loading}
                  className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Previous
                </button>
                <span className="text-gray-600 font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || loading}
                  className="px-5 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 text-gray-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-20 text-center shadow-lg border border-white/50">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium text-lg">No assignments found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filters</p>
            <button onClick={resetFilters} className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all">
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-slideDown { animation: slideDown 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Assignment;