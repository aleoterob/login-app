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
