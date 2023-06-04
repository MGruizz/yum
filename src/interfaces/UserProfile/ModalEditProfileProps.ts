import { User } from "../../features/user/userInterfaces";

export interface ModalEditProfileProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (username: string, descripcion: string, fotoBase64: string | null) => void;
    user : User;
}