import React, { useEffect, useState } from "react";
import Useauth from "../../../Hooks/Useauth";
import { submissionassignment } from "../../../API/Assignment/Submissionassignment";

const Submissionassignment = () => {
  const { dbUser, loading } = Useauth();
  const [data, setData] = useState([]);
  const [expandedAssignment, setExpandedAssignment] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!dbUser?.email || !dbUser?.userType) return;

      try {
        const res = await submissionassignment(
          dbUser.email,
          dbUser.userType
        );
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [dbUser]);

  const handleWin = (submissionId) => {
    alert(`🎉 Winner selected for submission ID: ${submissionId}`);
  };

  const toggleExpand = (assignmentId) => {
    setExpandedAssignment(expandedAssignment === assignmentId ? null : assignmentId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Assignment Submissions</h1>
        <p className="text-gray-600">Review and manage all student submissions</p>
      </div>

      {data?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No submissions found</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data?.map((item) => (
            <div key={item.assignmentId} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleExpand(item.assignmentId)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      {item.assignmentTitle}
                    </h2>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        📝 {item.totalSubmissions} submission{item.totalSubmissions > 1 ? 's' : ''}
                      </span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                        {item.submissions?.length || 0} files
                      </span>
                    </div>
                  </div>
                  <div className="text-gray-400">
                    {expandedAssignment === item.assignmentId ? '▲' : '▼'}
                  </div>
                </div>
              </div>

              {expandedAssignment === item.assignmentId && (
                <div className="border-t border-gray-200 p-6 bg-gray-50">
                  <div className="space-y-4">
                    {item.submissions?.map((submission) => (
                      <div key={submission._id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-gray-800">
                                {submission.submitterName}
                              </span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {submission.submitterUserType}
                              </span>
                            </div>
                            
                            <div className="space-y-1 text-sm">
                              <p className="text-gray-600 flex items-center gap-1">
                                <span>📧</span> {submission.submitterEmail}
                              </p>
                              {submission.submitterInstitution && (
                                <p className="text-gray-600 flex items-center gap-1">
                                  <span>🏛️</span> {submission.submitterInstitution}
                                </p>
                              )}
                              <p className="text-gray-500 text-xs flex items-center gap-1">
                                <span>🕐</span> Submitted: {formatDate(submission.submittedAt)}
                              </p>
                            </div>

                            {submission.notes && (
                              <p className="mt-2 text-gray-600 text-sm bg-yellow-50 p-2 rounded border border-yellow-200">
                                📝 {submission.notes}
                              </p>
                            )}
                          </div>

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                            {submission.fileUrl && (
                              <a
                                href={submission.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm text-center border border-blue-200 flex items-center justify-center gap-1"
                              >
                                📄 View Submission
                              </a>
                            )}
                            <button
                              onClick={() => handleWin(submission._id)}
                              className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all font-medium shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center gap-1"
                            >
                              🏆 Win
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Submissionassignment;