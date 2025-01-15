// passwordValidation.ts

// Tipo de retorno para la validación de la contraseña
interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Función que valida la contraseña
export const validatePassword = (password: string): ValidationResult => {
  // Expresión regular para validar la contraseña
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

  // Comprobamos si la contraseña cumple con los requisitos
  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      message:
        "The password must contain at least 6 characters, an uppercase letter, a number,  a special character and can't be empty.",
    };
  }

  return {
    isValid: true,
    message: "",
  };
};
