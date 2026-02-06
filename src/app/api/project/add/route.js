import connectToDB from "@/database";
import Project from "@/models/Project";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();
    const extractData = await req.json();
    
    // Validate required fields
    if (!extractData.name) {
      return NextResponse.json({
        success: false,
        message: "Project name is required",
      });
    }
    
    if (!extractData.category) {
      return NextResponse.json({
        success: false,
        message: "Category is required",
      });
    }
    
    // Parse technologies if it's a string
    let technologies = extractData.technologies;
    if (typeof technologies === 'string') {
      try {
        technologies = JSON.parse(technologies);
      } catch (e) {
        technologies = [];
      }
    }
    
    if (!Array.isArray(technologies) || technologies.length === 0) {
      return NextResponse.json({
        success: false,
        message: "At least one technology is required",
      });
    }
    
    const projectData = {
      ...extractData,
      technologies
    };
    
    const saveData = await Project.create(projectData);
    
    if (saveData) {
      return NextResponse.json({
        success: true,
        message: "Data saved successfully",
        data: saveData,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Failed to save project",
      });
    }
  } catch (e) {
    return NextResponse.json({
      success: false,
      message: `Error: ${e.message}`,
    });
  }
}
