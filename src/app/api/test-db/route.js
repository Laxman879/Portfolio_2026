import connectToDB from "@/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    
    return NextResponse.json({
      success: true,
      message: "Database connected successfully",
      env: {
        mongoUri: process.env.MONGODB_URI ? "Set" : "Missing",
        smtpUser: process.env.SMTP_USER ? "Set" : "Missing",
        smtpPass: process.env.SMTP_PASS ? "Set" : "Missing",
      }
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json({
      success: false,
      message: "Database connection failed",
      error: error.message,
      env: {
        mongoUri: process.env.MONGODB_URI ? "Set" : "Missing",
        smtpUser: process.env.SMTP_USER ? "Set" : "Missing", 
        smtpPass: process.env.SMTP_PASS ? "Set" : "Missing",
      }
    }, { status: 500 });
  }
}