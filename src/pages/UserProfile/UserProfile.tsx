import React, { useEffect, useState, useRef } from "react";
import { FaPen } from "react-icons/fa";
import Header from "../../components/Header/Header";
import { getUserById, followUser, unfollowUser, isFollowingUser, updateUserProfile, getInfoDescripcion } from "../../api/usersApi";
import { User, UserDetail, UserInformation } from "../../features/user/userInterfaces";
import { useParams } from "react-router-dom";
import { RecipeFull } from "../../features/recipe/recipeInterfaces";
import { getUserToken } from "../../api/authApi";
//import { getImagesRecipe} from "../../api/recipeApi";
import EditProfileModal from "./EditProfileModal";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { getRecipesFullByUserId } from "../../api/recipeApi";
import { mapDbObjectToRecipeFull } from "../../utils/mapper";
import ModalRecetas from '../../components/ModalRecetas/ModalRecetas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import ListUsersModal from "../../components/ListUsersModal/ListUsersModal";


const UserProfile: React.FC = () => {
  const [publicacionesUsuarios, setPublicacionesUsuarios] = useState<RecipeFull[]>([]);
  const [infoUsuario, setInfoUsuario] = useState<UserInformation | null>(null);
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState<boolean>();
  const [showModal, setShowModal] = useState(false);
  const [showModalPublicacion, setShowModalPublicacion] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState({ id: '', name: '', description: '' });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [usuarioActual, setUsuarioActual] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFollowModalVisible, setIsFollowModalVisible] = useState(false);
  const [modalUsers, setModalUsers] = useState<UserDetail[] | null>(null);

  const menuRef = useRef<HTMLDivElement>(null);

  const fetchUser = async () => {
    try {
      const userToken = getUserToken();
      setUsuarioActual(userToken);
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

        setInfoUsuario(await getInfoDescripcion(userId));
      }
    } catch (error) {
      console.error("Error al cargar la información del usuario");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId, refreshKey]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowFollowers = () => {
    setModalUsers(infoUsuario?.seguidores.list || null);
    setIsFollowModalVisible(true);
  };

  const handleShowFollowed = () => {
    setModalUsers(infoUsuario?.seguidos.list || null);
    setIsFollowModalVisible(true);
  };

  const handleCloseFollowModal = () => {
    setIsFollowModalVisible(false);
  };

  const handleSave = async (username: string, descripcion: string, fotoBase64: string | null) => {

    const { id } = getUserToken()!
    if (user && id) {

      try {
        const token = await updateUserProfile(id, username, descripcion, fotoBase64);
        fetchUser();
        setUser(token);

        setShowModal(false);
        setRefreshKey((oldKey) => oldKey + 1);
        window.location.reload();
        //toast.success('¡Perfil editado exitosamente!');
      } catch (error) {
        console.error("Error al actualizar el perfil del usuario", error);
        toast.error('¡Ocurrió un error al editar el perfil!');
      }
    }
  };

  const handleFollow = async () => {
    if (isProcessing) return;  // bloquea la ejecución simultánea

    setIsProcessing(true);  // comienza la operación de seguir/dejar de seguir
    const userToken = getUserToken();
    if (userToken && userId) {
      try {
        const id_seguido = parseInt(userId);
        if (!isFollowing) {
          await followUser(userToken.id, id_seguido);
          if (infoUsuario) {
            setInfoUsuario(infoUsuario => {
              if (!infoUsuario) {
                return null;
              }
              return {
                ...infoUsuario,
                seguidores: infoUsuario.seguidores ? {
                  count: infoUsuario.seguidores.count + 1,
                  list: infoUsuario.seguidores.list || [],
                } : {
                  count: 1,
                  list: [],
                },
                seguidos: infoUsuario.seguidos || {
                  count: 0,
                  list: [],
                },
                publicaciones: infoUsuario.publicaciones,
              };
            });
          }
          toast.success('¡Has seguido al usuario con éxito!');
        } else {
          await unfollowUser(userToken.id, id_seguido);
          if (infoUsuario) {
            setInfoUsuario(infoUsuarioPrev => {
              if (!infoUsuarioPrev) {
                return null;
              }
              return {
                ...infoUsuarioPrev,
                seguidores: infoUsuarioPrev.seguidores ? {
                  count: Math.max(0, infoUsuarioPrev.seguidores.count - 1),
                  list: infoUsuarioPrev.seguidores.list || [],
                } : {
                  count: 0,
                  list: [],
                },
                seguidos: infoUsuarioPrev.seguidos || {
                  count: 0,
                  list: [],
                },
                publicaciones: infoUsuarioPrev.publicaciones,
              };
            });
          }
          toast.success('¡Has dejado de seguir al usuario con éxito!');
        }
        setIsFollowing(await isFollowingUser(userToken.id, id_seguido));
      } catch (error) {
        console.error('Error al seguir/dejar de seguir al usuario', error);
        toast.error('Hubo un error al intentar seguir/dejar de seguir al usuario. Por favor inténtalo de nuevo.');
      } finally {
        setIsProcessing(false);  // termina la operación de seguir/dejar de seguir
      }
    } else {
      setIsProcessing(false);
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

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  }

  const handleMenuClick = (action: string) => {
    setIsOpen(false);
  }

  return (
    <div>
      <Header></Header>
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 bg-white shadow-lg">

          {/* Grid de info usuario */}
          <div className="grid grid-rows-3 grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Grid imagen */}
            <div className="row-span-3 flex justify-center col-span-1">
              {user && user?.foto_perfil ? (
                <img
                  src={user?.foto_perfil}
                  alt="Profile"
                  className="w-56 h-56 object-cover rounded-full"
                />
              ) : (
                <img
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="w-52 h-52 object-cover rounded-full"
                />
              )}
            </div>

            {/* Grid Nombre */}
            <div className="col-span-1 md:col-span-2 mt-5">
              <h1 className="text-2xl font-bold text-gray-800 text-left flex items-center">
                {user?.username}
                {!isCurrentUserProfile && isCurrentUserProfile !== undefined ? (
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
                {(usuarioActual && usuarioActual.is_admin) && <button
                  className="bg-gray-400 hover:bg-gray-900  text-white text-xl font-normal rounded-full px-3 mx-5"
                  onClick={() => handleButtonClick()}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </button>}
                {isOpen && (
                  <div ref={menuRef} className="origin-top-right right-20 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                    <div className="py-1" role="none">
                      <a onClick={() => handleMenuClick('Reportar perfil')} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem">Reportar perfil</a>
                    </div>
                  </div>
                )}
              </h1>
            </div>

            {/* Publicaciones, Seguidores, Seguidos */}
            <div className="col-span-1 md:col-span-1 row-span-1 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Publicaciones</h2>
                <p className="text-gray-600">{infoUsuario?.publicaciones}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 mx-2 cursor-pointer" onClick={handleShowFollowers}>
                  Seguidores
                </h2>
                <p className="text-gray-600">{infoUsuario?.seguidores.count}</p>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 cursor-pointer" onClick={handleShowFollowed}>
                  Seguidos
                </h2>
                <p className="text-gray-600">{infoUsuario?.seguidores.count}</p>
              </div>
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
                    className="w-full h-full   object-cover transform hover:scale-110 transition-all duration-200 cursor-pointer"
                    onClick={() => handleShowModalRecipe(String(recipe.idRecipe), recipe.nombre, recipe.descripcion)}
                  />

                ) : (
                  <img
                    src={'https://via.placeholder.com/350'}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full  object-cover transform hover:scale-110 transition-all duration-200"
                    onClick={() => handleShowModalRecipe(String(recipe.idRecipe), recipe.nombre, recipe.descripcion)}
                  />
                )}
              </div>
            ))}
            {showModalPublicacion && <ModalRecetas tituloReceta={recetaSeleccionada.name} isVisible={showModalPublicacion} onClose={() => setShowModalPublicacion(false)} recipeId={recetaSeleccionada.id} />}
            <ListUsersModal isVisible={isFollowModalVisible} users={modalUsers} onClose={handleCloseFollowModal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
