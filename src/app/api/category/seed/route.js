import connectToDB from "@/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const defaultCategories = [
      { name: "frontend", label: "Frontend", isActive: true },
      { name: "backend", label: "Backend", isActive: true },
      { name: "fullstack", label: "Fullstack", isActive: true },
      { name: "css", label: "UI / CSS", isActive: true },
    ];

    const existingCount = await Category.countDocuments();
    
    if (existingCount === 0) {
      await Category.insertMany(defaultCategories);
      return NextResponse.json({
        success: true,
        message: "Default categories created successfully",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Categories already exist",
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: "Failed to seed categories",
    });
  }
}
