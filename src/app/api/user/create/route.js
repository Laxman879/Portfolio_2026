import connectToDB from "@/database";
import User from "@/models/User";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();

    // Delete existing user with same username
    await User.deleteMany({ username });

    const hashedPassword = await hash(password, 12);
    
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    if (newUser) {
      return NextResponse.json({
        success: true,
        message: "User created successfully",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}