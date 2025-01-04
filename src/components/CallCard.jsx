import React from "react";

const CallCard = ({ call, onArchiveToggle }) => {
  const { from, to, created_at, duration, call_type } = call;

  return (
    <div className="flex justify-between items-center p-4 bg-white rounded shadow mb-2">
      <div>
        <p className="font-semibold">{from}</p>
        <p className="text-sm text-gray-500">To: {to || "Unknown"}</p>
        <p className="text-sm text-gray-500">
          {new Date(created_at).toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">Duration: {duration}s</p>
      </div>
      <div>
        <span
          className={`text-xs px-2 py-1 rounded ${
            call_type === "missed"
              ? "bg-red-100 text-red-500"
              : call_type === "answered"
              ? "bg-green-100 text-green-500"
              : "bg-yellow-100 text-yellow-500"
          }`}
        >
          {call_type}
        </span>
        <div className="flex justify-end mt-2">
          <button
            onClick={() => onArchiveToggle(call.id, call.is_archived)}
            className="py-1 px-3 rounded text-white bg-blue-600 hover:bg-blue-700"
          >
            {call.is_archived ? "Unarchive" : "Archive"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallCard;
