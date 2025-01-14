"use client";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const tokenFromPath = pathSegments[pathSegments.length - 1];

    if (tokenFromPath) {
      setToken(tokenFromPath); // Guardamos el token recibido de la URL
      setIsValidToken(true);
      setMessage("Token recibido correctamente.");
    } else {
      setMessage("No se proporcionó un token.");
    }
  }, [pathname]);

  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: "url('/images/back.jpg')", // Cambia esta ruta por la de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Contenido de la página */}
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
          {/* Mostrar el token tal cual en pantalla */}
          {token && (
            <p className="text-white text-center mb-4">
              Token recibido: {token}
            </p>
          )}

          {/* Mostrar el mensaje de validación */}
          {message && <p className="text-white text-center mb-4">{message}</p>}

          {/* Si el token es válido, mostramos el formulario de restablecimiento de contraseña */}
          {isValidToken && <ResetPasswordForm />}
        </div>
        <p>sssssssssssssssssssssssssssssssssss</p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
