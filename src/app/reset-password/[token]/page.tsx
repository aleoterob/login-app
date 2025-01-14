import { GetServerSideProps } from "next";

interface ResetPasswordPageProps {
  token: string; // El segmento dinámico `[token]`
}

const ResetPasswordPage = ({ token }: ResetPasswordPageProps) => {
  return (
    <div>
      <h1>Reset Password</h1>
      <p>Token recibido: {token}</p>
      {/* Aquí puedes incluir tu lógica de restablecimiento */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { token } = context.params as { token: string };

  return {
    props: {
      token,
    },
  };
};

export default ResetPasswordPage;
