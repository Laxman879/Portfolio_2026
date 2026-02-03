import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateContactEmail } from "@/utils/email-template";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();
    
    console.log('Email API called with:', { name, email: email?.substring(0, 5) + '...', phone, messageLength: message?.length });
    console.log('SMTP Config:', { 
      user: process.env.SMTP_USER ? 'Set' : 'Missing',
      pass: process.env.SMTP_PASS ? 'Set' : 'Missing',
      userValue: process.env.SMTP_USER,
      passLength: process.env.SMTP_PASS?.length
    });

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'annaboinalaxman6@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: generateContactEmail({ name, email, phone, message }),
    };

    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);

    return NextResponse.json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.error('Email error details:', {
      message: error.message,
      code: error.code,
      command: error.command
    });

    let errorMessage = `Email failed: ${error.message}`;
    if (error.code === 'EAUTH') {
      errorMessage = 'Authentication failed. Please check your Gmail App Password in .env.local.';
    }

    return NextResponse.json({
      success: false,
      message: errorMessage
    }, { status: 500 });
  }
}