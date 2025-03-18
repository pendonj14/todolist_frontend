import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote, deleteNote, updateNote } from "@/api/services/noteServices";
import { iCreateNoteData, iUpdateNoteData } from "@/types/types";

const useMutationNotes = () => {
    const queryClient = useQueryClient();

    const useMutationCreateNotes = () => {
        return useMutation({
            mutationFn: (data: iCreateNoteData) => createNote(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["notes"] });
            },
            onError: (error) => {
                console.error("Error creating note:", error);
            },
        });
    };

    const useMutationUpdateNotes = () => {
        return useMutation({
            mutationFn: (data: iUpdateNoteData) => updateNote(data),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["notes"] });
            },
            onError: (error) => {
                console.error("Error updating note:", error);
            },
        });
    };

    const useMutationDeleteNotes = () => {
        return useMutation({
            mutationFn: (noteId: number) => deleteNote(noteId),
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
                console.error("Error deleting note:", error);
                if (context?.previousNotes) {
                    queryClient.setQueryData(["notes"], context.previousNotes);
                }
            },
        });
    };

    return { useMutationCreateNotes, useMutationUpdateNotes, useMutationDeleteNotes };
};

export default useMutationNotes;
