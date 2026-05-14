import React, { useState } from 'react';
import { 
  Bell, 
  Megaphone, 
  Calendar, 
  User, 
  Pin, 
  Eye,
  ChevronRight,
  Filter,
  Search,
  AlertCircle,
  Sparkles,
  Clock,
  Star,
  Share2,
  Bookmark,
  TrendingUp
} from 'lucide-react';

const Notice = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const notices = [
    {
      id: 1,
      title: 'Annual Examination 2024 Schedule',
      description: 'The annual examination will start from December 15, 2024. All students must collect their admit cards by December 10.',
      date: 'November 25, 2024',
      category: 'exam',
      priority: 'high',
      author: 'Principal Office',
      pinned: true,
      views: '1.2k',
      trending: true
    },
    {
      id: 2,
      title: 'Campus Closed for Eid-ul-Fitr',
      description: 'The campus will remain closed from April 8 to April 15 on the occasion of Eid-ul-Fitr.',
      date: 'March 20, 2024',
      category: 'holiday',
      priority: 'medium',
      author: 'Administration',
      pinned: false,
      views: '856',
      trending: false
    },
    {
      id: 3,
      title: 'Workshop on Web Development',
      description: 'A 3-day workshop on MERN Stack will be held from December 1-3. Register by November 25.',
      date: 'November 15, 2024',
      category: 'event',
      priority: 'medium',
      author: 'Chip Instructor',
      pinned: false,
      views: '2.1k',
      trending: true
    },
    {
      id: 4,
      title: 'Result Published - Mid Term 2024',
      description: 'Mid term examination results have been published. Check your results in the student portal.',
      date: 'October 30, 2024',
      category: 'result',
      priority: 'high',
      author: 'Examination Department',
      pinned: true,
      views: '3.4k',
      trending: true
    },
    {
      id: 5,
      title: 'Parent-Teacher Meeting',
      description: 'PTM for all semesters will be held on December 5 from 10 AM to 3 PM.',
      date: 'November 28, 2024',
      category: 'meeting',
      priority: 'medium',
      author: 'Academic Department',
      pinned: false,
      views: '567',
      trending: false
    },
    {
      id: 6,
      title: 'Sports Day 2024',
      description: 'Annual Sports Day will be celebrated on December 20. All students are encouraged to participate.',
      date: 'December 1, 2024',
      category: 'event',
      priority: 'low',
      author: 'Sports Committee',
      pinned: false,
      views: '934',
      trending: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Notices', icon: Bell, count: 6, color: 'from-cyan-500 to-blue-500' },
    { id: 'exam', name: 'Examination', icon: Calendar, count: 1, color: 'from-purple-500 to-pink-500' },
    { id: 'event', name: 'Events', icon: Megaphone, count: 2, color: 'from-orange-500 to-red-500' },
    { id: 'holiday', name: 'Holidays', icon: Clock, count: 1, color: 'from-emerald-500 to-teal-500' },
    { id: 'result', name: 'Results', icon: TrendingUp, count: 1, color: 'from-blue-500 to-indigo-500' },
    { id: 'meeting', name: 'Meetings', icon: User, count: 1, color: 'from-rose-500 to-pink-500' }
  ];

  const getPriorityStyle = (priority) => {
    switch(priority) {
      case 'high': 
        return 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/20';
      case 'medium': 
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20';
      case 'low': 
        return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/20';
      default: 
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'exam': return 'from-purple-500 to-pink-500';
      case 'event': return 'from-orange-500 to-red-500';
      case 'holiday': return 'from-emerald-500 to-teal-500';
      case 'result': return 'from-blue-500 to-indigo-500';
      case 'meeting': return 'from-rose-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredNotices = notices.filter(notice => {
    const matchesCategory = selectedCategory === 'all' || notice.category === selectedCategory;
    const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const pinnedNotices = filteredNotices.filter(notice => notice.pinned);
  const normalNotices = filteredNotices.filter(notice => !notice.pinned);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      
      <div className="container pt-10 lg:pt-14 pb-6">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 shadow-md border border-gray-100">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Latest Updates & Announcements</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Notice</span>
            <span className="text-gray-800"> Board</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Stay updated with all campus announcements, events, and important notifications
          </p>
        </div>
      </div>

      <div className="container py-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sticky top-24 border border-white/50">
              <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <Filter className="w-4 h-4 text-white" />
                </div>
                <h2 className="font-bold text-gray-800 text-lg">Categories</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-white/20'
                          : `bg-gradient-to-r ${category.color} bg-opacity-10`
                      }`}>
                        <category.icon className={`w-4 h-4 ${
                          selectedCategory === category.id ? 'text-white' : 'text-gray-500'
                        }`} />
                      </div>
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-gray-700">Trending Topics</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs rounded-full font-medium">Examination</span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 text-xs rounded-full font-medium">Results</span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs rounded-full font-medium">Workshop</span>
                  <span className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-xs rounded-full font-medium">Scholarship</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mb-8">
              <div className="relative group">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                <input
                  type="text"
                  placeholder="Search notices by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-white border border-gray-200 focus:border-cyan-400 focus:outline-none focus:ring-4 focus:ring-cyan-100 transition-all duration-300 text-gray-700 placeholder:text-gray-400 shadow-sm"
                />
              </div>
            </div>

            {pinnedNotices.length > 0 && (
              <div className="mb-10">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-7 h-7 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Pin className="w-3.5 h-3.5 text-white" />
                  </div>
                  <h2 className="font-bold text-gray-800">Pinned Notices</h2>
                  <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Important</span>
                </div>
                <div className="grid gap-6">
                  {pinnedNotices.map((notice) => (
                    <div key={notice.id} className="group relative bg-gradient-to-r from-amber-50/80 via-yellow-50/80 to-orange-50/80 rounded-2xl p-6 border-l-4 border-amber-500 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.01]">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <button className="p-1.5 rounded-lg bg-white/50 hover:bg-white transition-colors">
                          <Bookmark className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                        <button className="p-1.5 rounded-lg bg-white/50 hover:bg-white transition-colors">
                          <Share2 className="w-3.5 h-3.5 text-gray-500" />
                        </button>
                      </div>
                      <div className="flex items-start gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getPriorityStyle(notice.priority)}`}>
                              {notice.priority === 'high' ? 'High Priority' : notice.priority === 'medium' ? 'Medium Priority' : 'Low Priority'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(notice.category)} text-white shadow-sm`}>
                              {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                            </span>
                            {notice.trending && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                Trending
                              </span>
                            )}
                          </div>
                          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-700 transition-colors">
                            {notice.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                            {notice.description}
                          </p>
                          <div className="flex items-center gap-5 text-xs">
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Calendar className="w-3.5 h-3.5" />
                              {notice.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <User className="w-3.5 h-3.5" />
                              {notice.author}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-500">
                              <Eye className="w-3.5 h-3.5" />
                              {notice.views} views
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-amber-600 font-medium text-sm hover:bg-amber-500 hover:text-white transition-all duration-300 shadow-sm">
                          Read More <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Bell className="w-3.5 h-3.5 text-white" />
                </div>
                <h2 className="font-bold text-gray-800">All Notices</h2>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">{normalNotices.length} notices</span>
              </div>
              
              {normalNotices.length > 0 ? (
                <div className="grid gap-5">
                  {normalNotices.map((notice) => (
                    <div key={notice.id} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-purple-200 hover:scale-[1.01]">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium shadow-sm ${getPriorityStyle(notice.priority)}`}>
                              {notice.priority === 'high' ? 'High' : notice.priority === 'medium' ? 'Medium' : 'Low'}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getCategoryColor(notice.category)} text-white shadow-sm`}>
                              {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                            </span>
                            {notice.trending && (
                              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs">
                                <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                Trending
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                            {notice.title}
                          </h3>
                          <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                            {notice.description}
                          </p>
                          <div className="flex items-center gap-5 text-xs">
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <Calendar className="w-3.5 h-3.5" />
                              {notice.date}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <User className="w-3.5 h-3.5" />
                              {notice.author}
                            </span>
                            <span className="flex items-center gap-1.5 text-gray-400">
                              <Eye className="w-3.5 h-3.5" />
                              {notice.views} views
                            </span>
                          </div>
                        </div>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 font-medium text-sm hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 shadow-sm">
                          Read More <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-16 text-center shadow-lg border border-gray-100">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-10 h-10 text-gray-300" />
                  </div>
                  <p className="text-gray-400 font-medium">No notices found</p>
                  <p className="text-gray-300 text-sm mt-1">Try adjusting your search or category filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notice;