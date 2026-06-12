import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
  Award,
  Globe,
  Lock,
  Key,
} from "lucide-react";
import Swal from "sweetalert2";
import Useauth from "../../Hooks/Useauth";
import useCloudinaryUpload from "../../Hooks/useCloudinaryUpload";
import Loading from "../../Components/Loading";

const UploadAssignment = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const {
    uploadImage,
    loading: uploadLoading,
    error: uploadError,
  } = useCloudinaryUpload();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      assignmentTitle: "",
      assignmentDescription: "",
      selectedRoles: [],
      subjects: [{ name: "" }],
      assignmentTypes: [{ name: "" }],
      deadline: "",
      totalMarks: "",
      priority: "medium",
      attachments: [],
      referenceLinks: [],
      isPrivate: false,
      secretCode: "",
    },
  });

  const {
    fields: subjectFields,
    append: appendSubject,
    remove: removeSubject,
  } = useFieldArray({
    control,
    name: "subjects",
  });

  const {
    fields: typeFields,
    append: appendType,
    remove: removeType,
  } = useFieldArray({
    control,
    name: "assignmentTypes",
  });

  const [uiState, setUiState] = useState({
    showPreview: false,
    showLinkInput: false,
    currentLink: "",
  });

  const roles = [
    { id: "public", name: "Public", icon: Globe, color: "from-gray-500 to-gray-600", desc: "Visible to everyone - no login required" },
    { id: "principal", name: "Principal", icon: Crown, color: "from-amber-500 to-orange-500", desc: "Full campus oversight & management" },
    { id: "chip_instructor", name: "Chip Instructor", icon: UserCog, color: "from-red-500 to-rose-500", desc: "Senior technical instructor" },
    { id: "instructor", name: "Instructor", icon: GraduationCap, color: "from-blue-500 to-indigo-500", desc: "Subject matter expert" },
    { id: "junior_instructor", name: "Junior Instructor", icon: Briefcase, color: "from-cyan-500 to-teal-500", desc: "Assistant teaching staff" },
    { id: "craft_instructor", name: "Craft Instructor", icon: Wrench, color: "from-emerald-500 to-green-500", desc: "Practical skill trainer" },
    { id: "student", name: "Student", icon: Users, color: "from-purple-500 to-pink-500", desc: "Learn & grow" },
  ];

  const watchSelectedRoles = watch("selectedRoles");
  const watchIsPrivate = watch("isPrivate");
  const watchReferenceLinks = watch("referenceLinks");
  const watchAttachments = watch("attachments");
  const formDataValues = watch();

  const handleRoleToggle = (roleId) => {
    const currentRoles = watchSelectedRoles || [];
    const updated = currentRoles.includes(roleId)
      ? currentRoles.filter((r) => r !== roleId)
      : [...currentRoles, roleId];
    setValue("selectedRoles", updated);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const otherFiles = files.filter((file) => !file.type.startsWith("image/"));

    setValue("attachments", [...watchAttachments, ...otherFiles]);

    for (const imageFile of imageFiles) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        setValue("attachments", (prev) => [
          ...prev,
          { name: imageFile.name, url: imageUrl, type: "image" },
        ]);
      }
    }
  };

  const removeAttachment = (index) => {
    const updated = watchAttachments.filter((_, i) => i !== index);
    setValue("attachments", updated);
  };

  const addReferenceLink = () => {
    if (uiState.currentLink && uiState.currentLink.trim()) {
      setValue("referenceLinks", [...watchReferenceLinks, uiState.currentLink]);
      setUiState((prev) => ({
        ...prev,
        currentLink: "",
        showLinkInput: false,
      }));
    }
  };

  const removeReferenceLink = (index) => {
    const updated = watchReferenceLinks.filter((_, i) => i !== index);
    setValue("referenceLinks", updated);
  };

  const addSubject = () => appendSubject({ name: "" });
  const addAssignmentType = () => appendType({ name: "" });

  const onSubmit = async (data) => {
    if (!data.assignmentTitle || !data.assignmentDescription || data.subjects.length === 0 || !data.deadline) {
      Swal.fire({ title: "Error!", text: "Please fill all required fields", icon: "error", confirmButtonColor: "#6366f1" });
      return;
    }

    if (data.selectedRoles.length === 0) {
      Swal.fire({ title: "Error!", text: "Please select at least one target audience", icon: "error", confirmButtonColor: "#6366f1" });
      return;
    }

    if (data.isPrivate && !data.secretCode) {
      Swal.fire({ title: "Error!", text: "Please enter a secret code for private assignment", icon: "error", confirmButtonColor: "#6366f1" });
      return;
    }

    const selectedRolesNames = data.selectedRoles.map((roleId) => roles.find((r) => r.id === roleId)?.name);

    const finalData = {
      assignmentTitle: data.assignmentTitle,
      assignmentDescription: data.assignmentDescription,
      targetRoles: selectedRolesNames,
      subjects: data.subjects.filter((s) => s.name.trim()),
      assignmentTypes: data.assignmentTypes.filter((t) => t.name.trim()),
      deadline: data.deadline,
      totalMarks: data.totalMarks,
      priority: data.priority,
      attachments: data.attachments,
      referenceLinks: data.referenceLinks,
      isPrivate: data.isPrivate,
      secretCode: data.isPrivate ? data.secretCode : null,
      createdBy: { email: dbUser?.email, userType: dbUser?.userType, fullName: dbUser?.fullName },
      createdAt: new Date().toISOString(),
      status: "published",
    };

    console.log("========== ASSIGNMENT SUBMITTED ==========");
    console.log(finalData);
    console.log("==========================================");

    Swal.fire({
      title: "Success!",
      text: data.isPrivate ? "Private Assignment created successfully!" : "Assignment uploaded successfully!",
      icon: "success",
      confirmButtonColor: "#6366f1",
      timer: 3000,
    });

    reset();
  };

  const handlePreview = () => setUiState((prev) => ({ ...prev, showPreview: !prev.showPreview }));


  if (authLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full relative">
   
      {(isSubmitting || uploadLoading) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-center text-gray-600 mt-3 text-sm font-medium">
              {uploadLoading ? "Uploading files to Cloudinary..." : "Publishing assignment..."}
            </p>
          </div>
        </div>
      )}

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
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
                  <input type="text" {...register("assignmentTitle", { required: true })} placeholder="Enter assignment title" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Description <span className="text-red-500">*</span></label>
                  <textarea {...register("assignmentDescription", { required: true })} rows="4" placeholder="Write detailed instructions..." className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none text-base" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subjects <span className="text-red-500">*</span></label>
                  {subjectFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input {...register(`subjects.${index}.name`, { required: true })} placeholder="Enter subject name" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                      {subjectFields.length > 1 && (
                        <button type="button" onClick={() => removeSubject(index)} className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addSubject} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mt-1"><Plus className="w-4 h-4" /> Add Subject</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Types</label>
                  {typeFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input {...register(`assignmentTypes.${index}.name`)} placeholder="Enter assignment type" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                      {typeFields.length > 1 && (
                        <button type="button" onClick={() => removeType(index)} className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addAssignmentType} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mt-1"><Plus className="w-4 h-4" /> Add Assignment Type</button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-indigo-400" />
                      <input type="datetime-local" {...register("deadline", { required: true })} className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks</label>
                    <input type="number" {...register("totalMarks")} placeholder="Enter total marks" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select {...register("priority")} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {watchIsPrivate ? <Lock className="w-5 h-5 text-amber-600" /> : <Globe className="w-5 h-5 text-green-600" />}
                      <span className="text-sm font-medium text-gray-700">{watchIsPrivate ? "Private Assignment" : "Public Assignment"}</span>
                    </div>
                    <button type="button" onClick={() => setValue("isPrivate", !watchIsPrivate)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${watchIsPrivate ? "bg-amber-500" : "bg-green-500"}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${watchIsPrivate ? "translate-x-6" : "translate-x-1"}`} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500">{watchIsPrivate ? "Private assignments require a secret code to access." : "Public assignments are visible to all selected roles."}</p>
                  {watchIsPrivate && (
                    <div className="mt-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2"><Key className="w-4 h-4 text-amber-600" /> Secret Code <span className="text-red-500">*</span></label>
                      <input type="text" {...register("secretCode")} placeholder="Enter a secret code" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base font-mono" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience <span className="text-red-500">*</span></label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {roles.map((role) => (
                      <button key={role.id} type="button" onClick={() => handleRoleToggle(role.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all text-sm ${watchSelectedRoles?.includes(role.id) ? `bg-gradient-to-r ${role.color} text-white border-transparent shadow-md` : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"}`}>
                        <role.icon className="w-4 h-4" /> <span>{role.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reference Links</label>
                  <div className="space-y-2">
                    {watchReferenceLinks?.map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                        <div className="flex items-center gap-2 flex-1 min-w-0"><LinkIcon className="w-4 h-4 text-indigo-500 flex-shrink-0" /><span className="text-sm text-indigo-600 truncate">{link}</span></div>
                        <button type="button" onClick={() => removeReferenceLink(idx)} className="text-red-500 ml-2"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    {uiState.showLinkInput ? (
                      <div className="flex gap-2">
                        <input type="url" value={uiState.currentLink} onChange={(e) => setUiState(prev => ({ ...prev, currentLink: e.target.value }))} placeholder="Enter reference link URL" className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-sm" />
                        <button type="button" onClick={addReferenceLink} className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 text-sm">Add</button>
                        <button type="button" onClick={() => setUiState(prev => ({ ...prev, showLinkInput: false, currentLink: "" }))} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm">Cancel</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setUiState(prev => ({ ...prev, showLinkInput: true }))} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"><Plus className="w-4 h-4" /> Add Reference Link</button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                  <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 text-center hover:border-indigo-400 transition bg-indigo-50/30">
                    <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <Paperclip className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PDF, DOC, JPG, PNG, ZIP (Max 10MB)</p>
                    </label>
                  </div>
                  {watchAttachments?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>
                      {watchAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            {file.type === "image" ? <img src={file.url} alt="attachment" className="w-10 h-10 object-cover rounded" /> : <FileText className="w-4 h-4 text-indigo-500" />}
                            <span className="text-sm text-gray-600">{file.name || file.url?.split("/").pop()}</span>
                          </div>
                          <button type="button" onClick={() => removeAttachment(idx)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handlePreview} className="px-5 py-2 rounded-lg border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 text-sm"><Eye className="w-4 h-4 inline mr-2" /> Preview</button>
                  <button type="submit" disabled={isSubmitting || uploadLoading} className="flex-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg disabled:opacity-70 text-sm">
                    {isSubmitting || uploadLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><Send className="w-4 h-4 inline mr-2" /> Publish Assignment</>}
                  </button>
                </div>
              </div>
            </div>

            {uiState.showPreview && (
              <div className="bg-white rounded-xl shadow-lg border mt-4">
                <div className="px-5 py-3 border-b bg-indigo-50 rounded-t-xl"><h3 className="font-semibold text-gray-800">Preview</h3></div>
                <div className="p-4">
                  <div className={`p-4 rounded-lg border-l-4 ${formDataValues.priority === "high" ? "bg-red-50 border-red-500" : formDataValues.priority === "medium" ? "bg-amber-50 border-amber-500" : "bg-green-50 border-green-500"}`}>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {formDataValues.isPrivate && <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span>}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${formDataValues.priority === "high" ? "bg-red-100 text-red-700" : formDataValues.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{formDataValues.priority?.charAt(0).toUpperCase() + formDataValues.priority?.slice(1)} Priority</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{formDataValues.assignmentTitle || "Assignment Title"}</h4>
                    <p className="text-gray-600 text-sm mb-3">{formDataValues.assignmentDescription || "Assignment description will appear here..."}</p>
                    <div className="mb-3 text-sm"><p className="text-xs font-medium text-gray-500">Subjects:</p><div className="flex flex-wrap gap-1 mt-1">{formDataValues.subjects?.filter(s => s.name).map((sub, idx) => (<span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">{sub.name}</span>))}</div></div>
                    {formDataValues.assignmentTypes?.filter(t => t.name).length > 0 && (<div className="mb-3 text-sm"><p className="text-xs font-medium text-gray-500">Assignment Types:</p><div className="flex flex-wrap gap-1 mt-1">{formDataValues.assignmentTypes?.filter(t => t.name).map((type, idx) => (<span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">{type.name}</span>))}</div></div>)}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                      <div className="flex items-center gap-2 text-gray-500"><Calendar className="w-4 h-4 text-indigo-500" /> <span>{formDataValues.deadline || "No deadline"}</span></div>
                      {formDataValues.totalMarks && (<div className="flex items-center gap-2 text-gray-500"><Award className="w-4 h-4 text-indigo-500" /> <span>{formDataValues.totalMarks} Marks</span></div>)}
                    </div>
                    {formDataValues.referenceLinks?.length > 0 && (<div className="mt-2"><p className="text-xs font-medium text-gray-500">Reference Links:</p><div className="flex flex-wrap gap-2 mt-1">{formDataValues.referenceLinks.map((link, idx) => (<span key={idx} className="text-xs text-indigo-600">Link {idx + 1}</span>))}</div></div>)}
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">{watchSelectedRoles?.map(roleId => { const role = roles.find(r => r.id === roleId); return role && (<span key={roleId} className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${role.color} text-white`}>{role.name}</span>); })}</div>
                    {formDataValues.isPrivate && formDataValues.secretCode && (<div className="mt-3 pt-2 border-t border-gray-100"><p className="text-xs font-medium text-amber-600 flex items-center gap-1"><Key className="w-3 h-3" /> Secret Code: <span className="font-mono">{formDataValues.secretCode}</span></p></div>)}
                    {dbUser && (<div className="mt-3 pt-2 text-xs text-gray-400">Created by: {dbUser.email} ({dbUser.userType})</div>)}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
              <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl"><h3 className="font-semibold text-gray-800">Guidelines</h3></div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50"><CheckCircle className="w-5 h-5 text-indigo-500 flex-shrink-0" /><div><h4 className="font-medium text-gray-800 text-sm">Clear Instructions</h4><p className="text-xs text-gray-500">Provide detailed instructions and requirements</p></div></div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-purple-50"><CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0" /><div><h4 className="font-medium text-gray-800 text-sm">Set Realistic Deadline</h4><p className="text-xs text-gray-500">Give students adequate time to complete</p></div></div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50"><CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /><div><h4 className="font-medium text-gray-800 text-sm">Provide Resources</h4><p className="text-xs text-gray-500">Add reference links and materials</p></div></div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50"><CheckCircle className="w-5 h-5 text-amber-500 flex-shrink-0" /><div><h4 className="font-medium text-gray-800 text-sm">Clear Marking Scheme</h4><p className="text-xs text-gray-500">Specify total marks and grading criteria</p></div></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl"><h3 className="font-semibold text-gray-800">Roles Overview</h3></div>
              <div className="p-4 space-y-2">
                {roles.map((role) => (
                  <div key={role.id} className={`flex items-start gap-3 p-2 rounded-lg transition-all cursor-pointer ${watchSelectedRoles?.includes(role.id) ? `bg-gradient-to-r ${role.color} bg-opacity-10 border ${role.color.replace("from-", "border-").replace("to-", "")}` : "hover:bg-indigo-50"}`} onClick={() => handleRoleToggle(role.id)}>
                    <div className={`w-8 h-8 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm`}><role.icon className="w-4 h-4 text-white" /></div>
                    <div className="flex-1"><div className="flex items-center justify-between"><h4 className="font-semibold text-gray-800 text-sm">{role.name}</h4>{watchSelectedRoles?.includes(role.id) && <CheckCircle className="w-4 h-4 text-emerald-500" />}</div><p className="text-xs text-gray-500">{role.desc}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UploadAssignment;