import React from 'react';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  FileText, 
  CheckCircle, 
  MessageCircle,
  ArrowRight,
  GraduationCap,
  Monitor,
  Trophy,
  Clock,
  Bell,
  LayoutDashboard,
  Sparkles,
  Shield,
  UserCog,
  Briefcase,
  Wrench,
  Crown
} from 'lucide-react';
import { FaPersonChalkboard, FaUserGraduate } from 'react-icons/fa6';
import { LiaUserGraduateSolid } from 'react-icons/lia';

const Home = () => {
  const features = [
    { icon: Calendar, title: 'Class Routine', desc: 'View your daily class schedule', color: 'from-blue-500 to-cyan-500' },
    { icon: FileText, title: 'Assignments', desc: 'Submit & download assignments', color: 'from-purple-500 to-pink-500' },
    { icon: CheckCircle, title: 'Attendance', desc: 'Track your attendance easily', color: 'from-green-500 to-emerald-500' },
    { icon: Trophy, title: 'Results', desc: 'Check exam results online', color: 'from-orange-500 to-red-500' },
    { icon: MessageCircle, title: 'Live Chat', desc: 'Connect with teachers', color: 'from-cyan-500 to-blue-500' },
    { icon: Bell, title: 'Notice Board', desc: 'All updates in one place', color: 'from-yellow-500 to-orange-500' },
  ];

  const roles = [
    { icon: Crown, title: 'Principal', desc: 'Full campus oversight & management', bg: 'from-amber-500 to-orange-500' },
    { icon: UserCog, title: 'Chip Instructor', desc: 'Senior technical instructor', bg: 'from-red-500 to-rose-500' },
    { icon: FaPersonChalkboard, title: 'Instructor', desc: 'Subject matter expert', bg: 'from-blue-500 to-indigo-500' },
    { icon: Briefcase, title: 'Junior Instructor', desc: 'Assistant teaching staff', bg: 'from-cyan-500 to-teal-500' },
    { icon: Wrench, title: 'Craft Instructor', desc: 'Practical skill trainer', bg: 'from-emerald-500 to-green-500' },
    { icon: FaUserGraduate, title: 'Student', desc: 'Learn & grow', bg: 'from-purple-500 to-pink-500' },
  ];

  const stats = [
    { number: '5K+', label: 'Active Students', icon: Users },
    { number: '200+', label: 'Total Teachers', icon: GraduationCap },
    { number: '98%', label: 'Parent Satisfaction', icon: Shield },
    { number: '24/7', label: 'Online Support', icon: Clock },
  ];

  const howItWorks = [
    { step: '01', title: 'Create Account', desc: 'Sign up as Student or Teacher', icon: Users },
    { step: '02', title: 'Login Dashboard', desc: 'Access your personalized dashboard', icon: LayoutDashboard },
    { step: '03', title: 'Start Learning', desc: 'View routine, submit assignments & more', icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      
  
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="container py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div>
              <div className="inline-flex items-center gap-2 bg-purple-100 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-600">Smart Campus Management System</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Edu</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Bridge</span>
                <br />
                <span className="text-gray-800">Bridging Knowledge,</span>
                <br />
                <span className="text-gray-800">Connecting Minds</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                A complete digital ecosystem for modern education. Manage classes, 
                assignments, attendance, results and communication all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2">
                  Get Started Free <ArrowRight className="w-4 h-4" />
                </button>
                <button className="px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 flex items-center gap-2">
                  Watch Demo <Monitor className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">P</div>
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">I</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">S</div>
                </div>
                <p className="text-sm text-gray-500">Trusted by 5000+ students & teachers</p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl shadow-2xl p-4 border border-purple-500/20">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-400 ml-2">EduBridge Dashboard</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <Calendar className="w-5 h-5 text-cyan-400 mb-2" />
                      <p className="text-white text-sm font-medium">Today's Class</p>
                      <p className="text-gray-400 text-xs">Physics - Room 201</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-3">
                      <FileText className="w-5 h-5 text-purple-400 mb-2" />
                      <p className="text-white text-sm font-medium">Pending Work</p>
                      <p className="text-gray-400 text-xs">2 Assignments</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

   
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-gray-800">{stat.number}</h3>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

 
      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Campus Roles</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Every role has dedicated features and personalized dashboard
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role, index) => (
              <div key={index} className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/20">
                <div className={`w-14 h-14 bg-gradient-to-r ${role.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <role.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{role.title}</h3>
                <p className="text-gray-300">{role.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Everything You Need in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">One Platform</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make campus management seamless and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="group bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

  
      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Role Based <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Smart Access</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Different roles get different dashboards and permissions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500">
              <Crown className="w-10 h-10 text-amber-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Principal</h3>
              <p className="text-gray-500 text-sm mt-2">Full campus analytics, all reports, teacher management, student overview</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-red-500">
              <UserCog className="w-10 h-10 text-red-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Chip Instructor</h3>
              <p className="text-gray-500 text-sm mt-2">Department oversight, instructor coordination, curriculum management</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500">
              <FaPersonChalkboard className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Instructor</h3>
              <p className="text-gray-500 text-sm mt-2">Class management, assignment creation, student grading, attendance</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-cyan-500">
              <Briefcase className="w-10 h-10 text-cyan-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Junior Instructor</h3>
              <p className="text-gray-500 text-sm mt-2">Assist senior instructors, lab sessions, student support</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-emerald-500">
              <Wrench className="w-10 h-10 text-emerald-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Craft Instructor</h3>
              <p className="text-gray-500 text-sm mt-2">Practical training, workshop management, skill development</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-purple-500">
              <LiaUserGraduateSolid className="w-10 h-10 text-purple-500 mb-3" />
              <h3 className="text-lg font-bold text-gray-800">Student</h3>
              <p className="text-gray-500 text-sm mt-2">View routine, submit assignments, check results, communicate</p>
            </div>
          </div>
        </div>
      </section>


      <section className="py-20 bg-gradient-to-r from-gray-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">EduBridge</span> Works
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500"></div>
                  )}
                </div>
                <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-cyan-400 text-sm font-medium mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

   
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your Campus?
            </h2>
            <p className="text-cyan-100 mb-6 max-w-lg mx-auto">
              Join thousands of students and teachers using EduBridge for smarter education
            </p>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;