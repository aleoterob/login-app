import crypto from "crypto";

// Generar una clave de 256 bits (32 bytes)
const key = crypto.randomBytes(32).toString("hex");

// Generar un IV de 16 bytes
const iv = crypto.randomBytes(16).toString("hex");

console.log("AES_KEY:", key);
console.log("AES_IV:", iv);
