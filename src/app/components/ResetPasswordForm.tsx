"use client";
import { FC, useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter para la redirección
import supabase from "../../app/lib/supabaseClient"; // Importa el cliente de Supabase
import { encryptPassword } from "../../app/lib/bcryptUtils"; // Importa la función para cifrar la contraseña

const ResetPasswordForm: FC<{ decryptedEmail: string }> = ({
  decryptedEmail,
}) => {
  const [passwordType1, setPasswordType1] = useState("text");
  const [passwordType2, setPasswordType2] = useState("text");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Estado para saber si la contraseña fue reseteada

  const router = useRouter(); // Inicializa el hook useRouter para redirigir

  const handleInputChange1 = (value: string) => {
    setPassword1(value);
    if (value) {
      setPasswordType1("password");
    } else {
      setPasswordType1("text");
    }
  };

  const handleInputChange2 = (value: string) => {
    setPassword2(value);
    if (value) {
      setPasswordType2("password");
    } else {
      setPasswordType2("text");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Las contraseñas no coinciden.");
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
      setError("Error al actualizar la contraseña: " + error.message);
    } else {
      setMessage("Contraseña actualizada correctamente.");
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
          Ingrese su nueva contraseña
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}
        {message && <p className="text-green-500 text-center">{message}</p>}

        {!isPasswordReset && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password1" className="sr-only">
                Nueva contraseña
              </label>
              <input
                id="password1"
                type={passwordType1}
                value={password1}
                onChange={(e) => handleInputChange1(e.target.value)}
                placeholder="Nueva contraseña"
                className="w-full px-3 py-2 bg-grisInput border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password2" className="sr-only">
                Repita contraseña
              </label>
              <input
                id="password2"
                type={passwordType2}
                value={password2}
                onChange={(e) => handleInputChange2(e.target.value)}
                placeholder="Repita contraseña"
                className="w-full px-3 py-2 bg-grisInput border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
            >
              Enviar
            </button>
          </form>
        )}

        {/* Botón para redirigir a la home, aparece solo si la contraseña fue reseteada */}
        {isPasswordReset && (
          <button
            onClick={handleRedirect}
            className="mt-4 w-full py-2 text-lg font-semibold text-white bg-gray-600 hover:bg-gray-700 rounded shadow"
          >
            Logearse
          </button>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
