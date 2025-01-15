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
          <h1 className="flex justify-center pt-20 text-6xl font-montserrat text-white">
            Register and Login System
          </h1>
          <h1 className="flex justify-center pt-6 text-4xl font-montserrat text-white">
            Next.js - Redux - Supabase Cloud DB - Tailwind
          </h1>
        </div>

        {/* Contenedor del formulario */}
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
    </Provider>
  );
};

export default MyApp;
