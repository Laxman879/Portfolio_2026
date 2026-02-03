import connectToDB from "@/database";
import Education from "@/models/Education";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
  try {
    await connectToDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({
        success: false,
        message: "Education ID is required",
      });
    }

    const deletedEducation = await Education.findByIdAndDelete(id);

    if (deletedEducation) {
      return NextResponse.json({
        success: true,
        message: "Education deleted successfully",
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