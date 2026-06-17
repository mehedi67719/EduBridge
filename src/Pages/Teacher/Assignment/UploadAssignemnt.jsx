import { useState } from "react";
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
  CheckCircle,
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
  School,
  User,
  File,
  X,
  Image as ImageIcon
} from "lucide-react";
import Swal from "sweetalert2";
import Useauth from "../../../Hooks/Useauth";
import useCloudinaryUpload from "../../../Hooks/useCloudinaryUpload";
import { uplaodassignment } from "../../../API/Assignment/Uploadassignment";
import Loading from "../../../Components/Loading";

const UploadAssignment = () => {
  const { dbUser, loading: authLoading } = Useauth();
  const { uploadImage, loading: uploadLoading } = useCloudinaryUpload();

  const { register, control, handleSubmit, watch, setValue, getValues, reset, formState: { isSubmitting } } = useForm({
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
      imagePreviews: [],
      referenceLinks: [],
      isPrivate: false,
      secretCode: "",
    },
  });

  const { fields: subjectFields, append: appendSubject, remove: removeSubject } = useFieldArray({ control, name: "subjects" });
  const { fields: typeFields, append: appendType, remove: removeType } = useFieldArray({ control, name: "assignmentTypes" });

  const [uiState, setUiState] = useState({ showPreview: false, showLinkInput: false, currentLink: "", uploadingImages: false });

  const roles = [
    { id: "public", name: "public", icon: Globe, color: "from-gray-500 to-gray-600", desc: "Visible to everyone - no login required" },
    { id: "principal", name: "principal", icon: Crown, color: "from-amber-500 to-orange-500", desc: "Full campus oversight & management" },
    { id: "chip_instructor", name: "chip_instructor", icon: UserCog, color: "from-red-500 to-rose-500", desc: "Senior technical instructor" },
    { id: "instructor", name: "instructor", icon: GraduationCap, color: "from-blue-500 to-indigo-500", desc: "Subject matter expert" },
    { id: "junior_instructor", name: "junior_instructor", icon: Briefcase, color: "from-cyan-500 to-teal-500", desc: "Assistant teaching staff" },
    { id: "craft_instructor", name: "craft_instructor", icon: Wrench, color: "from-emerald-500 to-green-500", desc: "Practical skill trainer" },
    { id: "student", name: "student", icon: Users, color: "from-purple-500 to-pink-500", desc: "Learn & grow" },
  ];

  const watchSelectedRoles = watch("selectedRoles");
  const watchIsPrivate = watch("isPrivate");
  const watchReferenceLinks = watch("referenceLinks");
  const watchAttachments = watch("attachments");
  const watchImagePreviews = watch("imagePreviews");
  const formDataValues = watch();

  const handleRoleToggle = (roleId) => {
    const currentRoles = watchSelectedRoles || [];
    const updated = currentRoles.includes(roleId) ? currentRoles.filter((r) => r !== roleId) : [...currentRoles, roleId];
    setValue("selectedRoles", updated);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const otherFiles = files.filter((file) => !file.type.startsWith("image/"));

    if (otherFiles.length > 0) {
      const currentAttachments = getValues("attachments") || [];
      setValue("attachments", [...currentAttachments, ...otherFiles]);
    }

    if (imageFiles.length > 0) {
      setUiState(prev => ({ ...prev, uploadingImages: true }));
      
      for (const imageFile of imageFiles) {
        const currentPreviews = getValues("imagePreviews") || [];
        const tempId = Date.now() + Math.random();
        
        setValue("imagePreviews", [...currentPreviews, { 
          id: tempId,
          file: imageFile, 
          preview: URL.createObjectURL(imageFile), 
          uploading: true, 
          fileName: imageFile.name, 
          url: null 
        }]);
        
        const imageUrl = await uploadImage(imageFile);
        
        if (imageUrl) {
          const updatedPreviews = getValues("imagePreviews") || [];
          const newPreviews = updatedPreviews.map(item => 
            item.id === tempId ? { ...item, url: imageUrl, uploading: false, uploaded: true } : item
          );
          setValue("imagePreviews", newPreviews);
          console.log("Image uploaded successfully:", imageUrl);
        } else {
          const updatedPreviews = getValues("imagePreviews") || [];
          const newPreviews = updatedPreviews.filter(item => item.id !== tempId);
          setValue("imagePreviews", newPreviews);
          console.error("Failed to upload image:", imageFile.name);
        }
      }
      setUiState(prev => ({ ...prev, uploadingImages: false }));
    }
  };

  const removeImage = (index) => {
    const previews = getValues("imagePreviews") || [];
    if (previews[index]?.preview) URL.revokeObjectURL(previews[index].preview);
    const updated = previews.filter((_, i) => i !== index);
    setValue("imagePreviews", updated);
  };

  const removeAttachment = (index) => {
    const current = getValues("attachments") || [];
    setValue("attachments", current.filter((_, i) => i !== index));
  };

  const addReferenceLink = () => {
    if (uiState.currentLink && uiState.currentLink.trim()) {
      const currentLinks = getValues("referenceLinks") || [];
      setValue("referenceLinks", [...currentLinks, uiState.currentLink]);
      setUiState((prev) => ({ ...prev, currentLink: "", showLinkInput: false }));
    }
  };

  const removeReferenceLink = (index) => {
    const current = getValues("referenceLinks") || [];
    setValue("referenceLinks", current.filter((_, i) => i !== index));
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

    const uploadingImages = data.imagePreviews?.some(img => img.uploading === true);
    if (uploadingImages) {
      Swal.fire({ title: "Please wait", text: "Images are still uploading...", icon: "warning", confirmButtonColor: "#6366f1" });
      return;
    }

    const selectedRolesNames = data.selectedRoles.map((roleId) => roles.find((r) => r.id === roleId)?.name);
    const imageUrls = (data.imagePreviews || []).filter(img => img.url && !img.uploading).map(img => ({ 
      url: img.url, 
      name: img.fileName || "Image", 
      type: "image", 
      size: img.file?.size || 0 
    }));
    
    const preparedAttachments = [
      ...data.attachments.map(attachment => ({ 
        name: attachment.name, 
        type: "document", 
        size: attachment.size, 
        mimeType: attachment.type || "application/octet-stream" 
      })),
      ...imageUrls
    ];

    const finalData = {
      assignmentTitle: data.assignmentTitle,
      assignmentDescription: data.assignmentDescription,
      targetRoles: selectedRolesNames,
      subjects: data.subjects.filter((s) => s.name.trim()),
      assignmentTypes: data.assignmentTypes.filter((t) => t.name.trim()),
      deadline: data.deadline,
      totalMarks: data.totalMarks || null,
      priority: data.priority,
      attachments: preparedAttachments,
      referenceLinks: data.referenceLinks || [],
      isPrivate: data.isPrivate,
      secretCode: data.isPrivate ? data.secretCode : null,
      createdBy: { 
        email: dbUser?.email, 
        userType: dbUser?.userType, 
        fullName: dbUser?.fullName, 
        institutionName: dbUser?.institutionName 
      },
      createdAt: new Date().toISOString(),
      status: "published",
    };

    try {
      const result = await uplaodassignment(finalData);
      if (result && result.success) {
        Swal.fire({ 
          title: "Success!", 
          text: data.isPrivate ? "Private Assignment created successfully!" : "Assignment uploaded successfully!", 
          icon: "success", 
          confirmButtonColor: "#6366f1", 
          confirmButtonText: "OK" 
        }).then(() => {
          const previews = getValues("imagePreviews") || [];
          previews.forEach(preview => { if (preview.preview) URL.revokeObjectURL(preview.preview); });
          reset();
          setValue("subjects", [{ name: "" }]);
          setValue("assignmentTypes", [{ name: "" }]);
          setValue("attachments", []);
          setValue("imagePreviews", []);
          setValue("referenceLinks", []);
          setValue("selectedRoles", []);
          setUiState((prev) => ({ ...prev, showPreview: false, showLinkInput: false, currentLink: "" }));
        });
      } else {
        throw new Error(result?.message || "Failed to upload assignment");
      }
    } catch (error) {
      console.error("Submission error:", error);
      Swal.fire({ title: "Error!", text: error.message || "Something went wrong. Please try again.", icon: "error", confirmButtonColor: "#6366f1" });
    }
  };

  const handlePreview = () => setUiState((prev) => ({ ...prev, showPreview: !prev.showPreview }));

  if (authLoading) {
    return <div className="w-full flex items-center justify-center min-h-[400px]"><Loading /></div>;
  }

  const hasUploading = watchImagePreviews?.some(img => img.uploading === true) || false;

  return (
    <div className="w-full relative">
      {(isSubmitting || uploadLoading || uiState.uploadingImages) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 shadow-2xl flex flex-col items-center min-w-[300px]">
            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
            <p className="text-center text-gray-600 mt-3 text-sm font-medium">
              {uploadLoading || uiState.uploadingImages ? "Uploading files to Cloudinary..." : "Publishing assignment..."}
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
          <div className="mt-2 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1"><User className="w-3 h-3" /> {dbUser.email}</span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {dbUser.userType}</span>
            {dbUser?.institutionName && (
              <><span className="text-gray-300">|</span><span className="flex items-center gap-1"><School className="w-3 h-3" /> {dbUser.institutionName}</span></>
            )}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="px-5 py-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
                <div className="flex items-center gap-2"><BookOpen className="w-5 h-5 text-indigo-500" /><h2 className="text-lg font-bold text-gray-800">Create New Assignment</h2></div>
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
                      {subjectFields.length > 1 && <button type="button" onClick={() => removeSubject(index)} className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>}
                    </div>
                  ))}
                  <button type="button" onClick={addSubject} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700 mt-1"><Plus className="w-4 h-4" /> Add Subject</button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Types</label>
                  {typeFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 mb-2">
                      <input {...register(`assignmentTypes.${index}.name`)} placeholder="Enter assignment type" className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 text-base" />
                      {typeFields.length > 1 && <button type="button" onClick={() => removeType(index)} className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"><Trash2 className="w-4 h-4" /></button>}
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
                    <option value="low">Low Priority</option><option value="medium">Medium Priority</option><option value="high">High Priority</option>
                  </select>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">{watchIsPrivate ? <Lock className="w-5 h-5 text-amber-600" /> : <Globe className="w-5 h-5 text-green-600" />}<span className="text-sm font-medium text-gray-700">{watchIsPrivate ? "Private Assignment" : "Public Assignment"}</span></div>
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
                        <button type="button" onClick={() => removeReferenceLink(idx)} className="text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    {uiState.showLinkInput ? (
                      <div className="flex gap-2">
                        <input type="url" value={uiState.currentLink} onChange={(e) => setUiState(prev => ({ ...prev, currentLink: e.target.value }))} placeholder="Enter reference link URL" className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-sm" />
                        <button type="button" onClick={addReferenceLink} className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">Add</button>
                        <button type="button" onClick={() => setUiState(prev => ({ ...prev, showLinkInput: false, currentLink: "" }))} className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50">Cancel</button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => setUiState(prev => ({ ...prev, showLinkInput: true }))} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"><Plus className="w-4 h-4" /> Add Reference Link</button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
                  <div className="border-2 border-dashed border-indigo-200 rounded-lg p-4 text-center hover:border-indigo-400 transition bg-indigo-50/30">
                    <input type="file" multiple onChange={handleFileChange} className="hidden" id="fileUpload" accept="image/*,application/pdf,.doc,.docx,.txt,.zip" />
                    <label htmlFor="fileUpload" className="cursor-pointer block"><Paperclip className="w-6 h-6 text-indigo-400 mx-auto mb-2" /><p className="text-sm text-gray-500">Click to upload or drag and drop</p><p className="text-xs text-gray-400">Images, PDF, DOC, DOCX, TXT, ZIP (Max 10MB per file)</p></label>
                  </div>

                  {watchImagePreviews?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Uploaded Images ({watchImagePreviews.filter(img => !img.uploading && img.url).length}):</p>
                      <div className="grid grid-cols-3 gap-2">
                        {watchImagePreviews.map((img, idx) => (
                          <div key={idx} className="relative group">
                            {img.uploading ? (
                              <div className="w-full h-24 bg-gray-100 rounded-lg border border-gray-200 flex flex-col items-center justify-center">
                                <Loader2 className="w-6 h-6 text-indigo-500 animate-spin mb-1" />
                                <span className="text-xs text-gray-500">Uploading...</span>
                              </div>
                            ) : img.url ? (
                              <>
                                <img src={img.url} alt={img.fileName || "preview"} className="w-full h-24 object-cover rounded-lg border border-gray-200" />
                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X className="w-3 h-3" /></button>
                                <div className="absolute bottom-1 left-1 bg-green-500 text-white rounded-full p-0.5"><CheckCircle className="w-3 h-3" /></div>
                              </>
                            ) : (
                              <div className="w-full h-24 bg-red-50 rounded-lg border border-red-200 flex flex-col items-center justify-center">
                                <ImageIcon className="w-6 h-6 text-red-400" />
                                <span className="text-xs text-red-500">Upload failed</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {watchAttachments?.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-sm font-medium text-gray-700">Other Attachments ({watchAttachments.length}):</p>
                      {watchAttachments.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 bg-indigo-50 rounded-lg">
                          <div className="flex items-center gap-2 flex-1"><File className="w-4 h-4 text-indigo-500" /><div className="flex-1"><span className="text-sm text-gray-600 block">{file.name}</span>{file.size && <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>}</div></div>
                          <button type="button" onClick={() => removeAttachment(idx)} className="text-red-500 hover:text-red-700"><X className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={handlePreview} className="px-5 py-2 rounded-lg border border-indigo-200 text-indigo-600 font-medium hover:bg-indigo-50 transition-all text-sm"><Eye className="w-4 h-4 inline mr-2" /> Preview</button>
                  <button type="submit" disabled={isSubmitting || uploadLoading || uiState.uploadingImages || hasUploading} className="flex-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all disabled:opacity-70 text-sm">
                    {isSubmitting || uploadLoading || uiState.uploadingImages ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : <><Send className="w-4 h-4 inline mr-2" /> Publish Assignment</>}
                  </button>
                </div>
              </div>
            </div>

            {uiState.showPreview && (
              <div className="bg-white rounded-xl shadow-lg border mt-4">
                <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">Preview</h3>
                  <button type="button" onClick={() => setUiState(prev => ({ ...prev, showPreview: false }))} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
                </div>
                <div className="p-4">
                  <div className={`p-4 rounded-lg border-l-4 ${formDataValues.priority === "high" ? "bg-red-50 border-red-500" : formDataValues.priority === "medium" ? "bg-amber-50 border-amber-500" : "bg-green-50 border-green-500"}`}>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {formDataValues.isPrivate && <span className="px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700 flex items-center gap-1"><Lock className="w-3 h-3" /> Private</span>}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${formDataValues.priority === "high" ? "bg-red-100 text-red-700" : formDataValues.priority === "medium" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{formDataValues.priority?.charAt(0).toUpperCase() + formDataValues.priority?.slice(1)} Priority</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{formDataValues.assignmentTitle || "Assignment Title"}</h4>
                    <p className="text-gray-600 text-sm mb-3">{formDataValues.assignmentDescription || "Assignment description will appear here..."}</p>
                    
                    {watchImagePreviews?.filter(img => !img.uploading && img.url).length > 0 && (
                      <div className="mb-3"><p className="text-xs font-medium text-gray-500 mb-2">Images:</p><div className="flex gap-2 flex-wrap">{watchImagePreviews.filter(img => !img.uploading && img.url).map((img, idx) => (<img key={idx} src={img.url} alt={img.fileName || "preview"} className="w-20 h-20 object-cover rounded-lg border" />))}</div></div>
                    )}

                    <div className="mb-3 text-sm"><p className="text-xs font-medium text-gray-500">Subjects:</p><div className="flex flex-wrap gap-1 mt-1">{formDataValues.subjects?.filter((s) => s.name).map((sub, idx) => (<span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-indigo-100 text-indigo-700">{sub.name}</span>))}</div></div>
                    {formDataValues.assignmentTypes?.filter((t) => t.name).length > 0 && (<div className="mb-3 text-sm"><p className="text-xs font-medium text-gray-500">Assignment Types:</p><div className="flex flex-wrap gap-1 mt-1">{formDataValues.assignmentTypes?.filter((t) => t.name).map((type, idx) => (<span key={idx} className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">{type.name}</span>))}</div></div>)}
                    <div className="grid grid-cols-2 gap-2 mb-3 text-sm"><div className="flex items-center gap-2 text-gray-500"><Calendar className="w-4 h-4 text-indigo-500" /> <span>{formDataValues.deadline || "No deadline"}</span></div>{formDataValues.totalMarks && (<div className="flex items-center gap-2 text-gray-500"><Award className="w-4 h-4 text-indigo-500" /> <span>{formDataValues.totalMarks} Marks</span></div>)}</div>
                    {formDataValues.referenceLinks?.length > 0 && (<div className="mt-2"><p className="text-xs font-medium text-gray-500">Reference Links:</p><div className="flex flex-wrap gap-2 mt-1">{formDataValues.referenceLinks.map((link, idx) => (<span key={idx} className="text-xs text-indigo-600">Link {idx + 1}</span>))}</div></div>)}
                    <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-gray-100">{watchSelectedRoles?.map((roleId) => { const role = roles.find((r) => r.id === roleId); return role && (<span key={roleId} className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${role.color} text-white`}>{role.name}</span>); })}</div>
                    {formDataValues.isPrivate && formDataValues.secretCode && (<div className="mt-3 pt-2 border-t border-gray-100"><p className="text-xs font-medium text-amber-600 flex items-center gap-1"><Key className="w-3 h-3" /> Secret Code: <span className="font-mono">{formDataValues.secretCode}</span></p></div>)}
                    {dbUser && (<div className="mt-3 pt-2 text-xs text-gray-400 border-t border-gray-100">Created by: {dbUser.email} ({dbUser.userType}){dbUser?.institutionName && ` | ${dbUser.institutionName}`}</div>)}
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