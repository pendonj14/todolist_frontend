import AddNote from "./AddNote";
import Notes from "./Note";
import EditModal from "../ux/EditModal";
import { useState } from "react";
import { Note } from "@/types/types";

interface NoteListsProps {
    notes: Note[];
    deleteNote: (id: number) => void;
    showModalMessage: (message: string) => void;
}

const NoteLists: React.FC<NoteListsProps> = ({ notes, deleteNote, showModalMessage }) => {
    const [editingNote, setEditingNote] = useState<Note | null>(null);

    const handleEdit = (note: Note) => {
        setEditingNote(note);
    };

    const closeEditModal = () => {
        setEditingNote(null);
    };

    return (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 p-10 pl-25 pr-25 justify-center mx-auto">
            {notes.map((note) => (
                <div key={note.id} id={`note-${note.id}`} className="motion-preset-expand">
                    <Notes note={note} onDelete={deleteNote} onEdit={handleEdit} />
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