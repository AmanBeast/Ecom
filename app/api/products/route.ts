import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query") || undefined;
  const category = searchParams.get("category") || undefined;
  const condition = searchParams.get("condition") || undefined;
  const sort = (searchParams.get("sort") as any) || undefined;

  const products = dataService.getProducts({ query, category, condition, sort });
  return NextResponse.json({ success: true, data: products });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: true, message: "Product listed successfully" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid payload" },
      { status: 400 }
    );
  }
}
