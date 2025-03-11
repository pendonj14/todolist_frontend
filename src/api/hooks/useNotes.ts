import { useQuery } from "@tanstack/react-query";
import api from "@/api/api";
import { Note } from "@/types/types";

const fetchNotes = async (): Promise<Note[]> => {
    const response = await api.get("/api/notes/");
    return response.data;
};

export const useNotes = () => {
    return useQuery({
        queryKey: ["notes"],
        queryFn: fetchNotes,
    });
};