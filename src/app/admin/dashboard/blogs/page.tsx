"use client";

import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Sparkles,
  Star,
  Zap,
  Trash2,
  Calendar,
  AlertTriangle,
  Plus,
  Edit,
  X,
  Save,
  Upload,
  Eye,
  Clock,
  Tag
} from "lucide-react";
import { toast } from "sonner";

interface Blog {
  _id?: string;
  id?: string;
  title: string;
  content: string;
  metaDescription: string;
  category: string;
  author: {
    name: string;
    email?: string;
    avatar?: string;
  };
  featuredImage: {
    url: string;
    public_id: string;
  } | string;
  slug: string;
  featured: boolean;
  published: boolean;
  publicationDate: string;
  views?: number;
  tags?: string[];
  readTime?: number;
  createdAt?: string;
  updatedAt?: string;
}

const categories = [
  "Fleet Management",
  "Personal Safety",
  "Business Solutions",
  "Product Guides",
  "Technology",
  "Industry News",
  "Case Studies",
  "Tips & Tricks"
];

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState<Partial<Blog>>({
    title: "",
    content: "",
    metaDescription: "",
    category: "Fleet Management",
    author: { name: "" },
    featuredImage: "",
    slug: "",
    featured: false,
    published: true,
    publicationDate: new Date().toISOString().split('T')[0],
    tags: []
  });
  const [tagInput, setTagInput] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const loadToastShownRef = React.useRef(false);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async (opts: { forceToast?: boolean } = {}) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/blogs", { 
        credentials: 'include', 
        headers: { 'Accept': 'application/json' } 
      });
      if (!res.ok) throw new Error("Failed to fetch blogs");
      const data: Blog[] = await res.json();
      setBlogs(data);
      if (!loadToastShownRef.current || opts.forceToast) {
        toast.success("Blogs loaded successfully! 📚");
        loadToastShownRef.current = true;
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file: File): Promise<{ url: string; public_id: string }> => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        let msg = "Image upload failed";
        try {
          const j = await res.json();
          if (j?.error) msg = j.error;
        } catch {}
        throw new Error(msg);
      }
      const data = await res.json();
      if (!data?.url) throw new Error("Upload did not return a URL");
      return { url: data.url, public_id: data.public_id };
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      throw err;
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) return toast.error("Image must be <5MB");
    if (!file.type.startsWith("image/")) return toast.error("Invalid image file");
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setCurrentBlog({ ...currentBlog, featuredImage: reader.result as string });
    reader.readAsDataURL(file);
  };

  const handleSaveBlog = async () => {
    if (!currentBlog.title || !currentBlog.content || !currentBlog.metaDescription || !currentBlog.author?.name) {
      return toast.error("Please fill all required fields");
    }

    try {
      let imageData = currentBlog.featuredImage;

      if (imageFile) {
        toast.info("Uploading image...");
        imageData = await uploadToCloudinary(imageFile);
        if (!imageData || typeof imageData === 'string') {
          return toast.error("Failed to upload image");
        }
      }

      if (typeof imageData === "string") {
        return toast.error("Please select and upload an image");
      }

      const isEdit = !!(currentBlog._id || currentBlog.id);
      const url = isEdit ? `/api/admin/blogs/${currentBlog._id ?? currentBlog.id}` : "/api/admin/blogs";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentBlog),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.message || "Failed to save blog");
      }

      setBlogs((prev) => isEdit ? prev.map((b) => (b._id === data.blog._id ? data.blog : b)) : [data.blog, ...prev]);
      toast.success(isEdit ? "Blog updated! ✅" : "Blog published! 🎉");
      setEditDialogOpen(false);
      setAddDialogOpen(false);
      setImageFile(null);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to save blog");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!blogToDelete) return;
    try {
      const res = await fetch(`/api/admin/blogs/${blogToDelete}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogs((prev) => prev.filter((b) => b._id !== blogToDelete));
      toast.success("Blog deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete blog");
    } finally {
      setDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    setCurrentBlog({
      ...currentBlog,
      tags: [...(currentBlog.tags ?? []), tagInput.trim()]
    });
    setTagInput("");
  };

  const removeTag = (tag: string) => setCurrentBlog({
    ...currentBlog,
    tags: currentBlog.tags?.filter((t) => t !== tag) ?? []
  });

  const handleDeleteClick = (id: string) => {
    setBlogToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleEditClick = (blog: Blog) => {
    setCurrentBlog(blog);
    setImageFile(null);
    setEditDialogOpen(true);
  };

  const handleAddClick = () => {
    setCurrentBlog({
      title: "",
      content: "",
      metaDescription: "",
      category: "Fleet Management",
      author: { name: "" },
      featuredImage: "",
      slug: "",
      featured: false,
      published: true,
      publicationDate: new Date().toISOString().split('T')[0],
      tags: []
    });
    setImageFile(null);
    setAddDialogOpen(true);
  };

  const filteredBlogs = blogs.filter((b) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = b.title?.toLowerCase().includes(q) || b.content?.toLowerCase().includes(q);
    return filterCategory === "all" ? matchesSearch : matchesSearch && b.category === filterCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100">
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-800 flex items-center">
                Blog Management
                <BookOpen className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">Manage all blog posts 📚</p>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-orange-900 flex items-center">
                <BookOpen className="mr-2 text-orange-600" size={24} />
                All Blog Posts
                <Sparkles className="ml-2 text-amber-500" size={20} />
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                <button onClick={handleAddClick} className="flex-1 sm:flex-none bg-gradient-to-r from-green-600 to-green-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <Plus size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Add Blog</span>
                </button>

                <button onClick={() => fetchBlogs({ forceToast: true })} className="flex-1 sm:flex-none bg-gradient-to-r from-orange-600 to-orange-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base">
                  <Zap size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search blogs..." className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-sm sm:text-base text-gray-700 focus:outline-none focus:border-orange-600" />
              
              <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="w-full sm:w-auto px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-sm sm:text-base text-gray-700 focus:outline-none focus:border-orange-600">
                <option value="all">All Categories</option>
                {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
              </select>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm sm:text-base">Loading blogs...</p>
              </div>
            )}

            {!loading && filteredBlogs.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4">📝</div>
                <p className="text-lg sm:text-xl font-black text-gray-900 mb-2">No Blogs Found</p>
                <p className="text-sm sm:text-base text-gray-600 font-semibold px-4">{searchQuery ? "Try adjusting your search criteria" : 'Click "Add Blog" to create your first blog post'}</p>
              </div>
            )}

            {!loading && filteredBlogs.length > 0 && (
              <>
                <div className="block md:hidden space-y-4">
                  {filteredBlogs.map((blog, index) => {
                    const bid = blog.id ?? blog._id ?? `blog-${index}`;
                    return (
                      <div key={bid} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="relative h-40 overflow-hidden">
                          <img src={typeof blog.featuredImage === "string" ? blog.featuredImage : blog.featuredImage.url} alt={blog.title} className="w-full h-full object-cover" />
                          <div className="absolute top-2 right-2 flex gap-1">
                            {blog.featured && (<span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center"><Star size={10} className="mr-1" />Featured</span>)}
                            {!blog.published && (<span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">Draft</span>)}
                          </div>
                        </div>

                        <div className="p-4 space-y-3">
                          <div>
                            <h3 className="font-black text-base text-gray-900 mb-2">{blog.title}</h3>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">{blog.category}</span>
                              {blog.readTime && (<span className="text-xs font-semibold text-gray-600 flex items-center"><Clock size={10} className="mr-1" />{blog.readTime} min</span>)}
                              {blog.views !== undefined && (<span className="text-xs font-semibold text-gray-600 flex items-center"><Eye size={10} className="mr-1" />{blog.views}</span>)}
                            </div>
                          </div>

                          <p className="text-sm text-gray-600 line-clamp-2">{blog.metaDescription}</p>

                          {blog.tags && blog.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {blog.tags.slice(0, 3).map((tag, i) => (<span key={i} className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">{tag}</span>))}
                            </div>
                          )}

                          {blog.publicationDate && (
                            <p className="text-xs text-gray-500 flex items-center"><Calendar size={12} className="mr-1 text-orange-600" />{new Date(blog.publicationDate).toLocaleDateString()}</p>
                          )}

                          <div className="flex gap-2 pt-2 border-t border-amber-200">
                            <button onClick={() => handleEditClick(blog)} className="flex-1 flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300">
                              <Edit size={14} />
                              <span className="text-sm">Edit</span>
                            </button>
                            <button onClick={() => handleDeleteClick(bid)} className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredBlogs.map((blog, index) => {
                      const bid = blog.id ?? blog._id ?? `blog-${index}`;
                      return (
                        <div key={bid} className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 hover:shadow-xl transition-all duration-300 flex gap-4">
                          <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                            <img src={typeof blog.featuredImage === "string" ? blog.featuredImage : blog.featuredImage.url} alt={blog.title} className="w-full h-full object-cover" />
                            {blog.featured && (<div className="absolute top-1 right-1"><Star size={14} className="text-yellow-500 fill-yellow-500" /></div>)}
                          </div>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-black text-lg text-gray-900">{blog.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-700">{blog.category}</span>
                                  {!blog.published && (<span className="text-xs font-bold px-2 py-1 rounded-full bg-gray-100 text-gray-700">Draft</span>)}
                                </div>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 line-clamp-2">{blog.metaDescription}</p>

                            {blog.tags && blog.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {blog.tags.slice(0, 4).map((tag, i) => (<span key={i} className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded">{tag}</span>))}
                              </div>
                            )}

                            <div className="flex items-center justify-between pt-2">
                              <div className="flex items-center gap-3">
                                {blog.publicationDate && (<span className="text-xs text-gray-500 flex items-center"><Calendar size={12} className="mr-1" />{new Date(blog.publicationDate).toLocaleDateString()}</span>)}
                                {blog.views !== undefined && (<span className="text-xs text-gray-500 flex items-center"><Eye size={12} className="mr-1" />{blog.views}</span>)}
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => handleEditClick(blog)} className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transition-all duration-300"><Edit size={16} /></button>
                                <button onClick={() => handleDeleteClick(bid)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all duration-300"><Trash2 size={16} /></button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-orange-100 to-amber-100 border-b-4 border-orange-600">
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Image</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Blog Details</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Category</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Author</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Stats</th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">Date</th>
                        <th className="px-4 py-3 text-center font-black text-gray-900 text-sm">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBlogs.map((blog, index) => {
                        const bid = blog.id ?? blog._id ?? `blog-${index}`;
                        return (
                          <tr key={bid} className="border-b border-amber-200 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group/row">
                            <td className="px-4 py-3">
                              <div className="relative w-20 h-14 rounded-lg overflow-hidden shadow-md group-hover/row:shadow-xl transition-shadow duration-300">
                                <img src={typeof blog.featuredImage === "string" ? blog.featuredImage : blog.featuredImage.url} alt={blog.title} className="w-full h-full object-cover group-hover/row:scale-110 transition-transform duration-300" />
                                {blog.featured && (<div className="absolute top-0.5 right-0.5"><Star size={10} className="text-yellow-500 fill-yellow-500" /></div>)}
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <div className="max-w-xs">
                                <h3 className="font-black text-gray-900 text-sm mb-1 flex items-center">
                                  {blog.title}
                                  {blog.featured && (<span className="ml-2 text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">Featured</span>)}
                                  {!blog.published && (<span className="ml-2 text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-bold">Draft</span>)}
                                </h3>
                                <p className="text-xs text-gray-600 line-clamp-2">{blog.metaDescription}</p>
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-700 whitespace-nowrap">{blog.category}</span>
                            </td>

                            <td className="px-4 py-3">
                              <p className="text-sm font-bold text-gray-900">{blog.author.name}</p>
                            </td>

                            <td className="px-4 py-3">
                              <div className="space-y-1">
                                {blog.readTime && (<p className="text-xs text-gray-600 flex items-center"><Clock size={12} className="mr-1" />{blog.readTime} min</p>)}
                                {blog.views !== undefined && (<p className="text-xs text-gray-600 flex items-center"><Eye size={12} className="mr-1" />{blog.views} views</p>)}
                              </div>
                            </td>

                            <td className="px-4 py-3">
                              {blog.publicationDate && (
                                <span className="text-xs text-gray-600 flex items-center whitespace-nowrap">
                                  <Calendar size={12} className="mr-1 text-orange-600" />
                                  {new Date(blog.publicationDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                </span>
                              )}
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => handleEditClick(blog)} className="p-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300" title="Edit"><Edit size={14} /></button>
                                <button onClick={() => handleDeleteClick(bid)} className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300" title="Delete"><Trash2 size={14} /></button>
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

      {/* Add/Edit Blog Dialog */}
      {(addDialogOpen || editDialogOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border-2 border-orange-200 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b-2 border-amber-200 p-6 z-10">
              <h2 className="text-2xl font-black text-gray-900 flex items-center">
                {editDialogOpen ? <Edit className="mr-2 text-orange-600" size={24} /> : <Plus className="mr-2 text-green-600" size={24} />}
                {editDialogOpen ? "Edit Blog Post" : "Add New Blog Post"}
              </h2>
              <p className="text-gray-600 mt-1">{editDialogOpen ? "Update blog post details below" : "Fill in the blog information to create a new post"}</p>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blog Title *</label>
                  <input type="text" value={currentBlog.title} onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold" placeholder="Enter blog title" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Category *</label>
                  <select value={currentBlog.category} onChange={(e) => setCurrentBlog({ ...currentBlog, category: e.target.value })} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold">
                    {categories.map((cat) => (<option key={cat} value={cat}>{cat}</option>))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Author Name *</label>
                  <input type="text" value={currentBlog.author?.name} onChange={(e) => setCurrentBlog({ ...currentBlog, author: { ...currentBlog.author, name: e.target.value } })} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold" placeholder="Author name" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2
                  ">Meta Description * (160 characters max)</label>
                  <textarea
                    value={currentBlog.metaDescription}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, metaDescription: e.target.value })}
                    rows={2}
                    maxLength={160}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold"
                    placeholder="Brief description for SEO"
                  />
                  <p className="text-xs text-gray-500 mt-1">{currentBlog.metaDescription?.length || 0}/160 characters</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Blog Content *</label>
                  <textarea
                    value={currentBlog.content}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
                    rows={10}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold"
                    placeholder="Write your blog content here..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tags (Press Enter to add)</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600"
                      placeholder="e.g., GPS, Technology"
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2"
                    >
                      <Tag size={16} />
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentBlog.tags?.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold flex items-center gap-2"
                      >
                        {tag}
                        <X
                          size={14}
                          className="cursor-pointer hover:text-blue-900"
                          onClick={() => removeTag(tag)}
                        />
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image *</label>
                  <div className="flex flex-col gap-3">
                    {currentBlog.featuredImage && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border-2 border-amber-200">
                        <img
                          src={typeof currentBlog.featuredImage === "string" ? currentBlog.featuredImage : currentBlog.featuredImage?.url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <label className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-bold">
                      <Upload size={18} className="mr-2" />
                      {imageFile ? imageFile.name : "Choose Featured Image"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-gray-500">Maximum file size: 5MB. Supported formats: JPG, PNG, WebP</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Publication Date</label>
                  <input
                    type="date"
                    value={currentBlog.publicationDate?.split('T')[0] || ''}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, publicationDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Slug (URL-friendly)</label>
                  <input
                    type="text"
                    value={currentBlog.slug}
                    onChange={(e) => setCurrentBlog({ ...currentBlog, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                    className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-orange-600 font-semibold"
                    placeholder="auto-generated-from-title"
                  />
                </div>

                <div className="md:col-span-2 flex flex-wrap gap-6">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={currentBlog.featured}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, featured: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-amber-300"
                    />
                    <label className="text-sm font-bold text-gray-700 flex items-center">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      Mark as Featured
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={currentBlog.published}
                      onChange={(e) => setCurrentBlog({ ...currentBlog, published: e.target.checked })}
                      className="w-5 h-5 rounded border-2 border-amber-300"
                    />
                    <label className="text-sm font-bold text-gray-700">Publish Immediately</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white border-t-2 border-amber-200 p-6 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={() => {
                  setAddDialogOpen(false);
                  setEditDialogOpen(false);
                }}
                className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-3 rounded-lg transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlog}
                className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {editDialogOpen ? "Update Blog" : "Publish Blog"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border-2 border-orange-200 rounded-2xl max-w-md w-full shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-black text-gray-900 flex items-center mb-4">
                <AlertTriangle className="mr-2 text-red-600" size={24} />
                Delete Blog Post?
              </h2>
              <p className="text-gray-600 text-base mb-6">
                Are you sure you want to delete this blog post? This action cannot be undone and the image will be removed from Cloudinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setDeleteDialogOpen(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
