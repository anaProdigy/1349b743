import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import Settings from "./Settings";

const Header = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  return (
    <header className="flex items-center justify-between px-6 py-4  dark:bg-card-dark  rounded-md">
      <h1 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold">
        AIRCALL
      </h1>
      <button
        onClick={toggleSettings}
        aria-label="Settings"
        className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark transition-all"
      >
        <FiSettings className="h-6 w-6" />
      </button>

      {/* Render Settings Drawer */}
      {isSettingsOpen && <Settings onClose={toggleSettings} />}
    </header>
  );
};

export default Header;
