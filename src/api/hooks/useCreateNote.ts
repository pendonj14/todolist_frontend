import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/services/noteServices";
import { iCreateNoteData } from "@/types/types";

export const useCreateNote = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: iCreateNoteData) => createNote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"] });
        },
    });
};
