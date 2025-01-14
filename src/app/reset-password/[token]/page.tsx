import { FC } from "react";

interface ResetPasswordPageProps {
  params: {
    token: string; // Define el token como un string
  };
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({ params }) => {
  const { token } = params;

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token recibido: {token}</p>
      {/* Aquí puedes agregar tu lógica de restablecimiento de contraseña */}
    </div>
  );
};

export default ResetPasswordPage;
