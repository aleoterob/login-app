"use client";
import { FC } from "react";

const ForgotPasswordForm: FC = () => {
  const handleSubmit = async () => {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[url('https://www.magic4walls.com/wp-content/uploads/2014/01/texture-blue-fonchik-simple-dark-colors-glow-background.jpg')] bg-cover">
      <div className="w-[390px] bg-white/10 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h2 className="text-center text-white text-2xl font-semibold mb-6">
          Ingrese su nueva contraseña
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="txtUser" className="sr-only">
              Password
            </label>
            <div className="flex items-center bg-white/20 rounded">
              <span className="px-3 text-white">
                <i className="glyphicon glyphicon-user"></i>
              </span>
              <input
                id="txtUser"
                type="password"
                name="password"
                placeholder="Password"
                value="password"
                className="w-full px-3 py-2 bg-transparent border-none text-white placeholder-white/70 focus:ring-0 focus:outline-none"
                required
              />
              <input
                id="txtUser"
                type="password"
                name="password"
                placeholder="Re enter password"
                value="re-enrter-password"
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
