"use client";

import { FC, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Importa los iconos
import { validatePassword } from "../lib/passwordValidation"; // Importa la validación de contraseña
import { validateEmailFormat } from "../lib/emailValidation"; // Importa la validación de correo electrónico

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SignUpForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de la dirección de correo electrónico
    if (!validateEmailFormat(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Validación de la contraseña
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setErrorMessage(passwordValidation.message);
      return;
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const { error } = await supabase.from("usuarios").insert([
        {
          email: email,
          password: hashedPassword,
        },
      ]);

      if (error) {
        setErrorMessage("User register error.");
        console.error(error);
        return;
      }

      setSuccessMessage("User succesfully registered.");
      setEmail("");
      setPassword("");
      setErrorMessage(null);

      router.push("/pagina-registrado");
    } catch (err) {
      console.error("Error al registrar:", err);
      setErrorMessage("Unexpected error.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          - User register -
        </h2>

        <form onSubmit={handleSignUp}>
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
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="txtPassword" className="sr-only">
              Password
            </label>
            <div className="flex items-center bg-white/20 rounded">
              <span className="px-3 text-white">
                <i className="glyphicon glyphicon-lock"></i>
              </span>
              <input
                id="txtPassword"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="px-3 text-white focus:outline-none"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="text-white mb-4">{errorMessage}</div>
          )}

          {successMessage && (
            <div className="text-green-500 text-center mb-4">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-verdeAle/50 hover:bg-verdeAle/75 rounded shadow"
          >
            <i className="fa fa-user-plus"></i> Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
