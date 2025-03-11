import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/api/hooks/useAuth";
import { useNotes } from "@/api/hooks/useNotes";
import { useDeleteNote } from "@/api/hooks/useDeleteNote";
import NoteLists from "@/components/body/NoteLists";
import Headers from "@/components/header/Headers";
import NoteModal from "@/components/ux/NoteModal";
import SideBar from "@/components/header/SideBar";

function Home() {
    const navigate = useNavigate();
    const { data: user, isError: authError } = useAuth();
    const { data: notes = [], isLoading, isError: notesError } = useNotes();
    const { mutate: deleteNote } = useDeleteNote();
    
    const [modalMessage, setModalMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

    if (authError || (!user && !isLoading)) {
        navigate("/login", { replace: true });
    }

    const handleDeleteNote = (id: number): void => {
        setTimeout(() => {
            deleteNote(id, {
                onError: (error) => showModalMessage("Error: " + (error as Error).message),
            });
        }, 300); 
    };
    

    const showModalMessage = (message: string): void => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    };

    return (
        <div className="relative">
            <Headers toggleSidebar={() => setShowSidebar(!showSidebar)} />
            <SideBar closeSidebar={() => setShowSidebar(false)} isVisible={showSidebar} username={user?.username || ""} />
            <div className="transition-all duration-300">
                {isLoading ? (
                    <p>Loading notes...</p>
                ) : notesError ? (
                    <p>Failed to load notes.</p>
                ) : (
                    <NoteLists notes={notes} deleteNote={handleDeleteNote} showModalMessage={showModalMessage} />
                )}
                {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
            </div>
        </div>
    );
}

export default Home;