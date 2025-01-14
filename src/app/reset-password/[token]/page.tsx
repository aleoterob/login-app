"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    if (token) {
      // Aquí puedes agregar la lógica para validar el token
      setIsValidToken(true); // Suponiendo que el token es válido
    }
  }, [token]);

  return (
    <div>
      <h1>Reset Password</h1>
      {isValidToken ? (
        <p>Token recibido: {token}</p>
      ) : (
        <p>Token no válido o no proporcionado.</p>
      )}
      {/* Aquí puedes incluir tu lógica de restablecimiento */}
    </div>
  );
};

export default ResetPasswordPage;
