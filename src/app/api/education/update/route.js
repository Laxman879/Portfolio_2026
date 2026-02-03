import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const { _id, degree, year, college } = await req.json();

    const updatedEducation = await Education.findByIdAndUpdate(
      _id,
      { degree, year, college },
      { new: true }
    );

    if (updatedEducation) {
      return NextResponse.json({
        success: true,
        message: "Education updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Education not found",
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}