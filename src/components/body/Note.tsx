import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useTheme } from "next-themes";
import { useState } from "react";
import { useDeleteNote } from "@/api/hooks/useDeleteNote";

interface Note {
    id: number;
    content: string;
    bg_color?: string;
    created_at: string;
}

interface NotesProps {
    note: Note;
    onEdit: (note: Note) => void;
    onDelete: (id: number) => void;
}

const Notes: React.FC<NotesProps> = ({ note, onEdit }) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const { theme } = useTheme();
    const { mutate: deleteNote } = useDeleteNote();
    const [isFading, setIsFading] = useState(false);

    const handleDelete = () => {
        setIsFading(true); // Start fade-out effect
        setTimeout(() => deleteNote(note.id), 300); // Wait for fade-out before deletion
    };

    return (
        <div
            className={`flex flex-col justify-between ${theme === 'dark' ? 'bg-[#323232]' : note.bg_color} 
                m-3 p-3 rounded-lg min-h-[200px] text-center 
                hover:scale-105 transition-transform duration-300 ease-out will-change-transform 
                transition-opacity duration-300 ${isFading ? "opacity-100" : "opacity-0"}
            `}
        >
            <div className="pt-[55px] max-h-[150px] break-words overflow-x-auto custom-scrollbar">{note.content}</div>

            <div className="flex justify-between items-center">
                <small>{formattedDate}</small>
                <div className="flex scale-110">
                    <div
                        className="hover:scale-150 transition-transform duration-300 ease-out will-change-transform cursor-pointer"
                        onClick={() => onEdit(note)}
                    >
                        <MdOutlineEdit />
                    </div>

                    <div
                        className="hover:scale-150 transition-transform duration-300 ease-out will-change-transform cursor-pointer"
                        onClick={handleDelete}
                    >
                        <MdDeleteOutline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
