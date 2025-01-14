import CryptoJS from "crypto-js";
import bcrypt from "bcryptjs";

// Clave secreta para cifrado y descifrado
const SECRET_KEY = "mi_clave_secreta_que_deberia_ser_segura";

// Función para cifrar un token (AES)
export const encryptToken = (token: string): string => {
  return CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
};

// Función para descifrar un token (AES)
export const decryptToken = (encryptedToken: string): string | null => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
  const originalToken = bytes.toString(CryptoJS.enc.Utf8);
  return originalToken ? originalToken : null;
};

// Función para cifrar un correo electrónico (AES)
export const encryptEmail = (email: string): string => {
  return CryptoJS.AES.encrypt(email, SECRET_KEY).toString();
};

// Función para descifrar un correo electrónico (AES)
export const decryptEmail = (encryptedEmail: string): string | null => {
  const bytes = CryptoJS.AES.decrypt(encryptedEmail, SECRET_KEY);
  const originalEmail = bytes.toString(CryptoJS.enc.Utf8);
  return originalEmail ? originalEmail : null;
};

// Función para comparar contraseñas usando bcrypt
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
