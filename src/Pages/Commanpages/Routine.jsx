import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  MapPin,
  Download,
  Printer,
  GraduationCap,
  Users,
  Sparkles,
  Monitor
} from 'lucide-react';

const Routine = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedBatch, setSelectedBatch] = useState('All');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const batches = ['All', 'Computer Science', 'Electrical', 'Mechanical', 'Civil', 'Business Studies'];

  const routineData = {
    Monday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Web Development', teacher: 'Mr. Rahim Khan', room: 'Lab 401', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Database Management', teacher: 'Ms. Fatema Begum', room: 'Room 305', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'Data Structures', teacher: 'Mr. Hasan Ahmed', room: 'Lab 402', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Software Engineering', teacher: 'Mr. Kamal Hossain', room: 'Room 308', type: 'Theory', color: 'from-indigo-500 to-purple-500' }
    ],
    Tuesday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Algorithms', teacher: 'Mr. Rahim Khan', room: 'Room 301', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Computer Networks', teacher: 'Ms. Sumaiya Akter', room: 'Lab 403', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'Operating Systems', teacher: 'Mr. Tanvir Islam', room: 'Room 302', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Mathematics', teacher: 'Ms. Nasrin Sultana', room: 'Room 306', type: 'Theory', color: 'from-indigo-500 to-purple-500' }
    ],
    Wednesday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Web Development Lab', teacher: 'Mr. Rahim Khan', room: 'Lab 401', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Database Lab', teacher: 'Ms. Fatema Begum', room: 'Lab 405', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'Project Work', teacher: 'Mr. Hasan Ahmed', room: 'Project Lab', type: 'Project', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Seminar', teacher: 'Guest Speaker', room: 'Auditorium', type: 'Event', color: 'from-indigo-500 to-purple-500' }
    ],
    Thursday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Computer Graphics', teacher: 'Mr. Kamal Hossain', room: 'Room 304', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Artificial Intelligence', teacher: 'Ms. Sumaiya Akter', room: 'Lab 402', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'English', teacher: 'Mr. Shahidul Islam', room: 'Room 307', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Physics', teacher: 'Dr. Abdur Rahman', room: 'Lab 404', type: 'Lab', color: 'from-indigo-500 to-purple-500' }
    ],
    Friday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Mobile App Development', teacher: 'Mr. Tanvir Islam', room: 'Lab 401', type: 'Lab', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Cloud Computing', teacher: 'Mr. Rahim Khan', room: 'Room 305', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'Research Methodology', teacher: 'Dr. Nurul Islam', room: 'Room 308', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Sports Activity', teacher: 'Sports Department', room: 'Ground', type: 'Activity', color: 'from-indigo-500 to-purple-500' }
    ],
    Saturday: [
      { time: '09:00 AM - 10:30 AM', subject: 'Internship Preparation', teacher: 'Career Cell', room: 'Seminar Hall', type: 'Workshop', color: 'from-indigo-500 to-purple-500' },
      { time: '10:30 AM - 12:00 PM', subject: 'Technical Writing', teacher: 'Ms. Nasrin Sultana', room: 'Room 306', type: 'Theory', color: 'from-indigo-500 to-purple-500' },
      { time: '12:00 PM - 01:00 PM', subject: 'Break', teacher: '-', room: '-', type: 'Break', color: 'from-gray-400 to-gray-500' },
      { time: '01:00 PM - 02:30 PM', subject: 'Review Class', teacher: 'Department Faculty', room: 'Room 301', type: 'Review', color: 'from-indigo-500 to-purple-500' },
      { time: '02:30 PM - 04:00 PM', subject: 'Club Activities', teacher: 'Club Advisor', room: 'Club Room', type: 'Activity', color: 'from-indigo-500 to-purple-500' }
    ]
  };

  const currentRoutine = routineData[selectedDay];

  const getTypeBadge = (type) => {
    switch(type) {
      case 'Theory': return 'bg-indigo-100 text-indigo-700';
      case 'Lab': return 'bg-purple-100 text-purple-700';
      case 'Break': return 'bg-gray-100 text-gray-500';
      case 'Project': return 'bg-indigo-100 text-indigo-700';
      case 'Event': return 'bg-purple-100 text-purple-700';
      case 'Workshop': return 'bg-indigo-100 text-indigo-700';
      case 'Review': return 'bg-purple-100 text-purple-700';
      case 'Activity': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const stats = [
    { icon: BookOpen, label: 'Total Subjects', value: '8', color: 'from-indigo-500 to-purple-500' },
    { icon: Clock, label: 'Weekly Hours', value: '28', color: 'from-indigo-500 to-purple-500' },
    { icon: Users, label: 'Total Teachers', value: '12', color: 'from-indigo-500 to-purple-500' },
    { icon: MapPin, label: 'Active Rooms', value: '15', color: 'from-indigo-500 to-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container py-8 lg:py-12">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-md border border-gray-100">
            <Calendar className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">Fall Semester 2024</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Class</span>
            <span className="text-gray-800"> Routine</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Computer Science & Engineering Department
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
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

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  selectedDay === day
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-600 focus:border-indigo-400 focus:outline-none"
            >
              {batches.map((batch) => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>
            
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Subject</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Teacher</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Room</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                 </tr>
              </thead>
              <tbody>
                {currentRoutine.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-indigo-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{item.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {item.type === 'Break' ? (
                        <span className="text-sm text-gray-400 italic">{item.subject}</span>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"></div>
                          <span className="text-sm font-medium text-gray-800">{item.subject}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.type !== 'Break' ? (
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.teacher}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.type !== 'Break' ? (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{item.room}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {item.type !== 'Break' ? (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeBadge(item.type)}`}>
                          {item.type}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      
      </div>
    </div>
  );
};

export default Routine;