import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPromo extends Document {
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  maxDiscount?: number;
  minPurchase?: number;
  validFrom?: Date;
  validUntil?: Date;
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromoSchema = new Schema<IPromo>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0
  },
  maxDiscount: {
    type: Number,
    min: 0
  },
  minPurchase: {
    type: Number,
    min: 0,
    default: 0
  },
  validFrom: {
    type: Date
  },
  validUntil: {
    type: Date
  },
  usageLimit: {
    type: Number,
    min: 0
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Promo: Model<IPromo> = mongoose.models.Promo || mongoose.model<IPromo>('Promo', PromoSchema);

export default Promo;