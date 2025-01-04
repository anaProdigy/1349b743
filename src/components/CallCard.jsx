import React, { useState } from "react";
import { motion } from "framer-motion";

const CallCard = ({ call, onArchiveToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, from, to, created_at, duration, call_type, direction } = call;

  const toggleExpand = () => setIsExpanded(!isExpanded);
 const getCallIcon = () => {
   if (call_type === "missed")
     return <span className="text-error-light dark:text-error-dark">🔴</span>;
   if (direction === "inbound")
     return (
       <span className="text-success-light dark:text-success-dark">📞</span>
     );
   if (direction === "outbound")
     return (
       <span className="text-primary-light dark:text-primary-dark">📤</span>
     );
   return null;
 };

  return (
    <div className="bg-white rounded shadow mb-2 overflow-hidden">
      {/* Call Summary */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="flex items-center gap-2">
          {getCallIcon()}
          <div>
            <p
              className={` ${
                isExpanded ? "font-semibold text-lg" : "font-normal text-sm"
              }`}
            >
              {direction === "inbound" ? from : to || "Unknown"}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          {new Date(created_at).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </p>
        {/* <span className="text-gray-500">{Math.ceil(duration / 60)} mins</span> */}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className=" p-4"
        >
          <div className="flex justify-between">
            <p>
              {call_type === "missed" ? (
                <span className="text-red-500 font-semibold">Missed Call</span>
              ) : (
                <>
                  {direction === "inbound" ? "Incoming Call" : "Outgoing Call"},{" "}
                  {Math.ceil(duration / 60)} mins
                </>
              )}
            </p>
            <button
              onClick={() => onArchiveToggle(id, call.is_archived)}
              className={`py-2 px-4 flex items-center gap-2 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
                call.is_archived
                  ? "bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600"
                  : "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600"
              } text-white font-medium`}
            >
              {call.is_archived ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 3H18C19.1 3 20 3.9 20 5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V5C4 3.9 4.9 3 6 3ZM11 12V8H13V12H16L12 16L8 12H11Z" />
                  </svg>
                  Unarchive
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M6 3H18C19.1 3 20 3.9 20 5V19C20 20.1 19.1 21 18 21H6C4.9 21 4 20.1 4 19V5C4 3.9 4.9 3 6 3ZM12 8L8 12H11V16H13V12H16L12 8Z" />
                  </svg>
                  Archive
                </>
              )}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CallCard;
