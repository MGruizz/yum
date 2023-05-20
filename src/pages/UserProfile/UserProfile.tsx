import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { getUserById , getRecipesByUserId} from "../../api/usersApi";
import { User } from "../../features/user/userInterfaces";
import { useParams } from "react-router-dom";
import { Recipe } from "../../features/recipe/recipeInterfaces";
import { getUserToken } from "../../api/authApi";
import {getImagesRecipe} from "../../api/recipeApi";


const UserProfile: React.FC = () => {
  const [publicacionesUsuarios, setPublicacionesUsuarios] = useState<Recipe[]>([]);
  const  { userId  } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>();
  //const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken =  getUserToken();
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);
          const recipesData = await getRecipesByUserId(userId);
          setPublicacionesUsuarios(recipesData);
          if (userToken) {
            setIsCurrentUserProfile(String(userToken.id) === userId);
          }
        }
      } catch (error) {
        console.error("Error al cargar la información del usuario");
      }
    };
  
    fetchUser();
  }, [userId]);

  // const handleShowModal = (recipeId: string, recipeName: string, recipeDescription: string) => {
  //   setShowModal(!showModal);
  //   setReceta({ 
  //        id: recipeId,
  //        name: recipeName,
  //        description: recipeDescription
  //   });
  // }
 
  console.log(getImagesRecipe('1'));
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">
          
          {/* Grid de info usuario */}
          <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Grid imagen */}
            <div className="row-span-3 flex justify-center col-span-1 ">
              {user && user?.foto_perfil ? (
                <img
                  src={user?.foto_perfil}
                  alt="Profile"
                  className="  h-auto rounded-full"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="   h-auto rounded-full"
                />
              )}
            </div>
            {/* Grid Nombre */}
            <div className="col-span-1 md:col-span-2">
              <h1 className="text-2xl font-bold text-gray-800 text-left">
                {user?.username}
                {!isCurrentUserProfile && isCurrentUserProfile!== undefined ? (
                  <button className="ml-4 px-4 py-1 font-semibold text-white transition-colors duration-200 rounded-md bg-gray-400 hover:bg-gray-900 text-sm">
                    Seguir
                  </button>
                ) : (
                  <button className="ml-4 text-sm">
                  {" "}
                  <FaPen />
                </button>
                )}
              </h1>
            </div>
            {/* Grid Descripcion */}
            <div className="col-span-1 md:col-span-2 row-span-2">
              <p className="text-gray-600 text-left">{user?.descripcion}</p>
            </div>
          </div>

          <div className="border-b border-gray-300 my-4" />
          {/* Grid Publicaciones */}
          <h1 className="text-2xl font-bold text-gray-800">Publicaciones</h1>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center items-center">
            {publicacionesUsuarios.map((recipe, index) => (
              <div key={index} className="overflow-hidden rounded-md">
                <img
                  src={ 'https://via.placeholder.com/350'}
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
};

export default UserProfile;
