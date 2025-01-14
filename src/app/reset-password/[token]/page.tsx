import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface ResetPasswordPageProps {
  token: string; // El segmento dinámico `[token]`
}

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
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
