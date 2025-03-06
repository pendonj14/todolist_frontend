import api from "@/api/api";

export const getNotes = async (): Promise<any> => {
  try {
    const response = await api.get("/api/notes/");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch notes");
  }
};

