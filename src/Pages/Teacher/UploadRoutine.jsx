import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Upload,
  Send,
  Eye,
  Users,
  UserCog,
  GraduationCap,
  Briefcase,
  Wrench,
  Crown,
  Bell,
  CheckCircle,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  Globe,
  Lock,
  Key,
  Edit2,
  X,
  Clock,
  MapPin,
  User,
  School,
  Copy,
  Check,
  Sun,
  Moon
} from 'lucide-react';
import Swal from 'sweetalert2';
import Useauth from '../../Hooks/Useauth';
import Loading from '../../Components/Loading';

const UploadRoutine = () => {
  const { dbUser, loading: authLoading } = Useauth();

  const { register, handleSubmit, watch, setValue, reset, formState: { isSubmitting } } = useForm({
    defaultValues: {
      routineTitle: '',
      routineDescription: '',
      selectedRoles: [],
      semester: '',
      department: '',
      customDepartment: '',
      academicYear: '',
      isPrivate: false,
      secretCode: '',
      timeSlots: [
        { id: '1', start: '09:00', end: '10:30', label: '09:00 AM - 10:30 AM' },
        { id: '2', start: '10:30', end: '12:00', label: '10:30 AM - 12:00 PM' },
        { id: '3', start: '12:00', end: '13:00', label: '12:00 PM - 01:00 PM' },
        { id: '4', start: '13:00', end: '14:30', label: '01:00 PM - 02:30 PM' },
        { id: '5', start: '14:30', end: '16:00', label: '02:30 PM - 04:00 PM' }
      ],
      weeklyRoutine: {
        Monday: [],
        Tuesday: [],
        Wednesday: [],
        Thursday: [],
        Friday: [],
        Saturday: []
      },
      holidayDays: []
    }
  });

  const [uiState, setUiState] = useState({
    showPreview: false,
    showCustomDeptInput: false,
    showCustomTimeInput: false,
    newTimeSlot: { start: '', end: '' },
    copyFromDay: null,
    showCopyModal: false
  });

  const roles = [
    { id: 'public', name: 'Public', icon: Globe, color: 'from-gray-500 to-gray-600', desc: 'Visible to everyone - no login required' },
    { id: 'principal', name: 'Principal', icon: Crown, color: 'from-amber-500 to-orange-500', desc: 'Full campus oversight & management' },
    { id: 'chip_instructor', name: 'Chip Instructor', icon: UserCog, color: 'from-red-500 to-rose-500', desc: 'Senior technical instructor' },
    { id: 'instructor', name: 'Instructor', icon: GraduationCap, color: 'from-blue-500 to-indigo-500', desc: 'Subject matter expert' },
    { id: 'junior_instructor', name: 'Junior Instructor', icon: Briefcase, color: 'from-cyan-500 to-teal-500', desc: 'Assistant teaching staff' },
    { id: 'craft_instructor', name: 'Craft Instructor', icon: Wrench, color: 'from-emerald-500 to-green-500', desc: 'Practical skill trainer' },
    { id: 'student', name: 'Student', icon: Users, color: 'from-purple-500 to-pink-500', desc: 'Learn & grow' }
  ];

  const departments = [
    'Computer Science & Engineering',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Electronics Engineering',
    'Chemical Engineering',
    'Business Administration',
    'English',
    'Mathematics',
    'Physics',
    'Chemistry'
  ];

  const classTypes = ['Theory', 'Lab', 'Practical', 'Tutorial', 'Break', 'Holiday'];
  const days = [
    { id: 'Monday', label: 'Monday', icon: Sun },
    { id: 'Tuesday', label: 'Tuesday', icon: Sun },
    { id: 'Wednesday', label: 'Wednesday', icon: Sun },
    { id: 'Thursday', label: 'Thursday', icon: Sun },
    { id: 'Friday', label: 'Friday', icon: Sun },
    { id: 'Saturday', label: 'Saturday', icon: Sun }
  ];

  const watchSelectedRoles = watch('selectedRoles');
  const watchIsPrivate = watch('isPrivate');
  const watchDepartment = watch('department');
  const watchCustomDepartment = watch('customDepartment');
  const watchWeeklyRoutine = watch('weeklyRoutine');
  const watchTimeSlots = watch('timeSlots');
  const watchHolidayDays = watch('holidayDays');

  const handleRoleToggle = (roleId) => {
    const current = watchSelectedRoles || [];
    const updated = current.includes(roleId) ? current.filter(r => r !== roleId) : [...current, roleId];
    setValue('selectedRoles', updated);
  };

  const addCustomTimeSlot = () => {
    if (uiState.newTimeSlot.start && uiState.newTimeSlot.end) {
      const newId = Date.now().toString();
      const label = `${uiState.newTimeSlot.start} - ${uiState.newTimeSlot.end}`;
      const currentSlots = watchTimeSlots || [];
      setValue('timeSlots', [...currentSlots, { id: newId, start: uiState.newTimeSlot.start, end: uiState.newTimeSlot.end, label }]);
      setUiState(prev => ({ ...prev, newTimeSlot: { start: '', end: '' }, showCustomTimeInput: false }));
    }
  };

  const removeTimeSlot = (index) => {
    const currentSlots = watchTimeSlots || [];
    const updated = currentSlots.filter((_, i) => i !== index);
    setValue('timeSlots', updated);
    
    // Also remove data from all days for this time slot
    days.forEach(day => {
      const dayRoutine = watchWeeklyRoutine[day.id] || [];
      const updatedRoutine = dayRoutine.filter((_, i) => i !== index);
      setValue(`weeklyRoutine.${day.id}`, updatedRoutine);
    });
  };

  const updateSlotValue = (dayId, slotIndex, field, value) => {
    const currentRoutine = watchWeeklyRoutine[dayId] || [];
    const updated = [...currentRoutine];
    if (!updated[slotIndex]) {
      updated[slotIndex] = { subject: '', teacher: '', room: '', type: 'Theory' };
    }
    updated[slotIndex] = { ...updated[slotIndex], [field]: value };
    setValue(`weeklyRoutine.${dayId}`, updated);
  };

  const getSlotValue = (dayId, slotIndex, field) => {
    const routine = watchWeeklyRoutine[dayId] || [];
    return routine[slotIndex]?.[field] || '';
  };

  const toggleHoliday = (dayId) => {
    const current = watchHolidayDays || [];
    const updated = current.includes(dayId) ? current.filter(d => d !== dayId) : [...current, dayId];
    setValue('holidayDays', updated);
    
    // Clear all slots for holiday day
    if (!current.includes(dayId)) {
      const emptySlots = watchTimeSlots.map(() => ({ subject: '', teacher: '', room: '', type: 'Holiday' }));
      setValue(`weeklyRoutine.${dayId}`, emptySlots);
    } else {
      setValue(`weeklyRoutine.${dayId}`, []);
    }
  };

  const copyDaySchedule = (sourceDayId) => {
    const sourceRoutine = watchWeeklyRoutine[sourceDayId] || [];
    setUiState(prev => ({ ...prev, copyFromDay: sourceDayId, showCopyModal: true }));
  };

  const pasteToDay = (targetDayId) => {
    if (uiState.copyFromDay) {
      const sourceRoutine = watchWeeklyRoutine[uiState.copyFromDay] || [];
      setValue(`weeklyRoutine.${targetDayId}`, JSON.parse(JSON.stringify(sourceRoutine)));
      Swal.fire({ title: 'Copied!', text: `Schedule copied from ${uiState.copyFromDay} to ${targetDayId}`, icon: 'success', timer: 1500, showConfirmButton: false });
      setUiState(prev => ({ ...prev, showCopyModal: false, copyFromDay: null }));
    }
  };

  const getDepartmentDisplay = () => {
    if (watchDepartment === 'other') return watchCustomDepartment || 'Other';
    return watchDepartment;
  };

  const onSubmit = async (data) => {
    if (!data.routineTitle || !data.semester || !data.academicYear) {
      Swal.fire({ title: 'Error!', text: 'Please fill all required fields', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }

    if (data.selectedRoles.length === 0) {
      Swal.fire({ title: 'Error!', text: 'Please select at least one target audience', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }

    if (data.isPrivate && !data.secretCode) {
      Swal.fire({ title: 'Error!', text: 'Please enter a secret code for private routine', icon: 'error', confirmButtonColor: '#6366f1' });
      return;
    }

    const selectedRolesNames = data.selectedRoles.map(roleId => roles.find(r => r.id === roleId)?.name);
    const departmentName = data.department === 'other' ? data.customDepartment : data.department;

    const finalData = {
      routineTitle: data.routineTitle,
      routineDescription: data.routineDescription,
      targetRoles: selectedRolesNames,
      semester: data.semester,
      department: departmentName,
      academicYear: data.academicYear,
      isPrivate: data.isPrivate,
      secretCode: data.isPrivate ? data.secretCode : null,
      timeSlots: data.timeSlots,
      weeklyRoutine: data.weeklyRoutine,
      holidayDays: data.holidayDays,
      createdBy: {
        email: dbUser?.email,
        userType: dbUser?.userType,
        fullName: dbUser?.fullName,
        institutionName: dbUser?.institutionName
      },
      createdAt: new Date().toISOString(),
      status: 'published'
    };

    console.log('========== ROUTINE SUBMITTED ==========');
    console.log(JSON.stringify(finalData, null, 2));
    console.log('=======================================');

    Swal.fire({
      title: 'Success!',
      text: 'Routine uploaded successfully!',
      icon: 'success',
      confirmButtonColor: '#6366f1',
      timer: 3000
    });
    reset();
    setUiState(prev => ({ ...prev, showCustomDeptInput: false, showCustomTimeInput: false }));
  };

  if (authLoading) {
    return <div className="w-full flex items-center justify-center min-h-[400px]"><Loading /></div>;
  }

  return (
    <div className="w-full relative">
      {(isSubmitting) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-center text-gray-600 mt-3 text-sm font-medium">Publishing routine...</p>
          </div>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-md border border-indigo-100">
          <Upload className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">Admin Panel - Routine Management</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Upload</span>
          <span className="text-gray-800"> Class Routine</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage weekly class schedules</p>
        {dbUser && (
          <div className="mt-2 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {dbUser.email}</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {dbUser.userType}</span>
            {dbUser?.institutionName && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1"><School className="w-3 h-3" /> {dbUser.institutionName}</span>
              </>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Create Weekly Routine</h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Fill in the details to publish a complete weekly class routine</p>
            </div>

            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routine Title <span className="text-red-500">*</span></label>
                  <input type="text" {...register('routineTitle', { required: true })} placeholder="e.g., Fall Semester 2024 Routine" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                  <textarea {...register('routineDescription')} rows="1" placeholder="Additional notes about this routine..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none text-base" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semester <span className="text-red-500">*</span></label>
                  <select {...register('semester', { required: true })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base">
                    <option value="">Select Semester</option>
                    <option>1st Semester</option><option>2nd Semester</option><option>3rd Semester</option>
                    <option>4th Semester</option><option>5th Semester</option><option>6th Semester</option>
                    <option>7th Semester</option><option>8th Semester</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department <span className="text-red-500">*</span></label>
                  <div className="flex gap-2">
                    <select {...register('department', { required: true })} className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base">
                      <option value="">Select Department</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                      <option value="other">Other (Manual Entry)</option>
                    </select>
                    {watchDepartment === 'other' && (
                      <button type="button" onClick={() => setUiState(prev => ({ ...prev, showCustomDeptInput: !prev.showCustomDeptInput }))} className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-all">
                        <Edit2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {watchDepartment === 'other' && uiState.showCustomDeptInput && (
                    <div className="mt-2 flex gap-2">
                      <input {...register('customDepartment')} type="text" placeholder="Enter department name" className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base" />
                      <button type="button" onClick={() => setUiState(prev => ({ ...prev, showCustomDeptInput: false }))} className="px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"><X className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year <span className="text-red-500">*</span></label>
                  <select {...register('academicYear', { required: true })} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base">
                    <option value="">Select Year</option>
                    <option>2024-2025</option><option>2025-2026</option><option>2026-2027</option>
                  </select>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-indigo-50 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {watchIsPrivate ? <Lock className="w-5 h-5 text-amber-600" /> : <Globe className="w-5 h-5 text-green-600" />}
                    <span className="text-sm font-medium text-gray-700">{watchIsPrivate ? 'Private Routine' : 'Public Routine'}</span>
                  </div>
                  <button type="button" onClick={() => setValue('isPrivate', !watchIsPrivate)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watchIsPrivate ? 'bg-amber-500' : 'bg-green-500'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watchIsPrivate ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
                <p className="text-xs text-gray-500">{watchIsPrivate ? 'Private routine requires a secret code to access.' : 'Public routine is visible to all selected roles.'}</p>
                {watchIsPrivate && (
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Key className="w-4 h-4 text-amber-600" /> Secret Code <span className="text-red-500">*</span></label>
                    <input type="text" {...register('secretCode')} placeholder="Enter a secret code" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base font-mono" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {roles.map(role => (
                    <button key={role.id} type="button" onClick={() => handleRoleToggle(role.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${watchSelectedRoles?.includes(role.id) ? `bg-gradient-to-r ${role.color} text-white border-transparent shadow-md` : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'}`}>
                      <role.icon className="w-4 h-4" /> <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots Management */}
              <div>
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <label className="block text-sm font-medium text-gray-700">Time Slots</label>
                  <button type="button" onClick={() => setUiState(prev => ({ ...prev, showCustomTimeInput: !prev.showCustomTimeInput }))} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
                    <Plus className="w-4 h-4" /> Add Custom Time Slot
                  </button>
                </div>
                
                {uiState.showCustomTimeInput && (
                  <div className="mb-3 p-3 bg-indigo-50 rounded-lg flex flex-wrap gap-2 items-end">
                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Start Time</label>
                      <input type="time" value={uiState.newTimeSlot.start} onChange={(e) => setUiState(prev => ({ ...prev, newTimeSlot: { ...prev.newTimeSlot, start: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                    </div>
                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-xs font-medium text-gray-600 mb-1">End Time</label>
                      <input type="time" value={uiState.newTimeSlot.end} onChange={(e) => setUiState(prev => ({ ...prev, newTimeSlot: { ...prev.newTimeSlot, end: e.target.value } }))} className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                    </div>
                    <button type="button" onClick={addCustomTimeSlot} className="px-3 py-2 rounded-lg bg-indigo-500 text-white text-sm">Add</button>
                    <button type="button" onClick={() => setUiState(prev => ({ ...prev, showCustomTimeInput: false, newTimeSlot: { start: '', end: '' } }))} className="px-3 py-2 rounded-lg bg-gray-200 text-gray-600 text-sm">Cancel</button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mb-4">
                  {watchTimeSlots?.map((slot, idx) => (
                    <div key={slot.id} className="bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{slot.label}</span>
                      <button type="button" onClick={() => removeTimeSlot(idx)} className="hover:text-red-600"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Days with Holiday Toggle and Copy Feature */}
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full min-w-[1000px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                      <th className="px-4 py-3 text-left text-sm font-semibold w-32">Day / Time</th>
                      {watchTimeSlots?.map((slot, idx) => (
                        <th key={idx} className="px-3 py-3 text-center text-xs font-medium w-36">{slot.label}</th>
                      ))}
                      <th className="px-3 py-3 text-center text-xs font-medium w-24">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day) => {
                      const isHoliday = watchHolidayDays?.includes(day.id);
                      return (
                        <tr key={day.id} className={`border-b border-gray-200 transition-colors ${isHoliday ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                          <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50 border-r border-gray-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <day.icon className="w-3.5 h-3.5 text-indigo-500" />
                                {day.label}
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleHoliday(day.id)}
                                className={`ml-2 px-2 py-0.5 rounded-full text-xs font-medium transition-all ${isHoliday ? 'bg-amber-200 text-amber-800' : 'bg-gray-200 text-gray-600 hover:bg-amber-100'}`}
                              >
                                {isHoliday ? 'Holiday ✓' : 'Set Holiday'}
                              </button>
                            </div>
                          </td>
                          {watchTimeSlots?.map((slot, slotIndex) => (
                            <td key={slotIndex} className="px-2 py-2 align-top">
                              {!isHoliday ? (
                                <div className="space-y-1.5">
                                  <input
                                    value={getSlotValue(day.id, slotIndex, 'subject')}
                                    onChange={(e) => updateSlotValue(day.id, slotIndex, 'subject', e.target.value)}
                                    placeholder="Subject"
                                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-100"
                                  />
                                  <input
                                    value={getSlotValue(day.id, slotIndex, 'teacher')}
                                    onChange={(e) => updateSlotValue(day.id, slotIndex, 'teacher', e.target.value)}
                                    placeholder="Teacher"
                                    className="w-full px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none"
                                  />
                                  <div className="flex gap-1">
                                    <input
                                      value={getSlotValue(day.id, slotIndex, 'room')}
                                      onChange={(e) => updateSlotValue(day.id, slotIndex, 'room', e.target.value)}
                                      placeholder="Room"
                                      className="flex-1 px-2 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none"
                                    />
                                    <select
                                      value={getSlotValue(day.id, slotIndex, 'type') || 'Theory'}
                                      onChange={(e) => updateSlotValue(day.id, slotIndex, 'type', e.target.value)}
                                      className="w-16 px-1 py-1.5 text-xs rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none"
                                    >
                                      {classTypes.filter(t => t !== 'Holiday').map(type => <option key={type} value={type}>{type}</option>)}
                                    </select>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center h-full min-h-[80px]">
                                  <span className="text-xs text-amber-600 font-medium">Holiday</span>
                                </div>
                              )}
                            </td>
                          ))}
                          <td className="px-2 py-2 text-center">
                            {!isHoliday && (
                              <button
                                type="button"
                                onClick={() => copyDaySchedule(day.id)}
                                className="p-1.5 rounded-lg bg-gray-100 hover:bg-indigo-100 transition-all group"
                                title="Copy schedule"
                              >
                                <Copy className="w-4 h-4 text-gray-500 group-hover:text-indigo-600" />
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Copy Modal */}
              {uiState.showCopyModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
                  <div className="bg-white rounded-xl p-5 max-w-md w-full mx-4">
                    <h3 className="text-lg font-bold text-gray-800 mb-3">Copy Schedule To</h3>
                    <div className="space-y-2">
                      {days.map(day => (
                        <button
                          key={day.id}
                          type="button"
                          onClick={() => pasteToDay(day.id)}
                          className="w-full text-left px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all flex items-center gap-2"
                        >
                          <day.icon className="w-4 h-4 text-indigo-500" />
                          {day.label}
                        </button>
                      ))}
                    </div>
                    <button type="button" onClick={() => setUiState(prev => ({ ...prev, showCopyModal: false, copyFromDay: null }))} className="mt-4 w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">Cancel</button>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setUiState(prev => ({ ...prev, showPreview: !prev.showPreview }))} className="px-5 py-2 rounded-lg border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition-all text-sm"><Eye className="w-4 h-4 inline mr-2" /> Preview</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-70 text-sm">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><Send className="w-4 h-4 inline mr-2" /> Publish Routine</>}
                </button>
              </div>
            </div>
          </div>

          {uiState.showPreview && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800 flex items-center gap-2"><Eye className="w-4 h-4" /> Preview</h3>
                  <button type="button" onClick={() => setUiState(prev => ({ ...prev, showPreview: false }))} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="p-5 overflow-x-auto">
                <div className="min-w-[800px]">
                  <div className="mb-5 text-center">
                    <h4 className="text-xl font-bold text-gray-800">{watch('routineTitle') || 'Class Routine'}</h4>
                    <p className="text-sm text-gray-500 mt-1">{getDepartmentDisplay()} | {watch('semester')} | {watch('academicYear')}</p>
                    {watch('routineDescription') && <p className="text-xs text-gray-400 mt-1">{watch('routineDescription')}</p>}
                  </div>
                  <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                    <thead>
                      <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                        <th className="px-4 py-3 text-left text-sm font-semibold">Day / Time</th>
                        {watchTimeSlots?.map((slot, idx) => <th key={idx} className="px-3 py-3 text-center text-xs font-medium">{slot.label}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day) => {
                        const isHoliday = watchHolidayDays?.includes(day.id);
                        return (
                          <tr key={day.id} className={`border-b border-gray-200 ${isHoliday ? 'bg-amber-50' : 'hover:bg-gray-50'}`}>
                            <td className="px-4 py-3 font-semibold text-gray-700 bg-gray-50">{day.label} {isHoliday && <span className="ml-2 text-xs text-amber-600">(Holiday)</span>}</td>
                            {watchTimeSlots?.map((slot, slotIndex) => {
                              const subject = getSlotValue(day.id, slotIndex, 'subject');
                              const teacher = getSlotValue(day.id, slotIndex, 'teacher');
                              const room = getSlotValue(day.id, slotIndex, 'room');
                              const type = getSlotValue(day.id, slotIndex, 'type') || 'Theory';
                              return (
                                <td key={slotIndex} className="px-3 py-2 align-top">
                                  {isHoliday ? (
                                    <span className="text-xs text-amber-600">Holiday</span>
                                  ) : subject ? (
                                    <div>
                                      <div className="font-semibold text-sm text-gray-800">{subject}</div>
                                      <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1"><User className="w-2.5 h-2.5" /> {teacher || 'TBA'}</div>
                                      <div className="flex justify-between items-center mt-1">
                                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /> {room || 'TBA'}</span>
                                        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium ${type === 'Lab' ? 'bg-purple-100 text-purple-700' : type === 'Break' ? 'bg-gray-100 text-gray-500' : type === 'Practical' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>{type}</span>
                                      </div>
                                    </div>
                                  ) : <span className="text-gray-300 text-xs">-</span>}
                                 </td>
                              );
                            })}
                           </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {watchIsPrivate && watch('secretCode') && (
                    <div className="mt-4 p-2 bg-amber-50 rounded-lg text-center"><p className="text-xs text-amber-600">🔐 Private Routine | Secret Code: {watch('secretCode')}</p></div>
                  )}
                  {dbUser && (
                    <div className="mt-3 pt-2 text-xs text-gray-400 text-center border-t border-gray-100">
                      Created by: {dbUser.email} ({dbUser.userType}) {dbUser?.institutionName && `| ${dbUser.institutionName}`}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadRoutine;