import  { useState } from "react";
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
  Globe,
  Loader2,
  School,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import Useauth from "../../../Hooks/Useauth";
import useCloudinaryUpload from "../../../Hooks/useCloudinaryUpload";
import { uploadNotice } from "../../../API/Notice/UploadNotice";
import Loading from "../../../Components/Loading";

const UploadNotice = () => {
  const { dbUser, loading } = Useauth();
  const {
    uploadImage,
    loading: uploadLoading,
    error: uploadError,
  } = useCloudinaryUpload();

  const [formData, setFormData] = useState({
    noticeTitle: "",
    noticeContent: "",
    selectedRoles: [],
    priority: "medium",
    noticeType: "General",
    customCategory: "",
    attachments: [],
    imageUrls: [],
  });

  const [uiState, setUiState] = useState({
    isSubmitting: false,
    showPreview: false,
    showCustomInput: false,
  });

  const roles = [
    {
      id: "public",
      name: "public",
      icon: Globe,
      color: "from-gray-500 to-gray-600",
      desc: "Visible to everyone - no login required",
    },
    {
      id: "principal",
      name: "principal",
      icon: Crown,
      color: "from-amber-500 to-orange-500",
      desc: "Full campus analytics, all reports, teacher management",
    },
    {
      id: "chip_instructor",
      name: "chip_instructor",
      icon: UserCog,
      color: "from-red-500 to-rose-500",
      desc: "Department oversight, instructor coordination",
    },
    {
      id: "instructor",
      name: "instructor",
      icon: GraduationCap,
      color: "from-blue-500 to-indigo-500",
      desc: "Class management, assignment creation, grading",
    },
    {
      id: "junior_instructor",
      name: "junior_instructor",
      icon: Briefcase,
      color: "from-cyan-500 to-teal-500",
      desc: "Assist senior instructors, lab sessions",
    },
    {
      id: "craft_instructor",
      name: "craft_instructor",
      icon: Wrench,
      color: "from-emerald-500 to-green-500",
      desc: "Practical training, workshop management",
    },
    {
      id: "student",
      name: "student",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      desc: "View notices, assignments, results",
    },
  ];

  const noticeCategories = [
    "General",
    "Examination",
    "Event",
    "Meeting",
    "Holiday",
    "Result",
    "Workshop",
    "Seminar",
  ];

  const updateForm = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRoleToggle = (roleId) => {
    const updated = formData.selectedRoles.includes(roleId)
      ? formData.selectedRoles.filter((r) => r !== roleId)
      : [...formData.selectedRoles, roleId];
    updateForm("selectedRoles", updated);
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));
    const otherFiles = files.filter((file) => !file.type.startsWith("image/"));

    updateForm("attachments", [...formData.attachments, ...otherFiles]);

    for (const imageFile of imageFiles) {
      const imageUrl = await uploadImage(imageFile);
      if (imageUrl) {
        updateForm("imageUrls", [...formData.imageUrls, imageUrl]);
      }
    }
  };

  const removeAttachment = (index) => {
    const updated = formData.attachments.filter((_, i) => i !== index);
    updateForm("attachments", updated);
  };

  const removeImageUrl = (index) => {
    const updated = formData.imageUrls.filter((_, i) => i !== index);
    updateForm("imageUrls", updated);
  };

  const prepareFormData = () => {
    const selectedRolesNames = formData.selectedRoles.map((roleId) => {
      const role = roles.find((r) => r.id === roleId);
      return role?.name;
    });

    return {
      noticeTitle: formData.noticeTitle,
      noticeContent: formData.noticeContent,
      targetRoles: selectedRolesNames,
      priority: formData.priority,
      category: formData.customCategory || formData.noticeType,
      attachments: formData.attachments.map((f) => ({
        name: f.name,
        size: f.size,
        type: f.type,
      })),
      imageUrls: formData.imageUrls,
      createdBy: {
        email: dbUser?.email,
        userType: dbUser?.userType,
        fullName: dbUser?.fullName,
        institutionName: dbUser?.institutionName,
      },
      createdAt: new Date().toISOString(),
      status: "published",
    };
  };

  const handleSubmit = async () => {
    if (
      !formData.noticeTitle ||
      !formData.noticeContent ||
      formData.selectedRoles.length === 0
    ) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields and select at least one role",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setUiState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const finalData = prepareFormData();

      const result = await uploadNotice(finalData);

      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Notice uploaded successfully!",
          icon: "success",
          confirmButtonColor: "#6366f1",
          timer: 2000,
        });

        setFormData({
          noticeTitle: "",
          noticeContent: "",
          selectedRoles: [],
          priority: "medium",
          noticeType: "General",
          customCategory: "",
          attachments: [],
          imageUrls: [],
        });
        setUiState({
          isSubmitting: false,
          showPreview: false,
          showCustomInput: false,
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: result.message || "Failed to upload notice",
          icon: "error",
          confirmButtonColor: "#6366f1",
        });
        setUiState((prev) => ({ ...prev, isSubmitting: false }));
      }
    } catch  {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong! Please try again.",
        icon: "error",
        confirmButtonColor: "#6366f1",
      });
      setUiState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const handlePreview = () => {
    setUiState((prev) => ({ ...prev, showPreview: !prev.showPreview }));
  };

  const getPriorityColor = (p) => {
    const colors = {
      high: "bg-red-100 text-red-700",
      medium: "bg-amber-100 text-amber-700",
      low: "bg-green-100 text-green-700",
    };
    return colors[p] || colors.medium;
  };

  if (loading) {
    return <Loading />;
  }

  const getCategoryDisplay = () =>
    formData.customCategory || formData.noticeType;

  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-3 shadow-md">
          <Bell className="w-4 h-4 text-indigo-500" />
          <span className="text-sm font-medium text-gray-700">
            Admin Panel - Notice Management
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">
            Upload
          </span>
          <span className="text-gray-800"> Notice</span>
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Create and manage notices for different user roles across the campus
        </p>
        {dbUser && (
          <div className="mt-2 flex items-center justify-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" /> {dbUser.email}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3 h-3" /> {dbUser.userType}
            </span>
            {dbUser?.institutionName && (
              <>
                <span className="text-gray-300">|</span>
                <span className="flex items-center gap-1">
                  <School className="w-3 h-3" /> {dbUser.institutionName}
                </span>
              </>
            )}
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
                <Upload className="w-5 h-5 text-indigo-500" />
                <h2 className="text-lg font-bold text-gray-800">
                  Create New Notice
                </h2>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notice Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.noticeTitle}
                  onChange={(e) => updateForm("noticeTitle", e.target.value)}
                  placeholder="Enter notice title"
                  disabled={uiState.isSubmitting}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notice Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.noticeContent}
                  onChange={(e) => updateForm("noticeContent", e.target.value)}
                  rows="4"
                  placeholder="Write the notice content here..."
                  disabled={uiState.isSubmitting}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none disabled:opacity-50 text-base"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => updateForm("priority", e.target.value)}
                    disabled={uiState.isSubmitting}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 text-base"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notice Category
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.noticeType}
                      onChange={(e) => {
                        updateForm("noticeType", e.target.value);
                        setUiState((prev) => ({
                          ...prev,
                          showCustomInput: false,
                        }));
                        updateForm("customCategory", "");
                      }}
                      disabled={uiState.isSubmitting}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none disabled:opacity-50 text-base"
                    >
                      {noticeCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setUiState((prev) => ({
                          ...prev,
                          showCustomInput: !prev.showCustomInput,
                        }))
                      }
                      disabled={uiState.isSubmitting}
                      className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  {uiState.showCustomInput && (
                    <input
                      type="text"
                      value={formData.customCategory}
                      onChange={(e) =>
                        updateForm("customCategory", e.target.value)
                      }
                      placeholder="Enter custom category"
                      disabled={uiState.isSubmitting}
                      className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-indigo-400 focus:outline-none text-base"
                    />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {roles.map((role) => (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => handleRoleToggle(role.id)}
                      disabled={uiState.isSubmitting}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all disabled:opacity-50 text-sm ${
                        formData.selectedRoles.includes(role.id)
                          ? `bg-gradient-to-r ${role.color} text-white border-transparent shadow-md`
                          : "bg-white text-gray-700 border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <role.icon className="w-4 h-4" />
                      <span>{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center hover:border-indigo-300 transition">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="fileUpload"
                    disabled={uiState.isSubmitting}
                  />
                  <label htmlFor="fileUpload" className="cursor-pointer">
                    <Paperclip className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PDF, DOC, JPG, PNG (Max 10MB)
                    </p>
                  </label>
                </div>

                {uploadLoading && (
                  <div className="mt-2 flex items-center gap-2 text-sm text-indigo-600">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading images...
                  </div>
                )}

                {uploadError && (
                  <div className="mt-2 text-sm text-red-600">{uploadError}</div>
                )}

                {formData.imageUrls.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Uploaded Images:
                    </p>
                    {formData.imageUrls.map((url, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={url}
                            alt="uploaded"
                            className="w-10 h-10 object-cover rounded"
                          />
                          <span className="text-sm text-gray-600 truncate max-w-[200px]">
                            {url.slice(0, 40)}...
                          </span>
                        </div>
                        <button
                          onClick={() => removeImageUrl(idx)}
                          disabled={uiState.isSubmitting}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {formData.attachments.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                      Other Attachments:
                    </p>
                    {formData.attachments.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-indigo-500" />
                          <span className="text-sm text-gray-600">
                            {file.name}
                          </span>
                        </div>
                        <button
                          onClick={() => removeAttachment(idx)}
                          disabled={uiState.isSubmitting}
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handlePreview}
                  disabled={uiState.isSubmitting}
                  className="px-5 py-2 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 disabled:opacity-50 text-sm"
                >
                  <Eye className="w-4 h-4 inline mr-2" /> Preview
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={uiState.isSubmitting || uploadLoading}
                  className="flex-1 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg disabled:opacity-70 text-sm"
                >
                  {uiState.isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 inline mr-2" /> Publish Notice
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {uiState.showPreview && !uiState.isSubmitting && (
            <div className="bg-white rounded-xl shadow-lg border mt-4">
              <div className="px-5 py-3 border-b bg-gray-50 rounded-t-xl">
                <h3 className="font-semibold text-gray-800">Preview</h3>
              </div>
              <div className="p-4">
                <div
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(formData.priority)} bg-white`}
                >
                  <div className="flex gap-2 mb-2 flex-wrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(formData.priority)}`}
                    >
                      {formData.priority.charAt(0).toUpperCase() +
                        formData.priority.slice(1)}{" "}
                      Priority
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                      {getCategoryDisplay()}
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    {formData.noticeTitle || "Notice Title"}
                  </h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {formData.noticeContent ||
                      "Notice content will appear here..."}
                  </p>
                  {formData.imageUrls.length > 0 && (
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {formData.imageUrls.map((url, idx) => (
                        <img
                          key={idx}
                          src={url}
                          alt="preview"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedRoles.map((roleId) => {
                      const role = roles.find((r) => r.id === roleId);
                      return (
                        role && (
                          <span
                            key={roleId}
                            className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${role.color} text-white`}
                          >
                            {role.name}
                          </span>
                        )
                      );
                    })}
                  </div>
                  {dbUser && (
                    <div className="mt-3 pt-2 border-t border-gray-100 text-xs text-gray-400">
                      Created by: {dbUser.email} ({dbUser.userType})
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <div className="px-5 py-3 border-b bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-xl">
              <h3 className="font-semibold text-gray-800">Roles Overview</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Select target audience for your notice
              </p>
            </div>
            <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className={`flex items-start gap-3 p-2 rounded-lg transition-all cursor-pointer ${formData.selectedRoles.includes(role.id) ? `bg-gradient-to-r ${role.color} bg-opacity-10 border ${role.color.replace("from-", "border-").replace("to-", "")}` : "hover:bg-gray-50"}`}
                  onClick={() =>
                    !uiState.isSubmitting && handleRoleToggle(role.id)
                  }
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-r ${role.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                  >
                    <role.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {role.name}
                      </h4>
                      {formData.selectedRoles.includes(role.id) && (
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{role.desc}</p>
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

export default UploadNotice;
