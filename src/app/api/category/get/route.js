import connectToDB from "@/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    let categories;
    if (type === "main") {
      const mainCategories = ["frontend", "backend", "fullstack", "css"];
      categories = await Category.find({ 
        name: { $in: mainCategories },
        isActive: true 
      }).sort({ createdAt: 1 });
    } else {
      categories = await Category.find({ isActive: true }).sort({ createdAt: 1 });
    }

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
}
