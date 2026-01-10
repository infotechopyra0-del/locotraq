import Promo from '@/models/Promo';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Cart from '@/models/Cart';


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { promoCode } = body;

    if (!promoCode) {
      return NextResponse.json(
        { success: false, message: 'Promo code is required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const promo = await Promo.findOne({ 
      code: promoCode.toUpperCase(),
      isActive: true
    });

    if (!promo) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired promo code' },
        { status: 404 }
      );
    }

    // Check validity dates
    const now = new Date();
    if (promo.validFrom && promo.validFrom > now) {
      return NextResponse.json(
        { success: false, message: 'Promo code is not yet valid' },
        { status: 400 }
      );
    }

    if (promo.validUntil && promo.validUntil < now) {
      return NextResponse.json(
        { success: false, message: 'Promo code has expired' },
        { status: 400 }
      );
    }

    // Check usage limit
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return NextResponse.json(
        { success: false, message: 'Promo code usage limit reached' },
        { status: 400 }
      );
    }

    // Get cart to check minimum purchase
    const cart = await Cart.findOne({ userId: session.user.id });
    
    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Cart is empty' },
        { status: 400 }
      );
    }

    if (promo.minPurchase && cart.totalAmount < promo.minPurchase) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Minimum purchase of ₹${promo.minPurchase} required for this promo code` 
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Promo code applied successfully',
      promo: {
        code: promo.code,
        discountType: promo.discountType,
        discountValue: promo.discountValue,
        maxDiscount: promo.maxDiscount,
        description: promo.description
      }
    });

  } catch (error: any) {
    console.error('Promo Code Error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to apply promo code', error: error.message },
      { status: 500 }
    );
  }
}
