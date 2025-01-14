"use client";

import BotonDeslogear from "../components/BotonDeslogear";

const PaginaLogeado = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8">
      <p className="text-6xl">Te registraste correctamente</p>

      <BotonDeslogear />
    </div>
  );
};

export default PaginaLogeado;
