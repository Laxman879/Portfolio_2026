"use client";

import FormControls from "../form-controls";
import { useState } from "react";
import { HiAcademicCap, HiCalendar, HiOfficeBuilding, HiPencil, HiTrash } from "react-icons/hi";
import { deleteData } from "@/services";
import toast from "react-hot-toast";

const controls = [
  {
    name: "degree",
    placeholder: "e.g., Bachelor of Computer Science",
    type: "text",
    label: "Degree Name",
  },
  {
    name: "year",
    placeholder: "e.g., 2018-2022",
    type: "text",
    label: "Year/Duration",
  },
  {
    name: "college",
    placeholder: "e.g., Stanford University",
    type: "text",
    label: "College/University Name",
  },
];

export default function AdminEducationView({handleSaveData, formData, setFormData , data, onRefresh}) {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleSave = async () => {
    setIsLoading(true);
    await handleSaveData('education');
    setIsLoading(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education?')) return;
    
    setDeletingId(id);
    try {
      const result = await deleteData('education', id);
      if (result.success) {
        toast.success('Education deleted successfully!');
        if (onRefresh) onRefresh();
      } else {
        toast.error(result.message || 'Failed to delete education');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Education Section</h2>
        <p className="text-gray-600">Manage your educational background and qualifications</p>
      </div>

      {/* Existing Education */}
      {data && data.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Education</h3>
          <div className="grid gap-4">
            {data.map((item, index) => (
              <div key={item._id || index} className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.degree}</h4>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <HiOfficeBuilding className="w-4 h-4" />
                        {item.college}
                      </span>
                      <span className="flex items-center gap-1">
                        <HiCalendar className="w-4 h-4" />
                        {item.year}
                      </span>
                    </div>
                    
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

      
      <FormControls
        controls={controls}
        formData={formData}
        setFormData={setFormData}
      />
      
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isLoading || !formData.degree || !formData.college}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isLoading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Education" : "Add Education")}
        </button>
      </div>
    </div>
  );
}
