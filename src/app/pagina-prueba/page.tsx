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
      setIsValidToken(true);
    }

    if (isValidToken) {
      console.log("Token recibido:", token);
    } else {
      console.log("Token no válido o no proporcionado.");
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
      {/* Contenido de la página */}
      <div className="relative z-10 flex flex-col justify-center items-center min-h-screen bg-white/50 p-8">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
