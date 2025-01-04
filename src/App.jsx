import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Tabs from "./components/Tabs.jsx";
import CallsList from "./pages/CallsList.jsx";
import Header from "./components/Header.jsx";
import "./index.css";
function App() {
  const [activeTab, setActiveTab] = useState("all");
  const tabs = [
    { title: "All Calls", value: "all" },
    { title: "Archived Calls", value: "archived" },
  ];
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3">
          <Header />
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Content */}
        <div className="p-4">
          <CallsList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
