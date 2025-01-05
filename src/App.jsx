import React, { useState } from "react";
import { Toaster } from "react-hot-toast";
import Tabs from "./components/Tabs.jsx";
import CallsList from "./pages/CallsList.jsx";
import Header from "./components/Header.jsx";

import "./index.css";
function App() {
  const [activeTab, setActiveTab] = useState("all");
  
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex justify-center items-start py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-card-light dark:bg-card-dark shadow-lg rounded-lg w-full max-w-[70%]">
        {/* Header */}
        <div className=" px-4 py-3">
          <Header />
        </div>

        {/* Tabs */}
       
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      

        {/* Content */}
        <div className="p-4 text-text-primary-light dark:text-text-primary-dark">
          <CallsList activeTab={activeTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
