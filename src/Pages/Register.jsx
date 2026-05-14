import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Phone,
  BookOpen,
  UserCheck,
  Sparkles,
 
} from 'lucide-react';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa6';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    department: '',
    semester: '',
    studentId: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      console.log('Registration attempt:', { userType, ...formData });
      setSuccess('Registration successful! Please check your email for verification.');
      setIsLoading(false);
    }, 1500);
  };

  const userTypes = [
    { id: 'principal', label: 'Principal', icon: GraduationCap, color: 'from-amber-500 to-orange-500' },
    { id: 'chip_instructor', label: 'Chip Instructor', icon: UserCheck, color: 'from-red-500 to-rose-500' },
    { id: 'instructor', label: 'Instructor', icon: User, color: 'from-blue-500 to-indigo-500' },
    { id: 'junior_instructor', label: 'Junior Instructor', icon: User, color: 'from-cyan-500 to-teal-500' },
    { id: 'craft_instructor', label: 'Craft Instructor', icon: User, color: 'from-emerald-500 to-green-500' },
    { id: 'student', label: 'Student', icon: BookOpen, color: 'from-purple-500 to-pink-500' }
  ];

  const departments = [
    'Computer Science & Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Business Administration',
    'English'
  ];

  const semesters = ['1st Semester', '2nd Semester', '3rd Semester', '4th Semester', '5th Semester', '6th Semester', '7th Semester', '8th Semester'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-sm">
            <GraduationCap className="w-4 h-4 text-indigo-500" />
            <span className="text-sm font-medium text-gray-700">EduBridge - Smart Campus</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Create</span>
            <span className="text-gray-800"> Account</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Join EduBridge and start your smart learning journey
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="flex flex-col lg:flex-row">
            
            <div className="lg:w-2/5 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 lg:p-10 text-white">
              <div className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-8">
                    <GraduationCap className="w-8 h-8 text-amber-400" />
                    <span className="text-xl font-bold">EduBridge</span>
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-4">Join Our Smart Campus</h2>
                  <p className="text-indigo-200 mb-8 leading-relaxed">
                    Register to access all features of our Smart Campus Management System and enhance your learning experience.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">Access to class routines</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">Submit assignments online</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">Track attendance easily</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">View results instantly</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">Connect with teachers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-amber-400" />
                      <span className="text-sm">Get real-time notifications</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center gap-2 text-sm text-indigo-200">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Already have an account? <a href="/login" className="text-white font-medium hover:underline">Login here</a></span>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="lg:w-3/5 p-6 sm:p-8 lg:p-10">
              
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
                      <div className="flex items-center justify-center gap-1">
                        <type.icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {success && (
                <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-emerald-600">{success}</span>
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600">{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {userType === 'student' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student ID
                        </label>
                        <div className="relative">
                          <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="Enter your student ID"
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Department
                        </label>
                        <select
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white"
                        >
                          <option value="">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Semester
                        </label>
                        <select
                          name="semester"
                          value={formData.semester}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white"
                        >
                          <option value="">Select Semester</option>
                          {semesters.map((sem) => (
                            <option key={sem} value={sem}>{sem}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}

                  {(userType === 'instructor' || userType === 'chip_instructor' || userType === 'junior_instructor' || userType === 'craft_instructor') && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Department
                      </label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        ) : (
                          <Eye className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Create Account <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

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
  );
};

export default Register;