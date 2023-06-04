import React from 'react';
import { UserDetail } from '../../features/user/userInterfaces';

interface ListUsersModalProps {
    isVisible: boolean;
    users: UserDetail[] | null;
    onClose: () => void;
}

const ListUsersModal: React.FC<ListUsersModalProps> = ({ isVisible, users, onClose }) => {
    if (!isVisible) return null;

    return (
        <div>
            <div onClick={onClose} className="fixed inset-0 w-full h-full bg-black opacity-50 z-50"></div>
            <div className="fixed inset-0 w-full h-full flex items-center justify-center z-50">
                <div className="relative bg-white rounded-lg p-10">
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 rounded-full p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    {users?.map((user) => (
                        <div key={user.id} className="border-b border-gray-200 py-2">
                            <p className="text-lg">{user.username}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListUsersModal;
