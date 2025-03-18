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
