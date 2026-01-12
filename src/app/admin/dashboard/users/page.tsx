"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  Sparkles,
  Star,
  Zap,
  Mail,
  Phone,
  Shield,
  Trash2,
  Calendar,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Edit,
  UserCheck,
  UserX,
  Crown,
  User,
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

interface User {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  phone?: string;
  role: "user" | "admin" | "moderator";
  isVerified: boolean;
  isActive: boolean;
  profileImage?: string;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const loadToastShownRef = useRef(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async (opts: { forceToast?: boolean } = {}) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        throw new Error("Failed to fetch users");
      }

      const response_data = await response.json();
      const users_array = response_data.data || response_data;
      setUsers(users_array);

      if (!loadToastShownRef.current || opts.forceToast) {
        loadToastShownRef.current = true;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user: User) => {
    const q = (searchQuery || "").toString().toLowerCase().trim();
    const matchesName = user.name?.toLowerCase()?.includes(q) ?? false;
    const matchesEmail = user.email?.toLowerCase()?.includes(q) ?? false;
    const matchesPhone = user.phone?.toString()?.includes(q) ?? false;
    const matchesRole = user.role?.toLowerCase()?.includes(q) ?? false;
    const matchesSearch = matchesName || matchesEmail || matchesPhone || matchesRole;

    let matchesRole_filter = true;
    let matchesStatus_filter = true;

    if (filterRole !== "all") {
      matchesRole_filter = user.role === filterRole;
    }

    if (filterStatus === "active") {
      matchesStatus_filter = user.isActive === true;
    } else if (filterStatus === "inactive") {
      matchesStatus_filter = user.isActive === false;
    } else if (filterStatus === "verified") {
      matchesStatus_filter = user.isVerified === true;
    } else if (filterStatus === "unverified") {
      matchesStatus_filter = user.isVerified === false;
    }

    return matchesSearch && matchesRole_filter && matchesStatus_filter;
  });

  const handleDeleteClick = (id: string) => {
    setUserToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      const response = await fetch(`/api/admin/users/${userToDelete}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Failed to delete");

      setUsers((prev) =>
        prev.filter((u) => (u.id ?? u._id) !== userToDelete)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const toggleUserStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.status === 401) {
        window.location.href = "/auth/login";
        return;
      }

      if (!response.ok) throw new Error("Failed to update");

      const updatedUser = await response.json();

      setUsers((prev) =>
        prev.map((u) => ((u.id ?? u._id) === id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const updateUserRole = async (id: string, newRole: "user" | "admin" | "moderator") => {
    try {
      const response = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.status === 401) {
        window.location.href = "/auth/login";
        return;
      }

      if (!response.ok) throw new Error("Failed to update");

      const updatedUser = await response.json();

      setUsers((prev) =>
        prev.map((u) => ((u.id ?? u._id) === id ? updatedUser : u))
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown size={14} className="text-yellow-600" />;
      case "moderator":
        return <Shield size={14} className="text-blue-600" />;
      default:
        return <User size={14} className="text-gray-600" />;
    }
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-yellow-100 text-yellow-700";
      case "moderator":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-amber-100">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 lg:left-72 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600">
        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="ml-12 lg:ml-0">
              <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-linear-to-r from-orange-600 to-orange-800 flex items-center">
                User Management
                <Users className="ml-2 text-orange-600" size={28} />
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-semibold">
                Manage all registered users 👥
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <div className="pt-28 p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border-2 border-amber-200 relative overflow-hidden group sm:mt-28">
          <div className="absolute top-0 left-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300">
            <Sparkles size={200} className="text-orange-600" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-xl sm:text-2xl font-black text-orange-900 flex items-center">
                <Users className="mr-2 text-orange-600" size={24} />
                All Users
                <Sparkles className="ml-2 text-amber-500" size={20} />
              </h2>

              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => fetchUsers({ forceToast: true })}
                  className="flex-1 sm:flex-none bg-linear-to-r from-orange-600 to-orange-700 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <Zap size={16} className="sm:w-4.5 sm:h-4.5" />
                  <span>Refresh</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="flex-1 px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-sm sm:text-base text-gray-700 focus:outline-none focus:border-orange-600"
              />

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-sm sm:text-base text-gray-700 focus:outline-none focus:border-orange-600"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border-2 border-amber-200 rounded-lg font-bold text-sm sm:text-base text-gray-700 focus:outline-none focus:border-orange-600"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
            </div>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-orange-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 font-bold text-sm sm:text-base">
                  Loading users...
                </p>
              </div>
            )}

            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-linear-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center text-3xl sm:text-4xl mx-auto mb-4">
                  👤
                </div>
                <p className="text-lg sm:text-xl font-black text-gray-900 mb-2">
                  No Users Found
                </p>
                <p className="text-sm sm:text-base text-gray-600 font-semibold px-4">
                  {searchQuery
                    ? "Try adjusting your search criteria"
                    : "No users in the database yet"}
                </p>
              </div>
            )}

            {/* RESPONSIVE TABLE VIEW */}
            {!loading && filteredUsers.length > 0 && (
              <>
                {/* MOBILE VIEW (Cards) - Hidden on md and up */}
                <div className="block md:hidden space-y-4">
                  {filteredUsers.map((user: User, index: number) => {
                    const uid = user.id ?? user._id ?? `user-${index}`;
                    return (
                      <div
                        key={uid}
                        className="bg-linear-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        {/* Mobile Card Header */}
                        <div className="bg-linear-to-r from-orange-600 to-orange-700 p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-white text-orange-600 rounded-lg flex items-center justify-center font-black shadow-lg">
                                {user.name?.charAt(0).toUpperCase() || "?"}
                              </div>
                              <div>
                                <h3 className="font-black text-base text-white">
                                  {user.name}
                                </h3>
                                {user.createdAt && (
                                  <p className="text-xs text-orange-100 flex items-center mt-1">
                                    <Calendar size={10} className="mr-1" />
                                    {new Date(user.createdAt).toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span
                                className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${getRoleBadgeClass(
                                  user.role
                                )}`}
                              >
                                {getRoleIcon(user.role)}
                                {user.role.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Mobile Card Content */}
                        <div className="p-4 space-y-3">
                          {/* User Details */}
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 text-sm">
                              <Mail size={14} className="text-orange-600 shrink-0" />
                              <span className="font-semibold text-gray-700 break-all">
                                {user.email}
                              </span>
                            </div>
                            {user.phone && (
                              <div className="flex items-center space-x-2 text-sm">
                                <Phone size={14} className="text-orange-600 shrink-0" />
                                <span className="font-semibold text-gray-700">
                                  {user.phone}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Status Badges */}
                          <div className="flex flex-wrap gap-2">
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                                user.isActive
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {user.isActive ? (
                                <CheckCircle size={12} />
                              ) : (
                                <XCircle size={12} />
                              )}
                              {user.isActive ? "Active" : "Inactive"}
                            </span>
                            <span
                              className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                                user.isVerified
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {user.isVerified ? (
                                <UserCheck size={12} />
                              ) : (
                                <UserX size={12} />
                              )}
                              {user.isVerified ? "Verified" : "Unverified"}
                            </span>
                          </div>

                          {user.lastLogin && (
                            <div className="bg-white/80 rounded-lg p-2 border border-amber-200">
                              <p className="text-xs text-gray-600">
                                Last Login:{" "}
                                {new Date(user.lastLogin).toLocaleString()}
                              </p>
                            </div>
                          )}

                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t border-amber-200">
                            <button
                              onClick={() =>
                                toggleUserStatus(uid, user.isActive)
                              }
                              className={`flex-1 flex items-center justify-center space-x-2 font-bold px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                                user.isActive
                                  ? "bg-red-600 hover:bg-red-700 text-white"
                                  : "bg-green-600 hover:bg-green-700 text-white"
                              }`}
                            >
                              {user.isActive ? (
                                <UserX size={14} />
                              ) : (
                                <UserCheck size={14} />
                              )}
                              <span className="text-xs">
                                {user.isActive ? "Deactivate" : "Activate"}
                              </span>
                            </button>
                            <button
                              onClick={() => handleDeleteClick(uid)}
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

                {/* TABLET VIEW - Hidden on mobile and desktop */}
                <div className="hidden md:block lg:hidden">
                  <div className="grid grid-cols-1 gap-4">
                    {filteredUsers.map((user: User, index: number) => {
                      const uid = user.id ?? user._id ?? `user-${index}`;
                      return (
                        <div
                          key={uid}
                          className="bg-linear-to-r from-amber-50 to-orange-50 rounded-xl border-2 border-amber-200 p-4 hover:shadow-xl transition-all duration-300"
                        >
                          <div className="flex gap-4">
                            {/* Avatar */}
                            <div className="shrink-0">
                              <div className="w-16 h-16 bg-linear-to-br from-orange-600 to-orange-800 text-white rounded-xl flex items-center justify-center font-black shadow-lg text-xl">
                                {user.name?.charAt(0).toUpperCase() || "?"}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-black text-lg text-gray-900">
                                    {user.name}
                                  </h3>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <span
                                      className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${getRoleBadgeClass(
                                        user.role
                                      )}`}
                                    >
                                      {getRoleIcon(user.role)}
                                      {user.role.toUpperCase()}
                                    </span>
                                    <span
                                      className={`text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 ${
                                        user.isActive
                                          ? "bg-green-100 text-green-700"
                                          : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {user.isActive ? (
                                        <CheckCircle size={10} />
                                      ) : (
                                        <XCircle size={10} />
                                      )}
                                      {user.isActive ? "Active" : "Inactive"}
                                    </span>
                                    {user.isVerified && (
                                      <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-700 flex items-center gap-1">
                                        <UserCheck size={10} />
                                        Verified
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center space-x-2">
                                  <Mail size={14} className="text-orange-600" />
                                  <span className="font-semibold text-gray-700 truncate">
                                    {user.email}
                                  </span>
                                </div>
                                {user.phone && (
                                  <div className="flex items-center space-x-2">
                                    <Phone
                                      size={14}
                                      className="text-orange-600"
                                    />
                                    <span className="font-semibold text-gray-700">
                                      {user.phone}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {user.createdAt && (
                                <p className="text-xs text-gray-500 flex items-center">
                                  <Calendar size={12} className="mr-1" />
                                  Joined:{" "}
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </p>
                              )}

                              <div className="flex gap-2 pt-2">
                                <button
                                  onClick={() =>
                                    toggleUserStatus(uid, user.isActive)
                                  }
                                  className={`flex-1 p-2 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold ${
                                    user.isActive
                                      ? "bg-red-600 hover:bg-red-700 text-white"
                                      : "bg-green-600 hover:bg-green-700 text-white"
                                  }`}
                                >
                                  {user.isActive ? (
                                    <UserX size={16} />
                                  ) : (
                                    <UserCheck size={16} />
                                  )}
                                  <span>
                                    {user.isActive ? "Deactivate" : "Activate"}
                                  </span>
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(uid)}
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

                {/* DESKTOP TABLE VIEW - Hidden on mobile and tablet */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-linear-to-r from-orange-100 to-amber-100 border-b-4 border-orange-600">
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          User
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Email
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Phone
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Role
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Verified
                        </th>
                        <th className="px-4 py-3 text-left font-black text-gray-900 text-sm">
                          Joined
                        </th>
                        <th className="px-4 py-3 text-center font-black text-gray-900 text-sm">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user: User, index: number) => {
                        const uid = user.id ?? user._id ?? `user-${index}`;
                        return (
                          <tr
                            key={uid}
                            className="border-b border-amber-200 hover:bg-linear-to-r hover:from-amber-50 hover:to-orange-50 transition-all duration-300 group/row"
                          >
                            {/* User */}
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-linear-to-br from-orange-600 to-orange-800 text-white rounded-lg flex items-center justify-center font-black shadow-md group-hover/row:scale-110 transition-transform duration-300">
                                  {user.name?.charAt(0).toUpperCase() || "?"}
                                </div>
                                <span className="font-black text-sm text-gray-900 whitespace-nowrap">
                                  {user.name}
                                </span>
                              </div>
                            </td>

                            {/* Email */}
                            <td className="px-4 py-3">
                              <span className="text-sm text-gray-700 font-semibold">
                                {user.email}
                              </span>
                            </td>

                            {/* Phone */}
                            <td className="px-4 py-3">
                              <span className="text-sm text-gray-700 font-semibold whitespace-nowrap">
                                {user.phone || "-"}
                              </span>
                            </td>

                            {/* Role */}
                            <td className="px-4 py-3">
                              <select
                                value={user.role}
                                onChange={(e) =>
                                  updateUserRole(
                                    uid,
                                    e.target.value as "user" | "admin" | "moderator"
                                  )
                                }
                                className={`text-xs font-bold px-3 py-1 rounded-full border-none cursor-pointer ${getRoleBadgeClass(
                                  user.role
                                )}`}
                              >
                                <option value="user">User</option>
                                <option value="moderator">Moderator</option>
                                <option value="admin">Admin</option>
                              </select>
                            </td>

                            {/* Status */}
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                  user.isActive
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${
                                    user.isActive ? "bg-green-500" : "bg-red-500"
                                  }`}
                                ></div>
                                {user.isActive ? "Active" : "Inactive"}
                              </span>
                            </td>

                            {/* Verified */}
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                                  user.isVerified
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                {user.isVerified ? (
                                  <UserCheck size={12} className="mr-1" />
                                ) : (
                                  <UserX size={12} className="mr-1" />
                                )}
                                {user.isVerified ? "Yes" : "No"}
                              </span>
                            </td>

                            {/* Joined */}
                            <td className="px-4 py-3">
                              {user.createdAt && (
                                <span className="text-xs text-gray-600 flex items-center whitespace-nowrap">
                                  <Calendar
                                    size={12}
                                    className="mr-1 text-orange-600"
                                  />
                                  {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    {
                                      month: "short",
                                      day: "numeric",
                                      year: "numeric",
                                    }
                                  )}
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="px-4 py-3">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={() =>
                                    toggleUserStatus(uid, user.isActive)
                                  }
                                  className={`p-2 rounded-lg shadow-md transform hover:scale-110 transition-all duration-300 ${
                                    user.isActive
                                      ? "bg-red-600 hover:bg-red-700 text-white"
                                      : "bg-green-600 hover:bg-green-700 text-white"
                                  }`}
                                  title={
                                    user.isActive
                                      ? "Deactivate User"
                                      : "Activate User"
                                  }
                                >
                                  {user.isActive ? (
                                    <UserX size={14} />
                                  ) : (
                                    <UserCheck size={14} />
                                  )}
                                </button>
                                <button
                                  onClick={() => handleDeleteClick(uid)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transform hover:scale-110 transition-all duration-300"
                                  title="Delete User"
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white border-2 border-orange-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-xl font-black text-gray-900">
              <AlertTriangle className="mr-2 text-red-600" size={24} />
              Delete User?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 text-base">
              Are you sure you want to delete this user? This action cannot be
              undone and will remove all associated data.
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
  );
}