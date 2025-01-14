import { FC, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import { login, logout } from "../store";
import { useRouter } from "next/navigation"; // Asegúrate de que 'next/navigation' está correctamente importado
import { createClient } from "@supabase/supabase-js";
import SignUpForm from "./SignUpForm"; // Asegúrate de importar el componente SignUpForm
import { comparePassword } from "../lib/bcryptUtils"; // Importar la función de comparación de bcrypt

// Configuración de Supabase (tu URL y anon key)
const supabaseUrl = "https://ppukvfqirqaiwtohrbxh.supabase.co"; // Tu URL correcta
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwdWt2ZnFpcnFhaXd0b2hyYnhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY4MDE5NzgsImV4cCI6MjA1MjM3Nzk3OH0.UA-jmmfkKAAU21ZliTsiOBCyJrD65uNHzxxtlLqfCSE"; // Tu clave anon correcta

const LoginForm: FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSignUp, setShowSignUp] = useState(false); // Estado para mostrar el formulario de registro
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/pagina-logeado");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("usuarios")
        .select("*")
        .eq("email", email);

      if (error) {
        setErrorMessage("Error al comunicarse con el servidor.");
        return;
      }

      if (data && data.length > 0) {
        // El usuario existe, ahora verificamos la contraseña
        const storedPassword = data[0].password;

        // Verificamos si la contraseña ingresada coincide con la almacenada (encriptada)
        const isPasswordValid = await comparePassword(password, storedPassword);

        if (isPasswordValid) {
          dispatch(login());
          setErrorMessage(null); // Limpiar cualquier mensaje de error
        } else {
          setErrorMessage("Email o password incorrectos.");
        }
      } else {
        setErrorMessage("Email o password incorrectos.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setErrorMessage("Ocurrió un error inesperado.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  const handleSignUpClick = () => {
    // Redirigir a la página de registro
    router.push("../pagina-registrarse"); // Usa router.push para redirigir
  };

  const handleForgotPasswordClick = () => {
    // Redirigir a la página de restablecimiento de contraseña
    router.push("/pagina-forgot-password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        {showSignUp ? (
          // Si se está mostrando el formulario de registro, renderizar SignUpForm
          <SignUpForm />
        ) : (
          <>
            <h2 className="text-center text-white text-2xl font-semibold mb-6">
              - Please Login -
            </h2>

            {!isAuthenticated && (
              <form onSubmit={handleLogin}>
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
                      <i
                        className={`glyphicon ${
                          showPassword
                            ? "glyphicon-eye-close"
                            : "glyphicon-eye-open"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>

                {errorMessage && (
                  <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded shadow"
                >
                  <i className="fa fa-sign-in"></i> Login
                </button>
              </form>
            )}

            {isAuthenticated && (
              <div>
                <button
                  onClick={handleLogout}
                  type="button"
                  className="w-full py-2 text-lg font-semibold text-white bg-red-500 hover:bg-red-600 rounded shadow mt-2"
                >
                  <i className="fa fa-sign-out"></i> Logout
                </button>
              </div>
            )}

            <div className="flex items-center justify-between mt-4 text-white text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox mr-2 text-blue-500"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={handleForgotPasswordClick}
                className="hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                onClick={handleSignUpClick}
                className="text-white underline"
              >
                Registrarse
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
