import { useState } from "react";
import api from "../../api/api";
import { Note } from "@/types/types";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

interface AddNoteProps {
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
    showModalMessage: (message: string) => void;
}

const AddNote: React.FC<AddNoteProps> = ({ setNotes, showModalMessage }) => {
    const [content, setContent] = useState<string>("");
    const {theme} = useTheme();
    
    const getNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            setNotes(res.data);
        } catch (err: any) {
            showModalMessage("Error fetching notes: " + err.message);
        }
    };

    const createNote = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content });
            if (res.status === 201) {
                getNotes();
                setContent("");
            } else {
                showModalMessage("Failed to create note.");
            }
        } catch (err: any) {
            showModalMessage("Error: " + err.message);
        }
    };

    return (
        <div className={`flex flex-col justify-between ${theme == 'dark' ? 'bg-[#2a2a2a]': 'bg-[#B3B3B3]'} m-3 p-3 rounded-lg min-h-[200px] text-center motion-preset-expand motion-duration-1000`}>
            <form onSubmit={createNote}>
                <textarea
                    className="resize-none bg-inherit border-none outline-none text-center pt-[55px]"
                    id="content"
                    name="content"
                    rows={3}
                    placeholder="Type to add new todo...."
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="flex flex-row-reverse justify-between items-center translate-y-[10px]">
                    <div className="hover:scale-105 transition-transform duration-300 ease-out will-change-transform">
                        <Button type="submit" className="bg-gray-400">
                            Note
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNote;