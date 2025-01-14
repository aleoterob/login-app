"use client";

import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { useState } from "react";

const ForgotPasswordPage = () => {
  const [emailSent, setEmailSent] = useState(false);

  function setEmail(email: string): void {
    console.log(`Email set to: ${email}`);
  }

  return (
    <div className="relative w-full h-screen">
      {/* Imagen de fondo */}
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/back.jpg')" }}
      ></div>

      {/* Formulario de Olvidó Contraseña */}
      <div className="relative z-10">
        <ForgotPasswordForm setEmail={setEmail} setEmailSent={setEmailSent} />
      </div>
      {emailSent && (
        <div className="absolute bottom-0 left-0 w-full text-center p-4 bg-green-500 text-white">
          Email has been sent successfully!
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordPage;
