"use client";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { decryptToken } from "../../lib/bcryptUtils"; // Importamos la función para desencriptar el token

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [decryptedToken, setDecryptedToken] = useState<string | null>(null); // Nuevo estado para el token desencriptado
  const [isValidToken, setIsValidToken] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const tokenFromPath = pathSegments[pathSegments.length - 1];

    if (tokenFromPath) {
      setToken(tokenFromPath); // Guardamos el token recibido de la URL

      // Desencriptamos el token usando la función decryptToken
      const decrypted = decryptToken(tokenFromPath);
      if (decrypted) {
        setDecryptedToken(decrypted); // Establecemos el token desencriptado
        setIsValidToken(true);
        setMessage("Token recibido y desencriptado correctamente.");
      } else {
        setIsValidToken(false);
        setMessage("Token no válido o no se pudo desencriptar.");
      }
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
          {/* Mostrar el mensaje de validación */}
          {message && <p className="text-white text-center mb-4">{message}</p>}

          {/* Mostrar el token desencriptado */}
          {decryptedToken && (
            <p className="text-white text-center mb-4">
              Token desencriptado: {decryptedToken}
            </p>
          )}

          {/* Si el token es válido, mostramos el formulario de restablecimiento de contraseña */}
          {isValidToken && <ResetPasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
