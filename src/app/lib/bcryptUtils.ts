import crypto from "crypto";
import bcrypt from "bcryptjs";

// Asegúrate de que las variables de entorno no sean undefined
const AES_KEY = process.env.AES_KEY;
const AES_IV = process.env.AES_IV;

if (!AES_KEY || !AES_IV) {
  throw new Error(
    "Las claves AES_KEY o AES_IV no están definidas en las variables de entorno"
  );
}

// Función para cifrar un token (AES)
export const encryptToken = (token: string): string => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex")
  );
  let encrypted = cipher.update(token, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Función para descifrar un token (AES)
export const decryptToken = (encryptedToken: string): string | null => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex")
  );
  let decrypted = decipher.update(encryptedToken, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted || null;
};

// Función para cifrar un correo electrónico (AES)
export const encryptEmail = (email: string): string => {
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex")
  );
  let encrypted = cipher.update(email, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

// Función para descifrar un correo electrónico (AES)
export const decryptEmail = (encryptedEmail: string): string | null => {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(AES_KEY, "hex"),
    Buffer.from(AES_IV, "hex")
  );
  let decrypted = decipher.update(encryptedEmail, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted || null;
};

// Función para comparar contraseñas usando bcrypt
export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
