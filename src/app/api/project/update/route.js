import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    const { _id } = extractData;

    // Parse technologies if it's a string
    let technologies = extractData.technologies;
    if (typeof technologies === 'string') {
      try {
        technologies = JSON.parse(technologies);
      } catch (e) {
        technologies = [];
      }
    }

    const updateData = {
      ...extractData,
      technologies
    };
    delete updateData._id;

    const updatedProject = await Project.findByIdAndUpdate(
      _id,
      updateData,
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