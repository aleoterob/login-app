"use client";
import { FC, useState } from "react";
import { encryptEmail } from "../lib/bcryptUtils"; // Importar la función de encriptación
import { validateEmailFormat } from "../lib/emailValidation"; // Importar la función de validación

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
  const [emailError, setEmailError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formato del correo electrónico
    if (!validateEmailFormat(emailState)) {
      setEmailError("Por favor, ingresa un correo electrónico válido.");
      return;
    } else {
      setEmailError("");
    }

    try {
      // Encriptar el correo antes de enviarlo
      const encryptedEmail = encryptEmail(emailState);

      const response = await fetch("../api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviar el correo en texto claro y encriptado
        body: JSON.stringify({ email: emailState, encryptedEmail }),
      });

      if (response.ok) {
        setMessage("Email sent! Check your inbox.");
        setEmail(emailState); // Guardar el correo original en el estado
        setEmailSent(true); // Marcar como correo enviado
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message || "There was a problem sending the email."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Enter your email to reset your password.
        </h2>

        {message && (
          <div className="text-center text-white mb-4">{message}</div>
        )}

        {emailError && (
          <div className="text-center text-white mb-4">{emailError}</div>
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
            className="w-full py-2 text-lg font-semibold text-white bg-verdeAle/50 hover:bg-verdeAle/75 rounded shadow"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
