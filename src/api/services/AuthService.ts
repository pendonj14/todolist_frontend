import { jwtDecode } from "jwt-decode";
import api from "@/api/api";
import { ACCESS_TOKEN } from "./Constants";

export const getCurrentUser = async (): Promise<{ username: string } | null> => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken.user_id;
      if (userId) {
        const response = await api.get(`/api/users/${userId}/`);
        return { username: response.data.username };
      }
    } catch (error) {
      console.error("Failed to decode token or fetch user details:", error);
      return null;
    }
  }
  return null;
};