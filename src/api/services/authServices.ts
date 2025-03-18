import api from "@/api/api";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "@/api/Constants";
import { CustomJwtPayload, iUser } from "@/types/types";

export const fetchCurrentUser = async (): Promise<iUser | null> => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (!token) return null;

  try {
    const decodedToken = jwtDecode<CustomJwtPayload>(token);
    const userId = decodedToken.user_id;
    if (userId) {
      const response = await api.get(`/api/users/${userId}/`);
      return { username: response.data.username };
    }
  } catch (error) {
    console.error("Failed to decode token or fetch user details:", error);
    return null;
  }
  return null;
};

export const login = async (username: string, password: string) => {
  try {
    const response = await api.post("/api/token/", { username, password });
    return response.data;
  } catch (error: any) {
    console.error("Failed to login:", error);
    throw error;
  }
};

export const register = async (username: string, password: string) => {
  try {
    const response = await api.post("/api/user/register/", { username, password });
    return response.data;
  } catch (error: any) {
    console.error("Failed to register:", error);
    throw error;
  }
};
