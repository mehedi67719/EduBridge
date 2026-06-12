import React, { useState } from 'react';
import {
  User,
  Mail,
  BookOpen,
  GraduationCap,
  Building2,
  Edit2,
  Save,
  X,
  Camera,
  Globe,
  Award,
  Clock,
  CheckCircle,
  FileText,
  Bell,
  Shield,
  Lock,
  Eye,
  EyeOff,
  ChevronRight,
  Star,
  TrendingUp,
  Calendar as CalendarIcon
} from 'lucide-react';
import Swal from 'sweetalert2';
import Useauth from '../../Hooks/Useauth';
import Loading from '../../Components/Loading';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa6';

const Profile = () => {
  const { dbUser, loading } = Useauth();
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    bio: ''
  });

  React.useEffect(() => {
    if (dbUser) {
      setFormData({
        fullName: dbUser.fullName || '',
        phone: dbUser.phone || '',
        address: dbUser.address || '',
        bio: dbUser.bio || ''
      });
    }
  }, [dbUser]);

  const stats = [
    { icon: BookOpen, label: 'Total Courses', value: '8', change: '+2', color: 'from-blue-500 to-cyan-500' },
    { icon: FileText, label: 'Assignments', value: '12', change: 'Submitted: 10', color: 'from-purple-500 to-pink-500' },
    { icon: CheckCircle, label: 'Attendance', value: '85%', change: '+5.2%', color: 'from-emerald-500 to-teal-500' },
    { icon: Award, label: 'CGPA', value: '3.75', change: '+0.15', color: 'from-amber-500 to-orange-500' }
  ];

  const recentActivities = [
    { id: 1, title: 'Submitted Web Development Assignment', date: '2 hours ago', status: 'completed', icon: FileText },
    { id: 2, title: 'Joined Database Management Class', date: 'Yesterday', status: 'completed', icon: BookOpen },
    { id: 3, title: 'Mid Term Result Published', date: '2 days ago', status: 'completed', icon: Award },
    { id: 4, title: 'New Notice: Examination Schedule', date: '3 days ago', status: 'pending', icon: Bell }
  ];

  const achievements = [
    { id: 1, title: 'Perfect Attendance', description: '100% attendance in October 2024', icon: Star, color: 'text-amber-500' },
    { id: 2, title: 'Top Performer', description: 'Highest score in Web Development', icon: Award, color: 'text-indigo-500' },
    { id: 3, title: '500+ Learning Hours', description: 'Completed 500+ hours of learning', icon: Clock, color: 'text-emerald-500' },
    { id: 4, title: 'Quick Learner', description: 'Completed 5 courses in one semester', icon: TrendingUp, color: 'text-purple-500' }
  ];

  const handleUpdateProfile = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Profile updated successfully!',
      icon: 'success',
      confirmButtonColor: '#6366f1',
      timer: 2000
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      Swal.fire({ title: 'Error!', text: 'Please fill all fields', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      Swal.fire({ title: 'Error!', text: 'New passwords do not match', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }
    if (passwordData.newPassword.length < 6) {
      Swal.fire({ title: 'Error!', text: 'Password must be at least 6 characters', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }
    Swal.fire({ title: 'Success!', text: 'Password changed successfully!', icon: 'success', confirmButtonColor: '#6366f1', timer: 2000 });
    setShowPasswordModal(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (loading) {
    return <div className="w-full flex items-center justify-center min-h-[400px]"><Loading /></div>;
  }

  const getInitials = () => {
    const name = formData.fullName || dbUser?.fullName || dbUser?.email?.split('@')[0] || 'User';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-md border border-indigo-100">
          <User className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">My Profile</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Profile</span>
          <span className="text-gray-800"> Information</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your personal information and account settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
     
        <div className="lg:col-span-1 space-y-6">
   
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="relative h-24 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            <div className="relative px-4 pb-5">
              <div className="flex justify-center -mt-12 mb-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-white shadow-lg">
                    {getInitials()}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-white shadow-md border border-gray-200 hover:bg-gray-50">
                    <Camera className="w-3.5 h-3.5 text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{formData.fullName || dbUser?.fullName || 'User'}</h2>
                <p className="text-sm text-gray-500 mt-0.5">{dbUser?.userType || 'Student'}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1"><Mail className="w-3 h-3" /> {dbUser?.email}</p>
                {dbUser?.institutionName && (
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center justify-center gap-1"><Building2 className="w-3 h-3" /> {dbUser.institutionName}</p>
                )}
                {dbUser?.department && (
                  <p className="text-xs text-gray-400 mt-0.5 flex items-center justify-center gap-1"><GraduationCap className="w-3 h-3" /> {dbUser.department}</p>
                )}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">85%</p>
                    <p className="text-xs text-gray-500">Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">3.75</p>
                    <p className="text-xs text-gray-500">CGPA</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-gray-800">8</p>
                    <p className="text-xs text-gray-500">Courses</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex justify-center gap-2">
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><FaTwitter className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><FaGithub className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><FaLinkedin className="w-4 h-4 text-gray-600" /></button>
                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"><Globe className="w-4 h-4 text-gray-600" /></button>
              </div>
            </div>
          </div>

       
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-5">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-500" />
              <h3 className="font-semibold text-gray-800">Achievements</h3>
            </div>
            <div className="space-y-3">
              {achievements.map(achievement => (
                <div key={achievement.id} className="flex items-start gap-3">
                  <achievement.icon className={`w-4 h-4 ${achievement.color} mt-0.5`} />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{achievement.title}</p>
                    <p className="text-xs text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

 
        <div className="lg:col-span-2 space-y-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-3 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">{stat.change}</span>
                </div>
                <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div>

 
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Personal Information</h2>
              </div>
              <button onClick={() => setIsEditing(!isEditing)} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
                {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            <div className="p-5">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input type="text" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Enter your address" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea rows="3" value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} placeholder="Tell us about yourself" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={handleUpdateProfile} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all text-sm"><Save className="w-4 h-4 inline mr-2" /> Save Changes</button>
                    <button onClick={() => setIsEditing(false)} className="px-5 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 text-sm">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-32 text-sm text-gray-500">Full Name</div>
                    <div className="flex-1 text-sm text-gray-800 font-medium">{formData.fullName || dbUser?.fullName || 'Not set'}</div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-32 text-sm text-gray-500">Email Address</div>
                    <div className="flex-1 text-sm text-gray-800">{dbUser?.email}</div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-32 text-sm text-gray-500">Phone Number</div>
                    <div className="flex-1 text-sm text-gray-800">{formData.phone || 'Not set'}</div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-32 text-sm text-gray-500">Address</div>
                    <div className="flex-1 text-sm text-gray-800">{formData.address || 'Not set'}</div>
                  </div>
                  <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
                    <div className="w-32 text-sm text-gray-500">Department</div>
                    <div className="flex-1 text-sm text-gray-800">{dbUser?.department || 'Not set'}</div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-32 text-sm text-gray-500">Bio</div>
                    <div className="flex-1 text-sm text-gray-600">{formData.bio || 'No bio added yet'}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

      
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Security</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Lock className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">Password</p>
                    <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                  </div>
                </div>
                <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all">Change Password</button>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Recent Activities</h2>
              </div>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {recentActivities.map(activity => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <activity.icon className="w-4 h-4 text-indigo-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-400">{activity.date}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${activity.status === 'completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{activity.status}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">View All <ChevronRight className="w-3 h-3" /></button>
            </div>
          </div>
        </div>
      </div>

     
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="px-5 py-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
              <button onClick={() => setShowPasswordModal(false)} className="p-1 rounded-lg hover:bg-gray-100"><X className="w-5 h-5 text-gray-500" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input type={showCurrentPassword ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none" />
                  <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">{showCurrentPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input type={showNewPassword ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none" />
                  <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">{showNewPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input type={showConfirmPassword ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none" />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2">{showConfirmPassword ? <EyeOff className="w-4 h-4 text-gray-400" /> : <Eye className="w-4 h-4 text-gray-400" />}</button>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={handleChangePassword} className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">Update Password</button>
                <button onClick={() => setShowPasswordModal(false)} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-medium">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;