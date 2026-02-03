"use client";

import FormControls from "../form-controls";
import { useState } from "react";
import { HiCode, HiGlobe, HiExternalLink, HiPencil, HiTrash } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { deleteData } from "@/services";
import toast from "react-hot-toast";

const controls = [
  {
    name: "name",
    placeholder: "e.g., E-commerce Platform",
    type: "text",
    label: "Project Name",
  },
  {
    name: "technologies",
    placeholder: "e.g., React, Node.js, MongoDB",
    type: "text",
    label: "Technologies Used",
  },
  {
    name: "website",
    placeholder: "https://example.com",
    type: "url",
    label: "Live Website URL",
  },
  {
    name: "github",
    placeholder: "https://github.com/username/repo",
    type: "url",
    label: "GitHub Repository",
  },
];

export default function AdminProjectView({ formData, setFormData , handleSaveData , data, onRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleSave = async () => {
    setIsLoading(true);
    await handleSaveData('project');
    setIsLoading(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    setDeletingId(id);
    try {
      const result = await deleteData('project', id);
      if (result.success) {
        toast.success('Project deleted successfully!');
        if (onRefresh) onRefresh();
      } else {
        toast.error(result.message || 'Failed to delete project');
      }
    } catch (error) {
      toast.error('An error occurred while deleting');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Projects Section</h2>
        <p className="text-gray-600">Manage your portfolio projects and showcase your work</p>
      </div>

      {/* Existing Projects */}
      {data && data.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Projects</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {data.map((item, index) => (
              <div key={item._id || index} className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                        <HiCode className="w-4 h-4" />
                        {item.technologies}
                      </span>
                    </div>
                    <div className="flex gap-3 mb-4">
                      {item.website && (
                        <a 
                          href={item.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <HiGlobe className="w-4 h-4" />
                          Live Demo
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {item.github && (
                        <a 
                          href={item.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors"
                        >
                          <FaGithub className="w-4 h-4" />
                          Code
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
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

      {/* Add New Project */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Add New Project</h3>
        
        <FormControls
          controls={controls}
          formData={formData}
          setFormData={setFormData}
        />
        
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSave}
            disabled={isLoading || !formData.name || !formData.technologies}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            )}
            {isLoading ? (editingId ? "Updating..." : "Adding...") : (editingId ? "Update Project" : "Add Project")}
          </button>
        </div>
      </div>
    </div>
  );
}
