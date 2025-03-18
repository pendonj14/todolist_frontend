import AddNote from "./AddNote";
import Notes from "./Note";
import EditModal from "../ux/EditModal";
import { useState } from "react";
import { iNote, iNoteListsProps } from "@/types/types";

const NoteLists: React.FC<iNoteListsProps> = ({ notes, showModalMessage }) => {
    const [editingNote, setEditingNote] = useState<iNote | null>(null);

    const handleEdit = (note: iNote) => {
        setEditingNote(note);
    };

    const closeEditModal = () => {
        setEditingNote(null);
    };

    const sortedNotes = [...notes].sort(
        (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-10 pl-25 pr-25 justify-center mx-auto">
            {sortedNotes.map((note) => (
                <div
                    key={note.id}
                    id={`note-${note.id}`}
                    className={`motion-preset-expand transition-opacity duration-300 ${
                        note.isFading ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <Notes note={note} onEdit={handleEdit} />
                </div>
            ))}
            <div className="hover:scale-105 transition-transform duration-300 ease-out will-change-transform">
                <AddNote showModalMessage={showModalMessage} />
            </div>
            {editingNote && (
                <EditModal
                    note={editingNote}
                    showModalMessage={showModalMessage}
                    onClose={closeEditModal}
                />
            )}
        </div>
    );
};

export default NoteLists;
