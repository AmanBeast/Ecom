import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;
  const city = searchParams.get("city") || undefined;
  const type = searchParams.get("type") || undefined;
  const maxPriceStr = searchParams.get("maxPrice");
  const maxPrice = maxPriceStr ? parseInt(maxPriceStr, 10) : undefined;

  const workspaces = dataService.getWorkspaces({ query, city, type, maxPrice });
  return NextResponse.json({ success: true, data: workspaces });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate required fields
    if (!body.title || !body.dailyPrice || !body.location) {
      return NextResponse.json(
        { success: false, error: "Missing required fields (title, dailyPrice, location)" },
        { status: 400 }
      );
    }
    const newWs = dataService.createWorkspace(body);
    return NextResponse.json({ success: true, data: newWs }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Invalid payload" },
      { status: 400 }
    );
  }
}
