import React from "react";
import { cn } from "../lib/utils.ts";

const Tabs = ({ activeTab, setActiveTab }) => {

  const tabs = [
    { title: "All Calls", value: "all" },
    { title: "Archived Calls", value: "archived" },
  ];
  return (
    <div className="flex justify-between  p-3 rounded-t-lg  max-w-lg mx-auto">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "flex-1 py-3 px-5 text-base font-semibold transition-all duration-300 focus:outline-none relative",
            activeTab === tab.value
              ? "bg-card-light dark:bg-card-dark text-primary-light dark:text-primary-dark border-t-2 border-l-2 border-r-2 rounded-t-lg shadow-lg scale-105"
              : "bg-background-light text-text-secondary-light dark:bg-background-dark dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-md hover:scale-105 border-b-2"
          )}
          style={{
            zIndex: activeTab === tab.value ? 10 : 1,
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
