import ForgotPasswordForm from "../components/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        src="/videos/video-c.mp4" // Asegúrate de que el video esté en la carpeta public
      />

      {/* Formulario de Olvidó Contraseña */}
      <div className="relative z-10">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
