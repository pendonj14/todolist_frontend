import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUser } from "@/api/services/authServices";
import { iUser } from "@/types/types";

export const useAuth = () => {
    return useQuery<iUser | null>({
        queryKey: ["currentUser"],
        queryFn: fetchCurrentUser,
    });
};