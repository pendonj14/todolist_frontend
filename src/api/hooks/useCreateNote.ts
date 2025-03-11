import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

interface CreateNoteData {
    content: string;
}

const createNote = async (data: CreateNoteData): Promise<void> => {
    await api.post("/api/notes/", data);
};

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] }); // Refresh notes list
        },
    });
};