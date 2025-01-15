"use client";

import BotonDeslogear from "../components/BotonDeslogear";

const PaginaLogeado = () => {
  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: `url('/images/back.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Contenido de la página */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen gap-8">
        <p className="text-6xl">You logged in successfully.</p>
        <BotonDeslogear />
      </div>
    </div>
  );
};

export default PaginaLogeado;
