import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ResetPasswordForm = () => {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordType2, setPasswordType2] = useState("password");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange1 = (value: string) => {
    setPassword1(value);
  };

  const handleInputChange2 = (value: string) => {
    setPassword2(value);
  };

  const togglePasswordVisibility1 = () => {
    setPasswordType1(passwordType1 === "password" ? "text" : "password");
  };

  const togglePasswordVisibility2 = () => {
    setPasswordType2(passwordType2 === "password" ? "text" : "password");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password1 !== password2) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      // Actualizar el password en Supabase
      const user = supabase.auth.user(); // Obtener usuario actual (asumimos que el usuario está autenticado)
      if (user) {
        const { data, error } = await supabase
          .from("usuarios") // Reemplaza con el nombre de tu tabla
          .update({ password: password1 }) // Suponiendo que ya tienes el hash del password
          .eq("id", user.id); // Asegúrate de que el campo id sea correcto

        if (error) {
          setError("Error al actualizar la contraseña");
        } else {
          setError(null);
          // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
        }
      } else {
        setError("Usuario no autenticado");
      }
    } catch (err) {
      console.error("Error al actualizar la contraseña:", err);
      setError("Ocurrió un error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="password1">Nueva contraseña</label>
        <input
          type={passwordType1}
          id="password1"
          value={password1}
          onChange={(e) => handleInputChange1(e.target.value)}
        />
        <button type="button" onClick={togglePasswordVisibility1}>
          {passwordType1 === "password" ? "Mostrar" : "Ocultar"}
        </button>
      </div>
      <div>
        <label htmlFor="password2">Confirmar nueva contraseña</label>
        <input
          type={passwordType2}
          id="password2"
          value={password2}
          onChange={(e) => handleInputChange2(e.target.value)}
        />
        <button type="button" onClick={togglePasswordVisibility2}>
          {passwordType2 === "password" ? "Mostrar" : "Ocultar"}
        </button>
      </div>
      {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Actualizando..." : "Actualizar contraseña"}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
