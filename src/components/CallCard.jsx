import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiPhoneIncoming,
  FiPhoneOutgoing,
  FiPhoneMissed,
  FiArchive,
  FiRefreshCw,
} from "react-icons/fi";

const CallCard = ({ call, onArchiveToggle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const {
    id,
    from,
    to,
    created_at,
    duration,
    call_type,
    direction,
    is_archived,
  } = call;

  const toggleExpand = () => setIsExpanded(!isExpanded);
  const getCallIcon = () => {
    if (call_type === "missed")
      return (
        <FiPhoneMissed
          className="text-accent-missed-light dark:text-accent-missed-dark text-lg"
        />
      );
    if (direction === "inbound")
      return (
        <FiPhoneIncoming
          className="text-accent-incoming-light dark:text-accent-incoming-dark text-lg"
        />
      );
    if (direction === "outbound")
      return (
        <FiPhoneOutgoing
          className="text-primary-light dark:text-primary-dark text-lg"
        />
      );
    return null;
  };

  return (
    <motion.div
      className="relative bg-card-light dark:bg-card-dark rounded-lg shadow-md mb-6 p-1 md:p-2 border border-border-light dark:border-border-dark transition-transform transform hover:scale-105 hover:shadow-lg"
      whileHover={{ scale: 1.02 }}
      style={{ transition: "transform 0.2s ease-in-out" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Call Summary */}
      <div
        className="flex justify-between items-center p-4 cursor-pointer"
        onClick={(e) => {
          if (!e.target.closest(".archive-button")) {
            toggleExpand();
          }
        }}
      >
        <div className="flex items-center gap-3">
          {/* Call Icon */}
          {getCallIcon()}
          <div>
            <p
              className={`${
                isExpanded ? "font-semibold text-lg" : "font-normal text-sm"
              } text-text-primary-light dark:text-text-primary-dark`}
            >
              {direction === "inbound" ? from : to || "Unknown"}
            </p>
          </div>
        </div>

        {/* Show Archive Icon or Duration */}
        {isHovered || isExpanded ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={(e) => {
              e.stopPropagation();
              onArchiveToggle(id, is_archived);
              setIsHovered(false); // Reset hover state immediately after click
              setTimeout(() => setIsHovered(true), 0); // Reapply hover to refresh icon
            }}
            className={`archive-button flex items-center gap-2 text-white px-3 py-2 rounded-full shadow-lg transition-transform ${
              is_archived
                ? "bg-teal-600 hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-400"
                : "bg-primary-light hover:bg-primary-dark dark:bg-primary-dark dark:hover:bg-primary-light"
            }`}
            style={{
              zIndex: 10,
            }}
            aria-label={is_archived ? "Unarchive" : "Archive"}
            title={is_archived ? "Unarchive" : "Archive"}
          >
            {is_archived ? (
              <FiRefreshCw className="text-white" />
            ) : (
              <FiArchive className="text-white" />
            )}
          </motion.button>
        ) : (
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            {Math.ceil(duration / 60)} mins
          </p>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          className="p-4"
        >
          <div className="flex justify-between items-start">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">
              {call_type === "missed" ? (
                <span className="text-error-light dark:text-error-dark font-semibold">
                  Missed Call
                </span>
              ) : (
                <>
                  {direction === "inbound" ? "Incoming Call" : "Outgoing Call"},{" "}
                  {Math.ceil(duration / 60)} mins
                </>
              )}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CallCard;
