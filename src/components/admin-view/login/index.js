"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { HiUser, HiLockClosed, HiLogin, HiUserAdd } from "react-icons/hi";

const controls = [
  {
    name: "username",
    placeholder: "Enter your username",
    type: "text",
    label: "Username",
    icon: HiUser,
  },
  {
    name: "password",
    placeholder: "Enter your password",
    type: "password",
    label: "Password",
    icon: HiLockClosed,
  },
];

export default function Login({ formData, setFormData, handleLogin, createUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleLoginClick = async () => {
    setIsLoading(true);
    await handleLogin();
    setIsLoading(false);
  };

  const handleCreateClick = async () => {
    setIsCreating(true);
    await createUser();
    setIsCreating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-300">Sign in to manage your portfolio</p>
          </motion.div>

          <div className="space-y-6">
            {controls.map((control, index) => {
              const IconComponent = control.icon;
              return (
                <motion.div
                  key={control.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {control.label}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconComponent className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={control.type}
                      name={control.name}
                      value={formData[control.name]}
                      onChange={(e) => setFormData({ ...formData, [control.name]: e.target.value })}
                      placeholder={control.placeholder}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <motion.button
              onClick={handleLoginClick}
              disabled={isLoading || !formData.username || !formData.password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <HiLogin className="w-5 h-5" />
              )}
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>

            <motion.button
              onClick={handleCreateClick}
              disabled={isCreating || !formData.username || !formData.password}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isCreating ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <HiUserAdd className="w-5 h-5" />
              )}
              {isCreating ? "Creating..." : "Create User"}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
