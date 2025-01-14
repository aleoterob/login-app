"use client";

import ResetPasswordForm from "../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [token, setToken] = useState<string | null>(null);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const tokenFromPath = pathSegments[pathSegments.length - 1];
    if (tokenFromPath) {
      setToken(tokenFromPath);

      // Aquí puedes agregar la lógica para validar el token con el backend
      // Por ahora, asumimos que el token es válido
      setIsValidToken(true);
    }

    if (isValidToken) {
      console.log("Token recibido:", token);
    } else {
      console.log("Token no válido o no proporcionado.");
    }
  }, [pathname]);

  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
