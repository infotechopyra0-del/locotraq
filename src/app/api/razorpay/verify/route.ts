import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

interface VerifyPaymentRequest {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderData: {
    _id: string;
    orderNumber: string;
    total: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Runtime check for Razorpay credentials
    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, message: 'Payment gateway not configured' },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body: VerifyPaymentRequest = await request.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderData } = body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderData?._id) {
      return NextResponse.json(
        { success: false, message: 'Missing payment verification data' },
        { status: 400 }
      );
    }

    // Verify Razorpay signature
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET!;
    const body_string = razorpay_order_id + "|" + razorpay_payment_id;
    
    const expectedSignature = crypto
      .createHmac('sha256', razorpaySecret)
      .update(body_string.toString())
      .digest('hex');

    const isValidSignature = expectedSignature === razorpay_signature;

    if (!isValidSignature) {
      console.error('Payment signature verification failed:', {
        expected: expectedSignature,
        received: razorpay_signature,
        orderId: razorpay_order_id
      });
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      );
    }
    await dbConnect();
    const order = await Order.findById(orderData._id);
    
    if (!order) {
      return NextResponse.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }
    const user = await require('@/models/User').default.findOne({ email: session.user.email });
    if (!user || order.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized access to order' },
        { status: 403 }
      );
    }
    order.paymentStatus = 'paid';
    order.status = 'confirmed';
    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paidAt = new Date();

    await order.save();

    // Log successful payment for monitoring
    console.log('Payment verified successfully:', {
      orderId: order._id,
      orderNumber: order.orderNumber,
      userId: user._id,
      amount: order.total,
      paymentId: razorpay_payment_id
    });

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        total: order.total,
        status: order.status,
        paymentStatus: order.paymentStatus,
        paidAt: order.paidAt
      }
    });

  } catch (error: any) {
    console.error('Payment verification error:', error);
    
    // If order exists, mark payment as failed
    if (error.orderData?._id) {
      try {
        await dbConnect();
        await Order.findByIdAndUpdate(error.orderData._id, {
          paymentStatus: 'failed',
          status: 'pending'
        });
      } catch (updateError) {
        console.error('Failed to update order status:', updateError);
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Payment verification failed',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}