import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET() {
  const orders = dataService.getOrders();
  return NextResponse.json({ success: true, data: orders });
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

    const order = dataService.createOrder(body.productId);
    return NextResponse.json({ success: true, data: order }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to place order" },
      { status: 500 }
    );
  }
}
