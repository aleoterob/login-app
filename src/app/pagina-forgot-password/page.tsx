"use client";
// pages/reset-password.tsx
import { useState } from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import ResetPasswordForm from "../components/ResetPasswordForm";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string | null>(null);

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/back.jpg')" }}
      ></div>

      {/* Formulario de Olvidó Contraseña o Restablecer Contraseña */}
      <div className="relative z-10">
        {!email ? (
          <ForgotPasswordForm setEmail={setEmail} />
        ) : (
          <ResetPasswordForm email={email} />
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
