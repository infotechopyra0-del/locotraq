import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
  addedAt: Date;
}

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  userEmail: string;
  items: ICartItem[];
  totalAmount: number;
  totalItems: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
});

const CartSchema = new Schema<ICart>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userEmail: {
    type: String,
    required: true,
    index: true
  },
  items: [CartItemSchema],
  totalAmount: {
    type: Number,
    default: 0
  },
  totalItems: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

CartSchema.pre('save', function() {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalAmount = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
});

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;