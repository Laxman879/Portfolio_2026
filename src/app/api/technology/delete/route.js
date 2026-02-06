import connectToDB from "@/database";
import Technology from "@/models/Technology";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Technology.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Technology deleted successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete technology",
    });
  }
}
