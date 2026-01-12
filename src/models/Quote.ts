import mongoose, { Schema, Document } from 'mongoose';

export interface IQuote extends Document {
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget: string;
  timeline: string;
  description: string;
  additional_info?: string;
  status: 'pending' | 'reviewing' | 'quoted' | 'accepted' | 'rejected' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  adminNotes?: string;
  quotedAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuoteSchema = new Schema<IQuote>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    services: {
      type: [String],
      required: [true, 'At least one service is required'],
      default: [],
    },
    budget: {
      type: String,
      required: [true, 'Budget is required'],
      trim: true,
    },
    timeline: {
      type: String,
      required: [true, 'Timeline is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      default: '',
    },
    additional_info: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewing', 'quoted', 'accepted', 'rejected', 'completed'],
      default: 'pending',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    adminNotes: {
      type: String,
      trim: true,
    },
    quotedAmount: {
      type: Number,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better performance
QuoteSchema.index({ email: 1 });
QuoteSchema.index({ status: 1 });
QuoteSchema.index({ priority: 1 });
QuoteSchema.index({ createdAt: -1 });

const Quote = mongoose.models.Quote || mongoose.model<IQuote>('Quote', QuoteSchema);

export default Quote;