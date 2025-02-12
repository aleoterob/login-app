import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { encryptEmail } from "../../lib/bcryptUtils"; // Asegúrate de importar la función

export async function POST(req: Request) {
  try {
    const { email } = await req.json(); // Recibimos el correo del usuario desde la solicitud

    // Validamos el correo electrónico
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { message: "El correo es requerido o no es válido" },
        { status: 400 }
      );
    }

    // Encriptar el correo electrónico
    const encryptedEmail = encryptEmail(email);

    // Crear un token único (por ejemplo, utilizando un identificador único o un valor aleatorio)
    // const token = crypto.randomBytes(32).toString("hex");

    // Crear la URL de restablecimiento con el correo encriptado
    const resetUrl = `https://login-app-sigma-navy.vercel.app/reset-password/${encryptedEmail}`;

    // Configurar el transporte de correo (usando Nodemailer)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Log para verificar variables de entorno y destino
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("Email destinatario:", email);

    // Enviar el correo electrónico con el enlace de restablecimiento
    const info = await transporter.sendMail({
      from: `"Soporte Login App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Restablecer contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
      html: `
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      `,
    });

    console.log("Correo enviado:", info.messageId);

    return NextResponse.json(
      { message: "Correo enviado correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { message: "Error enviando correo." },
      { status: 500 }
    );
  }
}
