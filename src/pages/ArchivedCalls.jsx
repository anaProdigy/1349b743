import React, { useState, useEffect } from "react";
import CallCard from "../components/CallCard";
import { fetchActivities, updateCallArchiveStatus } from "../api/utils";

const ArchivedCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("CALLS",calls)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchActivities();
        console.log(
          "DATA",
          data.filter((call) => call.is_archived)
        );
        setCalls(data.filter((call) => call.is_archived));
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleUnarchive = async (id) => {
    try {
      await updateCallArchiveStatus(id, false);
      setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
    } catch (error) {
      console.error(`Error unarchiving call with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Archived Calls</h2>
      {loading ? (
        <p>Loading...</p>
      ) : calls.length > 0 ? (
        calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
            onUnarchive={() => handleUnarchive(call.id)}
          />
        ))
      ) : (
        <p>No archived calls available.</p>
      )}
    </div>
  );
};

export default ArchivedCalls;
