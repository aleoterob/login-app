interface ResetPasswordPageProps {
  params: {
    token: string; // El segmento dinámico `[token]`
  };
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {
  const { token } = params;

  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token recibido: {token}</p>
      {/* Aquí puedes incluir tu lógica de restablecimiento */}
    </div>
  );
};

export async function generateStaticParams() {
  // Si usas generación estática, puedes definir algunos ejemplos de tokens (solo para desarrollo)
  return [{ token: "exampleToken" }];
}

export default ResetPasswordPage;
