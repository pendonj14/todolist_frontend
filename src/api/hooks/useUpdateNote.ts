import api from "../api";

export const updateNote = async (id: number, content: string, bg_color: string): Promise<void> => {
    await api.put(`/api/notes/${id}/`, { content, bg_color });
};