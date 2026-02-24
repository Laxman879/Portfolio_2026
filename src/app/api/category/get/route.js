import connectToDB from "@/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const url = new URL(req.url || '', 'http://localhost');
    const type = url.searchParams.get("type");

    let categories;
    if (type === "main") {
      const mainCategories = ["frontend", "backend", "fullstack", "css"];
      categories = await Category.find({ 
        name: { $in: mainCategories }
      }).sort({ createdAt: 1 });
    } else {
      categories = await Category.find({}).sort({ createdAt: 1 });
    }

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (e) {
    console.error('Category fetch error:', e);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
}

export const dynamic = 'force-dynamic';
