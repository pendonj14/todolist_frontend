import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";


interface Note {
    id: number;
    content: string;
    bg_color?: string;
    created_at: string;
}


interface NotesProps {
    note: Note;
    onDelete: (id: number) => void;
    onEdit: (note: Note) => void;
}

const Notes: React.FC<NotesProps> = ({ note, onDelete, onEdit }) => {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

    return (
        <div
            className={`flex flex-col justify-between ${note.bg_color || "bg-yellow-400"} 
                m-3 p-3 rounded-lg min-h-[200px] text-center 
                hover:scale-105 transition-transform duration-300 ease-out will-change-transform`}
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
                        onClick={() => onDelete(note.id)}
                    >
                        <MdDeleteOutline />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notes;
