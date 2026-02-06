"use client";

import { useState } from "react";
import { HiCode, HiGlobe, HiExternalLink, HiPencil, HiTrash, HiPlus, HiPhotograph } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { deleteData } from "@/services";
import toast from "react-hot-toast";
import Image from "next/image";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";

const iconLibraries = { ...FaIcons, ...SiIcons };

export default function AdminProjectView({ formData, setFormData, handleSaveData, data, categories, technologies, onRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const handleSave = async () => {
    if (!formData.name) {
      toast.error("Project name is required");
      return;
    }
    
    if (!formData.category) {
      toast.error("Category is required");
      return;
    }
    
    if (!Array.isArray(formData.technologies) || formData.technologies.length === 0) {
      toast.error("At least one technology is required");
      return;
    }

    setIsLoading(true);
    try {
      const result = await handleSaveData("project");
      
      if (result?.success) {
        toast.success(editingId ? "Project updated!" : "Project added!");
        setEditingId(null);
        setImagePreview("");
        setFormData({ name: "", description: "", website: "", technologies: [], github: "", category: "", image: "" });
        if (onRefresh) await onRefresh();
      } else {
        toast.error(result?.message || "Failed to save project");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item) => {
    const editData = {
      ...item,
      technologies: Array.isArray(item.technologies) 
        ? item.technologies.map(t => typeof t === 'string' ? t : (t._id || t)) 
        : [],
    };
    setFormData(editData);
    setEditingId(item._id);
    if (item.image) setImagePreview(item.image);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    setDeletingId(id);
    try {
      const result = await deleteData("project", id);
      if (result.success) {
        toast.success("Project deleted successfully!");
        if (onRefresh) onRefresh();
      } else {
        toast.error(result.message || "Failed to delete project");
      }
    } catch (error) {
      toast.error("An error occurred while deleting");
    } finally {
      setDeletingId(null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleTechnology = (techId) => {
    const current = formData.technologies || [];
    const exists = current.includes(techId);
    setFormData({
      ...formData,
      technologies: exists ? current.filter(id => id !== techId) : [...current, techId],
    });
  };

  const renderTechIcon = (tech) => {
    // Priority 1: Uploaded image
    if (tech.iconImage) {
      return <Image src={tech.iconImage} alt={tech.name} width={20} height={20} className="object-contain" />;
    }
    // Priority 2: Icon identifier
    if (tech.iconIdentifier) {
      const IconComponent = iconLibraries[tech.iconIdentifier];
      if (IconComponent) {
        return <IconComponent className="w-5 h-5" />;
      }
    }
    // Priority 3: Fallback
    return <HiCode className="w-5 h-5" />;
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
            {data.map((item) => (
              <div key={item._id} className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                {item.image && (
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <HiCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h4>
                    <div className="mb-4 flex gap-2 flex-wrap">
                      {Array.isArray(item.technologies) && item.technologies.map((tech, idx) => {
                        const renderIcon = () => {
                          if (tech.iconImage) {
                            return <Image src={tech.iconImage} alt={tech.name} width={16} height={16} className="object-contain" />;
                          }
                          if (tech.iconIdentifier && iconLibraries[tech.iconIdentifier]) {
                            const Icon = iconLibraries[tech.iconIdentifier];
                            return <Icon className="w-4 h-4" />;
                          }
                          return null;
                        };
                        
                        return (
                          <span key={idx} className="inline-flex items-center gap-1 text-sm text-gray-600 bg-white px-3 py-1 rounded-full">
                            {renderIcon()}
                            {tech.name}
                          </span>
                        );
                      })}
                      {item.category && (
                        <span className="inline-flex items-center text-xs text-green-700 bg-green-100 px-2 py-1 rounded-full font-medium">
                          {item.category}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-3 mb-4">
                      {item.website && (
                        <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors">
                          <HiGlobe className="w-4 h-4" />
                          Live Demo
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {item.github && (
                        <a href={item.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                          <FaGithub className="w-4 h-4" />
                          Code
                          <HiExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(item)} className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-lg transition-colors">
                        <HiPencil className="w-3 h-3" />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item._id)} disabled={deletingId === item._id} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-lg transition-colors disabled:opacity-50">
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
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{editingId ? "Edit Project" : "Add New Project"}</h3>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Name</label>
          <input type="text" value={formData.name || ""} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., E-commerce Platform" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Description</label>
          <textarea value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description of the project" rows="3" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project Image</label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
              <HiPhotograph className="w-5 h-5" />
              <span>Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {imagePreview && (
              <div className="relative w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
          <select name="category" value={formData.category || ""} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline">
            <option value="">Select category</option>
            {categories?.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Technologies</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {technologies?.map((tech) => (
              <button
                key={tech._id}
                onClick={() => toggleTechnology(tech._id)}
                className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                  formData.technologies?.includes(tech._id)
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                  {renderTechIcon(tech)}
                </div>
                <span className="text-sm font-medium">{tech.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Live Website URL</label>
          <input type="url" value={formData.website || ""} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://example.com" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">GitHub Repository</label>
          <input type="url" value={formData.github || ""} onChange={(e) => setFormData({ ...formData, github: e.target.value })} placeholder="https://github.com/username/repo" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mt-8 flex justify-end gap-2">
          {editingId && (
            <button
              onClick={() => {
                setFormData({ name: "", description: "", website: "", technologies: [], github: "", category: "", image: "" });
                setEditingId(null);
                setImagePreview("");
              }}
              className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
            >
              Cancel
            </button>
          )}
          <button onClick={handleSave} disabled={isLoading || !formData.name || !formData.category} className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiPlus className="w-4 h-4" />
            )}
            {isLoading ? (editingId ? "Updating..." : "Adding...") : editingId ? "Update Project" : "Add Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
