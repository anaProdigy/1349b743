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
        const sortedCalls = filteredCalls.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setCalls(sortedCalls);
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

    const groupCallsByDate = () => {
      return calls.reduce((group, call) => {
        const date = new Date(call.created_at).toLocaleDateString();
        if (!group[date]) group[date] = [];
        group[date].push(call);
        return group;
      }, {});
    };

    const groupedCalls = groupCallsByDate();

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
      <div className="flex justify-center items-center mb-4">
        <button
          onClick={activeTab === "all" ? handleArchiveAll : handleUnarchiveAll}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700"
        >
          {activeTab === "all" ? "Archive All" : "Unarchive All"}
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(groupedCalls).length > 0 ? (
        Object.entries(groupedCalls).map(([date, calls]) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{date}</h3>
            {calls.map((call) => (
              <CallCard
                key={call.id}
                call={call}
                onArchiveToggle={(id, isArchived) =>
                  handleArchiveToggle(id, isArchived)
                }
              />
            ))}
          </div>
        ))
      ) : (
        <p>No {activeTab === "all" ? "calls" : "archived calls"} available.</p>
      )}
    </div>
  );
};

export default CallsList;
