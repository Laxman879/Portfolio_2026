import connectToDB from "@/database";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDB();
    const users = await User.find({}, { password: 0 }); // Exclude password field
    
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}