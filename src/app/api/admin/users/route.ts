import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    return NextResponse.json({
      success: true,
      data: users
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 400 }
      );
    }
    
    const user = await User.create(body);
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      success: true,
      user: userResponse,
      message: "User created successfully"
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to create user" },
      { status: 500 }
    );
  }
}