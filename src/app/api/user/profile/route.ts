import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email }).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ').slice(1).join(' ') || '',
        email: user.email,
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        address: {
          street: user.address?.street || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || '',
          country: user.address?.country || ''
        },
        company: user.company || '',
        gstin: user.gstin || '',
        profileImage: user.profileImage || '',
        cloudinaryPublicId: user.cloudinaryPublicId || '',
        preferences: {
          newsletter: user.preferences?.newsletter ?? true,
          smsNotifications: user.preferences?.smsNotifications ?? true,
          orderUpdates: user.preferences?.orderUpdates ?? true
        }
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get session from NextAuth
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();

    await dbConnect();

    // Update user profile
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          dateOfBirth: body.dateOfBirth,
          gender: body.gender,
          address: body.address,
          company: body.company,
          gstin: body.gstin,
          preferences: body.preferences,
          // Update name field for consistency
          name: `${body.firstName} ${body.lastName}`.trim()
        }
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}