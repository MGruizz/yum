import React, { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface CommentProps {
  username: string;
  text: string;
}

const Comentario: React.FC<CommentProps> = ({ username, text }) => {
  return (
    <div className="flex space-x-2">
      <span className="font-bold">{username}</span>
      <span>{text}</span>
    </div>
  );
};

const Comentarios: React.FC = () => {
  const [showComments, setShowComments] = useState(false);

  const comments = [
    { username: 'user1', text: 'Great post!' },
    { username: 'user2', text: 'Thanks for sharing.' },
    { username: 'user3', text: 'Amazing!' },
  ];

  return (
    <div>
      <button 
        className="w-full flex items-center justify-between text-xl focus:outline-none" 
        onClick={() => setShowComments(!showComments)}
      >
        <span>Comentarios</span>
        {showComments ? <FiChevronUp /> : <FiChevronDown />}
      </button>

      {showComments && comments.map((comment, index) => (
        <Comentario key={index} username={comment.username} text={comment.text} />
      ))}
    </div>
  );
};

export default Comentarios;