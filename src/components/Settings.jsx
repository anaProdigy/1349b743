import React, { useState } from "react";
import { resetCalls } from "../api/utils";

const Settings = ({ onClose }) => {
  // const [darkMode, setDarkMode] = useState(false);
    const [darkMode, setDarkMode] = useState(
      document.documentElement.classList.contains("dark")
    );

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  const handleResetCalls = async () => {
    try {
      await resetCalls();
      alert("Calls reset successfully!");
    } catch (error) {
      console.error("Failed to reset calls:", error);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
      <div className="bg-white dark:bg-gray-100 rounded-lg p-6 shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        </div>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-gray-800">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {/* Reset Calls */}
          <div className="flex items-center justify-between">
            <span className="text-gray-800">Reset Calls</span>
            <button
              onClick={handleResetCalls}
              className="text-red-500 hover:underline"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
