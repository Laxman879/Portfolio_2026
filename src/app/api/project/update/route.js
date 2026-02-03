import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req) {
  try {
    await connectToDB();
    const { _id, name, technologies, website, github } = await req.json();

    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      { name, technologies, website, github },
      { new: true }
    );

    if (updatedProject) {
      return NextResponse.json({
        success: true,
        message: "Project updated successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Project not found",
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