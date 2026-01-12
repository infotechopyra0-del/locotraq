import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Quote from '@/models/Quote';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const data = await req.json();

    // Map the form data to our Quote schema
    const quote = new Quote({
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company || '',
      services: data.trackingType ? [data.trackingType] : [], 
      budget: data.budget || '',
      timeline: data.timeline || '',
      description: data.message || 'No description provided',
      additional_info: [
        data.industry ? `Industry: ${data.industry}` : '',
        data.numberOfDevices ? `Devices: ${data.numberOfDevices}` : '',
        data.additionalServices ? `Additional Services: ${data.additionalServices}` : ''
      ].filter(Boolean).join(', '),
      status: 'pending',
      priority: 'medium',
    });

    const savedQuote = await quote.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request saved successfully',
      quoteId: savedQuote._id 
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}