import connectToDB from "@/database";
import Home from "@/models/Home";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    console.log('API Route: Attempting to connect to database...');
    await connectToDB();
    
    console.log('API Route: Fetching home data...');
    const extractData = await Home.find({});
    console.log('API Route: Found data:', extractData?.length || 0, 'records');

    return NextResponse.json({
      success: true,
      data: extractData || [],
    });
  } catch (e) {
    console.error('API Route Error:', e.message);
    console.error('Full error:', e);

    return NextResponse.json({
      success: false,
      message: `Database error: ${e.message}`,
    });
  }
}
