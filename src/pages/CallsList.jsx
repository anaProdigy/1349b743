import React, { useState, useEffect } from "react";
import CallCard from "../components/CallCard";
import { fetchActivities, updateCallArchiveStatus } from "../api/utils";

const CallsList = ({activeTab}) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchActivities();
        const filteredCalls =
          activeTab === "all"
            ? data.filter((call) => !call.is_archived)
            : data.filter((call) => call.is_archived);
        setCalls(filteredCalls);
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

    const handleArchiveAll = async () => {
      try {
        for (const call of calls) {
          await updateCallArchiveStatus(call.id, true);
        }
        setCalls([]);
        alert("All calls archived successfully!");
      } catch (error) {
        console.error("Error archiving all calls:", error);
      }
    };

    const handleUnarchiveAll = async () => {
      try {
        for (const call of calls) {
          await updateCallArchiveStatus(call.id, false);
        }
        setCalls([]);
        alert("All calls unarchived successfully!");
      } catch (error) {
        console.error("Error unarchiving all calls:", error);
      }
    };

  const handleArchiveToggle = async (id, isArchived) => {
    try {
      await updateCallArchiveStatus(id, !isArchived);
      setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
    } catch (error) {
      console.error(
        `Error ${isArchived ? "unarchiving" : "archiving"} call with ID ${id}:`,
        error
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {activeTab === "all" ? "All Calls" : "Archived Calls"}
        </h2>
        <button
          onClick={activeTab === "all" ? handleArchiveAll : handleUnarchiveAll}
          className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
        >
          {activeTab === "all" ? "Archive All" : "Unarchive All"}
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : calls.length > 0 ? (
        calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
            onArchive={() => handleArchiveToggle(call.id)}
          />
        ))
      ) : (
        <p>No {activeTab === "all" ? "calls" : "archived calls"} available.</p>
      )}
    </div>
  );
};

export default CallsList;
