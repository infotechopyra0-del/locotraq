import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
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
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    inquiryType: {
      type: String,
      enum: ['general', 'sales', 'support', 'partnership', 'other'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'in-progress', 'resolved', 'closed'],
      default: 'new',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ inquiryType: 1 });

const Contact = mongoose.models.Contact || mongoose.model('Contact', contactSchema);

export default Contact;