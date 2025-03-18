import api from "@/api/api";
import { iNote, iCreateNoteData, iUpdateNoteData } from "@/types/types";

export const fetchNotes = async (): Promise<iNote[]> => {
    const response = await api.get("/api/notes/");
    return response.data;
};

export const createNote = async (data: iCreateNoteData): Promise<void> => {
    await api.post("/api/notes/", data);
};

export const updateNote = async ({ id, content, bg_color }: iUpdateNoteData): Promise<void> => {
    await api.put(`/api/notes/${id}/`, { content, bg_color });
};

export const deleteNote = async (id: number): Promise<void> => {
    const response = await api.delete(`/api/notes/delete/${id}/`);
    if (response.status !== 204) {
        throw new Error("Failed to delete note");
    }
};
