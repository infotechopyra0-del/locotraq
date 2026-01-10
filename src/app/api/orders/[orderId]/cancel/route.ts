import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const { reason } = await req.json();
    const { orderId } = await params;

    // Find user
    const User = (await import('@/models/User')).default;
    const user = await User.findOne({ email: session.user.email });

    // Find order
    const order = await Order.findOne({
      _id: orderId,
      userId: user._id
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    // Check if order can be cancelled
    if (['delivered', 'cancelled', 'refunded'].includes(order.status)) {
      return NextResponse.json(
        { success: false, message: 'Order cannot be cancelled' },
        { status: 400 }
      );
    }

    // Update order
    order.status = 'cancelled';
    order.cancellationReason = reason;
    await order.save();

    return NextResponse.json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });

  } catch (error: any) {
    console.error('Cancel order error:', error);
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to cancel order' },
      { status: 500 }
    );
  }
}