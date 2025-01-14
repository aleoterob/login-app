import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = Buffer.from(process.env.AES_KEY || "", "hex"); // Clave de 256 bits
const iv = Buffer.from(process.env.AES_IV || "", "hex"); // Vector de inicialización

export function decryptToken(encryptedToken: string): string | null {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(encryptedToken, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Error al desencriptar el token:", error);
    return null;
  }
}
