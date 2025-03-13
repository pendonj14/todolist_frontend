import { useQuery } from "@tanstack/react-query";
import { jwtDecode, JwtPayload } from "jwt-decode";
import api from "@/api/api";
import { ACCESS_TOKEN } from "@/api/Constants";

// Define a custom JWT payload type
interface CustomJwtPayload extends JwtPayload {
    user_id: number;
}

const fetchCurrentUser = async (): Promise<{ username: string } | null> => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) return null;

    try {
        const decodedToken = jwtDecode<CustomJwtPayload>(token); // 🔹 Use custom type
        const userId = decodedToken.user_id; // ✅ No more TypeScript error

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

export const useAuth = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
    });
};
