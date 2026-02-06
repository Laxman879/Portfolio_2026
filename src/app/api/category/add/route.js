import connectToDB from "@/database";
import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const data = await req.json();
    const newCategory = await Category.create(data);

    return NextResponse.json({
      success: true,
      data: newCategory,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: e.code === 11000 ? "Category already exists" : "Failed to add category",
    });
  }
}
