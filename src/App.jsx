import React, { useState } from "react";
import Tabs from "./components/Tabs.jsx";
import AllCalls from "./pages/AllCalls.jsx";
import ArchivedCalls from "./pages/ArchivedCalls.jsx";
import Header from "./Header.jsx";
import "./index.css";
function App() {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { title: "All Calls", value: "all" },
    { title: "Archived Calls", value: "archived" },
  ];
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-white shadow-sm py-4 px-6">
        <Header />
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl mt-6">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <div className="p-6">
          {activeTab === "all" && <AllCalls />}
          {activeTab === "archived" && <ArchivedCalls />}
        </div>
      </div>
    </div>
  );
}

export default App;
