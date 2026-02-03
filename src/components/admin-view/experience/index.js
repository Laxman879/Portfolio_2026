"use client";

import FormControls from "../form-controls";
import { useState } from "react";
import { HiBriefcase, HiOfficeBuilding, HiClock, HiLocationMarker, HiDocumentText, HiPencil, HiTrash } from "react-icons/hi";
import { deleteData } from "@/services";
import toast from "react-hot-toast";

const controls = [
  {
    name: "position",
    placeholder: "e.g., Senior Frontend Developer",
    type: "text",
    label: "Position",
  },
  {
    name: "company",
    placeholder: "e.g., Google Inc.",
    type: "text",
    label: "Company",
  },
  {
    name: "duration",
    placeholder: "e.g., Jan 2020 - Present",
    type: "text",
    label: "Duration",
  },
  {
    name: "location",
    placeholder: "e.g., San Francisco, CA",
    type: "text",
    label: "Location",
  },
  {
    name: "jobprofile",
    placeholder: "Describe your role and responsibilities...",
    type: "textarea",
    label: "Job Description",
  },
];

export default function AdminExperienceView({
  formData,
  handleSaveData,
  setFormData,
  data,
  onRefresh
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleSave = async () => {
    setIsLoading(true);
    await handleSaveData("experience");
    setIsLoading(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    
    setDeletingId(id);
    try {
      const result = await deleteData('experience', id);
      if (result.success) {
        toast.success('Experience deleted successfully!');
        if (onRefresh) onRefresh();
      } else {
        toast.error(result.message || 'Failed to delete experience');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    } finally {
      setDeletingId(null);
    }
  };

  const getIcon = (field) => {
    const icons = {
      position: HiBriefcase,
      company: HiOfficeBuilding,
      duration: HiClock,
      location: HiLocationMarker,
      jobprofile: HiDocumentText
    };
    return icons[field] || HiDocumentText;
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Experience Section</h2>
        <p className="text-gray-600">Manage your work experience and professional history</p>
      </div>

      {/* Existing Experience */}
      {data && data.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Experience</h3>
          <div className="grid gap-4">
            {data.map((item, index) => (
              <div key={item._id || index} className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiBriefcase className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{item.position}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <span className="flex items-center gap-1">
                        <HiOfficeBuilding className="w-4 h-4" />
                        {item.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiClock className="w-4 h-4" />
                        {item.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="w-4 h-4" />
                        {item.location}
                      </span>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item.jobprofile}</p>
                    
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg transition-colors"
                      >
                        <HiPencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deletingId === item._id}
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deletingId === item._id ? (
                          <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <HiTrash className="w-3 h-3" />
                        )}
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Experience */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Add New Experience</h3>
        
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isLoading || !formData.position || !formData.company}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
            {isLoading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Experience" : "Add Experience")}
          </button>
        </div>
      </div>
    </div>
  );
}
