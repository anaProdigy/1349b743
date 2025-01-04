import axios from "axios";

const BASE_URL = "https://aircall-api.onrender.com";

export const fetchActivities = async () => {
  const response = await axios.get(`${BASE_URL}/activities`);
  console.log(response.data)
  return response.data;
};

export const updateCallArchiveStatus = async (id, isArchived) => {
  await axios.patch(`${BASE_URL}/activities/${id}`, { is_archived: isArchived });
};

export const fetchCallDetails = async (id) => {
  const response = await fetch(`${BASE_URL}/activities/${id}`);
  if (!response.ok) throw new Error("Failed to fetch call details");
  return await response.json();
};

export const resetCalls = async () => {
  try {
    const response = await axios.patch(`${BASE_URL}/reset`);
    return response.data;
  } catch (error) {
    console.error("Failed to reset calls:", error);
    throw error;
  }
};