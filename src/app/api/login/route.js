import connectToDB from "@/database";
import User from "@/models/User";
import { compare, hash } from "bcryptjs";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectToDB();
    const { username, password } = await req.json();

    let checkUser = await User.findOne({ username });

    if (!checkUser) {
      // Auto-create user if it doesn't exist
      const hashedPassword = await hash(password, 12);
      checkUser = await User.create({ username, password: hashedPassword });
    }

    const checkPassword = await compare(password, checkUser.password);

    if (!checkPassword) {
      return NextResponse.json({
        success: false,
        message: "Wrong password. Please try again",
      });
    }
    return NextResponse.json({
      success: true,
      message: "Login successfull",
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({
      success: false,
      message: "Something goes wrong !Please try again",
    });
  }
}
