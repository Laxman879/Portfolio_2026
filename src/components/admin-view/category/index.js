"use client";

import { useState } from "react";
import { HiTag, HiPlus, HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";

export default function AdminCategoryView({ categories, onRefresh }) {
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const handleAdd = async () => {
    if (!name || !label) {
      toast.error("Please fill all fields");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/category/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.toLowerCase(), label }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Category added successfully!");
        setName("");
        setLabel("");
        onRefresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/category/delete?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("Category deleted successfully!");
        onRefresh();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Category Management</h2>
        <p className="text-gray-600">Create and manage project categories</p>
      </div>

      {/* Existing Categories */}
      {categories && categories.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Current Categories</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <div key={cat._id} className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <HiTag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{cat.label}</h4>
                    <p className="text-xs text-gray-600">{cat.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(cat._id)}
                  disabled={deletingId === cat._id}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {deletingId === cat._id ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <HiTrash className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add New Category */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Add New Category</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name (lowercase)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., backend"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Display Label</label>
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g., Backend"
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleAdd}
            disabled={isLoading || !name || !label}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <HiPlus className="w-4 h-4" />
            )}
            {isLoading ? "Adding..." : "Add Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
