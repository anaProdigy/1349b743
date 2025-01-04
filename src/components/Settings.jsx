import React, { useState } from "react";
import { resetCalls } from "../utils/api";

const Settings = ({ isOpen, onClose }) => {
  const [darkMode, setDarkMode] = useState(false);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-lightBackground dark:bg-darkBackground rounded-lg p-6 shadow-lg max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-lightText dark:text-darkText">
            Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          >
            ✖
          </button>
        </div>
        <div className="space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-lightText dark:text-darkText">Dark Mode</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={toggleTheme}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none dark:bg-gray-700 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dark dark:peer-checked:bg-primary-light"></div>
            </label>
          </div>

          {/* Reset Calls */}
          <div className="flex items-center justify-between">
            <span className="text-lightText dark:text-darkText">
              Reset Calls
            </span>
            <button
              onClick={handleResetCalls}
              className="text-error-light dark:text-error-dark hover:underline"
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
