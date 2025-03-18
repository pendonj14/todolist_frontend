import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { useTheme } from "next-themes";
import { useState } from "react";
import useMutationNotes from "@/api/hooks/useMutationNotes"; 
import { iNotesProps } from "@/types/types";


const Notes: React.FC<iNotesProps> = ({ note, onEdit }) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
    const { theme } = useTheme();
    
    const { useMutationDeleteNotes } = useMutationNotes();
    const { mutate: deleteNote } = useMutationDeleteNotes();

    const [isFading, setIsFading] = useState(false);

    const handleDelete = () => {
        setIsFading(true); 
        setTimeout(() => deleteNote(note.id), 0); 
    };

    return (
        <div
            className={`flex flex-col justify-between ${theme === 'dark' ? 'bg-[#323232]' : note.bg_color} 
                m-3 p-3 rounded-lg min-h-[200px] text-center 
                hover:scale-105 transition-transform duration-300 ease-out will-change-transform 
                transition-opacity duration-300 ${isFading ? "opacity-0 " : "opacity-100"}
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
