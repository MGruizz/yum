import { Comment } from "../../features/recipe/recipeInterfaces";
import { User } from '../../features/user/userInterfaces';

export interface CommentsProps {
    comments: Comment[],
    usuarioLogeado: User,
    idReceta: string
}