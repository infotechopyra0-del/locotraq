import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Quote from '@/models/Quote';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    await dbConnect();
    const quotes = await Quote.find({}).sort({ createdAt: -1 });
    return NextResponse.json(quotes, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();
    const data = await req.json();

    const quote = new Quote({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      services: data.services,
      budget: data.budget,
      timeline: data.timeline,
      description: data.description,
      additional_info: data.additional_info,
      status: data.status || 'pending',
      priority: data.priority || 'medium',
      adminNotes: data.adminNotes,
      quotedAmount: data.quotedAmount,
    });
    await quote.save();
    return NextResponse.json(quote, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create quote' },
      { status: 500 }
    );
  }
}