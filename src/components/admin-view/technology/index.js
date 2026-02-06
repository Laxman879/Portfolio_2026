"use client";

import { useState, useEffect } from "react";
import { HiCode, HiPlus, HiTrash, HiPencil, HiPhotograph } from "react-icons/hi";
import toast from "react-hot-toast";
import Image from "next/image";
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import { getAutoIcon } from "@/utils/iconMapping";

const iconLibraries = { ...FaIcons, ...SiIcons };

export default function AdminTechnologyView({ technologies, onRefresh }) {
  const [formData, setFormData] = useState({
    name: "",
    iconType: "library",
    iconIdentifier: "",
    iconImage: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Auto-detect icon when name changes
  useEffect(() => {
    if (formData.name && formData.iconType === "library" && !editingId) {
      const autoIcon = getAutoIcon(formData.name);
      if (autoIcon && autoIcon !== formData.iconIdentifier) {
        setFormData(prev => ({ ...prev, iconIdentifier: autoIcon }));
      }
    }
  }, [formData.name, formData.iconType, editingId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, iconImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name) {
      toast.error("Technology name is required");
      return;
    }

    // Auto-detect icon if not manually set
    let finalData = { ...formData };
    if (formData.iconType === "library" && !formData.iconIdentifier) {
      const autoIcon = getAutoIcon(formData.name);
      if (autoIcon) {
        finalData.iconIdentifier = autoIcon;
      }
    }

    if (finalData.iconType === "library" && !finalData.iconIdentifier) {
      toast.error("Icon identifier is required or not found");
      return;
    }

    if (finalData.iconType === "image" && !finalData.iconImage) {
      toast.error("Please upload an icon image");
      return;
    }

    setIsLoading(true);
    try {
      const url = editingId ? "/api/technology/update" : "/api/technology/add";
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { ...finalData, _id: editingId } : finalData),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(editingId ? "Technology updated!" : "Technology added!");
        setFormData({ name: "", iconType: "library", iconIdentifier: "", iconImage: "" });
        setImagePreview("");
        setEditingId(null);
        onRefresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to save technology");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (tech) => {
    setFormData(tech);
    setEditingId(tech._id);
    if (tech.iconImage) setImagePreview(tech.iconImage);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this technology?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/technology/delete?id=${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        toast.success("Technology deleted!");
        onRefresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete technology");
    } finally {
      setDeletingId(null);
    }
  };

  const renderIcon = (tech) => {
    if (tech.iconType === "image" && tech.iconImage) {
      return <Image src={tech.iconImage} alt={tech.name} width={24} height={24} className="object-contain" />;
    }
    const IconComponent = iconLibraries[tech.iconIdentifier];
    return IconComponent ? <IconComponent className="w-6 h-6" /> : <HiCode className="w-6 h-6" />;
  };

  return (
    <div className="w-full space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Technology Management</h2>
        <p className="text-gray-600">Create and manage technologies for your projects</p>
      </div>

      {/* Existing Technologies */}
      {technologies && technologies.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Technologies</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <div key={tech._id} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {renderIcon(tech)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{tech.name}</h4>
                    <p className="text-xs text-gray-600">{tech.iconType === "library" ? tech.iconIdentifier : "Custom Image"}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(tech)} className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <HiPencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(tech._id)} disabled={deletingId === tech._id} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50">
                    {deletingId === tech._id ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <HiTrash className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Technology */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">{editingId ? "Edit Technology" : "Add New Technology"}</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Technology Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., React, N8N, Make" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Icon Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" value="library" checked={formData.iconType === "library"} onChange={(e) => setFormData({ ...formData, iconType: e.target.value })} />
                <span>Icon Library</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="image" checked={formData.iconType === "image"} onChange={(e) => setFormData({ ...formData, iconType: e.target.value })} />
                <span>Upload Image</span>
              </label>
            </div>
          </div>

          {formData.iconType === "library" ? (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Icon Identifier</label>
              <input type="text" value={formData.iconIdentifier} onChange={(e) => setFormData({ ...formData, iconIdentifier: e.target.value })} placeholder="Auto-detected or enter manually (e.g., FaReact)" className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline" />
              <p className="text-xs text-gray-500 mt-1">
                {formData.iconIdentifier ? (
                  <span className="text-green-600">✓ Icon detected: {formData.iconIdentifier}</span>
                ) : (
                  "Type technology name for auto-detection or enter icon manually"
                )}
              </p>
              {formData.iconIdentifier && iconLibraries[formData.iconIdentifier] && (
                <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                  <span>Preview:</span>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
                    {(() => {
                      const Icon = iconLibraries[formData.iconIdentifier];
                      return <Icon className="w-5 h-5" />;
                    })()}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Upload Icon Image</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer transition-colors">
                  <HiPhotograph className="w-5 h-5" />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-300">
                    <Image src={imagePreview} alt="Preview" fill className="object-contain" />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {editingId && (
            <button onClick={() => { setFormData({ name: "", iconType: "library", iconIdentifier: "", iconImage: "" }); setEditingId(null); setImagePreview(""); }} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors">
              Cancel
            </button>
          )}
          <button onClick={handleSubmit} disabled={isLoading} className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl">
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiPlus className="w-4 h-4" />
            )}
            {isLoading ? "Saving..." : editingId ? "Update Technology" : "Add Technology"}
          </button>
        </div>
      </div>
    </div>
  );
}
