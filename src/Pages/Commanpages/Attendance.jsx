import React, { useState } from 'react';
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  User,
  TrendingUp,
  Award,
  BarChart3,
  Filter,
  Search,
  Download,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Users,
  BookOpen,
  PercentCircle
} from 'lucide-react';

const Attendance = () => {
  const [selectedMonth, setSelectedMonth] = useState('December');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const months = ['November', 'December', 'January', 'February'];
  const subjects = ['All', 'Web Development', 'Database Management', 'Data Structures', 'Computer Networks', 'Operating Systems'];

  const attendanceData = {
    summary: {
      totalDays: 28,
      present: 24,
      absent: 2,
      late: 2,
      percentage: 85.7
    },
    monthly: {
      November: { present: 22, absent: 2, late: 1, total: 25 },
      December: { present: 18, absent: 2, late: 2, total: 22 },
      January: { present: 24, absent: 1, late: 1, total: 26 },
      February: { present: 20, absent: 1, late: 1, total: 22 }
    },
    subjects: [
      { name: 'Web Development', total: 10, present: 9, absent: 0, late: 1, percentage: 90 },
      { name: 'Database Management', total: 8, present: 7, absent: 0, late: 1, percentage: 87.5 },
      { name: 'Data Structures', total: 10, present: 8, absent: 1, late: 1, percentage: 80 },
      { name: 'Computer Networks', total: 8, present: 7, absent: 0, late: 1, percentage: 87.5 },
      { name: 'Operating Systems', total: 10, present: 9, absent: 0, late: 1, percentage: 90 }
    ],
    recent: [
      { date: '2024-12-04', subject: 'Web Development', status: 'present', time: '09:00 AM' },
      { date: '2024-12-03', subject: 'Database Management', status: 'present', time: '10:30 AM' },
      { date: '2024-12-02', subject: 'Data Structures', status: 'late', time: '01:00 PM', lateBy: '5 minutes' },
      { date: '2024-12-01', subject: 'Computer Networks', status: 'present', time: '10:30 AM' },
      { date: '2024-11-30', subject: 'Operating Systems', status: 'absent', time: '01:00 PM' },
      { date: '2024-11-29', subject: 'Web Development', status: 'present', time: '09:00 AM' }
    ]
  };

  const currentMonthData = attendanceData.monthly[selectedMonth];
  const currentPercentage = (currentMonthData.present / currentMonthData.total) * 100;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'late':
        return <Clock className="w-4 h-4 text-amber-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'present':
        return 'bg-emerald-100 text-emerald-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      case 'late':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 85) return 'text-emerald-600';
    if (percentage >= 75) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 85) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container py-8 lg:py-12">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md border border-gray-100">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Fall Semester 2024</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Attendance</span>
            <span className="text-gray-800"> Tracker</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Track your class attendance and performance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Overall Attendance</h2>
                <p className="text-sm text-gray-400">Current Semester</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <PercentCircle className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-500">Your Progress</span>
              <span className={`text-2xl font-bold ${getPercentageColor(attendanceData.summary.percentage)}`}>
                {attendanceData.summary.percentage}%
              </span>
            </div>
            
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${getProgressColor(attendanceData.summary.percentage)}`}
                style={{ width: `${attendanceData.summary.percentage}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-xl font-bold text-gray-800">{attendanceData.summary.present}</p>
                <p className="text-xs text-gray-400">Present</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <p className="text-xl font-bold text-gray-800">{attendanceData.summary.absent}</p>
                <p className="text-xs text-gray-400">Absent</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <p className="text-xl font-bold text-gray-800">{attendanceData.summary.late}</p>
                <p className="text-xs text-gray-400">Late</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-800">Monthly Overview</h2>
            </div>
            <div className="flex gap-2 mb-4">
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedMonth === month
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Present</span>
                <span className="font-semibold text-gray-800">{currentMonthData.present} / {currentMonthData.total}</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(currentMonthData.present / currentMonthData.total) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Absent</span>
                <span className="font-semibold text-gray-800">{currentMonthData.absent} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Late</span>
                <span className="font-semibold text-gray-800">{currentMonthData.late} days</span>
              </div>
              <div className="pt-3 border-t border-gray-100">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Percentage</span>
                  <span className={`font-bold ${getPercentageColor(currentPercentage)}`}>
                    {currentPercentage.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Subject-wise Attendance</h2>
              </div>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 focus:border-indigo-400 focus:outline-none text-sm"
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Percentage</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendanceData.subjects.map((subject, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{subject.name}</td>
                    <td className="px-6 py-4 text-sm text-emerald-600 font-semibold">{subject.present}</td>
                    <td className="px-6 py-4 text-sm text-red-600">{subject.absent}</td>
                    <td className="px-6 py-4 text-sm text-amber-600">{subject.late}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{subject.total}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getProgressColor(subject.percentage)}`}
                            style={{ width: `${subject.percentage}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-semibold ${getPercentageColor(subject.percentage)}`}>
                          {subject.percentage}%
                        </span>
                      </div>
                    </td>
                   </tr>
                ))}
              </tbody>
             </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-gray-800">Recent Attendance</h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600">Details</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {attendanceData.recent.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-700">{record.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{record.subject}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{record.time}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {record.lateBy ? record.lateBy : '-'}
                    </td>
                   </tr>
                ))}
              </tbody>
             </table>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Attendance Requirement</p>
              <p className="text-sm font-medium text-gray-800">
                Minimum 75% required for exams
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all shadow-sm">
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;