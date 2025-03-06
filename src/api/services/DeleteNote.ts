import api from "../api";

export const deleteNote = async (id: number): Promise<void> => {
    try {
      const response = await api.delete(`/api/notes/delete/${id}/`);
      if (response.status !== 204) {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      throw new Error("Failed to delete note");
    }
  };