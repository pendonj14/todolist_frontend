import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/api";

const deleteNote = async (id: number): Promise<void> => {
    await api.delete(`/api/notes/delete/${id}/`);
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] }); // Refresh notes list
        },
    });
};