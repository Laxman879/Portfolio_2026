import connectToDB from "@/database";
import Technology from "@/models/Technology";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const newTechnology = await Technology.create(data);

    return NextResponse.json({
      success: true,
      data: newTechnology,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: e.code === 11000 ? "Technology already exists" : "Failed to add technology",
    });
  }
}
