import bcrypt from "bcryptjs";

// Función para encriptar el password
export const encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, 10);
};

// Función para comparar el password con el hash almacenado
export const comparePassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(password, hashedPassword);
};

// Función para encriptar el correo (similar a la encriptación de contraseñas)
export const encryptEmail = (email: string): string => {
  return bcrypt.hashSync(email, 10);
};

// Función para verificar si el correo ingresado coincide con el encriptado
export const compareEmail = (email: string, hashedEmail: string): boolean => {
  return bcrypt.compareSync(email, hashedEmail);
};
