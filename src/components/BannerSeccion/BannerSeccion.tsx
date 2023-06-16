import React from "react";

const bannerSeccion = [
  {

  }
]

const BannerSeccion = () => {

  return (
    <div className="flex flex-col xl:flex-row items-center bg-white">
      <img className="flex-shrink-0 mb-4 md:mb-0 md:mr-4 w-[720px] h-[400px]" src="https://firstyumstorage.blob.core.windows.net/imagenes2/bannerkiwi.jpg" alt="banner-seccion" />
      <div className="text-center mt-4">
        <p className="mb-4">Explora nuestras secciones y descubre toda una gama de comidas que te ayuden a sentirte bien y mantener un estilo de vida activo.</p>
        <p>Si estás buscando comenzar tu camino en el mundo culinario, estás en el lugar indicado. En YUM tienes acceso a toda una librería de recetas en la que podrás descubrir nuevos colores y sabores, mientras interactúas con nuestra creciente comunidad.</p>
      </div>
    </div>
  )
}

export default BannerSeccion;