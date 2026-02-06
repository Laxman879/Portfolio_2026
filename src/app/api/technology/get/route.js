import connectToDB from "@/database";
import Technology from "@/models/Technology";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const technologies = await Technology.find({}).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: technologies,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch technologies",
    });
  }
}
