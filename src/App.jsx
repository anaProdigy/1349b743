import React, { useState } from "react";
import Tabs from "./components/Tabs";
import AllCalls from "./pages/AllCalls";
import ArchivedCalls from "./pages/ArchivedCalls";
import Header from "./Header.jsx";
import "./index.css";
function App() {
  const [activeTab, setActiveTab] = useState("all");
 const tabs = [
   { title: "All Calls", value: "all" },
   { title: "Archived Calls", value: "archived" },
 ];
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      
        <div className="mt-4">
          {activeTab === "all" && <AllCalls />}
          {activeTab === "archived" && <ArchivedCalls />}
        </div>
     
    </div>
  );
}

export default App;
