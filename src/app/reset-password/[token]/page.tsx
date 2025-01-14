"use client";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { decryptToken } from "../../lib/aesUtils"; // Cambiamos el import para usar AES

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [decryptedToken, setDecryptedToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const tokenFromPath = pathSegments[pathSegments.length - 1];

    if (tokenFromPath) {
      try {
        // Desencriptamos el token usando la función decryptToken
        const decrypted = decryptToken(tokenFromPath);
        if (decrypted) {
          setDecryptedToken(decrypted);
          setIsValidToken(true);
          setMessage("Token recibido y desencriptado correctamente.");
        } else {
          setIsValidToken(false);
          setMessage("Token no válido o no se pudo desencriptar.");
        }
      } catch (error) {
        console.error("Error desencriptando el token:", error);
        setIsValidToken(false);
        setMessage("Ocurrió un error al procesar el token.");
      }
    } else {
      setMessage("No se proporcionó un token.");
    }
  }, [pathname]);

  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: "url('/images/back.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 flex justify-center items-center w-full h-full">
        <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
          {message && <p className="text-white text-center mb-4">{message}</p>}
          {decryptedToken && (
            <p className="text-white text-center mb-4">
              Token desencriptado: {decryptedToken}
            </p>
          )}
          {isValidToken && <ResetPasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
