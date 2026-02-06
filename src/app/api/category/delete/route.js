import connectToDB from "@/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    await Category.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to delete category",
    });
  }
}
