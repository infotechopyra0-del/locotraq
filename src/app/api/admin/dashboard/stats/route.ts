import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import Product from "@/models/Product";
import Order from "@/models/Order";
import Quote from "@/models/Quote";
import Contact from "@/models/Contact"; 

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const [
      totalUsers,
      totalProducts,
      totalOrders,
      totalQuotes,
      totalContacts,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Quote.countDocuments(),
      Contact.countDocuments(),
    ]);

    return NextResponse.json({
      totalUsers,
      totalProducts,
      totalOrders,
      totalQuotes,
      totalContacts,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard statistics" },
      { status: 500 }
    );
  }
}