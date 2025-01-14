"use client";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { decryptToken } from "../../lib/bcryptUtils"; // Importar función para descifrar el token

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [decryptedToken, setDecryptedToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const tokenFromPath = pathSegments[pathSegments.length - 1];

    if (tokenFromPath) {
      setToken(tokenFromPath); // Guardamos el token recibido de la URL

      // Usamos la función para descifrar el token
      const decrypted = decryptToken(tokenFromPath);

      if (decrypted) {
        setDecryptedToken(decrypted); // Mostramos el token original
        setIsValidToken(true);
        setMessage("Token válido. Puedes restablecer tu contraseña.");
      } else {
        setIsValidToken(false);
        setMessage("Token no válido o expirado.");
      }
    } else {
      setMessage("No se proporcionó un token.");
    }
  }, [pathname]);

  return (
    <>
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
            {message && (
              <p className="text-white text-center mb-4">{message}</p>
            )}

            {/* Si el token es válido, mostramos el formulario de restablecimiento de contraseña */}
            {isValidToken && <ResetPasswordForm />}
          </div>
        </div>

        {/* Mostrar el token desencriptado en pantalla */}
        {decryptedToken && (
          <p className="text-white text-center mb-4">
            Token desencriptado: {decryptedToken}
          </p>
        )}
      </div>
      <p>Token recibido: {token}</p>
    </>
  );
};

export default ResetPasswordPage;
