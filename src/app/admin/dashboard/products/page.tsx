"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
  Trash2,
  Edit,
  Calendar,
  AlertTriangle,
  Plus,
  X,
  Save,
  Upload,
  Package,
  Tag,
  DollarSign,
  TrendingUp,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface IProduct {
  _id?: string;
  id?: string;
  productName: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice: number;
  category: string;
  subcategory: string;
  rating: number;
  reviewCount: number;
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
  warranty?: string;
  brand?: string;
  views: number;
  salesCount: number;
  createdAt?: string;
  updatedAt?: string;
}

const categories = ["Vehicle", "Personal", "Fleet", "Industrial", "Pet", "Asset"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Partial<IProduct>>({
    productName: "",
    name: "",
    description: "",
    shortDescription: "",
    price: 0,
    originalPrice: 0,
    category: "Vehicle",
    subcategory: "",
    rating: 0,
    reviewCount: 0,
    productImage: "",
    images: [],
    imageUrl: "",
    imageAlt: "",
    features: [],
    specifications: {},
    isActive: true,
    isFeatured: false,
    inStock: true,
    stockQuantity: 0,
    tags: [],
    brand: "Locotraq",
    warranty: "",
  });
  const [featureInput, setFeatureInput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const loadToastShownRef = useRef(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (opts: { forceToast?: boolean } = {}) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/products", {
        credentials: "include",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : data.data || []);
      if (!loadToastShownRef.current || opts.forceToast) {
        loadToastShownRef.current = true;
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<{ url: string; public_id: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) throw new Error("Image upload failed");
    const data = await res.json();
    return { url: data.url, public_id: data.public_id };
  };

  const deleteFromCloudinary = async (publicId: string) => {
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_id: publicId }),
      });
    } catch (error) {
      console.error("Error deleting from Cloudinary:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }
    
    setImageFile(file);
    
    // Create preview immediately
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setCurrentProduct({ 
        ...currentProduct, 
        productImage: imageDataUrl
      });
    };
    reader.readAsDataURL(file);
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.some(f => f.size > 5 * 1024 * 1024)) {
      toast.error("All images must be less than 5MB");
      return;
    }
    setAdditionalImages(files);
  };

  const handleSaveProduct = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!currentProduct.productName?.trim()) {
      toast.error("Product name is required");
      return;
    }
    
    if (!currentProduct.category?.trim()) {
      toast.error("Category is required");
      return;
    }
    
    if (!currentProduct.subcategory?.trim()) {
      toast.error("Subcategory is required");
      return;
    }
    
    if (!currentProduct.shortDescription?.trim()) {
      toast.error("Short description is required");
      return;
    }
    
    if (!currentProduct.description?.trim()) {
      toast.error("Full description is required");
      return;
    }
    
    if (!currentProduct.price || currentProduct.price <= 0) {
      toast.error("Valid price is required");
      return;
    }
    
    if (!currentProduct.originalPrice || currentProduct.originalPrice <= 0) {
      toast.error("Valid original price is required");
      return;
    }
    
    if (!currentProduct.stockQuantity || currentProduct.stockQuantity < 0) {
      toast.error("Stock quantity must be 0 or greater");
      return;
    }
    
    if (!currentProduct.brand?.trim()) {
      toast.error("Brand is required");
      return;
    }
    
    if (!currentProduct.features || currentProduct.features.length === 0) {
      toast.error("At least one feature is required");
      return;
    }
    
    if (!currentProduct.specifications || Object.keys(currentProduct.specifications).length === 0) {
      toast.error("At least one specification is required");
      return;
    }

    const isEdit = !!(currentProduct._id || currentProduct.id);
    if (!isEdit && !imageFile && !currentProduct.productImage) {
      toast.error("Product image is required");
      return;
    }

    try {
      let uploadedImage = currentProduct.productImage;
      let uploadedImages = currentProduct.images || [];

      if (imageFile) {
        const imgData = await uploadToCloudinary(imageFile);
        uploadedImage = imgData.url;
      }

      if (additionalImages.length > 0) {
        const imgUploads = await Promise.all(
          additionalImages.map(file => uploadToCloudinary(file))
        );
        uploadedImages = imgUploads.map(img => img.url);
      }

      const isEdit = !!(currentProduct._id || currentProduct.id);
      const url = isEdit
        ? `/api/admin/products/${currentProduct._id ?? currentProduct.id}`
        : "/api/admin/products";
      const method = isEdit ? "PUT" : "POST";

      const payload = {
        ...currentProduct,
        productImage: uploadedImage,
        images: uploadedImages.length > 0 ? uploadedImages : [uploadedImage],
        imageUrl: uploadedImage,
        imageAlt: currentProduct.imageAlt || currentProduct.productName || 'Product image',
        name: currentProduct.productName,
        stockQuantity: Math.max(0, currentProduct.stockQuantity || 0),
        features: currentProduct.features || [],
        price: Number(currentProduct.price) || 0,
        originalPrice: Number(currentProduct.originalPrice) || Number(currentProduct.price) || 0,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let errorMessage = "Failed to save product";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || `Server error: ${res.status} ${res.statusText}`;
        } catch {
          errorMessage = `Server error: ${res.status} ${res.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const savedProduct = await res.json();
      
      // Update products state with the saved product
      setProducts(prev =>
        isEdit
          ? prev.map(p => (p._id === savedProduct._id ? savedProduct : p))
          : [savedProduct, ...prev]
      );

      // Force refresh the products list to ensure images are updated
      setTimeout(() => {
        fetchProducts();
      }, 500);

      setEditDialogOpen(false);
      setAddDialogOpen(false);
      setImageFile(null);
      setAdditionalImages([]);
      setCurrentProduct({
        productName: "",
        name: "",
        description: "",
        shortDescription: "",
        price: 0,
        originalPrice: 0,
        category: "Vehicle",
        subcategory: "",
        rating: 0,
        reviewCount: 0,
        productImage: "",
        images: [],
        imageUrl: "",
        imageAlt: "",
        features: [],
        specifications: {},
        isActive: true,
        isFeatured: false,
        inStock: true,
        stockQuantity: 0,
        tags: [],
        brand: "Locotraq",
        warranty: "",
      });
      
      toast.success(isEdit ? "Product updated successfully!" : "Product added successfully!");
    } catch (error) {
      console.error("Error saving product:", error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save product. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    try {
      const product = products.find(p => (p._id ?? p.id) === productToDelete);
      
      const res = await fetch(`/api/admin/products/${productToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      if (product?.productImage) {
        const publicId = product.productImage.split("/").pop()?.split(".")[0];
        if (publicId) await deleteFromCloudinary(publicId);
      }

      setProducts(prev => prev.filter(p => (p._id ?? p.id) !== productToDelete));
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const addFeature = () => {
    if (!featureInput.trim()) return;
    setCurrentProduct({
      ...currentProduct,
      features: [...(currentProduct.features ?? []), featureInput.trim()],
    });
    setFeatureInput("");
  };

  const removeFeature = (feature: string) => {
    setCurrentProduct({
      ...currentProduct,
      features: currentProduct.features?.filter(f => f !== feature) ?? [],
    });
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setCurrentProduct({
      ...currentProduct,
      tags: [...(currentProduct.tags ?? []), tagInput.trim()],
    });
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setCurrentProduct({
      ...currentProduct,
      tags: currentProduct.tags?.filter(t => t !== tag) ?? [],
    });
  };

  const addSpecification = () => {
    if (!specKey.trim() || !specValue.trim()) return;
    setCurrentProduct({
      ...currentProduct,
      specifications: {
        ...(currentProduct.specifications ?? {}),
        [specKey.trim()]: specValue.trim(),
      },
    });
    setSpecKey("");
    setSpecValue("");
  };

  const removeSpecification = (key: string) => {
    const specs = { ...(currentProduct.specifications ?? {}) };
    delete specs[key];
    setCurrentProduct({ ...currentProduct, specifications: specs });
  };

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (product: IProduct) => {
    setCurrentProduct(product);
    setImageFile(null);
    setAdditionalImages([]);
    setEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setCurrentProduct({
      productName: "",
      name: "",
      description: "",
      shortDescription: "",
      price: 0,
      originalPrice: 0,
      category: "Vehicle",
      subcategory: "",
      rating: 0,
      reviewCount: 0,
      productImage: "",
      images: [],
      imageUrl: "",
      imageAlt: "",
      features: [],
      specifications: {},
      isActive: true,
      isFeatured: false,
      inStock: true,
      stockQuantity: 0,
      tags: [],
      brand: "Locotraq",
      warranty: "",
    });
    setImageFile(null);
    setAdditionalImages([]);
    setAddDialogOpen(true);
  };

  const filteredProducts = products.filter(p => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      p.productName?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q) ||
      p.tags?.some(tag => tag.toLowerCase().includes(q));
    return filterCategory === "all"
      ? matchesSearch
      : matchesSearch && p.category === filterCategory;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.isActive).length;
  const outOfStock = products.filter(p => !p.inStock).length;

  return (
    <>
      <style jsx global>{`
        /* Hide scrollbars globally for entire page */
        html {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        html::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        
        body {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
        
        body::-webkit-scrollbar {
          display: none; /* Safari and Chrome */
        }
        
        /* Hide all scrollbars globally */
        *::-webkit-scrollbar {
          width: 0px;
          height: 0px;
          background: transparent;
        }
        
        * {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
      `}</style>
      <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-800 flex items-center">
                Products Management
                <ShoppingBag className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">
                Manage all products and inventory 🛒
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="mt-34 sm:mt-26 p-4 sm:p-6 lg:p-8 relative z-10">
        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 relative overflow-hidden group">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-orange-900 flex items-center">
                <ShoppingBag className="mr-2 text-orange-600" size={24} />
                All Products
                <Sparkles className="ml-2 text-amber-500" size={20} />
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddClick}
                  className="flex-1 sm:flex-none bg-linear-to-r from-green-600 to-green-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Plus size={16} className="sm:w-4.5 sm:h-4.5" />
                  <span>Add Product</span>
                </button>

                <button
                  onClick={() => fetchProducts({ forceToast: true })}
                  className="flex-1 sm:flex-none bg-linear-to-r from-orange-600 to-orange-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Zap size={16} className="sm:w-4.5 sm:h-4.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Search Products
                </label>
                <input
                  type="text"
                  placeholder="Product name, description, tags..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-semibold"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-amber-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all duration-300 font-semibold"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm sm:text-base">
                  Loading products...
                </p>
              </div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4">
                  🛒
                </div>
                <p className="text-lg sm:text-xl font-black text-gray-900 mb-2">
                  No Products Found
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-semibold px-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : 'Click "Add Product" to create your first product'}
                </p>
              </div>
            )}

            {/* RESPONSIVE PRODUCT VIEWS */}
            {!loading && filteredProducts.length > 0 && (
              <>
                {/* MOBILE VIEW (Cards) */}
                <div className="block md:hidden space-y-4">
                  {filteredProducts.map((product, index) => {
                    const pid = product.id ?? product._id ?? `product-${index}`;
                    return (
                      <div
                        key={pid}
                        className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={`${product.productImage}${product.productImage?.includes('?') ? '&' : '?'}t=${Date.now()}`}
                            alt={product.productName}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1 flex-wrap">
                            {product.isFeatured && (
                              <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                                <Star size={10} className="mr-1" />
                                Featured
                              </span>
                            )}
                            {!product.inStock && (
                              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-black text-base text-gray-900 mb-2">
                              {product.productName}
                            </h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                                {product.category}
                              </span>
                              <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                {product.isActive ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-lg font-black text-orange-600">₹{product.price.toLocaleString('en-IN')}</p>
                              {product.originalPrice > product.price && (
                                <p className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600">Stock: <span className="font-bold">{product.stockQuantity}</span></p>
                              <p className="text-xs text-gray-600">Sales: <span className="font-bold">{product.salesCount || 0}</span></p>
                            </div>
                          </div>

                          <div className="flex gap-2 pt-2 border-t border-amber-200">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                            >
                              <Edit size={14} />
                              <span className="text-xs">Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(pid)}
                              className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* TABLET VIEW */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredProducts.map((product, index) => {
                      const pid = product.id ?? product._id ?? `product-${index}`;
                      return (
                        <div
                          key={pid}
                          className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 hover:shadow-xl transition-all duration-300 flex gap-4"
                        >
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden shrink-0">
                            <img
                              src={`${product.productImage}${product.productImage?.includes('?') ? '&' : '?'}t=${Date.now()}`}
                              alt={product.productName}
                              className="w-full h-full object-cover"
                            />
                            {product.isFeatured && (
                              <Star size={14} className="absolute top-1 right-1 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>

                          <div className="flex-1 space-y-2">
                            <div>
                              <h3 className="font-black text-lg text-gray-900">{product.productName}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                                  {product.category}
                                </span>
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                  {product.isActive ? "Active" : "Inactive"}
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2">{product.shortDescription}</p>

                            <div className="flex items-center justify-between pt-2">
                              <div>
                                <p className="text-xl font-black text-orange-600">₹{product.price.toLocaleString('en-IN')}</p>
                                {product.originalPrice > product.price && (
                                  <p className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                                )}
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditClick(product)}
                                  className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transition-all duration-300"
                                >
                                  <Edit size={16} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(pid)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* DESKTOP TABLE VIEW */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-linear-to-r from-orange-100 to-amber-100 border-b-4 border-orange-600">
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Image</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Product</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Category</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Price</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Stock</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Status</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Sales</th>
                        <th className="px-4 py-3 text-center font-black text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProducts.map((product, index) => {
                        const pid = product.id ?? product._id ?? `product-${index}`;
                        return (
                          <tr
                            key={pid}
                            className="border-b border-amber-200 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group/row"
                          >
                            <td className="px-4 py-3">
                              <div className="relative w-20 h-14 rounded-lg overflow-hidden shadow-md group-hover/row:shadow-xl transition-shadow duration-300">
                                <img
                                  src={`${product.productImage}${product.productImage?.includes('?') ? '&' : '?'}t=${Date.now()}`}
                                  alt={product.productName}
                                  className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-300"
                                />
                                {product.isFeatured && (
                                  <Star size={10} className="absolute top-0.5 right-0.5 text-yellow-500 fill-yellow-500" />
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <div className="max-w-xs">
                                <h3 className="font-black text-gray-900 text-sm mb-1">{product.productName}</h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{product.shortDescription}</p>
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700">
                                {product.category}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <div>
                                <p className="font-black text-orange-600">₹{product.price.toLocaleString('en-IN')}</p>
                                {product.originalPrice > product.price && (
                                  <p className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</p>
                                )}
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                <div className={`w-2 h-2 rounded-full mr-2 ${product.inStock ? "bg-green-500" : "bg-red-500"}`}></div>
                                {product.stockQuantity}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${product.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                                {product.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            <td className="px-4 py-3">
                              <span className="text-sm font-semibold text-gray-700">{product.salesCount || 0}</span>
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() => handleEditClick(product)}
                                  className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="Edit"
                                >
                                  <Edit size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(pid)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="Delete"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Product Dialog */}
      <AlertDialog open={addDialogOpen || editDialogOpen} onOpenChange={open => {
        setAddDialogOpen(open);
        setEditDialogOpen(open);
      }}>
        <AlertDialogContent className="bg-white border-2 border-orange-200 max-w-4xl max-h-[90vh] overflow-y-scroll scrollbar-hide">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-2xl font-black text-gray-900">
              {editDialogOpen ? (
                <Edit className="mr-2 text-orange-600" size={24} />
              ) : (
                <Plus className="mr-2 text-green-600" size={24} />
              )}
              {editDialogOpen ? "Edit Product" : "Add New Product"}
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Name *</label>
              <input
                type="text"
                value={currentProduct.productName}
                onChange={e => setCurrentProduct({ ...currentProduct, productName: e.target.value, name: e.target.value })}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Enter product name"
              />
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                <select
                  value={currentProduct.category}
                  onChange={e => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Subcategory *</label>
                <input
                  type="text"
                  value={currentProduct.subcategory}
                  onChange={e => setCurrentProduct({ ...currentProduct, subcategory: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="e.g., GPS Tracker"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Short Description *</label>
              <textarea
                value={currentProduct.shortDescription}
                onChange={e => setCurrentProduct({ ...currentProduct, shortDescription: e.target.value })}
                rows={2}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Brief product description"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Description *</label>
              <textarea
                value={currentProduct.description}
                onChange={e => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                placeholder="Detailed product description"
              />
            </div>

            {/* Price & Original Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price (₹) *</label>
                <input
                  type="text"
                  value={currentProduct.price}
                  onChange={e => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Enter price"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Original Price (₹) *</label>
                <input
                  type="text"
                  value={currentProduct.originalPrice}
                  onChange={e => setCurrentProduct({ ...currentProduct, originalPrice: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Enter original price"
                />
              </div>
            </div>

            {/* Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Stock Quantity *</label>
                <input
                  type="text"
                  value={currentProduct.stockQuantity}
                  onChange={e => setCurrentProduct({ ...currentProduct, stockQuantity: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Enter stock quantity"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand *</label>
                <input
                  type="text"
                  value={currentProduct.brand}
                  onChange={e => setCurrentProduct({ ...currentProduct, brand: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Locotraq"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Product Image *</label>
              <div className="space-y-3">
                {currentProduct.productImage && (
                  <div className="relative w-full h-56 rounded-xl overflow-hidden border-2 border-amber-200 shadow-md">
                    <img 
                      src={currentProduct.productImage.startsWith('data:') 
                        ? currentProduct.productImage 
                        : `${currentProduct.productImage}${currentProduct.productImage?.includes('?') ? '&' : '?'}t=${Date.now()}`
                      } 
                      alt="Preview" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs font-semibold">
                      Preview
                    </div>
                  </div>
                )}
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="hidden" 
                    id="product-image-upload"
                  />
                  <label 
                    htmlFor="product-image-upload" 
                    className="flex items-center justify-center px-6 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:scale-[1.02] border-2 border-blue-600 hover:border-blue-700"
                  >
                    <Upload size={20} className="mr-3" />
                    <span className="text-base">
                      {imageFile ? imageFile.name : "Choose Main Image"}
                    </span>
                  </label>
                </div>
                <div className="text-xs text-gray-500 text-center">
                  Supported formats: JPG, PNG, GIF (Max size: 5MB)
                </div>
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Features *</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={featureInput}
                  onChange={e => setFeatureInput(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && (e.preventDefault(), addFeature())}
                  className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Add a feature"
                />
                <button
                  type="button"
                  onClick={addFeature}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {currentProduct.features?.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold flex items-center gap-2">
                    {feature}
                    <X size={14} className="cursor-pointer" onClick={() => removeFeature(feature)} />
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Specifications *</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={specKey}
                  onChange={e => setSpecKey(e.target.value)}
                  className="w-1/3 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Key (e.g., Battery)"
                />
                <input
                  type="text"
                  value={specValue}
                  onChange={e => setSpecValue(e.target.value)}
                  onKeyPress={e => e.key === "Enter" && (e.preventDefault(), addSpecification())}
                  className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                  placeholder="Value (e.g., 5000mAh)"
                />
                <button
                  type="button"
                  onClick={addSpecification}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700"
                >
                  Add
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(currentProduct.specifications || {}).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg">
                    <span className="text-sm"><span className="font-bold">{key}:</span> {value}</span>
                    <X size={14} className="cursor-pointer text-red-600" onClick={() => removeSpecification(key)} />
                  </div>
                ))}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-3">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={currentProduct.isActive}
                  onChange={e => setCurrentProduct({ ...currentProduct, isActive: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-sm font-bold text-gray-700">Active Product</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={currentProduct.isFeatured}
                  onChange={e => setCurrentProduct({ ...currentProduct, isFeatured: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-sm font-bold text-gray-700">Featured Product</span>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={currentProduct.inStock}
                  onChange={e => setCurrentProduct({ ...currentProduct, inStock: e.target.checked })}
                  className="w-5 h-5"
                />
                <span className="text-sm font-bold text-gray-700">In Stock</span>
              </label>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setAddDialogOpen(false);
                setEditDialogOpen(false);
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg"
            >
              Cancel
            </AlertDialogCancel>
            <button
              type="button"
              onClick={(e) => handleSaveProduct(e)}
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-2 rounded-lg inline-flex items-center"
            >
              <Save size={16} className="mr-2" />
              Save Product
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete Product?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this product? This will also remove the image from Cloudinary. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-2 rounded-lg">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </>
  );
}