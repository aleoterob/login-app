"use client";

import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { decryptEmail } from "../../lib/bcryptUtils"; // Asegúrate de importar la función correctamente

const ResetPasswordPage = () => {
  const pathname = usePathname();
  const [decryptedEmail, setDecryptedEmail] = useState<string | null>(null);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const encryptedEmailFromPath = pathSegments[pathSegments.length - 1];

    if (encryptedEmailFromPath) {
      // Desencriptamos el correo electrónico usando la función decryptEmail
      const decrypted = decryptEmail(encryptedEmailFromPath);
      if (decrypted) {
        setDecryptedEmail(decrypted);
        setIsValidEmail(true);
        setMessage("Correo recibido y desencriptado correctamente.");
      } else {
        setIsValidEmail(false);
        setMessage("Correo no válido o no se pudo desencriptar.");
      }
    } else {
      setMessage("No se proporcionó un correo.");
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

          {/* Mostrar el correo desencriptado */}
          {decryptedEmail && (
            <p className="text-white text-center mb-4">
              Correo desencriptado: {decryptedEmail}
            </p>
          )}

          {isValidEmail && decryptedEmail && (
            <ResetPasswordForm decryptedEmail={decryptedEmail} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
