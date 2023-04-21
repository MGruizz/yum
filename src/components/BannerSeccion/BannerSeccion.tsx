import React from "react";

const bannerSeccion = [
    {

    }
]

const BannerSeccion = () => {

    return (
        <div className="flex flex-col md:flex-row items-center bg-white">
  <img className="flex-shrink-0 mb-4 md:mb-0 md:mr-4" src="https://via.placeholder.com/720x300" alt="banner-seccion" />
  <div className="text-center">
    <p className="mb-4">Explora nuestras secciones y descubre toda una gama de comidas que te ayuden a sentirte bien y mantener un estilo de vida activo.</p>
    <p>Si estás buscando comenzar tu camino en el mundo culinario, estás en el lugar indicado. En YUM tienes acceso a toda una librería de recetas en la que podrás descubrir nuevos colores y sabores, mientras interactúas con nuestra creciente comunidad.</p>
  </div>
</div>
    )
}

export default BannerSeccion;