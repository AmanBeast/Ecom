import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET() {
  const bookings = dataService.getBookings();
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.workspaceId || !body.bookingDate || !body.durationDays) {
      return NextResponse.json(
        { success: false, error: "Missing workspaceId, bookingDate, or durationDays" },
        { status: 400 }
      );
    }

    const booking = dataService.createBooking({
      workspaceId: body.workspaceId,
      bookingDate: body.bookingDate,
      durationDays: Number(body.durationDays),
    });

    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || "Failed to create booking" },
      { status: 500 }
    );
  }
}
