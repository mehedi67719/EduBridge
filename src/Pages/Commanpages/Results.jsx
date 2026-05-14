import React, { useState } from 'react';
import {
  Award,
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  BookOpen,
  User,
  CheckCircle,
  ChevronRight,
  Search,
  Filter,
  Sparkles,
  Medal,
  Star,
  Trophy,
  PieChart,
  FileText,
  Printer,
  GraduationCap,
  Users,
  PercentCircle
} from 'lucide-react';

const Results = () => {
  const [selectedSemester, setSelectedSemester] = useState('All');
  const [selectedExam, setSelectedExam] = useState('Final Term');

  const semesters = ['All', '1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];
  const exams = ['Mid Term', 'Final Term', 'Quiz Test', 'Lab Exam'];

  const semesterStats = [
    {
      id: 1,
      name: '1st Semester',
      totalStudents: 120,
      passed: 108,
      failed: 12,
      passPercentage: 90,
      aPlus: 15,
      aGrade: 25,
      bGrade: 35,
      cGrade: 20,
      dGrade: 13,
      fGrade: 12,
      topStudent: 'Rakib Hasan',
      topGpa: 3.95,
      avgGpa: 3.45
    },
    {
      id: 2,
      name: '2nd Semester',
      totalStudents: 118,
      passed: 110,
      failed: 8,
      passPercentage: 93.2,
      aPlus: 18,
      aGrade: 28,
      bGrade: 38,
      cGrade: 18,
      dGrade: 8,
      fGrade: 8,
      topStudent: 'Sumaiya Akter',
      topGpa: 3.98,
      avgGpa: 3.52
    },
    {
      id: 3,
      name: '3rd Semester',
      totalStudents: 115,
      passed: 108,
      failed: 7,
      passPercentage: 93.9,
      aPlus: 20,
      aGrade: 30,
      bGrade: 40,
      cGrade: 12,
      dGrade: 6,
      fGrade: 7,
      topStudent: 'Tanvir Islam',
      topGpa: 4.00,
      avgGpa: 3.58
    },
    {
      id: 4,
      name: '4th Semester',
      totalStudents: 112,
      passed: 106,
      failed: 6,
      passPercentage: 94.6,
      aPlus: 22,
      aGrade: 32,
      bGrade: 42,
      cGrade: 8,
      dGrade: 2,
      fGrade: 6,
      topStudent: 'Nusrat Jahan',
      topGpa: 4.00,
      avgGpa: 3.62
    },
    {
      id: 5,
      name: '5th Semester',
      totalStudents: 110,
      passed: 105,
      failed: 5,
      passPercentage: 95.5,
      aPlus: 25,
      aGrade: 35,
      bGrade: 40,
      cGrade: 5,
      dGrade: 0,
      fGrade: 5,
      topStudent: 'Rakib Hasan',
      topGpa: 4.00,
      avgGpa: 3.68
    },
    {
      id: 6,
      name: '6th Semester',
      totalStudents: 108,
      passed: 104,
      failed: 4,
      passPercentage: 96.3,
      aPlus: 28,
      aGrade: 38,
      bGrade: 38,
      cGrade: 0,
      dGrade: 0,
      fGrade: 4,
      topStudent: 'Sumaiya Akter',
      topGpa: 4.00,
      avgGpa: 3.75
    },
    {
      id: 7,
      name: '7th Semester',
      totalStudents: 105,
      passed: 102,
      failed: 3,
      passPercentage: 97.1,
      aPlus: 30,
      aGrade: 40,
      bGrade: 32,
      cGrade: 0,
      dGrade: 0,
      fGrade: 3,
      topStudent: 'Tanvir Islam',
      topGpa: 4.00,
      avgGpa: 3.78
    },
    {
      id: 8,
      name: '8th Semester',
      totalStudents: 102,
      passed: 100,
      failed: 2,
      passPercentage: 98.0,
      aPlus: 35,
      aGrade: 45,
      bGrade: 20,
      cGrade: 0,
      dGrade: 0,
      fGrade: 2,
      topStudent: 'Rakib Hasan',
      topGpa: 4.00,
      avgGpa: 3.82
    }
  ];

  const filteredStats = selectedSemester === 'All' 
    ? semesterStats 
    : semesterStats.filter(s => s.name === selectedSemester);

  const overallStats = {
    totalStudents: 120,
    avgPassPercentage: (semesterStats.reduce((sum, s) => sum + s.passPercentage, 0) / 8).toFixed(1),
    totalAplus: semesterStats.reduce((sum, s) => sum + s.aPlus, 0),
    topper: 'Rakib Hasan',
    topperGpa: 4.00
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-emerald-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-emerald-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 70) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container py-8 lg:py-12">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md border border-gray-100">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Academic Year 2024-2025</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Result</span>
            <span className="text-gray-800"> Analysis</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Semester wise student performance and pass percentage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <Users className="w-8 h-8 text-white/80" />
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Total</span>
            </div>
            <p className="text-3xl font-bold">{overallStats.totalStudents}</p>
            <p className="text-sm text-white/80 mt-2">Total Students</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <PercentCircle className="w-5 h-5 text-emerald-500" />
              <p className="text-xs text-gray-400">Avg Pass Rate</p>
            </div>
            <p className="text-2xl font-bold text-emerald-600">{overallStats.avgPassPercentage}%</p>
            <p className="text-xs text-gray-400 mt-1">Overall Performance</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-5 h-5 text-amber-500" />
              <p className="text-xs text-gray-400">A+ Achievers</p>
            </div>
            <p className="text-2xl font-bold text-amber-600">{overallStats.totalAplus}</p>
            <p className="text-xs text-gray-400 mt-1">Across all semesters</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-5 h-5 text-indigo-500" />
              <p className="text-xs text-gray-400">Overall Topper</p>
            </div>
            <p className="text-lg font-bold text-gray-800">{overallStats.topper}</p>
            <p className="text-xs text-gray-400 mt-1">CGPA: {overallStats.topperGpa}</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {semesters.map((sem) => (
              <button
                key={sem}
                onClick={() => setSelectedSemester(sem)}
                className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                  selectedSemester === sem
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {sem}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 focus:border-indigo-400 focus:outline-none text-sm"
            >
              {exams.map((exam) => (
                <option key={exam} value={exam}>{exam}</option>
              ))}
            </select>
            
            <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
              <Download className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {filteredStats.map((semester) => (
          <div key={semester.id} className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-100">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{semester.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">Total Students: {semester.totalStudents}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Pass Percentage</p>
                  <p className={`text-3xl font-bold ${getPercentageColor(semester.passPercentage)}`}>
                    {semester.passPercentage}%
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-indigo-500" />
                    Grade Distribution
                  </h3>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">A+</span>
                        <span className="text-gray-600">{semester.aPlus} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-emerald-500" style={{ width: `${(semester.aPlus / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">A</span>
                        <span className="text-gray-600">{semester.aGrade} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-blue-500" style={{ width: `${(semester.aGrade / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">B</span>
                        <span className="text-gray-600">{semester.bGrade} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-cyan-500" style={{ width: `${(semester.bGrade / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">C</span>
                        <span className="text-gray-600">{semester.cGrade} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-amber-500" style={{ width: `${(semester.cGrade / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">D</span>
                        <span className="text-gray-600">{semester.dGrade} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-orange-500" style={{ width: `${(semester.dGrade / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">F (Failed)</span>
                        <span className="text-gray-600">{semester.fGrade} students</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-red-500" style={{ width: `${(semester.fGrade / semester.totalStudents) * 100}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    Top Performers
                  </h3>
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Highest GPA</span>
                      <span className="text-lg font-bold text-amber-600">{semester.topGpa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800 font-medium">{semester.topStudent}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Average GPA</span>
                      <span className="text-lg font-bold text-blue-600">{semester.avgGpa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-800">Class Average</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Total Students</p>
                  <p className="text-xl font-bold text-gray-800">{semester.totalStudents}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Passed</p>
                  <p className="text-xl font-bold text-emerald-600">{semester.passed}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Failed</p>
                  <p className="text-xl font-bold text-red-600">{semester.failed}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Pass Rate</p>
                  <p className={`text-xl font-bold ${getPercentageColor(semester.passPercentage)}`}>
                    {semester.passPercentage}%
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${getProgressColor(semester.passPercentage)}`}
                    style={{ width: `${semester.passPercentage}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-400">0%</span>
                  <span className="text-xs text-gray-400">50%</span>
                  <span className="text-xs text-gray-400">100%</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Overall Summary</p>
              <p className="text-sm font-medium text-gray-800">
                Total Pass Rate: {overallStats.avgPassPercentage}% | Total A+: {overallStats.totalAplus}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all shadow-sm">
              <FileText className="w-4 h-4" />
              Download Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;