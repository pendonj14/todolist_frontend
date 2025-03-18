import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "@/api/services/noteServices";

export const useDeleteNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteNote,
        onMutate: async (noteId: number) => {
            await queryClient.cancelQueries({ queryKey: ["notes"] });

            const previousNotes = queryClient.getQueryData<{ id: number }[]>(["notes"]);

            queryClient.setQueryData(["notes"], (oldNotes: any) =>
                oldNotes?.map((n: any) => (n.id === noteId ? { ...n, isFading: true } : n))
            );

            return { previousNotes };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
        onError: (error, _, context) => {
            console.error("Delete failed:", error);
            if (context?.previousNotes) {
                queryClient.setQueryData(["notes"], context.previousNotes);
            }
        },
    });
};
