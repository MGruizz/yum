import React ,{ useEffect, useState }from "react";
import { FaPen } from 'react-icons/fa';
import Header from "../../components/Header/Header";
import { number } from "yup";
import { getUserById,User } from "../../api/usersApi";

//Hay que hacer logica de token para que sepa que usuario es el que esta viendo el perfil, si es el original o el de otro usuario

interface UserProfileProps {
  currentUser: number; // ID del usuario actual
  profileUser: number; // ID del perfil que se está viendo
}

const UserProfile: React.FC<UserProfileProps> = ({ currentUser, profileUser }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(1);
        setUser(userData);
      } catch (error) {
        console.error('Error al cargar la información del usuario');
      }
    };

    fetchUser();
  }, [profileUser]);

  // Verifica si el perfil pertenece al usuario actual
  const isCurrentUserProfile = currentUser === profileUser;

  return (
    <div>
      <Header />
    <div className="min-h-screen bg-gray-200">
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
        <div className="flex justify-end">
          <button className="flex justify-end"> <FaPen /></button>
        </div>
        <div className="grid  sm:grid-cols-2 md:grid-cols-3 sm:image-center  ">
          <div className="col-span-2 flex justify-center  sm:col-span-1 md:justify-start  xl:justify-center rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-50 sm:w-full lg:w-60 h-auto rounded-full"
            />
          </div>
          <div className="col-span-2 space-y-4 pt-3 pl-5 ">
            <h1 className="text-2xl font-bold text-gray-800 text-left">{user?.username}</h1>
            {/* Cuando sea de otro usuario la cuenta que se esta viendo debera tener el boton follow 
            <div>
              
            </div>*/}
            <p className="text-gray-600 text-left">Descripcion</p>
          </div>
        </div>

        <div className="border-b border-gray-300 my-4" />
        <h1 className="text-2xl font-bold text-gray-800">Publicaciones</h1>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
          {Array.from({ length: 12 }, (_, index) => (
            <div key={index} className="overflow-hidden rounded-md">
              <img
                src={`https://via.placeholder.com/350`}
                alt={`Post ${index + 1}`}
                className="w-full object-cover transform hover:scale-110 transition-all duration-200"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default UserProfile;
