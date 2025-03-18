import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/api/services/noteServices";
import { iNote } from "@/types/types";

export const useNotes = () => {
    return useQuery<iNote[]>({
        queryKey: ["notes"],
        queryFn: fetchNotes,
    });
};
