import React, { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { CommentsProps } from '../../interfaces/ComentariosProps/ComentariosProps';
import { getUserById } from '../../api/usersApi';
import { User } from '../../features/user/userInterfaces';
import { Comment } from '../../features/recipe/recipeInterfaces';

interface CommentProps {
  username: string;
  text: string;
}

export interface CommentWithUser extends Comment {
  user: User;
}

const Comentario = React.memo(({ username, text }: CommentProps) => {
  return (
    <div className="flex space-x-2">
      <span className="font-bold">{username}</span>
      <span>{text}</span>
    </div>
  );
});

const Comentarios: React.FC<CommentsProps> = ({ comments }) => {
  const [showComments, setShowComments] = useState(false);
  const [commentsWithUsers, setCommentsWithUsers] = useState<CommentWithUser[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCommentsWithUsers: CommentWithUser[] = await Promise.all(comments.map(async (comment) => {
        const fetchedUser = await getUserById(comment.usuarioId.toString());
        return {
          idComment: comment.idComment,
          descripcion: comment.descripcion,
          usuarioId: comment.usuarioId,
          recetaId: comment.recetaId,
          user: fetchedUser,
        };
      }));

      setCommentsWithUsers(fetchedCommentsWithUsers);
    })();
  }, [comments]);

  return (
    <div>
      <button
        className="w-full flex items-center justify-between text-xl focus:outline-none"
        onClick={() => setShowComments(!showComments)}
      >
        <span>Comentarios</span>
        {showComments ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {showComments && commentsWithUsers.map((comment) => (
        <Comentario key={comment.idComment} username={comment.user.username} text={comment.descripcion} />
      ))}
    </div>
  );
};

export default Comentarios;