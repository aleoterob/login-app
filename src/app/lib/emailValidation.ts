// emailValidation.ts
export const validateEmailFormat = (email: string) => {
  // Validación de si el email está vacío
  if (!email.trim()) {
    return {
      isValid: false,
      message: "Email cannot be empty.",
    };
  }

  // Expresión regular para verificar el formato del correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(email);

  return {
    isValid,
    message: isValid ? "" : "Invalid email format",
  };
};
