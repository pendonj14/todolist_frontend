import { useState } from "react";
import useMutationNotes from "@/api/hooks/useMutationNotes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { iAddNoteProps } from "@/types/types";


const AddNote: React.FC<iAddNoteProps> = ({ showModalMessage }) => {
    const [content, setContent] = useState<string>("");
    const { theme } = useTheme();
    const { useMutationCreateNotes } = useMutationNotes();
    const createNoteMutation = useMutationCreateNotes();    
    
    const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!content.trim() || createNoteMutation.isPending) return;

        createNoteMutation.mutate(
            { content },
            {
                onSuccess: () => setContent(""),
                onError: (err: any ) => showModalMessage(err.message),
            }
        );
    };

    return (
        <div className={`flex flex-col justify-between ${theme === 'dark' ? 'bg-[#2a2a2a]' : 'bg-[#B3B3B3]'} m-3 p-3 rounded-lg min-h-[200px] text-center`}>
            <form onSubmit={handleCreateNote}>
                <textarea
                    className="resize-none bg-inherit border-none outline-none text-center pt-[55px]"
                    id="content"
                    name="content"
                    rows={3}
                    placeholder="Type to add new todo..."
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex flex-row-reverse justify-between items-center translate-y-[10px]">
                    <div className="hover:scale-105 transition-transform duration-300 ease-out">
                        <Button type="submit" className="bg-gray-400" disabled={createNoteMutation.isPending}>
                            {createNoteMutation.isPending ? "Adding..." : "Note"}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddNote;
