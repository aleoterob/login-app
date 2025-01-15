"use client";

import { Provider } from "react-redux";
import store from "../app/store";
import LoginForm from "../app/components/LoginForm";

const MyApp = () => {
  return (
    <Provider store={store}>
      <div className="flex flex-col items-center justify-center h-screen w-full">
        {/* Contenedor con la imagen de fondo, ajustado a la altura de la pantalla */}
        <div
          className="absolute inset-0 bg-cover bg-center h-full"
          style={{ backgroundImage: "url('/images/back.jpg')" }}
        >
          <h1 className="flex flex-row justify-center items-center w-full  sm:pl:0 md:pl-0 lg:pl-0 xl:pl-0 pt-10 text-4xl text-center sm:text-6xl lg:text-6xl xl:text-6xl font-montserrat font-semibold text-white">
            Register and Login System
          </h1>
          <h1 className="flex flex-row justify-center items-center w-90  text-center sm:pl:0 md:pl-0 lg:pl-0 xl:pl-0 pt-10 text-2xl sm:text-4xl font-montserrat font-extralight">
            Next.js - Redux - Supabase Cloud DB - NodeMailer - Tailwind
          </h1>
        </div>

        {/* Contenedor del formulario */}
        <div className="flex pt-24">
          <LoginForm />
        </div>
      </div>
    </Provider>
  );
};

export default MyApp;
