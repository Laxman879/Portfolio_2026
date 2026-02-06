import connectToDB from "@/database";
import Technology from "@/models/Technology";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const { _id, ...updateData } = data;

    const updatedTechnology = await Technology.findByIdAndUpdate(_id, updateData, { new: true });

    return NextResponse.json({
      success: true,
      data: updatedTechnology,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to update technology",
    });
  }
}
