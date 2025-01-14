"use client";

import { FC, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import { useRouter } from "next/navigation";

// Configuración de Supabase (tu URL y anon key)
const supabaseUrl = "https://ppukvfqirqaiwtohrbxh.supabase.co"; // Tu URL correcta
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwdWt2ZnFpcnFhaXd0b2hyYnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MDE5NzgsImV4cCI6MjA1MjM3Nzk3OH0.UA-jmmfkKAAU21ZliTsiOBCyJrD65uNHzxxtlLqfCSE"; // Tu clave anon correcta

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SignUpForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const router = useRouter(); // Utiliza useRouter para redirigir

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    // Encriptar el password
    const hashedPassword = bcrypt.hashSync(password, 10);

    try {
      const { error } = await supabase.from("usuarios").insert([
        {
          email: email,
          password: hashedPassword,
        },
      ]);

      if (error) {
        setErrorMessage("Error al registrar el usuario.");
        console.error(error);
        return;
      }

      setSuccessMessage("Usuario registrado con éxito.");
      setEmail("");
      setPassword("");
      setErrorMessage(null); // Limpiar cualquier mensaje de error

      // Redirigir a la página deseada después del registro exitoso
      router.push("/pagina-registrado"); // Cambia "/pagina-deseada" por la ruta de la página a la que quieras redirigir
    } catch (err) {
      console.error("Error al registrar:", err);
      setErrorMessage("Ocurrió un error inesperado.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          - Registro de Usuario -
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
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="text-red-500 text-center mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-center mb-4">
              {successMessage}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
