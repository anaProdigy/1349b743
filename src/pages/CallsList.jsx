import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CallCard from "../components/CallCard";
import { fetchActivities, updateCallArchiveStatus } from "../api/utils";
import {
  FiArchive,
  FiRefreshCw,
} from "react-icons/fi";

const CallsList = ({ activeTab }) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingArchive, setLoadingArchive] = useState(false);

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
      const date = new Date(call.created_at).toLocaleDateString("en-US", {
        weekday: "long", 
        year: "numeric", 
        month: "long", 
        day: "numeric", 
      });
      if (!group[date]) group[date] = [];
      group[date].push(call);
      return group;
    }, {});
  };

  const groupedCalls = groupCallsByDate();

  //Refactor toasts
  const handleArchiveAll = async () => {
    setLoadingArchive(true);
    try {
      for (const call of calls) {
        await updateCallArchiveStatus(call.id, true);
      }
      setCalls([]);
      toast.success("All calls archived successfully!", {
        position: "bottom-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } catch (error) {
      toast.error("Failed to unarchive all calls. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } finally {
      setLoadingArchive(false); 
    }
  };

  const handleUnarchiveAll = async () => {
     setLoadingArchive(true);
    try {
      for (const call of calls) {
        await updateCallArchiveStatus(call.id, false);
      }
      setCalls([]);
      toast.success("All calls unarchived successfully!", {
        position: "bottom-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } catch (error) {
      toast.error("Failed to unarchive all calls. Please try again.", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } finally {
      setLoadingArchive(false);
    }
  };

  const handleArchiveToggle = async (id, isArchived) => {
    try {
      await updateCallArchiveStatus(id, !isArchived);
      setCalls((prevCalls) => prevCalls.filter((call) => call.id !== id));
      toast.success(isArchived ? "Call unarchived." : "Call archived.", {
        position: "bottom-center",
        autoClose: 3000, // 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
      });
    } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
      console.error(
        `Error ${isArchived ? "unarchiving" : "archiving"} call with ID ${id}:`,
        error
      );
    }
  };
  

  return (
    <div className="p-4">
      <div className="flex justify-center items-center mb-6">
        <button
          onClick={activeTab === "all" ? handleArchiveAll : handleUnarchiveAll}
          className="flex items-center gap-2 px-6 py-1 rounded-lg font-semibold text-white bg-primary-light dark:bg-primary-dark hover:bg-hover-light dark:hover:bg-hover-dark transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:ring-offset-2 dark:focus:ring-offset-background-dark"
        >
          {loadingArchive ? (
            <>
              <span className="loader w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></span>
              {activeTab === "all" ? "Archiving..." : "Unarchiving..."}
            </>
          ) : activeTab === "all" ? (
            <>
              <FiArchive className="text-lg" />
              Archive All Calls
            </>
          ) : (
            <>
              <FiRefreshCw className="text-lg" />
              Unarchive All Calls
            </>
          )}
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary-light dark:border-primary-dark border-t-transparent rounded-full animate-spin"></div>
          <p className="text-primary-light dark:text-primary-dark font-medium">
            Loading, please wait...
          </p>
        </div>
      ) : Object.keys(groupedCalls).length > 0 ? (
        Object.entries(groupedCalls).map(([date, calls]) => (
          <div key={date} className="mb-6">
            <h3 className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-2 text-center">
              {date}
            </h3>
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
        <p className="text-center text-text-secondary-light dark:text-text-secondary-dark">
          No {activeTab === "all" ? "calls" : "archived calls"} available.
        </p>
      )}
    </div>
  );
};

export default CallsList;
