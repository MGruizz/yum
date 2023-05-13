export interface ModalRecetasProps {
    isVisible: boolean;
    onClose: () => void;
    tituloReceta: string;
    recipeId: string;
}