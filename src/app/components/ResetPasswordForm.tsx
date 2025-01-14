"use client";
import { FC, useState } from "react";

const ForgotPasswordForm: FC = () => {
  const [passwordType1, setPasswordType1] = useState("text");
  const [passwordType2, setPasswordType2] = useState("text");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

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
    console.log("Nueva contraseña:", password1);
    console.log("Repetir contraseña:", password2);
    // Aquí puedes agregar la lógica para enviar los datos al backend
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Ingrese su nueva contraseña
        </h2>

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
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
