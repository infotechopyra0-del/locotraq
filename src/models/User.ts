// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function(this: any): boolean { 
      return !this.provider || this.provider === 'credentials'; 
    }, 
    select: false 
  }, 
  phone: String,
  dateOfBirth: String,
  gender: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String
  },
  company: String,
  gstin: String,
  profileImage: String,
  cloudinaryPublicId: String,
  preferences: {
    newsletter: { type: Boolean, default: true },
    smsNotifications: { type: Boolean, default: true },
    orderUpdates: { type: Boolean, default: true }
  },
  role: { type: String, default: 'user' },
  isActive: { type: Boolean, default: true },
  emailVerified: { type: Boolean, default: false },
  provider: { type: String, default: 'credentials' } // 'credentials', 'google', 'facebook'
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);