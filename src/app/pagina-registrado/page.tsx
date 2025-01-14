"use client";

import BotonDeslogear from "../components/BotonDeslogear";

const PaginaLogeado = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        src="/videos/video-c.mp4" // Asegúrate de que el video esté en la carpeta public
      />

      {/* Contenido de la página */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen gap-8">
        <p className="text-6xl text-white">Te registraste correctamente</p>
        <BotonDeslogear />
      </div>
    </div>
  );
};

export default PaginaLogeado;
