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