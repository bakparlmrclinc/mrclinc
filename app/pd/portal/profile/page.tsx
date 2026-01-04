<<<<<<< HEAD
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { getPDSessionFromCookies } from "@/lib/auth/pd-session";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/Card";
import PDPortalHeader from "../PDPortalHeader";

export default async function PDProfilePage() {
  // Server-side session validation
  const session = await getPDSessionFromCookies();
  
  if (!session) {
    redirect("/pd/login");
  }

  // Fetch full PD profile from database
  const pd = await prisma.pD.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      pdCode: true,
      fullName: true,
      email: true,
      phone: true,
      profession: true,
      country: true,
      city: true,
      languages: true,
      status: true,
      verificationState: true,
      createdAt: true,
      casesActiveCount: true,
      casesCompletedCount: true,
    },
  });

  if (!pd || pd.status !== "ACTIVE") {
    redirect("/pd/login");
  }

  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PDPortalHeader pdCode={pd.pdCode} pdName={pd.fullName} />
=======
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

interface PDProfile {
  code: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  professionalBackground: string;
  joinedDate: string;
}

export default function PDProfilePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<PDProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    professionalBackground: "",
  });

  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("pdSession");
    if (!session) {
      router.push("/pd/login");
      return;
    }

    const parsed = JSON.parse(session);
    if (!parsed.loggedIn) {
      router.push("/pd/login");
      return;
    }

    // Load profile from localStorage or use defaults
    const savedProfile = localStorage.getItem("pdProfile");
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);
      setProfile(profileData);
      setEditForm({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        city: profileData.city,
        professionalBackground: profileData.professionalBackground,
      });
    } else {
      // Create default profile from session
      const defaultProfile: PDProfile = {
        code: parsed.code || "PD-A1B2C",
        name: parsed.name || "Demo PD",
        email: "demo@example.com",
        phone: "+44 7700 900000",
        city: "London",
        professionalBackground: "",
        joinedDate: new Date().toISOString().split("T")[0],
      };
      setProfile(defaultProfile);
      localStorage.setItem("pdProfile", JSON.stringify(defaultProfile));
      setEditForm({
        name: defaultProfile.name,
        email: defaultProfile.email,
        phone: defaultProfile.phone,
        city: defaultProfile.city,
        professionalBackground: defaultProfile.professionalBackground,
      });
    }

    setIsLoading(false);
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("pdSession");
    router.push("/pd/login");
  };

  const handleCopyCode = async () => {
    if (profile) {
      await navigator.clipboard.writeText(profile.code);
      setCodeCopied(true);
      setTimeout(() => setCodeCopied(false), 2000);
    }
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profile) {
      const updatedProfile = {
        ...profile,
        ...editForm,
      };
      setProfile(updatedProfile);
      localStorage.setItem("pdProfile", JSON.stringify(updatedProfile));
      
      // Also update session name
      const session = localStorage.getItem("pdSession");
      if (session) {
        const parsed = JSON.parse(session);
        parsed.name = editForm.name;
        localStorage.setItem("pdSession", JSON.stringify(parsed));
      }
      
      setIsEditing(false);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess(false);

    // Validation
    if (passwordForm.currentPassword !== "demo123") {
      setPasswordError("Current password is incorrect");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Success (in real app, this would call API)
    setPasswordSuccess(true);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => {
      setIsChangingPassword(false);
      setPasswordSuccess(false);
    }, 2000);
  };

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-xl font-bold text-primary-600">MrClinc</Link>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600 text-sm">PD Portal</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{profile.name}</span>
              <Badge variant="primary" size="sm">{profile.code}</Badge>
              <Button variant="outline" size="sm" onClick={handleSignOut}>Sign Out</Button>
            </div>
          </div>
        </div>
      </header>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<<<<<<< HEAD
          <div className="flex gap-8">
            <Link
              href="/pd/portal"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Dashboard
            </Link>
            <Link
              href="/pd/portal/earnings"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Earnings
            </Link>
            <Link
              href="/pd/portal/education"
              className="py-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-medium text-sm"
            >
              Education
            </Link>
            <Link
              href="/pd/portal/profile"
              className="py-4 border-b-2 border-primary-600 text-primary-600 font-medium text-sm"
            >
