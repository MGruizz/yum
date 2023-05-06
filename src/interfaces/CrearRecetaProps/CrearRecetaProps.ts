export interface CrearRecetaProps {
    isVisible: boolean;
    onClose: () => void;
}

export interface FormRecetasInputs {
    nombreReceta: string;
    descripcionReceta: string;
    ingredientesReceta: string[];
    pasosReceta: string[];
    // fotoReceta: FileList;
}