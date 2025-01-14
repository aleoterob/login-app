"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      setIsValidToken(false);
      setMessage("No se proporcionó ningún token.");
    }
  }, [pathname]);

  return (
    <div>
      <h1>Reset Password</h1>
      {isValidToken ? (
        <>
          <p>Token recibido: {token}</p>
          <p>Token descifrado: {decryptedToken}</p>
          <p>{message}</p>
          {/* Aquí puedes incluir tu lógica de restablecimiento */}
        </>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default ResetPasswordPage;
