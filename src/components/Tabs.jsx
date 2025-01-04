import React from "react";
import { cn } from "../lib/utils.ts";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-around bg-white shadow p-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "py-2 px-4 text-sm font-medium rounded",
            activeTab === tab.value
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500"
          )}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
