// Entity interfaces for the application

export interface ClientLogos {
  id: string;
  _id?: string; // For compatibility
  name: string;
  clientName?: string; // For compatibility
  logoUrl: string;
  clientLogo?: string; // For compatibility
  altText?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientTestimonials {
  id: string;
  _id?: string; // For compatibility
  name: string;
  customerName?: string; // For compatibility
  company: string;
  customerCompany?: string; // For compatibility
  position?: string;
  customerRole?: string; // For compatibility
  testimonial: string;
  testimonialText?: string; // For compatibility
  rating: number;
  avatarUrl?: string;
  customerPhoto?: string; // For compatibility
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrackingServices {
  id: string;
  _id?: string; // For compatibility
  name: string;
  serviceName?: string; // For compatibility
  description: string;
  shortDescription?: string;
  tagline?: string; // For compatibility
  icon: string;
  serviceIcon?: string; // For compatibility
  features: string[];
  keyFeatures?: string; // For compatibility
  targetAudience?: string; // For compatibility
  callToActionUrl?: string; // For compatibility
  pricing?: {
    basic: number;
    premium: number;
    enterprise: number;
  };
  isActive: boolean;
  category: 'fleet' | 'asset' | 'personal' | 'cargo';
  createdAt: Date;
  updatedAt: Date;
}

export interface GPSProducts {
  id: string;
  _id?: string; // For compatibility
  name: string;
  productName?: string; // For compatibility
  description: string;
  shortDescription?: string;
  imageUrl: string;
  productImage?: string; // For compatibility
  imageAlt?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  features: string[];
  specifications: Record<string, string>;
  category: string;
  subcategory?: string;
  isActive: boolean;
  isFeatured: boolean;
  inStock: boolean;
  stockQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IndustriesServed {
  id: string;
  name: string;
  description: string;
  shortDescription?: string;
  icon: string;
  imageUrl: string;
  benefits: string[];
  useCases: string[];
  relatedProducts: string[];
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPosts {
  id: string;
  _id?: string; // For compatibility
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImageUrl: string;
  featuredImage?: string; // For compatibility
  featuredImageAlt?: string;
  author: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  tags: string[];
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  metaDescription?: string; // For compatibility
  publishedAt: Date;
  publicationDate?: Date; // For compatibility
  _createdDate?: Date; // For compatibility
  createdAt: Date;
  updatedAt: Date;
}