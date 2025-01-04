import React, { useState } from "react";
import { motion } from "framer-motion";

const CallCard = ({ call, onArchiveToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id, from, to, created_at, duration, call_type, direction } = call;

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const getCallIcon = () => {
    if (call_type === "missed") return <span className="text-red-500">🔴</span>;
    if (direction === "inbound")
      return <span className="text-green-500">📞</span>;
    if (direction === "outbound")
      return <span className="text-blue-500">📤</span>;
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
              {" "}
              {direction === "inbound"
                ? "Incoming Call"
                : "Outgoing Call"}, {Math.ceil(duration / 60)} mins
            </p>
            <button
              onClick={() => onArchiveToggle(id, call.is_archived)}
              className={`py-1 px-4 rounded ${
                call.is_archived
                  ? "bg-gray-500 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              {call.is_archived ? "Unarchive" : "Archive"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CallCard;
