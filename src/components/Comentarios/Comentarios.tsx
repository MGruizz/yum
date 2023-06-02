import React, { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { CommentsProps } from "../../interfaces/ComentariosProps/ComentariosProps";
import { getUserById, addComment } from "../../api/usersApi";
import { User } from "../../features/user/userInterfaces";
import { Comment } from "../../features/recipe/recipeInterfaces";
import { AiOutlineSend } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { deleteComment } from "../../api/usersApi";
interface CommentProps {
  idComentario: number;
  username: string;
  text: string;
  idUsername: string;
  isUser: boolean;
}

export interface CommentWithUser extends Comment {
  user: User;
}

const Comentario = React.memo(
  ({ idComentario, username, text, idUsername, isUser }: CommentProps) => {
    return (
      <div className="flex justify-between items-center">
        <div className="flex space-x-2">
          <span className="font-bold">
            <a href={`/profile/${idUsername}`}>{username}</a>
          </span>
          <span>{text}</span>
        </div>
        {isUser && idComentario ? (
          <form onSubmit={() => deleteComment(idComentario)}>
            <button
              className="opacity-50 hover:opacity-100 transition-opacity duration-300"
              type="submit"
            >
              <BsTrash3 />
            </button>
          </form>
        ) : null}
      </div>
    );
  }
);

const Comentarios: React.FC<CommentsProps> = ({
  comments,
  usuarioLogeado,
  idReceta,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsWithUsers, setCommentsWithUsers] = useState<CommentWithUser[]>(
    []
  );
  const [newComment, setNewComment] = useState<string>("");

  useEffect(() => {
    (async () => {
      const fetchedCommentsWithUsers: CommentWithUser[] = await Promise.all(
        comments.map(async (comment) => {
          const fetchedUser = await getUserById(comment.usuarioId.toString());
          return {
            idComment: comment.idComment,
            descripcion: comment.descripcion,
            usuarioId: comment.usuarioId,
            recetaId: comment.recetaId,
            user: fetchedUser,
          };
        })
      );

      setCommentsWithUsers(fetchedCommentsWithUsers);
    })();
  }, [comments]);

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (usuarioLogeado && newComment.trim() !== "") {
      const newCommentAdded = await addComment(
        newComment,
        String(usuarioLogeado.id),
        idReceta
      );
      setCommentsWithUsers((prevComments) => [
        ...prevComments,
        newCommentAdded,
      ]);
      setNewComment("");
    }
  };
  const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value);
  };

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-xl focus:outline-none"
        onClick={() => setShowComments(!showComments)}
      >
        <span>Comentarios</span>
        {showComments ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {showComments ? (
        <div>
          <form
            className="flex items-center my-2"
            onSubmit={handleCommentSubmit}
          >
            <img
              // src="https://via.placeholder.com/150"
              src={usuarioLogeado?.foto_perfil}
              alt="Nombre del usuario"
              className="w-6 h-6 rounded-full mr-2"
            />
            <input
              type="text"
              className="flex-grow border rounded-full py-1 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              placeholder="Añade un comentario..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <button
              type="submit"
              className="text-black-500 hover:text-blue-700 transition-colors duration-200"
            >
              <AiOutlineSend className="text-xl" />
            </button>
          </form>
          {commentsWithUsers.map((comment) => (
            <Comentario
              idComentario={comment.idComment}
              username={comment.user.username}
              text={comment.descripcion}
              idUsername={String(comment.usuarioId)}
              isUser={comment.usuarioId === usuarioLogeado?.id}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Comentarios;
