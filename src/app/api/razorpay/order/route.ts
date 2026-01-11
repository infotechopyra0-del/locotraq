import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';

// Initialize Razorpay with fallback values for build time
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'dummy_key_id',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'dummy_key_secret',
});

interface CreateOrderRequest {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  };
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
      country: string;
    };
  };
  orderSummary: {
    subtotal: number;
    tax: number;
    shippingCost: number;
    discount: number;
    total: number;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Runtime check for Razorpay credentials
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
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
    const body: CreateOrderRequest = await request.json();
    const { product, shippingAddress, orderSummary } = body;
    if (!product?.id || !product?.name || !product?.price || !shippingAddress?.firstName) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    const calculatedSubtotal = product.price * product.quantity;
    const calculatedTax = Math.round(calculatedSubtotal * 0.18);
    const calculatedShipping = calculatedSubtotal > 1000 ? 0 : 50;
    const calculatedTotal = calculatedSubtotal + calculatedTax + calculatedShipping - orderSummary.discount;
    if (Math.abs(calculatedTotal - orderSummary.total) > 1) {
      return NextResponse.json(
        { success: false, message: 'Price mismatch detected' },
        { status: 400 }
      );
    }
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const order = new Order({
      userId: user._id,
      orderNumber,
      items: [{
        productId: product.id,
        productName: product.name,
        productImage: product.image,
        price: product.price,
        quantity: product.quantity,
        subtotal: calculatedSubtotal
      }],
      shippingAddress: {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        email: shippingAddress.email,
        phone: shippingAddress.phone,
        street: shippingAddress.address.street,
        city: shippingAddress.address.city,
        state: shippingAddress.address.state,
        pincode: shippingAddress.address.pincode,
        country: shippingAddress.address.country
      },
      subtotal: calculatedSubtotal,
      tax: calculatedTax,
      shippingCost: calculatedShipping,
      discount: orderSummary.discount,
      total: calculatedTotal,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: 'online'
    });

    const savedOrder = await order.save();

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(calculatedTotal * 100),
      currency: 'INR',
      receipt: orderNumber,
      notes: {
        orderId: savedOrder._id.toString(),
        userId: user._id.toString(),
        productName: product.name
      }
    });

    return NextResponse.json({
      success: true,
      order: razorpayOrder,
      dbOrder: {
        _id: savedOrder._id,
        orderNumber: savedOrder.orderNumber,
        total: savedOrder.total
      }
    });

  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to create order',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}
