import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IWishlistItem {
  productId: string; // Changed to string to work with static products
  addedAt: Date;
  priceWhenAdded: number;
}

export interface IWishlist extends Document {
  userId: mongoose.Types.ObjectId;
  items: IWishlistItem[];
  totalItems: number;
  createdAt: Date;
  updatedAt: Date;
}

const WishlistItemSchema = new Schema<IWishlistItem>({
  productId: {
    type: String, // Changed to String to work with static products
    required: true
  },
  addedAt: {
    type: Date,
    default: Date.now
  },
  priceWhenAdded: {
    type: Number,
    required: true
  }
});

const WishlistSchema = new Schema<IWishlist>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  items: [WishlistItemSchema],
  totalItems: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Update totalItems before saving
WishlistSchema.pre('save', function() {
  this.totalItems = this.items.length;
});

// Static method to find or create wishlist
WishlistSchema.statics.findOrCreate = async function(userId: string) {
  let wishlist = await this.findOne({ userId });
  if (!wishlist) {
    wishlist = await this.create({ userId, items: [] });
  }
  return wishlist;
};

const Wishlist: Model<IWishlist> = mongoose.models.Wishlist || mongoose.model<IWishlist>('Wishlist', WishlistSchema);

export default Wishlist;