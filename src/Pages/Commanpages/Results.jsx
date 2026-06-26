import React, { useEffect, useState } from "react";
import {
  Award,
  Download,
  Calendar,
  User,
  CheckCircle,
  Sparkles,
  FileText,
  GraduationCap,
  Clock,
  Trophy,
  TrendingUp,
  PercentCircle,
  Mail,
  Building2,
  Eye,
  AlertCircle,
  BookOpen,
  Users,
} from "lucide-react";
import { assignmentResult } from "../../API/Assignment/Assignmentresult";
import Useauth from "../../Hooks/Useauth";
import Loading from "../../Components/Loading";
import ErrorComponent from "../../Components/ErrorComponent";

const Results = () => {
  const [resultData, setResultData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    totalMarks: 0,
    avgMarks: 0,
    passed: 0,
    failed: 0,
    passRate: 0,
    topScorer: null,
    topScore: 0,
  });

  const { dbUser, loading: authLoading } = Useauth();

  const calculateStats = (data) => {
    if (!data || data.length === 0) {
      return {
        totalSubmissions: 0,
        totalMarks: 0,
        avgMarks: 0,
        passed: 0,
        failed: 0,
        passRate: 0,
        topScorer: null,
        topScore: 0,
      };
    }

    const total = data.length;
    const totalMarks = data.reduce((sum, item) => sum + (item.marks || 0), 0);
    const avgMarks = total > 0 ? (totalMarks / total).toFixed(2) : 0;
    const passed = data.filter((item) => {
      const totalMarks = parseFloat(item.assignmenttotalmarks) || 100;
      const marks = item.marks || 0;
      return marks >= (totalMarks * 40) / 100;
    }).length;
    const failed = total - passed;
    const passRate = total > 0 ? ((passed / total) * 100).toFixed(1) : 0;

    let topScorer = null;
    let topScore = 0;
    data.forEach((item) => {
      if ((item.marks || 0) > topScore) {
        topScore = item.marks || 0;
        topScorer = item.submitterName;
      }
    });

    return {
      totalSubmissions: total,
      totalMarks,
      avgMarks,
      passed,
      failed,
      passRate,
      topScorer,
      topScore,
    };
  };

  useEffect(() => {
    const getResult = async () => {
      if (!dbUser?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await assignmentResult(dbUser.email);

        let data = [];
        if (response && response.data) {
          data = Array.isArray(response.data) ? response.data : [response.data];
        } else if (Array.isArray(response)) {
          data = response;
        } else if (response && typeof response === "object") {
          data = [response];
        }

        setResultData(data);
        setStats(calculateStats(data));
      } catch (error) {
        console.error("Error fetching results:", error);
        setError(error.message || "Failed to load results");
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      getResult();
    }
  }, [dbUser?.email, authLoading]);

  const getGrade = (marks, totalMarks) => {
    const percentage = totalMarks > 0 ? (marks / totalMarks) * 100 : 0;
    if (percentage >= 80) return { grade: "A+", color: "text-emerald-600", bg: "bg-emerald-100" };
    if (percentage >= 70) return { grade: "A", color: "text-blue-600", bg: "bg-blue-100" };
    if (percentage >= 60) return { grade: "B", color: "text-cyan-600", bg: "bg-cyan-100" };
    if (percentage >= 50) return { grade: "C", color: "text-amber-600", bg: "bg-amber-100" };
    if (percentage >= 40) return { grade: "D", color: "text-orange-600", bg: "bg-orange-100" };
    return { grade: "F", color: "text-red-600", bg: "bg-red-100" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
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

  const getUserTypeLabel = (userType) => {
    const types = {
      student: "Student",
      instructor: "Instructor",
      chip_instructor: "CHIP Instructor",
      craft_instructor: "Craft Instructor",
      junior_instructor: "Junior Instructor",
      principal: "Principal",
      admin: "Admin",
      public: "Public",
    };
    return types[userType] || userType || "User";
  };

  const groupedResults = resultData.reduce((acc, item) => {
    const key = item.assignmentId || "unknown";
    if (!acc[key]) {
      acc[key] = {
        assignmentId: key,
        assignmentTitle: item.assignmentTitle || "Unknown Assignment",
        assignmenttotalmarks: item.assignmenttotalmarks || 100,
        assignmentdeadline: item.assignmentdeadline,
        assignmentCreatorEmail: item.assignmentCreatorEmail || "Unknown",
        assignmentCreatorName: item.assignmentCreatorName || "Unknown",
        assignmentCreatorInstitution: item.assignmentCreatorInstitution || "Unknown",
        submissions: [],
      };
    }
    acc[key].submissions.push(item);
    return acc;
  }, {});

  const filteredData = Object.values(groupedResults);

  const isDeadlinePassed = (deadline) => {
    if (!deadline) return false;
    return new Date() > new Date(deadline);
  };

  const hasMarks = (submission) => {
    return submission.isMarked === true || (submission.marks !== undefined && submission.marks !== null);
  };

  if (loading || authLoading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-12 flex justify-center items-center min-h-[400px] border border-gray-100">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <ErrorComponent error={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="container my-10">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-xl p-6 md:p-8 mb-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl font-bold border border-white/20">
              {dbUser?.fullName?.charAt(0)?.toUpperCase() || dbUser?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold">
                {dbUser?.fullName || dbUser?.name || "User"}
              </h2>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-white/80">
                <span className="flex items-center gap-1">
                  <User size={14} />
                  {getUserTypeLabel(dbUser?.userType)}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={14} />
                  {dbUser?.email}
                </span>
                {dbUser?.institutionName && (
                  <span className="flex items-center gap-1">
                    <Building2 size={14} />
                    {dbUser.institutionName}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-3">
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              📚 {filteredData.length} Assignments
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-white/20">
              📝 {stats.totalSubmissions} Submissions
            </span>
          </div>
        </div>
      </div>

      {stats.totalSubmissions > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total Submissions</p>
                <p className="text-2xl font-bold text-indigo-600 mt-1">{stats.totalSubmissions}</p>
              </div>
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <FileText size={20} className="text-indigo-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Average Marks</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.avgMarks}</p>
              </div>
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                <TrendingUp size={20} className="text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Pass Rate</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">{stats.passRate}%</p>
              </div>
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <PercentCircle size={20} className="text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Passed</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{stats.passed}</p>
              </div>
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Trophy size={20} className="text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      {filteredData.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100">
          <div className="text-7xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-700">No Results Found</h3>
          <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">
            You haven't submitted any assignments yet. Submit assignments to see your results here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredData.map((assignment) => {
            const deadlinePassed = isDeadlinePassed(assignment.assignmentdeadline);
            const totalMarks = parseFloat(assignment.assignmenttotalmarks) || 100;
            const allSubmissions = assignment.submissions || [];
            const hasMarkedSubmissions = allSubmissions.some(sub => hasMarks(sub));
            const hasAnySubmission = allSubmissions.length > 0;

            return (
              <div
                key={assignment.assignmentId}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="text-lg font-bold text-gray-800">
                          {assignment.assignmentTitle}
                        </h3>
                        {deadlinePassed ? (
                          <span className="flex items-center gap-1 text-xs text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                            <Clock size={12} />
                            Deadline Passed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                            <CheckCircle size={12} />
                            Active
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                          <Award size={12} />
                          {totalMarks} Marks
                        </span>
                        {hasAnySubmission && !hasMarkedSubmissions && (
                          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full">
                            <AlertCircle size={12} />
                            Results Not Published Yet
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} className="text-indigo-500" />
                          Assignment ID: {assignment.assignmentId}
                        </span>
                        <span className="flex items-center gap-1">
                          <User size={12} className="text-blue-500" />
                          Created by: {assignment.assignmentCreatorName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail size={12} className="text-purple-500" />
                          {assignment.assignmentCreatorEmail}
                        </span>
                        {assignment.assignmentCreatorInstitution && (
                          <span className="flex items-center gap-1">
                            <Building2 size={12} className="text-gray-500" />
                            {assignment.assignmentCreatorInstitution}
                          </span>
                        )}
                      </div>

                      {allSubmissions.length === 0 ? (
                        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 text-center">
                          <p className="text-sm text-gray-500">No submissions found for this assignment</p>
                        </div>
                      ) : (
                        allSubmissions.map((submission) => {
                          const isMarked = hasMarks(submission);
                          const grade = isMarked ? getGrade(submission.marks || 0, totalMarks) : null;

                          return (
                            <div key={submission._id} className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <User size={14} className="text-gray-400" />
                                    <span className="text-sm font-medium text-gray-800">
                                      {submission.submitterName || "Unknown"}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                      ({submission.submitterUserTypeLabel || submission.submitterUserType})
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-500">
                                    <span className="flex items-center gap-1">
                                      <Calendar size={12} />
                                      {formatDate(submission.submittedAt)}
                                    </span>
                                    {submission.submitterInstitution && (
                                      <span>• {submission.submitterInstitution}</span>
                                    )}
                                    {submission.submitterDepartment && (
                                      <span>• {submission.submitterDepartment}</span>
                                    )}
                                    {submission.submitterPhone && (
                                      <span>• 📞 {submission.submitterPhone}</span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  {isMarked ? (
                                    <>
                                      <div className="text-right">
                                        <span className={`text-lg font-bold ${grade.color}`}>
                                          {submission.marks || 0}
                                        </span>
                                        <span className="text-sm text-gray-400">/{totalMarks}</span>
                                        <div className="text-xs text-gray-500">
                                          Grade: <span className={`font-medium ${grade.color}`}>{grade.grade}</span>
                                        </div>
                                      </div>
                                      {submission.markedAt && (
                                        <span className="text-[10px] text-gray-400">
                                          Marked: {formatDate(submission.markedAt)}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <div className="text-right">
                                      <span className="text-sm text-amber-600 font-medium">
                                        ⏳ Mark Not Defined Yet
                                      </span>
                                      <div className="text-xs text-gray-400">
                                        {deadlinePassed ? "Waiting for teacher's review" : "Will be published after deadline"}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {submission.fileUrl && (
                                <div className="mt-2">
                                  <a
                                    href={submission.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all"
                                  >
                                    <FileText size={12} />
                                    {submission.fileName || "View File"}
                                    <span className="text-gray-400">↗</span>
                                  </a>
                                  {submission.fileSize && (
                                    <span className="text-[10px] text-gray-400 ml-2">
                                      ({(submission.fileSize / 1024).toFixed(1)} KB)
                                    </span>
                                  )}
                                </div>
                              )}

                              {submission.notes && (
                                <div className="mt-2 p-2 bg-yellow-50 rounded-lg border border-yellow-200">
                                  <p className="text-xs text-gray-600 flex items-start gap-1.5">
                                    <span className="text-yellow-600">💬</span>
                                    {submission.notes}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {stats.totalSubmissions > 0 && (
        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-5 flex items-center justify-between flex-wrap gap-4 border border-indigo-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Sparkles className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Overall Summary</p>
              <p className="text-sm font-medium text-gray-800">
                Pass Rate: <span className="text-purple-600">{stats.passRate}%</span> | 
                Average: <span className="text-emerald-600">{stats.avgMarks}</span>
                {stats.topScorer && (
                  <> | Top: <span className="text-amber-600">{stats.topScorer}</span> ({stats.topScore})</>
                )}
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white rounded-xl text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all shadow-sm border border-indigo-200 hover:shadow-md">
            <Download size={16} />
            Download Report
          </button>
        </div>
      )}
    </div>
  );
};

export default Results;