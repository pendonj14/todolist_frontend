import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "../../api/api";

interface Note {
    id: number;
    content: string;
    bg_color?: string;
}

interface EditModalProps {
    note: Note;
    setNotes: (notes: (prevNotes: Note[]) => Note[]) => void;
    showModalMessage: (message: string) => void;
    onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ note, setNotes, showModalMessage, onClose }) => {
    const [content, setContent] = useState<string>(note.content);
    const [bgColor, setBgColor] = useState<string>(note.bg_color || "bg-yellow-400");

    const updateNote = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.put(`/api/notes/${note.id}/`, {
                content,
                bg_color: bgColor,
            });

            if (response.status === 200) {
                setNotes((prevNotes) =>
                    prevNotes.map((n) => (n.id === note.id ? { ...n, content, bg_color: bgColor } : n))
                );
                onClose();
            } else {
                showModalMessage("Failed to Update Note.");
            }
        } catch (error: any) {
            showModalMessage("Error: " + error.message);
        }
    };

    const handleColorChange = (color: string) => {
        setBgColor(color);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50" onClick={onClose}></div>

            <div
                className={`flex flex-col justify-between ${bgColor} m-3 p-10 rounded-[20px] min-h-[200px] text-center relative shadow-lg w-[400px]`}
            >
                <form onSubmit={updateNote}>
                    <textarea
                        className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-4 resize-none bg-inherit border-none outline-none text-center pt-9"
                        value={content}
                        rows={3}
                        placeholder="Edit Note"
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <div className="flex mb-2 justify-center space-x-2">
                        {["bg-yellow-400", "bg-[#FF82B8]", "bg-[#59F2E5]", "bg-[#9D9ADD]"].map((color) => (
                            <button
                                key={color}
                                type="button"
                                className={`${color} hover:scale-85 transition-transform duration-300 ease-out will-change-transform text-white font-semibold py-2 px-4 rounded-full w-10 h-10 border-2 border-white scale-75`}
                                onClick={() => handleColorChange(color)}
                            ></button>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-3">
                        <Button
                            type="submit"
                            className="bg-white hover:scale-110 transition-transform duration-300 ease-out will-change-transform text-black font-semibold py-2 px-4 rounded"
                        >
                            Update
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;