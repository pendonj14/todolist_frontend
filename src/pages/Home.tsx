import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/api/services/AuthService";
import { getNotes } from "@/api/services/GetNote";
import { deleteNote } from "@/api/services/DeleteNote";
import NoteLists from "@/components/body/NoteLists";
import Headers from "@/components/header/Headers";
import NoteModal from "@/components/ux/NoteModal";
import SideBar from "@/components/header/SideBar";

interface NoteType {
    id: number;
    content: string;
    bg_color?: string;
    created_at: string; // Ensure this matches the Note interface
}

function Home() {
    const [notes, setNotes] = useState<NoteType[]>([]);
    const [modalMessage, setModalMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            const user = await getCurrentUser();
            if (user) {
                setUsername(user.username);
                navigate("/", { replace: true }); 
            } else {
                console.error("Failed to fetch username");
                showModalMessage("Failed to fetch username");
                navigate("/login", { replace: true }); 
            }
        };

        fetchNotes();
        checkAuthentication();
    }, []);

    useEffect(() => {
        if (username) {
            navigate("/", { replace: true }); 
        }
    }, [username, navigate]);

    const fetchNotes = async (): Promise<void> => {
        try {
            const notesData = await getNotes();
            setNotes(notesData);
        } catch (err:any) {
            showModalMessage("Failed to fetch notes");
        }
    };

    const handleDeleteNote = async (id: number): Promise<void> => {
        const noteElement = document.getElementById(`note-${id}`);
        if (noteElement) {
            noteElement.classList.add("motion-opacity-out-[0%]"); 
        }
        try {
            await deleteNote(id);
            fetchNotes();
        } catch (error) {
            showModalMessage("Error: " + (error as Error).message);
        }
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
            <SideBar closeSidebar={() => setShowSidebar(false)} isVisible={showSidebar} username={username}/>
            <div className="transition-all duration-300">
                <NoteLists 
                    notes={notes} 
                    setNotes={setNotes} 
                    deleteNote={handleDeleteNote} 
                    showModalMessage={showModalMessage} 
                />
                {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
            </div>
        </div>
    );
}

export default Home;