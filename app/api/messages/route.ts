import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.conversationId || !body.content) {
      return NextResponse.json(
        { success: false, error: "Missing conversationId or content" },
        { status: 400 }
      );
    }

    const msg = dataService.sendMessage(body.conversationId, body.content);
    return NextResponse.json({ success: true, data: msg }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to send message" },
      { status: 500 }
    );
  }
}
