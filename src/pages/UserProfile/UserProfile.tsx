import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { getUserById , followUser, unfollowUser,  isFollowingUser ,updateUserProfile} from "../../api/usersApi";
import { User } from "../../features/user/userInterfaces";
import { useParams } from "react-router-dom";
import { RecipeFull} from "../../features/recipe/recipeInterfaces";
import { getUserToken } from "../../api/authApi";
//import { getImagesRecipe} from "../../api/recipeApi";
import EditProfileModal from "./EditProfileModal";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getRecipesFullByUserId } from "../../api/recipeApi";
import { mapDbObjectToRecipeFull} from "../../utils/mapper";
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';


const UserProfile: React.FC = () => {
  const [publicacionesUsuarios, setPublicacionesUsuarios] = useState<RecipeFull[]>([]);
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>();
  const [showModal, setShowModal] = useState(false);
  const [showModalPublicacion, setShowModalPublicacion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState({ id: '', name: '', description: '' });
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userToken = getUserToken();
        if (userId) {
          const userData = await getUserById(userId);
          setUser(userData);

          const recipesData = await getRecipesFullByUserId(userId);   
          const mappearRecipe = recipesData.map(mapDbObjectToRecipeFull); 
          setPublicacionesUsuarios(mappearRecipe);   
          if (userToken) {
            setIsCurrentUserProfile(String(userToken.id) === userId);
            setIsFollowing(await isFollowingUser(userToken.id, parseInt(userId)));
          }
        }
        
      } catch (error) {
        console.error("Error al cargar la información del usuario");
      }
    };

    fetchUser();
  }, [userId, refreshKey]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (username: string, descripcion: string) => {

    const { id } = getUserToken()!
    if (user && id) {

      try {
        const token = await updateUserProfile(id, username, descripcion);
        setUser(token);
        setShowModal(false);
        setRefreshKey((oldKey) => oldKey + 1);
        toast.success('¡Perfil editado exitosamente!');
      } catch (error) {
        console.error("Error al actualizar el perfil del usuario", error);
        toast.error('¡Ocurrió un error al editar el perfil!');
      }
    }
  };

  const handleFollow = async () => {
    const userToken =  getUserToken();
    if (userToken && userId) {
      try {
        const id_seguido = parseInt(userId);
        if (!isFollowing) {
          await followUser(userToken.id, id_seguido);
          toast.success('¡Has seguido al usuario con éxito!');
        } else {
          await unfollowUser(userToken.id, id_seguido);
          toast.success('¡Has dejado de seguir al usuario con éxito!');
        }
        setIsFollowing(await isFollowingUser(userToken.id, id_seguido));
      } catch (error) {
        console.error('Error al seguir/dejar de seguir al usuario', error);
        toast.error('Hubo un error al intentar seguir/dejar de seguir al usuario. Por favor inténtalo de nuevo.');
      }
    }
  }

  const handleShowModalRecipe = (recipeId: string, recipeName: string, recipeDescription: string) => {
    setShowModalPublicacion(!showModalPublicacion);
    setRecetaSeleccionada({ 
             id: recipeId,
             name: recipeName,
             description: recipeDescription
        });
  }

  
  return (
    <div>
      <Header></Header>
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
              <h1 className="text-2xl font-bold text-gray-800 text-left flex items-center">
                {user?.username}
                {!isCurrentUserProfile && isCurrentUserProfile!== undefined ? (
                  <button 
                    className="ml-4 px-4 py-1 font-semibold text-white transition-colors duration-200 rounded-md bg-gray-400 hover:bg-gray-900 text-sm"
                    onClick={handleFollow}
                  >
                    {isFollowing ? 'Dejar de seguir' : 'Seguir'}
                  </button>
                ) : (
                  <div className="ml-4">
                    <button className="text-sm" onClick={handleShowModal}>
                      <FaPen />
                    </button>
                    <EditProfileModal
                      isVisible={showModal}
                      user={user!}
                      onClose={handleCloseModal}
                      onSave={handleSave}
                    />
                  </div>
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
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 justify-items-center items-center">
            {publicacionesUsuarios.map((recipe, index) => (
              <div key={index} className="overflow-hidden rounded-md w-64 h-64 relative">
                {recipe.images[0] !== undefined ? (
                  <img
                  src={recipe.images[0]}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full   object-cover transform hover:scale-110 transition-all duration-200"
                  onClick={() => handleShowModalRecipe(String(recipe.idRecipe),recipe.nombre,recipe.descripcion)}
                  />
                 
                ): (
                  <img
                  src={'https://via.placeholder.com/350'}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full  object-cover transform hover:scale-110 transition-all duration-200"
                  />
                )}
              </div>
            ))}
            {showModalPublicacion && <ModalRecetas tituloReceta={recetaSeleccionada.name} isVisible={showModalPublicacion} onClose={() => setShowModalPublicacion(false)} recipeId={recetaSeleccionada.id} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
