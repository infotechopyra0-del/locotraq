// models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
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
  role: { type: String, default: 'user' }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);