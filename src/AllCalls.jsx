import React, { useState, useEffect } from "react";
import CallCard from "../components/CallCard";
import { fetchActivities, updateCallArchiveStatus } from "../services/api";

const AllCalls = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchActivities();
        setCalls(data.filter((call) => !call.is_archived));
      } catch (error) {
        console.error("Error fetching calls:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleArchive = async (id) => {
    try {
      await updateCallArchiveStatus(id, true);
      setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
    } catch (error) {
      console.error(`Error archiving call with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Calls</h2>
      {loading ? (
        <p>Loading...</p>
      ) : calls.length > 0 ? (
        calls.map((call) => (
          <CallCard
            key={call.id}
            call={call}
            onArchive={() => handleArchive(call.id)}
          />
        ))
      ) : (
        <p>No calls available.</p>
      )}
    </div>
  );
};

export default AllCalls;
