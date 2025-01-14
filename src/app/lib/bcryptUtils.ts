import CryptoJS from "crypto-js";

// Clave secreta para cifrado y descifrado (debería ser algo seguro y no compartido)
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
