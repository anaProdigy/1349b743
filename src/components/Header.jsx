import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Settings from "./Settings";

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 shadow">
      <h1 className="text-text-primary-light dark:text-text-primary-dark">
        AIRCALL
      </h1>
      <button
        onClick={toggleSettings}
        aria-label="Settings"
        className="text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-all"
      >
        <FiSettings className="h-6 w-6" />
      </button>

      {/* Render Settings Drawer */}
      {isSettingsOpen && <Settings onClose={toggleSettings} />}
    </header>
  );
};

export default Header;
