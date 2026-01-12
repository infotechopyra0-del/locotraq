import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  productName: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  productImage: string;
  images: string[];
  imageUrl: string;
  imageAlt: string;
  features: string[];
  specifications: { [key: string]: string };
  isActive: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  slug: string;
  tags: string[];
  sku?: string;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  warranty?: string;
  brand?: string;
  manufacturer?: string;
  views: number;
  salesCount: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [200, 'Product name cannot exceed 200 characters']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  shortDescription: {
    type: String,
    required: [true, 'Short description is required'],
    trim: true,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: function(value: number) {
        return value >= 0;
      },
      message: 'Price must be a positive number'
    }
  },
  originalPrice: {
    type: Number,
    required: [true, 'Original price is required'],
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['Vehicle', 'Personal', 'Fleet', 'Industrial', 'Pet', 'Asset'],
      message: '{VALUE} is not a valid category'
    },
    index: true
  },
  subcategory: {
    type: String,
    required: [true, 'Subcategory is required'],
    trim: true,
    index: true
  },
  productImage: {
    type: String,
    required: [true, 'Product image is required'],
    trim: true
  },
  images: {
    type: [String],
    default: [],
    validate: {
      validator: function(images: string[]) {
        return images.length > 0;
      },
      message: 'At least one image is required'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true
  },
  imageAlt: {
    type: String,
    required: [true, 'Image alt text is required'],
    trim: true,
    maxlength: [200, 'Image alt text cannot exceed 200 characters']
  },
  features: {
    type: [String],
    default: [],
    validate: {
      validator: function(features: string[]) {
        return features.length > 0;
      },
      message: 'At least one feature is required'
    }
  },
  specifications: {
    type: Map,
    of: String,
    default: {},
    required: [true, 'Specifications are required']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  },
  isFeatured: {
    type: Boolean,
    default: false,
    index: true
  },
  inStock: {
    type: Boolean,
    default: true,
    index: true
  },
  stockQuantity: {
    type: Number,
    required: [true, 'Stock quantity is required'],
    min: [0, 'Stock quantity cannot be negative'],
    default: 0
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    index: true
  },
  tags: {
    type: [String],
    default: [],
    index: true
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
    uppercase: true,
    trim: true
  },
  weight: {
    type: Number,
    min: [0, 'Weight cannot be negative']
  },
  dimensions: {
    length: {
      type: Number,
      min: [0, 'Length cannot be negative']
    },
    width: {
      type: Number,
      min: [0, 'Width cannot be negative']
    },
    height: {
      type: Number,
      min: [0, 'Height cannot be negative']
    },
    unit: {
      type: String,
      enum: ['cm', 'inch', 'mm'],
      default: 'cm'
    }
  },
  warranty: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    trim: true,
    default: 'Locotraq'
  },
  manufacturer: {
    type: String,
    trim: true
  },
  views: {
    type: Number,
    default: 0,
    min: [0, 'Views cannot be negative']
  },
  salesCount: {
    type: Number,
    default: 0,
    min: [0, 'Sales count cannot be negative']
  },
  metaTitle: {
    type: String,
    trim: true,
    maxlength: [60, 'Meta title cannot exceed 60 characters']
  },
  metaDescription: {
    type: String,
    trim: true,
    maxlength: [160, 'Meta description cannot exceed 160 characters']
  },
  metaKeywords: {
    type: [String],
    default: []
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


ProductSchema.index({ productName: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, subcategory: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ createdAt: -1 });
ProductSchema.index({ isFeatured: 1, isActive: 1 });
ProductSchema.index({ inStock: 1, isActive: 1 });


ProductSchema.virtual('discountPercentage').get(function(this: IProduct) {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Savings Amount
ProductSchema.virtual('savings').get(function(this: IProduct) {
  return this.originalPrice - this.price;
});

// Stock Status
ProductSchema.virtual('stockStatus').get(function(this: IProduct) {
  if (this.stockQuantity === 0) return 'Out of Stock';
  if (this.stockQuantity <= 5) return 'Low Stock';
  return 'In Stock';
});


ProductSchema.pre('save', function(this: IProduct) {
  if (this.isModified('productName') && !this.slug) {
    this.slug = this.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
});

ProductSchema.pre('save', function(this: IProduct) {
  if (this.originalPrice < this.price) {
    throw new Error('Original price must be greater than or equal to current price');
  }
});

ProductSchema.pre('save', function(this: IProduct) {
  this.inStock = this.stockQuantity > 0;
});

ProductSchema.pre('save', function(this: IProduct) {
  if (this.productImage && !this.images.includes(this.productImage)) {
    this.images.unshift(this.productImage);
  }
});

ProductSchema.pre('save', function(this: IProduct) {
  if (!this.imageUrl && this.productImage) {
    this.imageUrl = this.productImage;
  }
});

ProductSchema.pre('save', function(this: IProduct) {
  if (!this.metaTitle) {
    this.metaTitle = `${this.productName} - Locotraq GPS Tracking`;
  }
});

ProductSchema.pre('save', function(this: IProduct) {
  if (!this.metaDescription) {
    this.metaDescription = this.shortDescription;
  }
});

ProductSchema.statics.findActive = function() {
  return this.find({ isActive: true, inStock: true });
};


ProductSchema.statics.search = function(query: string) {
  return this.find(
    { 
      $text: { $search: query },
      isActive: true 
    },
    { score: { $meta: 'textScore' } }
  ).sort({ score: { $meta: 'textScore' } });
};

ProductSchema.statics.getBestSellers = function(limit = 10) {
  return this.find({ isActive: true, inStock: true })
    .sort({ salesCount: -1 })
    .limit(limit);
};


// Get new arrivals
ProductSchema.statics.getNewArrivals = function(limit = 10) {
  return this.find({ isActive: true, inStock: true })
    .sort({ createdAt: -1 })
    .limit(limit);
};

// Get products on sale
ProductSchema.statics.getOnSale = function(limit = 10) {
  return this.find({ 
    isActive: true, 
    inStock: true,
    $expr: { $lt: ['$price', '$originalPrice'] }
  })
  .sort({ createdAt: -1 })
  .limit(limit);
};

// ============================================
// INSTANCE METHODS
// ============================================

// Increment view count
ProductSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Increment sales count
ProductSchema.methods.incrementSales = function(quantity = 1) {
  this.salesCount += quantity;
  return this.save();
};

ProductSchema.methods.decreaseStock = function(quantity: number) {
  if (this.stockQuantity >= quantity) {
    this.stockQuantity -= quantity;
    this.inStock = this.stockQuantity > 0;
    return this.save();
  }
  throw new Error('Insufficient stock');
};

ProductSchema.methods.increaseStock = function(quantity: number) {
  this.stockQuantity += quantity;
  this.inStock = true;
  return this.save();
};


// Check if product is available
ProductSchema.methods.isAvailable = function(requestedQuantity = 1) {
  return this.isActive && this.inStock && this.stockQuantity >= requestedQuantity;
};

// ============================================
// Export Model
// ============================================
const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

// ============================================
// TYPE DEFINITIONS for TypeScript
// ============================================
export interface IProductCreate {
  productName: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  productImage: string;
  images: string[];
  imageAlt: string;
  features: string[];
  specifications: { [key: string]: string };
  stockQuantity: number;
  isFeatured?: boolean;
  isActive?: boolean;
  tags?: string[];
  sku?: string;
  weight?: number;
  warranty?: string;
  brand?: string;
}

export interface IProductUpdate {
  productName?: string;
  description?: string;
  shortDescription?: string;
  price?: number;
  originalPrice?: number;
  category?: string;
  subcategory?: string;
  productImage?: string;
  images?: string[];
  features?: string[];
  specifications?: { [key: string]: string };
  stockQuantity?: number;
  isActive?: boolean;
  isFeatured?: boolean;
  tags?: string[];
}

export interface IProductFilter {
  category?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  isFeatured?: boolean;
  search?: string;
  tags?: string[];
}