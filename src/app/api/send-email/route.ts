import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { encryptEmail } from "../../lib/bcryptUtils"; // Importar la función para encriptar el email

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "El correo es requerido" },
      { status: 400 }
    );
  }

  try {
    // Encriptar el correo usando la función encryptEmail
    const encryptedEmail = encryptEmail(email);

    // URL de restablecimiento de contraseña con el correo encriptado como token
    const resetUrl = `https://login-app-sigma-navy.vercel.app/reset-password/${encryptedEmail}`;

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar el correo electrónico
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Restablecer contraseña",
      text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
      html: `
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
      `,
    });

    return NextResponse.json(
      { message: "Correo enviado correctamente." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error enviando correo:", error);
    return NextResponse.json(
      { message: "Error enviando correo" },
      { status: 500 }
    );
  }
}
