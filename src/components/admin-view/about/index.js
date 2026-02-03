"use client";

import FormControls from "../form-controls";
import { useState } from "react";

const controls = [
  {
    name: "aboutme",
    placeholder: "Tell us about yourself...",
    type: "textarea",
    label: "About Me",
  },
  {
    name: "noofprojects",
    placeholder: "e.g., 50+",
    type: "text",
    label: "Number of Projects",
  },
  {
    name: "yearofexperience",
    placeholder: "e.g., 5+",
    type: "text",
    label: "Years of Experience",
  },
  {
    name: "noofclients",
    placeholder: "e.g., 100+",
    type: "text",
    label: "Number of Clients",
  },
  {
    name: "skills",
    placeholder: "React, Node.js, MongoDB, etc.",
    type: "textarea",
    label: "Skills (comma separated)",
  },
];

export default function AdminAboutView({formData, setFormData , handleSaveData}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await handleSaveData('about');
    setIsLoading(false);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Section</h2>
        <p className="text-gray-600">Manage your personal information and statistics</p>
      </div>
      
      <FormControls
        controls={controls}
        formData={formData}
        setFormData={setFormData}
      />
      
      <div className="mt-8 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isLoading}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
