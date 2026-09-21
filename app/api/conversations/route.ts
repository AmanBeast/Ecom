import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET() {
  const conversations = dataService.getConversations();
  return NextResponse.json({ success: true, data: conversations });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.productId) {
      return NextResponse.json(
        { success: false, error: "Missing productId" },
        { status: 400 }
      );
    }
    const conv = dataService.startConversationWithSeller(body.productId, body.initialText);
    return NextResponse.json({ success: true, data: conv }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to start conversation" },
      { status: 500 }
    );
  }
}
