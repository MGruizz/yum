export interface ButtonWithMenuProps {
    onClose: () => void;
    onEdit: (recipe: string) => void;
    onDelete: (recipe: string) => void;
}