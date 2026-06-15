import React, { useState, useEffect } from 'react';
import {
  FileText,
  Upload,
  Download,
  Eye,
  Clock,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  ChevronRight,
  Award,
  BookOpen,
  Star,
  Users,
  MessageCircle,
  Paperclip,
  Send,
  MoreVertical,
  TrendingUp
} from 'lucide-react';
import { loadassignment } from '../../API/Assignment/Loadassignment';

const Assignment = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assignments on component mount
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await loadassignment();
      if (data && data.data) {
        // Transform API data to match component structure
        const transformedAssignments = data.data.map((item, index) => ({
          id: item._id || index,
          title: item.assignmentTitle,
          description: item.assignmentDescription,
          subject: item.subjects?.[0]?.name || 'General',
          deadline: formatDeadline(item.deadline),
          totalMarks: parseInt(item.totalMarks) || 0,
          status: getAssignmentStatus(item),
          priority: item.priority || 'medium',
          teacher: item.createdBy?.fullName || 'Unknown Teacher',
          submittedAt: null, // API doesn't have this, can be added later
          obtainedMarks: null, // API doesn't have this, can be added later
          feedback: null, // API doesn't have this, can be added later
          attachments: item.attachments?.length || 0,
          attachmentUrls: item.attachments || [],
          referenceLinks: item.referenceLinks || [],
          isPrivate: item.isPrivate,
          secretCode: item.secretCode,
          createdAt: item.createdAt,
          status_raw: item.status
        }));
        setAssignments(transformedAssignments);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error fetching assignments:', err);
      setError('Failed to load assignments');
      setLoading(false);
    }
  };

  // Helper function to format deadline
  const formatDeadline = (deadline) => {
    if (!deadline) return 'No deadline';
    const date = new Date(deadline);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Helper function to determine assignment status
  const getAssignmentStatus = (assignment) => {
    // If the assignment has a status field from API
    if (assignment.status === 'published') {
      // Check if deadline is passed
      if (new Date(assignment.deadline) < new Date()) {
        return 'pending'; // Overdue but still pending
      }
      return 'pending';
    }
    // You can add logic for submitted/graded when API supports it
    return 'pending';
  };

  const subjects = ['All', ...new Set(assignments.map(a => a.subject))];

  // Calculate stats dynamically from API data
  const stats = [
    { icon: FileText, label: 'Total Assignments', value: assignments.length.toString(), color: 'from-indigo-500 to-purple-500' },
    { icon: CheckCircle, label: 'Submitted', value: assignments.filter(a => a.status === 'submitted').length.toString(), color: 'from-emerald-500 to-teal-500' },
    { icon: Clock, label: 'Pending', value: assignments.filter(a => a.status === 'pending').length.toString(), color: 'from-amber-500 to-orange-500' },
    { icon: Award, label: 'Total Marks', value: assignments.reduce((sum, a) => sum + a.totalMarks, 0).toString(), color: 'from-cyan-500 to-blue-500' }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Pending', icon: Clock };
      case 'submitted':
        return { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Submitted', icon: CheckCircle };
      case 'graded':
        return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Graded', icon: Award };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Open', icon: FileText };
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;
    const matchesSearch = assignment.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          assignment.subject?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'all' || assignment.subject === selectedSubject;
    return matchesTab && matchesSearch && matchesSubject;
  });

  // Handle submit assignment
  const handleSubmitAssignment = (assignmentId) => {
    // Implement submit functionality
    console.log('Submit assignment:', assignmentId);
  };

  // Handle download attachment
  const handleDownloadAttachment = (attachment) => {
    if (attachment?.url) {
      window.open(attachment.url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading assignments...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Error Loading Assignments</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={fetchAssignments}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container py-8 lg:py-12">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md border border-gray-100">
            <FileText className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Active Semester</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Assignments</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Manage and submit your academic assignments
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'pending'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('submitted')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'submitted'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Submitted
            </button>
            <button
              onClick={() => setActiveTab('graded')}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'graded'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              Graded
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search assignments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 text-gray-700 placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid gap-5">
          {filteredAssignments.map((assignment) => {
            const statusBadge = getStatusBadge(assignment.status);
            const StatusIcon = statusBadge.icon;
            const isDeadlineNear = new Date(assignment.deadline) - new Date() < 3 * 24 * 60 * 60 * 1000 && assignment.status === 'pending';
            
            return (
              <div key={assignment.id} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-indigo-200">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.bg} ${statusBadge.text} flex items-center gap-1`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusBadge.label}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityBadge(assignment.priority)}`}>
                        {assignment.priority === 'high' ? 'High Priority' : assignment.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                      </span>
                      {isDeadlineNear && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Deadline Soon
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                      {assignment.title}
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                      {assignment.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <BookOpen className="w-4 h-4 text-indigo-400" />
                        <span>{assignment.subject}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <User className="w-4 h-4 text-indigo-400" />
                        <span>{assignment.teacher}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Calendar className="w-4 h-4 text-indigo-400" />
                        <span>Due: {assignment.deadline}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Award className="w-4 h-4 text-indigo-400" />
                        <span>Total: {assignment.totalMarks} marks</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <Paperclip className="w-4 h-4 text-indigo-400" />
                        <span>{assignment.attachments} attachment{assignment.attachments !== 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {assignment.status === 'graded' && assignment.obtainedMarks !== null && (
                      <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-xs text-emerald-600 font-medium">Your Score</p>
                            <p className="text-lg font-bold text-emerald-700">{assignment.obtainedMarks} / {assignment.totalMarks}</p>
                          </div>
                          <div className="flex-1">
                            <p className="text-xs text-emerald-600 font-medium">Feedback</p>
                            <p className="text-sm text-emerald-700">{assignment.feedback}</p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 font-medium">Submitted</p>
                            <p className="text-sm text-emerald-700">{assignment.submittedAt}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {assignment.status === 'submitted' && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-blue-600 font-medium">Submitted On</p>
                            <p className="text-sm text-blue-700">{assignment.submittedAt}</p>
                          </div>
                          <span className="px-3 py-1 bg-blue-200 text-blue-700 rounded-lg text-xs font-medium">Awaiting Grading</span>
                        </div>
                      </div>
                    )}

                    {/* Show attachments if available */}
                    {assignment.attachmentUrls && assignment.attachmentUrls.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {assignment.attachmentUrls.map((attachment, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDownloadAttachment(attachment)}
                            className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg text-xs text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                          >
                            <Paperclip className="w-3 h-3" />
                            {attachment.name || `Attachment ${idx + 1}`}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    {assignment.status === 'pending' && (
                      <button 
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-sm hover:shadow-lg transition-all duration-300"
                      >
                        <Upload className="w-4 h-4" />
                        Submit
                      </button>
                    )}
                    {assignment.attachmentUrls && assignment.attachmentUrls.length > 0 && (
                      <button 
                        onClick={() => handleDownloadAttachment(assignment.attachmentUrls[0])}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium text-sm hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    )}
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-gray-200 text-gray-600 font-medium text-sm hover:border-indigo-200 hover:text-indigo-600 transition-all duration-300">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAssignments.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
            <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium">No assignments found</p>
            <p className="text-gray-300 text-sm mt-1">Try adjusting your search or filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignment;