// components/ForgotPasswordForm.tsx
"use client";
import { FC, useState } from "react";
import { encryptEmail } from "../lib/bcryptUtils"; // Asegúrate de importar la función

interface ForgotPasswordFormProps {
  setEmail: (email: string) => void;
  setEmailSent: (sent: boolean) => void;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({
  setEmail,
  setEmailSent,
}) => {
  const [emailState, setEmailState] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Encriptar el correo antes de enviarlo
      const encryptedEmail = encryptEmail(emailState);

      const response = await fetch("../api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: encryptedEmail }), // Enviar el correo encriptado
      });

      if (response.ok) {
        setMessage("¡Correo enviado! Revisa tu bandeja de entrada.");
        setEmail(emailState); // Establecer el correo sin encriptar para mostrarlo en el siguiente paso
        setEmailSent(true); // Marcar como correo enviado
      } else {
        setMessage("Hubo un problema enviando el correo. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Ocurrió un error inesperado. Inténtalo más tarde.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Ingrese su email para resetear su password
        </h2>

        {message && (
          <div className="text-center text-white mb-4">{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="txtUser" className="sr-only">
              Email
            </label>
            <div className="flex items-center bg-white/20 rounded">
              <span className="px-3 text-white">
                <i className="glyphicon glyphicon-user"></i>
              </span>
              <input
                id="txtUser"
                type="email"
                name="email"
                placeholder="Email"
                value={emailState}
                onChange={(e) => setEmailState(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
