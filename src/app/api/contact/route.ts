import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await req.json();
    const { name, email, phone, subject, message, inquiryType } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide all required fields (name, email, subject, message)' 
        },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Please provide a valid email address' 
        },
        { status: 400 }
      );
    }

    // Create new contact entry
    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      subject: subject.trim(),
      message: message.trim(),
      inquiryType: inquiryType || 'general',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will get back to you soon.',
        data: {
          id: contact._id,
          name: contact.name,
          email: contact.email,
        },
      },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Contact form submission error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit contact form. Please try again.',
      },
      { status: 500 }
    );
  }
}
