import React, { useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle,
  AlertCircle,

} from 'lucide-react';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa6';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    setTimeout(() => {
      if (!email || !password) {
        setError('Please fill in all fields');
        setIsLoading(false);
      } else {
        console.log('Login attempt:', { userType, email, password, rememberMe });
        setIsLoading(false);
      }
    }, 1500);
  };

  const userTypes = [
    { id: 'principal', label: 'Principal', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
    { id: 'chip_instructor', label: 'Chip Instructor', icon: User, color: 'from-red-500 to-rose-500' },
    { id: 'instructor', label: 'Instructor', icon: User, color: 'from-blue-500 to-indigo-500' },
    { id: 'junior_instructor', label: 'Junior Instructor', icon: User, color: 'from-cyan-500 to-teal-500' },
    { id: 'craft_instructor', label: 'Craft Instructor', icon: User, color: 'from-emerald-500 to-green-500' },
    { id: 'student', label: 'Student', icon: User, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center py-12">
        
        <div className="w-full max-w-6xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-sm">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">EduBridge - Smart Campus</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Welcome</span>
              <span className="text-gray-800"> Back</span>
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Login to access your dashboard and manage your academic activities
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="flex flex-col lg:flex-row">
              
              <div className="lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 lg:p-10 text-white">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-8">
                      <GraduationCap className="w-8 h-8 text-amber-400" />
                      <span className="text-xl font-bold">EduBridge</span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-4">Smart Campus Management System</h2>
                    <p className="text-indigo-200 mb-8 leading-relaxed">
                      A complete digital ecosystem for modern education. Manage classes, assignments, attendance, results and communication all in one place.
                    </p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Class Routine Management</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Assignment Upload/Download</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Attendance Tracking System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Notice Board & Announcements</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Result Publication System</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-amber-400" />
                        <span className="text-sm">Student-Teacher Chat System</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-white/20">
                    <div className="flex items-center gap-2 text-sm text-indigo-200">
                      <Sparkles className="w-4 h-4 text-amber-400" />
                      <span>Bridging Knowledge, Connecting Minds</span>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="lg:w-1/2 p-6 sm:p-8 lg:p-10">
                
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {userTypes.map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setUserType(type.id)}
                        className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                          userType === type.id
                            ? `bg-gradient-to-r ${type.color} text-white shadow-md`
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Forgot Password?
                    </a>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      <span className="text-sm text-red-600">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Login <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500">
                      Don't have an account?{' '}
                      <a href="register" className="text-indigo-600 hover:text-indigo-700 font-medium">
                        Create Account
                      </a>
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="flex items-center justify-center gap-4">
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FaFacebook className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FaTwitter className="w-5 h-5 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                        <FaGithub className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          
       
        </div>
      </div>
    </div>
  );
};

export default Login;