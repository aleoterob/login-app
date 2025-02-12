"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter para la redirección
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importa los íconos
import supabase from "../../app/lib/supabaseClient"; // Importa el cliente de Supabase
import { encryptPassword } from "../../app/lib/bcryptUtils"; // Importa la función para cifrar la contraseña

const ResetPasswordForm: FC<{ decryptedEmail: string }> = ({
  decryptedEmail,
}) => {
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Estado para saber si la contraseña fue reseteada

  const router = useRouter(); // Inicializa el hook useRouter para redirigir

  const togglePasswordType1 = () =>
    setPasswordType1((prev) => (prev === "password" ? "text" : "password"));

  const togglePasswordType2 = () =>
    setPasswordType2((prev) => (prev === "password" ? "text" : "password"));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match.");
      return;
    }

    // Cifrar la nueva contraseña
    const encryptedPassword = await encryptPassword(password1);

    // Actualizar la contraseña en la base de datos de Supabase
    const { error } = await supabase
      .from("usuarios")
      .update({ password: encryptedPassword })
      .eq("email", decryptedEmail); // Busca por el correo desencriptado

    if (error) {
      setError("Error updating the password: " + error.message);
    } else {
      setMessage("Password successfully updated..");
      setIsPasswordReset(true); // Cambia el estado para mostrar el botón de logearse
    }
  };

  // Función para redirigir a la home
  const handleRedirect = () => {
    router.push("/"); // Redirige a la página principal
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Enter your new password
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        {!isPasswordReset && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <label htmlFor="password1" className="sr-only">
                New password
              </label>
              <input
                id="password1"
                type={passwordType1}
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
                placeholder="Nueva contraseña"
                className="w-full px-3 py-2 bg-azulJuztina/10 border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordType1}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {passwordType1 === "password" ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <div className="mb-4 relative">
              <label htmlFor="password2" className="sr-only">
                Re enter password
              </label>
              <input
                id="password2"
                type={passwordType2}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="Repita contraseña"
                className="w-full px-3 py-2 bg-azulJuztina/10 border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={togglePasswordType2}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white focus:outline-none"
              >
                {passwordType2 === "password" ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white bg-verdeAle/50 hover:bg-verdeAle/75 rounded shadow"
            >
              Submit
            </button>
          </form>
        )}

        {/* Botón para redirigir a la home, aparece solo si la contraseña fue reseteada */}
        {isPasswordReset && (
          <button
            onClick={handleRedirect}
            className="mt-4 w-full py-2 text-lg font-semibold text-white bg-verdeAle/50 hover:bg-verdeAle/75 rounded shadow"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
