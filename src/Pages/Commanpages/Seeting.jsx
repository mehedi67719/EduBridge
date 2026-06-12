import React, { useState } from 'react';
import {
  Settings,
  Bell,
  Lock,
  Globe,
  Moon,
  Sun,
  Monitor,
  Mail,
  MessageCircle,
  Shield,
  Database,
  Download,
  Trash2,
  User,
  Smartphone,
  Laptop,
  Tablet,
  CheckCircle,
  ChevronRight,
  AlertCircle,
  Save,
  X,
  Eye,
  EyeOff,
  Key,
  Fingerprint,
  LogOut,
  HelpCircle,
  FileText,
  Clock
} from 'lucide-react';
import Swal from 'sweetalert2';
import Useauth from '../../Hooks/Useauth';
import Loading from '../../Components/Loading';

const Seeting = () => {
  const { dbUser, loading } = Useauth();
  const [activeTab, setActiveTab] = useState('general');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    noticeUpdates: true,
    messageNotifications: true,
    twoFactorAuth: false,
    darkMode: false,
    language: 'english',
    timezone: 'asia/dhaka',
    dataSaver: false,
    autoPlay: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'general', icon: Settings, label: 'General' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Lock, label: 'Security' },
    { id: 'preferences', icon: Globe, label: 'Preferences' },
    { id: 'data', icon: Database, label: 'Data & Privacy' }
  ];

  const handleSaveSettings = () => {
    Swal.fire({
      title: 'Settings Saved!',
      text: 'Your preferences have been updated successfully.',
      icon: 'success',
      confirmButtonColor: '#6366f1',
      timer: 2000
    });
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

  const handleClearData = () => {
    Swal.fire({
      title: 'Clear All Data?',
      text: 'This action cannot be undone. All your cached data will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, clear data'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ title: 'Cleared!', text: 'Your data has been cleared.', icon: 'success', timer: 2000, showConfirmButton: false });
      }
    });
  };

  const handleDeleteAccount = () => {
    Swal.fire({
      title: 'Delete Account?',
      text: 'This action is permanent. All your data will be lost forever.',
      icon: 'error',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6366f1',
      confirmButtonText: 'Yes, delete account'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({ title: 'Account Deleted', text: 'Your account has been deleted.', icon: 'error', timer: 2000, showConfirmButton: false });
      }
    });
  };

  if (loading) {
    return <div className="w-full flex items-center justify-center min-h-[400px]"><Loading /></div>;
  }

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${checked ? 'bg-indigo-500' : 'bg-gray-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-md border border-indigo-100">
          <Settings className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">Settings & Preferences</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Settings</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Manage your account preferences and application settings</p>
        {dbUser && (
          <div className="mt-2 text-sm text-gray-500">
            Logged in as: <span className="font-medium text-indigo-600">{dbUser.email}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <div className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{tab.label}</span>
                  {activeTab === tab.id && <ChevronRight className="w-4 h-4 ml-auto" />}
                </button>
              ))}
            </div>
            <div className="p-4 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200">
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* General Settings */}
          {activeTab === 'general' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-gray-800">General Settings</h2>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Configure your basic application settings</p>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Moon className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Dark Mode</p>
                      <p className="text-xs text-gray-500">Switch between light and dark theme</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.darkMode} onChange={() => setSettings({ ...settings, darkMode: !settings.darkMode })} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Language</p>
                      <p className="text-xs text-gray-500">Choose your preferred language</p>
                    </div>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:outline-none"
                  >
                    <option value="english">English (UK)</option>
                    <option value="english_us">English (US)</option>
                    <option value="bengali">Bengali</option>
                    <option value="hindi">Hindi</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Timezone</p>
                      <p className="text-xs text-gray-500">Set your local timezone</p>
                    </div>
                  </div>
                  <select
                    value={settings.timezone}
                    onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                    className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm focus:border-indigo-400 focus:outline-none"
                  >
                    <option value="asia/dhaka">Asia/Dhaka (GMT+6)</option>
                    <option value="asia/kolkata">Asia/Kolkata (GMT+5:30)</option>
                    <option value="asia/dubai">Asia/Dubai (GMT+4)</option>
                    <option value="europe/london">Europe/London (GMT+0)</option>
                    <option value="america/new_york">America/New_York (GMT-5)</option>
                  </select>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Auto-play Media</p>
                      <p className="text-xs text-gray-500">Automatically play videos and animations</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.autoPlay} onChange={() => setSettings({ ...settings, autoPlay: !settings.autoPlay })} />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveSettings} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-gray-800">Notification Preferences</h2>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Choose what notifications you want to receive</p>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                      <p className="text-xs text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.emailNotifications} onChange={() => setSettings({ ...settings, emailNotifications: !settings.emailNotifications })} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Assignment Reminders</p>
                      <p className="text-xs text-gray-500">Get reminders for upcoming assignments</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.assignmentReminders} onChange={() => setSettings({ ...settings, assignmentReminders: !settings.assignmentReminders })} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Bell className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Notice Board Updates</p>
                      <p className="text-xs text-gray-500">Get notified about new notices</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.noticeUpdates} onChange={() => setSettings({ ...settings, noticeUpdates: !settings.noticeUpdates })} />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Message Notifications</p>
                      <p className="text-xs text-gray-500">Get notified about new messages</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.messageNotifications} onChange={() => setSettings({ ...settings, messageNotifications: !settings.messageNotifications })} />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveSettings} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-gray-800">Security Settings</h2>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Protect your account with security features</p>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Key className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Password</p>
                      <p className="text-xs text-gray-500">Last changed 30 days ago</p>
                    </div>
                  </div>
                  <button onClick={() => setShowPasswordModal(true)} className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all">Change</button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Fingerprint className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Two-Factor Authentication</p>
                      <p className="text-xs text-gray-500">Add an extra layer of security</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.twoFactorAuth} onChange={() => setSettings({ ...settings, twoFactorAuth: !settings.twoFactorAuth })} />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Login Alerts</p>
                      <p className="text-xs text-gray-500">Get notified on new device logins</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={true} onChange={() => {}} />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveSettings} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Preferences */}
          {activeTab === 'preferences' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-gray-800">Preferences</h2>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Customize your experience</p>
              </div>
              <div className="p-5 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default View</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                      <Laptop className="w-5 h-5 text-gray-500" />
                      <span className="text-xs text-gray-600">Desktop</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                      <Tablet className="w-5 h-5 text-gray-500" />
                      <span className="text-xs text-gray-600">Tablet</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-3 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                      <Smartphone className="w-5 h-5 text-gray-500" />
                      <span className="text-xs text-gray-600">Mobile</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Database className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Data Saver Mode</p>
                      <p className="text-xs text-gray-500">Reduce data usage by loading lower quality images</p>
                    </div>
                  </div>
                  <ToggleSwitch checked={settings.dataSaver} onChange={() => setSettings({ ...settings, dataSaver: !settings.dataSaver })} />
                </div>

                <div className="flex justify-end pt-4">
                  <button onClick={handleSaveSettings} className="px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all text-sm flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Data & Privacy */}
          {activeTab === 'data' && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-indigo-500" />
                  <h2 className="text-lg font-bold text-gray-800">Data & Privacy</h2>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Manage your data and privacy settings</p>
              </div>
              <div className="p-5 space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center">
                      <Download className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Download Your Data</p>
                      <p className="text-xs text-gray-500">Get a copy of all your personal data</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 rounded-lg border border-indigo-200 text-indigo-600 text-sm font-medium hover:bg-indigo-50 transition-all">Download</button>
                </div>

                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Clear Cache</p>
                      <p className="text-xs text-gray-500">Remove all cached data from your device</p>
                    </div>
                  </div>
                  <button onClick={handleClearData} className="px-4 py-2 rounded-lg border border-red-200 text-red-600 text-sm font-medium hover:bg-red-50 transition-all">Clear</button>
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Delete Account</p>
                      <p className="text-xs text-gray-500">Permanently delete your account and all data</p>
                    </div>
                  </div>
                  <button onClick={handleDeleteAccount} className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all">Delete</button>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 text-center">
                    Your data is encrypted and secure. We never share your personal information with third parties.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Password Modal */}
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

export default Seeting;