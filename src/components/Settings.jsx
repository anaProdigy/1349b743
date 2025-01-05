import React from "react";
import { resetCalls } from "../api/utils";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
const Settings = ({ onClose }) => {
  const { darkMode, toggleTheme } = useTheme();
// Refactor toast
 const handleResetCalls = async () => {
   try {
     await resetCalls();
     toast.success("Calls reset successfully!", {
       position: "bottom-center",
       autoClose: 3000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: false,
       theme: "colored",
     });
   } catch (error) {
     console.error("Failed to reset calls:", error);
     toast.error("Failed to reset calls. Please try again.", {
       position: "bottom-center",
       autoClose: 3000,
       hideProgressBar: true,
       closeOnClick: true,
       pauseOnHover: false,
       draggable: false,
       theme: "colored",
     });
   }
 };

  return (
     
   
      <AnimatePresence>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black dark:bg-black opacity-50"
          onClick={onClose} 
        />

        {/* Settings Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 z-50 h-full w-full sm:w-80 bg-card-light dark:bg-card-dark shadow-lg flex flex-col p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
              Settings
            </h2>
            <button
              onClick={onClose}
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark"
            >
              ✖
            </button>
          </div>

          {/* Drawer Content */}
          <div className="space-y-6">
            {/* Dark Mode Toggle */}
            <div className="p-4 border rounded-lg bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                    {darkMode ? "You're in Dark Mode" : "You're in Light Mode"}
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    {darkMode
                      ? "Switch to light mode for a brighter experience."
                      : "Switch to dark mode to reduce eye strain at night."}
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={darkMode}
                    onChange={toggleTheme}
                  />
                  <div className="w-11 h-6 bg-border-light dark:bg-border-dark rounded-full peer-focus:outline-none peer-checked:bg-teal-500 dark:peer-checked:bg-teal-400 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                </label>
              </div>
            </div>

            {/* Reset Calls */}
            <div className="p-4 border rounded-lg bg-card-light dark:bg-card-dark border-border-light dark:border-border-dark">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-semibold text-text-primary-light dark:text-text-primary-dark">
                    Reset Calls
                  </h3>
                  <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    Reset all calls to their initial state.
                  </p>
                </div>
                <button
                  onClick={handleResetCalls}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
  

  );
};

export default Settings;
