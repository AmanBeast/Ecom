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
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    // Return mock success
    return NextResponse.json({ success: true, message: "Workspace created" }, { status: 201 });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}
