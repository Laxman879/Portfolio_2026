import connectToDB from "@/database";
import Experience from "@/models/Experience";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const { _id, position, company, duration, location, jobprofile } = await req.json();

    const updatedExperience = await Experience.findByIdAndUpdate(
      _id,
      { position, company, duration, location, jobprofile },
      { new: true }
    );

    if (updatedExperience) {
      return NextResponse.json({
        success: true,
        message: "Experience updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Experience not found",
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