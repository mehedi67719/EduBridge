import React, { useState } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  FileText,
  CheckSquare,
  Award,
  MessageCircle,
  Bell,
  Clock,
  UserCheck,
  GraduationCap,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Star,
  Trophy,
  Activity,
  MapPin,
  User,
  ChevronDown,
  UserCircle
} from 'lucide-react';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const stats = [
    { icon: BookOpen, label: 'Total Subjects', value: '8', change: '+2', color: 'from-blue-500 to-cyan-500' },
    { icon: CheckSquare, label: 'Assignments', value: '3', change: 'Pending: 2', color: 'from-purple-500 to-pink-500' },
    { icon: UserCheck, label: 'Attendance', value: '85.7%', change: '+5.2%', color: 'from-emerald-500 to-teal-500' },
    { icon: Award, label: 'CGPA', value: '3.75', change: '+0.15', color: 'from-amber-500 to-orange-500' }
  ];

  const recentActivities = [
    { id: 1, title: 'Web Development Assignment', date: 'Dec 10, 2024', status: 'pending', icon: FileText },
    { id: 2, title: 'Database Management Class', date: 'Today, 10:30 AM', status: 'upcoming', icon: Calendar },
    { id: 3, title: 'Mid Term Result Published', date: 'Dec 5, 2024', status: 'completed', icon: Award },
    { id: 4, title: 'AI Workshop', date: 'Dec 15, 2024', status: 'upcoming', icon: Bell }
  ];

  const upcomingClasses = [
    { subject: 'Web Development', time: '09:00 AM - 10:30 AM', room: 'Lab 401', teacher: 'Mr. Rahim Khan' },
    { subject: 'Database Management', time: '10:30 AM - 12:00 PM', room: 'Room 305', teacher: 'Ms. Fatema Begum' },
    { subject: 'Data Structures', time: '01:00 PM - 02:30 PM', room: 'Lab 402', teacher: 'Mr. Hasan Ahmed' }
  ];

  const notices = [
    { id: 1, title: 'Annual Examination Schedule', date: 'Dec 15, 2024', priority: 'high' },
    { id: 2, title: 'Campus Closed for Eid', date: 'Apr 8-15, 2024', priority: 'medium' },
    { id: 3, title: 'Sports Day 2024', date: 'Dec 20, 2024', priority: 'low' }
  ];

  const menuItems = [
    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
    { id: 'myprofile', icon: UserCircle, label: 'My Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        <div className="flex">
          
          <div className={`fixed lg:relative z-30 transition-all duration-300 ${
            isSidebarOpen ? 'w-64' : 'w-0 lg:w-20'
          }`}>
            <div className={`h-full min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-xl ${
              isSidebarOpen ? 'w-64' : 'w-0 lg:w-20 overflow-hidden'
            } transition-all duration-300 rounded-r-2xl`}>
              
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-8 h-8 text-amber-400" />
                  {isSidebarOpen && (
                    <div>
                      <h1 className="text-lg font-bold">EduBridge</h1>
                      <p className="text-xs text-white/60">Student Portal</p>
                    </div>
                  )}
                </div>
              </div>

              <nav className="px-3 mt-6 space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 ${
                      activeTab === item.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {isSidebarOpen && <span className="text-sm">{item.label}</span>}
                  </button>
                ))}
              </nav>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all">
                  <LogOut className="w-5 h-5" />
                  {isSidebarOpen && <span className="text-sm">Logout</span>}
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 ml-0 lg:ml-4">
            
         
            
            {activeTab === 'overview' && (
              <>
                <div className="mb-6">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Rakib!</span>
                  </h1>
                  <p className="text-gray-500 text-sm mt-1">Here's what's happening with your academics today.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-indigo-500" />
                          <h2 className="font-semibold text-gray-800">Today's Schedule</h2>
                        </div>
                        <button className="text-xs text-indigo-600 hover:text-indigo-700">View All</button>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {upcomingClasses.map((class_, index) => (
                          <div key={index} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div>
                                <h3 className="font-medium text-gray-800">{class_.subject}</h3>
                                <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{class_.time}</span>
                                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{class_.room}</span>
                                  <span className="flex items-center gap-1"><User className="w-3 h-3" />{class_.teacher}</span>
                                </div>
                              </div>
                              <button className="text-indigo-500 text-sm hover:text-indigo-700">Join →</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Activity className="w-5 h-5 text-indigo-500" />
                          <h2 className="font-semibold text-gray-800">Recent Activities</h2>
                        </div>
                        <button className="text-xs text-indigo-600 hover:text-indigo-700">View All</button>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {recentActivities.map((activity) => (
                          <div key={activity.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
                                <activity.icon className="w-4 h-4 text-indigo-500" />
                              </div>
                              <div>
                                <h3 className="text-sm font-medium text-gray-800">{activity.title}</h3>
                                <p className="text-xs text-gray-400">{activity.date}</p>
                              </div>
                            </div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              activity.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                              activity.status === 'upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                            }`}>
                              {activity.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-5 text-white">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-amber-300" />
                        <span className="text-sm font-medium">Quick Stats</span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Semester Progress</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-[65%] h-full bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Attendance</span>
                            <span>85%</span>
                          </div>
                          <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-white rounded-full"></div>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-white/20">
                          <div className="flex items-center justify-between text-sm">
                            <span>CGPA Target</span>
                            <span className="font-bold">3.75 / 4.00</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
                        <Bell className="w-5 h-5 text-amber-500" />
                        <h2 className="font-semibold text-gray-800">Recent Notices</h2>
                      </div>
                      <div className="divide-y divide-gray-100">
                        {notices.map((notice) => (
                          <div key={notice.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium text-gray-800">{notice.title}</h3>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                notice.priority === 'high' ? 'bg-red-100 text-red-700' :
                                notice.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {notice.priority}
                              </span>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">{notice.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Trophy className="w-5 h-5 text-amber-500" />
                        <h2 className="font-semibold text-gray-800">Achievements</h2>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>Perfect Attendance - October</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>Top Performer - Web Development</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          <span>500+ Learning Hours</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'myprofile' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-indigo-500" />
                    My Profile
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">View and manage your profile information</p>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                      RA
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">Rakib Ahmed</h3>
                      <p className="text-gray-500">Computer Science & Engineering</p>
                      <p className="text-sm text-gray-400 mt-1">Student ID: 2024CS001</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input type="text" value="Rakib Ahmed" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
                        <input type="text" value="2024CS001" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input type="email" value="rakib.ahmed@edubridge.com" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input type="tel" value="+880 1234 567890" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                        <input type="date" value="2000-01-15" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                        <input type="text" value="Computer Science & Engineering" className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-700" readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Semester</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                          <option>5th Semester</option>
                          <option>6th Semester</option>
                          <option>7th Semester</option>
                          <option>8th Semester</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-end gap-3">
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-indigo-500" />
                    Settings
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your app settings and preferences</p>
                </div>

                <div className="p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-indigo-500" />
                      Notification Preferences
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700">Email Notifications</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700">Assignment Reminders</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </div>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer">
                        <span className="text-gray-700">Notice Board Updates</span>
                        <div className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-indigo-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-indigo-500" />
                      Security
                    </h3>
                    <div className="space-y-3">
                      <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-sm font-medium hover:bg-indigo-100 transition-colors">
                        Change Password
                      </button>
                      <button className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors ml-3">
                        Two-Factor Authentication
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-500" />
                      Language & Region
                    </h3>
                    <select className="px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100">
                      <option>English (UK)</option>
                      <option>English (US)</option>
                      <option>Bengali</option>
                    </select>
                  </div>

                  <div className="border-t border-gray-100 pt-6 flex justify-end gap-3">
                    <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;