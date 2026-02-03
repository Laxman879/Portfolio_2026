"use client";

import { HiMail, HiUser, HiChatAlt, HiCalendar, HiTrash } from "react-icons/hi";
import { deleteData } from "@/services";
import toast from "react-hot-toast";
import { useState } from "react";

export default function AdminContactView({ data, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    setDeletingId(id);
    try {
      const result = await deleteData('contact', id);
      if (result.success) {
        toast.success('Message deleted successfully!');
        if (onRefresh) onRefresh();
      } else {
        toast.error(result.message || 'Failed to delete message');
      }
    } catch (error) {
      toast.error('An error occurred while deleting the message');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Contact Messages</h2>
        <p className="text-gray-600">View and manage messages from your portfolio visitors</p>
      </div>

      {data && data.length > 0 ? (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">
            Total Messages: <span className="font-semibold text-gray-900">{data.length}</span>
          </div>
          
          {data.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <HiMail className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <HiUser className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-900">{item.name}</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <HiMail className="w-4 h-4 text-gray-500" />
                      <a 
                        href={`mailto:${item.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {item.email}
                      </a>
                    </div>
                    
                    {item.createdAt && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <HiCalendar className="w-4 h-4" />
                        {formatDate(item.createdAt)}
                      </div>
                    )}
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <HiChatAlt className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                      <span className="text-sm font-medium text-gray-700">Message:</span>
                    </div>
                    <p className="text-gray-800 leading-relaxed pl-6">{item.message}</p>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <button 
                      onClick={() => window.open(`mailto:${item.email}?subject=Re: Portfolio Contact&body=Hi ${item.name},%0D%0A%0D%0AThank you for reaching out!`)}
                      className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <HiMail className="w-4 h-4" />
                      Reply
                    </button>
                    
                    <button 
                      onClick={() => handleDelete(item._id)}
                      disabled={deletingId === item._id}
                      className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white text-sm px-4 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {deletingId === item._id ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <HiTrash className="w-4 h-4" />
                      )}
                      {deletingId === item._id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <HiMail className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
          <p className="text-gray-600">When visitors contact you through your portfolio, their messages will appear here.</p>
        </div>
      )}
    </div>
  );
}
