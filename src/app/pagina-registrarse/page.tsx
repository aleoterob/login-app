// pages/signup.tsx
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className="relative w-full h-screen">
      {/* Video de fondo */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        src="/videos/video.mp4" // Ruta del video en la carpeta public
      />

      {/* Formulario de registro */}
      <div className="relative z-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
