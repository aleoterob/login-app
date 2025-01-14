// pages/signup.tsx
import SignUpForm from "../components/SignUpForm";

const SignUpPage = () => {
  return (
    <div
      className="relative w-full h-screen"
      style={{
        backgroundImage: "url('/images/back.jpg')", // Ruta de tu imagen en la carpeta public
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Formulario de registro */}
      <div className="relative z-10">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
