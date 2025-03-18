import { useState, useEffect, useCallback  } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/api/hooks/useAuth";
import { useNotes } from "@/api/hooks/useQueryNotes";
import NoteLists from "@/components/body/NoteLists";
import Headers from "@/components/header/Headers";
import NoteModal from "@/components/ux/NoteModal";
import SideBar from "@/components/header/SideBar";
import { ACCESS_TOKEN } from "@/api/Constants";
function Home() {
    const navigate = useNavigate();
    const { data: user} = useAuth();
    const { data: notes = [], isLoading, isError: notesError } = useNotes();
    const [modalMessage, setModalMessage] = useState<string>("");
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showSidebar, setShowSidebar] = useState<boolean>(false);

     useEffect(() => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token && !isLoading) {
            navigate("/login", { replace: true });
        }
    }, [user, isLoading, navigate]);

    const showModalMessage = useCallback((message: string): void => {
        setModalMessage(message);
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
    }, []);

    return (
        <div className="relative">
            <Headers toggleSidebar={() => setShowSidebar(!showSidebar)} />
            <SideBar closeSidebar={() => setShowSidebar(false)} isVisible={showSidebar} username={user?.username || ""} />
            <div className="transition-all duration-300">
                {isLoading ? (
                    <div className="flex justify-center items-center h-screen w-screen overflow-y-hidden">
                        <img src="/LogoDark.png" alt="loading" className="w-auto h-auto" />
                    </div>
                ) : notesError ? (
                    <p>Failed to load notes.</p>
                ) : (
                    <NoteLists notes={notes} showModalMessage={showModalMessage} />
                )}
                {showModal && <NoteModal message={modalMessage} setShowModal={setShowModal} />}
            </div>
        </div>
    );
}

export default Home;
