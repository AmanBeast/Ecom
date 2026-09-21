import { NextResponse } from "next/server";
import { dataService } from "@/lib/services/dataService";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = dataService.getProductById(params.id);
  if (!product) {
    return NextResponse.json(
      { success: false, error: "Product not found" },
      { status: 404 }
    );
  }

  // Double check privacy requirement: Never return phone numbers
  const safeProduct = {
    ...product,
    seller: {
      id: product.seller.id,
      name: product.seller.name,
      avatar: product.seller.avatar,
      verified: product.seller.verified,
      joinedYear: product.seller.joinedYear,
      rating: product.seller.rating,
      reviewCount: product.seller.reviewCount,
      salesCount: product.seller.salesCount,
      responseTime: product.seller.responseTime,
    },
  };

  return NextResponse.json({ success: true, data: safeProduct });
}
