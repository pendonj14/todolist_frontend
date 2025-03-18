import { JwtPayload } from "jwt-decode";

// Custom JWT Payload for authentication
export interface CustomJwtPayload extends JwtPayload {
    user_id: number;
}

// User type
export interface iUser {
    username: string;
}

// Note type
export interface iNote {
    id: number;
    content: string;
    bg_color: string;
    created_at: string;
    isFading?: boolean;
}

// Payload for creating a note
export interface iCreateNoteData {
    content: string;
}

// Payload for updating a note
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