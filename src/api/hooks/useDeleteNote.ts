import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api";

const deleteNoteApi = async (id: number) => {
    const response = await api.delete(`/api/notes/delete/${id}/`);
    if (response.status !== 204) {
        throw new Error("Failed to delete note");
    }
};

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNoteApi,
        onMutate: async (noteId: number) => {
            await queryClient.cancelQueries({ queryKey: ["notes"] });

            const previousNotes = queryClient.getQueryData<{ id: number }[]>(["notes"]);

            queryClient.setQueryData(["notes"], (oldNotes: any) =>
                oldNotes?.map((n: any) => (n.id === noteId ? { ...n, isFading: true } : n))
            );

            return { previousNotes };
        },
        onSuccess: () => {
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ["notes"] });
            }, 300); 
        },
        onError: (error, _, context) => {
            if (context?.previousNotes) {
                queryClient.setQueryData(["notes"], context.previousNotes);
            }
        },
    });
};
