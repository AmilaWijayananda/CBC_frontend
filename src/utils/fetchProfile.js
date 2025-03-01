// utils/fetchProfile.js
import axios from "axios";

export const fetchProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }
  try {
    const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user; // Return the user object
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};