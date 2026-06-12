import React, { useState } from 'react';
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
  FileText,
  Paperclip,
  Plus,
  Trash2,
  Loader2,
  Calendar,
  BookOpen,
  Link as LinkIcon,
  Award
} from 'lucide-react';
import Swal from 'sweetalert2';
import Useauth from '../../Hooks/Useauth';
import useCloudinaryUpload from '../../Hooks/useCloudinaryUpload';
import Loading from '../../Components/Loading';

const UploadAssignment = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const { uploadImage, loading: uploadLoading, error: uploadError } = useCloudinaryUpload();

  const [formData, setFormData] = useState({
    assignmentTitle: '',
    assignmentDescription: '',
    selectedRoles: [],
    subject: '',
    deadline: '',
    totalMarks: '',
    priority: 'medium',
    assignmentType: 'Individual',
    attachments: [],
    referenceLinks: []
  });

  const [uiState, setUiState] = useState({
    isSubmitting: false,
    showPreview: false,
    showLinkInput: false,
    currentLink: ''
  });

  const roles = [
    { id: 'principal', name: 'Principal', icon: Crown, color: 'from-amber-500 to-orange-500', desc: 'Full campus oversight & management' },
    { id: 'chip_instructor', name: 'Chip Instructor', icon: UserCog, color: 'from-red-500 to-rose-500', desc: 'Senior technical instructor' },
    { id: 'instructor', name: 'Instructor', icon: GraduationCap, color: 'from-blue-500 to-indigo-500', desc: 'Subject matter expert' },
    { id: 'junior_instructor', name: 'Junior Instructor', icon: Briefcase, color: 'from-cyan-500 to-teal-500', desc: 'Assistant teaching staff' },
    { id: 'craft_instructor', name: 'Craft Instructor', icon: Wrench, color: 'from-emerald-500 to-green-500', desc: 'Practical skill trainer' },
    { id: 'student', name: 'Student', icon: Users, color: 'from-purple-500 to-pink-500', desc: 'Learn & grow' }
  ];

  const subjects = [
    'Web Development',
    'Database Management',
    'Data Structures',
    'Computer Networks',
    'Operating Systems',
    'Software Engineering',
    'Artificial Intelligence',
    'Machine Learning'
  ];

  const assignmentTypes = ['Individual', 'Group', 'Lab Report', 'Project', 'Quiz', 'Presentation'];

  const updateForm = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleToggle = (roleId) => {
    const updated = formData.selectedRoles.includes(roleId)
      ? formData.selectedRoles.filter(r => r !== roleId)
      : [...formData.selectedRoles, roleId];
    updateForm('selectedRoles', updated);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    const otherFiles = files.filter(file => !file.type.startsWith('image/'));
    
    updateForm('attachments', [...formData.attachments, ...otherFiles]);
    
    for (const imageFile of imageFiles) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        updateForm('attachments', [...formData.attachments, { name: imageFile.name, url: imageUrl, type: 'image' }]);
      }
    }
  };

  const removeAttachment = (index) => {
    const updated = formData.attachments.filter((_, i) => i !== index);
    updateForm('attachments', updated);
  };

  const addReferenceLink = () => {
    if (uiState.currentLink && uiState.currentLink.trim()) {
      updateForm('referenceLinks', [...formData.referenceLinks, uiState.currentLink]);
      setUiState(prev => ({ ...prev, currentLink: '', showLinkInput: false }));
    }
  };

  const removeReferenceLink = (index) => {
    const updated = formData.referenceLinks.filter((_, i) => i !== index);
    updateForm('referenceLinks', updated);
  };

  const prepareFormData = () => {
    const selectedRolesNames = formData.selectedRoles.map(roleId => {
      const role = roles.find(r => r.id === roleId);
      return role?.name;
    });

    return {
      assignmentTitle: formData.assignmentTitle,
      assignmentDescription: formData.assignmentDescription,
      targetRoles: selectedRolesNames,
      subject: formData.subject,
      deadline: formData.deadline,
      totalMarks: formData.totalMarks,
      priority: formData.priority,
      assignmentType: formData.assignmentType,
      attachments: formData.attachments,
      referenceLinks: formData.referenceLinks,
      createdBy: {
        email: dbUser?.email,
        userType: dbUser?.userType,
        fullName: dbUser?.fullName
      },
      createdAt: new Date().toISOString(),
      status: 'published'
    };
  };

  const handleSubmit = async () => {
    if (!formData.assignmentTitle || !formData.assignmentDescription || !formData.subject || !formData.deadline) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill all required fields',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    if (formData.selectedRoles.length === 0) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select at least one target audience',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      return;
    }

    setUiState(prev => ({ ...prev, isSubmitting: true }));
    
    try {
      const finalData = prepareFormData();
      console.log('Submitting assignment:', finalData);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      Swal.fire({
        title: 'Success!',
        text: 'Assignment uploaded successfully!',
        icon: 'success',
        confirmButtonColor: '#6366f1',
        timer: 2000
      });
      
      setFormData({
        assignmentTitle: '',
        assignmentDescription: '',
        selectedRoles: [],
        subject: '',
        deadline: '',
        totalMarks: '',
        priority: 'medium',
        assignmentType: 'Individual',
        attachments: [],
        referenceLinks: []
      });
      setUiState({ isSubmitting: false, showPreview: false, showLinkInput: false, currentLink: '' });
      
    } catch (error) {
      console.error('Upload error:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Something went wrong! Please try again.',
        icon: 'error',
        confirmButtonColor: '#6366f1'
      });
      setUiState(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const handlePreview = () => {
    setUiState(prev => ({ ...prev, showPreview: !prev.showPreview }));
  };

  if (authLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-md border border-indigo-100">
          <Upload className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">Instructor Panel - Assignment Management</span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Upload</span>
          <span className="text-gray-800"> Assignment</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">Create and manage assignments for students</p>
        {dbUser && (
          <div className="mt-2 text-sm text-gray-500">
            Logged in as: <span className="font-medium text-indigo-600">{dbUser.email}</span> 
            <span className="mx-1">|</span>
            Role: <span className="font-medium text-purple-600">{dbUser.userType}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 relative">
            {uiState.isSubmitting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl z-10 flex items-center justify-center">
                <Loading />
              </div>
            )}

            <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">Create New Assignment</h2>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Fill in the details to publish a new assignment</p>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Title <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={formData.assignmentTitle}
                  onChange={(e) => updateForm('assignmentTitle', e.target.value)}
                  placeholder="Enter assignment title"
                  disabled={uiState.isSubmitting}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Description <span className="text-red-500">*</span></label>
                <textarea
                  value={formData.assignmentDescription}
                  onChange={(e) => updateForm('assignmentDescription', e.target.value)}
                  rows="4"
                  placeholder="Write detailed instructions for the assignment..."
                  disabled={uiState.isSubmitting}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none disabled:opacity-50 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject <span className="text-red-500">*</span></label>
                  <select
                    value={formData.subject}
                    onChange={(e) => updateForm('subject', e.target.value)}
                    disabled={uiState.isSubmitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 text-base"
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(sub => <option key={sub} value={sub}>{sub}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                  <select
                    value={formData.assignmentType}
                    onChange={(e) => updateForm('assignmentType', e.target.value)}
                    disabled={uiState.isSubmitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 text-base"
                  >
                    {assignmentTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deadline <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                      type="datetime-local"
                      value={formData.deadline}
                      onChange={(e) => updateForm('deadline', e.target.value)}
                      disabled={uiState.isSubmitting}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => updateForm('totalMarks', e.target.value)}
                    placeholder="Enter total marks"
                    disabled={uiState.isSubmitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateForm('priority', e.target.value)}
                    disabled={uiState.isSubmitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 text-base"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {roles.map(role => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleToggle(role.id)}
                      disabled={uiState.isSubmitting}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all disabled:opacity-50 text-sm ${
                        formData.selectedRoles.includes(role.id)
                          ? `bg-gradient-to-r ${role.color} text-white border-transparent shadow-md`
                          : 'bg-white text-gray-700 border-gray-200 hover:border-indigo-300'
                      }`}
                    >
                      <role.icon className="w-4 h-4" />
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reference Links</label>
                <div className="space-y-2">
                  {formData.referenceLinks.map((link, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <LinkIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        <a href={link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline truncate">
                          {link}
                        </a>
                      </div>
                      <button onClick={() => removeReferenceLink(idx)} disabled={uiState.isSubmitting} className="text-red-500 ml-2">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {uiState.showLinkInput ? (
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={uiState.currentLink}
                        onChange={(e) => setUiState(prev => ({ ...prev, currentLink: e.target.value }))}
                        placeholder="Enter reference link URL"
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-sm"
                      />
                      <button onClick={addReferenceLink} className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 text-sm">
                        Add
                      </button>
                      <button onClick={() => setUiState(prev => ({ ...prev, showLinkInput: false, currentLink: '' }))} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setUiState(prev => ({ ...prev, showLinkInput: true }))}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <Plus className="w-4 h-4" />
                      Add Reference Link
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 text-center hover:border-indigo-400 transition bg-indigo-50/30">
                  <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" disabled={uiState.isSubmitting} />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <Paperclip className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400">PDF, DOC, JPG, PNG, ZIP (Max 10MB)</p>
                  </label>
                </div>
                
                {uploadLoading && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading files...
                  </div>
                )}
                
                {uploadError && (
                  <div className="mt-2 text-sm text-red-600">{uploadError}</div>
                )}
                
                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                    {formData.attachments.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          {file.type === 'image' ? (
                            <img src={file.url} alt="attachment" className="w-10 h-10 object-cover rounded" />
                          ) : (
                            <FileText className="w-4 h-4 text-indigo-500" />
                          )}
                          <span className="text-sm text-gray-600">{file.name || file.url?.split('/').pop()}</span>
                        </div>
                        <button onClick={() => removeAttachment(idx)} disabled={uiState.isSubmitting} className="text-red-500">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={handlePreview} disabled={uiState.isSubmitting} className="px-5 py-2 rounded-lg border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 disabled:opacity-50 text-sm">
                  <Eye className="w-4 h-4 inline mr-2" /> Preview
                </button>
                <button onClick={handleSubmit} disabled={uiState.isSubmitting || uploadLoading} className="flex-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg disabled:opacity-70 text-sm">
                  {uiState.isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><Send className="w-4 h-4 inline mr-2" /> Publish Assignment</>}
                </button>
              </div>
            </div>
          </div>

          {uiState.showPreview && !uiState.isSubmitting && (
            <div className="bg-white rounded-xl shadow-lg border mt-4">
              <div className="px-5 py-3 border-b bg-indigo-50 rounded-t-xl">
                <h3 className="font-semibold text-gray-800">Preview</h3>
              </div>
              <div className="p-4">
                <div className={`p-4 rounded-lg border-l-4 ${
                  formData.priority === 'high' ? 'bg-red-50 border-red-500' : 
                  formData.priority === 'medium' ? 'bg-amber-50 border-amber-500' : 'bg-green-50 border-green-500'
                }`}>
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      formData.priority === 'high' ? 'bg-red-100 text-red-700' : 
                      formData.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {formData.priority.charAt(0).toUpperCase() + formData.priority.slice(1)} Priority
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {formData.assignmentType}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">{formData.assignmentTitle || 'Assignment Title'}</h4>
                  <p className="text-gray-600 text-sm mb-3">{formData.assignmentDescription || 'Assignment description will appear here...'}</p>
                  <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                    <div className="flex items-center gap-2 text-gray-500">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      <span>{formData.subject || 'Subject'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4 text-indigo-500" />
                      <span>{formData.deadline || 'No deadline'}</span>
                    </div>
                    {formData.totalMarks && (
                      <div className="flex items-center gap-2 text-gray-500">
                        <Award className="w-4 h-4 text-indigo-500" />
                        <span>{formData.totalMarks} Marks</span>
                      </div>
                    )}
                  </div>
                  {formData.referenceLinks.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs font-medium text-gray-500">Reference Links:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {formData.referenceLinks.map((link, idx) => (
                          <a key={idx} href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline">
                            Link {idx + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">
                    {formData.selectedRoles.map(roleId => {
                      const role = roles.find(r => r.id === roleId);
                      return role && <span key={roleId} className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${role.color} text-white`}>{role.name}</span>;
                    })}
                  </div>
                  {dbUser && (
                    <div className="mt-3 pt-2 text-xs text-gray-400">
                      Created by: {dbUser.email} ({dbUser.userType})
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-800">Guidelines</h3>
              <p className="text-xs text-gray-500 mt-0.5">Assignment creation tips</p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                <CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Clear Instructions</h4>
                  <p className="text-xs text-gray-500">Provide detailed instructions and requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50">
                <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Set Realistic Deadline</h4>
                  <p className="text-xs text-gray-500">Give students adequate time to complete</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Provide Resources</h4>
                  <p className="text-xs text-gray-500">Add reference links and materials</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50">
                <CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-sm">Clear Marking Scheme</h4>
                  <p className="text-xs text-gray-500">Specify total marks and grading criteria</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-800">Roles Overview</h3>
              <p className="text-xs text-gray-500 mt-0.5">Select target audience for this assignment</p>
            </div>
            <div className="p-4 space-y-2">
              {roles.map(role => (
                <div 
                  key={role.id} 
                  className={`flex items-start gap-3 p-2 rounded-lg transition-all cursor-pointer ${formData.selectedRoles.includes(role.id) ? `bg-gradient-to-r ${role.color} bg-opacity-10 border ${role.color.replace('from-', 'border-').replace('to-', '')}` : 'hover:bg-indigo-50'}`} 
                  onClick={() => !uiState.isSubmitting && handleRoleToggle(role.id)}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}>
                    <role.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 text-sm">{role.name}</h4>
                      {formData.selectedRoles.includes(role.id) && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                    </div>
                    <p className="text-xs text-gray-500">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAssignment;