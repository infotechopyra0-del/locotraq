import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Quote from '@/models/Quote';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const quote = await Quote.findById(id);

    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const data = await req.json();

    const quote = await Quote.findByIdAndUpdate(
      id,
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        services: data.services,
        budget: data.budget,
        timeline: data.timeline,
        description: data.description,
        additional_info: data.additional_info,
        status: data.status,
        priority: data.priority,
        adminNotes: data.adminNotes,
        quotedAmount: data.quotedAmount,
      },
      { new: true, runValidators: true }
    );

    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(quote, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update quote' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    await dbConnect();

    const quote = await Quote.findByIdAndDelete(id);

    if (!quote) {
      return NextResponse.json(
        { success: false, error: 'Quote not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Quote deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete quote' },
      { status: 500 }
    );
  }
}