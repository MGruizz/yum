import { User } from "../../features/user/userInterfaces";

export interface ModalEditProfileProps {
    isVisible: boolean;
    onClose: () => void;
    onSave: (username: string, descripcion: string) => void;
    user : User;
}