=======
          <div className="flex gap-6 h-12">
            <Link href="/pd/portal" className="flex items-center text-sm text-gray-600 hover:text-primary-600 border-b-2 border-transparent">
              Dashboard
            </Link>
            <Link href="/pd/portal/earnings" className="flex items-center text-sm text-gray-600 hover:text-primary-600 border-b-2 border-transparent">
              Earnings
            </Link>
            <Link href="/pd/portal/education" className="flex items-center text-sm text-gray-600 hover:text-primary-600 border-b-2 border-transparent">
              Education
            </Link>
            <Link href="/pd/portal/profile" className="flex items-center text-sm text-primary-600 font-medium border-b-2 border-primary-600">
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              Profile
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
<<<<<<< HEAD
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600">Your account information and settings.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Account Info */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">PD Code</dt>
                  <dd className="text-sm font-mono font-medium text-gray-900 mt-1">{pd.pdCode}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Full Name</dt>
                  <dd className="text-sm font-medium text-gray-900 mt-1">{pd.fullName}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Status</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      pd.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                    }`}>
                      {pd.status}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Verification</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${
                      pd.verificationState === "VERIFIED" 
                        ? "bg-green-100 text-green-800" 
                        : pd.verificationState === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {pd.verificationState}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Member Since</dt>
                  <dd className="text-sm text-gray-900 mt-1">{formatDate(pd.createdAt)}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.email || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.phone || "Not provided"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Location</dt>
                  <dd className="text-sm text-gray-900 mt-1">{pd.city}, {pd.country}</dd>
                </div>
                {pd.profession && (
                  <div>
                    <dt className="text-sm text-gray-500">Profession</dt>
                    <dd className="text-sm text-gray-900 mt-1">{pd.profession}</dd>
                  </div>
                )}
                {pd.languages && pd.languages.length > 0 && (
                  <div>
                    <dt className="text-sm text-gray-500">Languages</dt>
                    <dd className="text-sm text-gray-900 mt-1">{pd.languages.join(", ")}</dd>
                  </div>
                )}
              </dl>
            </CardContent>
          </Card>

          {/* Activity Stats */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Active Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesActiveCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Completed Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesCompletedCount}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500">Total Cases</dt>
                  <dd className="text-sm font-medium text-gray-900">{pd.casesActiveCount + pd.casesCompletedCount}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  To update your contact information or change your password, please contact support.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                >
                  Contact Support
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
=======
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
          <p className="text-gray-600 mt-1">Manage your account information</p>
        </div>

        <div className="grid gap-6">
          {/* PD Code Card - Prominent */}
          <Card variant="bordered" className="bg-primary-50 border-primary-200">
            <CardContent className="py-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-sm text-primary-700 font-medium mb-1">Your PD Code</p>
                  <p className="text-3xl font-bold text-primary-900 tracking-wider">{profile.code}</p>
                  <p className="text-sm text-primary-600 mt-2">
                    Share this code with patients. It links their requests to your account.
                  </p>
                </div>
                <Button
                  variant={codeCopied ? "success" : "primary"}
                  onClick={handleCopyCode}
                  className="flex-shrink-0"
                >
                  {codeCopied ? (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Info Card */}
          <Card variant="bordered">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Personal Information</CardTitle>
                {!isEditing && (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <Input
                        value={editForm.city}
                        onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professional Background
                      <span className="text-gray-400 font-normal ml-1">(Optional)</span>
                    </label>
                    <textarea
                      value={editForm.professionalBackground}
                      onChange={(e) => setEditForm({ ...editForm, professionalBackground: e.target.value })}
                      rows={3}
                      placeholder="e.g., Pharmacist with 10 years experience, GP practice nurse..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="primary">Save Changes</Button>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{profile.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{profile.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{profile.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium text-gray-900">{profile.city}</p>
                    </div>
                  </div>
                  {profile.professionalBackground && (
                    <div>
                      <p className="text-sm text-gray-500">Professional Background</p>
                      <p className="font-medium text-gray-900">{profile.professionalBackground}</p>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {new Date(profile.joinedDate).toLocaleDateString("en-GB", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Card */}
          <Card variant="bordered">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Password</CardTitle>
                {!isChangingPassword && (
                  <Button variant="outline" size="sm" onClick={() => setIsChangingPassword(true)}>
                    Change Password
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  {passwordError && (
                    <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                      <p className="text-sm text-error-700">{passwordError}</p>
                    </div>
                  )}
                  {passwordSuccess && (
                    <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
                      <p className="text-sm text-success-700">Password changed successfully!</p>
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                    <Input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      required
                      placeholder="Enter current password"
                    />
                    <p className="text-xs text-gray-500 mt-1">Demo password: demo123</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                    <Input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      required
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                    <Input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      required
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button type="submit" variant="primary">Update Password</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsChangingPassword(false);
                        setPasswordError("");
                        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 text-sm">
                  Your password was last changed on your account creation date. We recommend changing it periodically for security.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Account Actions Card */}
          <Card variant="bordered">
            <CardHeader>
              <CardTitle>Account</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium text-gray-900">Sign Out</p>
                    <p className="text-sm text-gray-500">Sign out from this device</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">Need Help?</p>
                    <p className="text-sm text-gray-500">Contact MrClinc support team</p>
                  </div>
                  <Link href="/contact">
                    <Button variant="outline" size="sm">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats Card */}
          <Card variant="bordered" className="bg-gray-50">
            <CardContent className="py-6">
              <h3 className="font-medium text-gray-900 mb-4">Your Activity Summary</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-primary-600">12</p>
                  <p className="text-sm text-gray-500">Total Cases</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-success-600">8</p>
                  <p className="text-sm text-gray-500">Completed</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-accent-600">3</p>
                  <p className="text-sm text-gray-500">In Progress</p>
                </div>
                <div className="text-center p-4 bg-white rounded-lg border border-gray-200">
                  <p className="text-2xl font-bold text-gray-600">1</p>
                  <p className="text-sm text-gray-500">Pending</p>
                </div>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
              </div>
            </CardContent>
          </Card>
        </div>
<<<<<<< HEAD

        {/* Documents Section */}
        <Card variant="bordered" className="mt-6">
          <CardHeader>
            <CardTitle>PD Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Access your PD framework documents and agreements.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <Link
                href="/pd/docs/agreement"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">PD Agreement</span>
              </Link>
              <Link
                href="/pd/docs/compensation"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Compensation Schedule</span>
              </Link>
              <Link
                href="/pd/docs/conduct"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Code of Conduct</span>
              </Link>
              <Link
                href="/pd/docs/data"
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-gray-700">Data Processing Addendum</span>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
=======
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            MrClinc PD Portal - For authorized Pathway Developers only
          </p>
        </div>
      </footer>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    </div>
  );
}
