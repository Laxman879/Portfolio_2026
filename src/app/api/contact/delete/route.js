import connectToDB from "@/database";
import Contact from "@/models/Contact";
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
        message: "Contact ID is required",
      });
    }

    const deletedContact = await Contact.findByIdAndDelete(id);

    if (deletedContact) {
      return NextResponse.json({
        success: true,
        message: "Contact message deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Contact message not found",
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