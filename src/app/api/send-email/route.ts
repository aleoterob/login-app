import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "El correo es requerido" },
      { status: 400 }
    );
  }

  try {
    // Generar un token único
    const token = crypto.randomBytes(32).toString("hex");

    // Aquí puedes guardar el token en tu base de datos, asociado al correo (opcional)
    // await saveTokenToDatabase(email, token);

    // Crear la URL de restablecimiento
    const resetUrl = `https://login-app-sigma-navy.vercel.app/reset-password/${token}`;

    // Configurar el transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Enviar el correo electrónico al usuario con la URL de restablecimiento
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email, // Usar el correo en texto claro aquí
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
