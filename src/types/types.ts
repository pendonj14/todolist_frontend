import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    user_id: number;
}

export interface iUser {
    username: string;
}

export interface iNote {
    id: number;
    content: string;
    bg_color: string;
    created_at: string;
    isFading?: boolean;
}

export interface iCreateNoteData {
    content: string;
}

export interface iUpdateNoteData {
    id: number;
    content: string;
    bg_color: string;
}


export interface iAddNoteProps {
    showModalMessage: (message: string) => void;
}


export interface iEditModalProps {
    note: iNote;
    showModalMessage: (message: string) => void;
    onClose: () => void;
}


export interface iNotesProps {
    note: iNote;
    onEdit: (note: iNote) => void;
}

export interface iNoteListsProps {
    notes: iNote[];
    showModalMessage: (message: string) => void;
}