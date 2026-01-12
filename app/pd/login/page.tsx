"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";

export default function PDLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (loginError) setLoginError("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const trimmedIdentifier = formData.identifier.trim();
    if (!trimmedIdentifier) {
      newErrors.identifier = "Email or PD Code is required";
    } else {
      // Check if it's an email (contains @)
      const isEmail = trimmedIdentifier.includes("@");
      if (isEmail) {
        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedIdentifier)) {
          newErrors.identifier = "Invalid email format";
        }
      } else {
        // PD Code validation - accepts: PD-XXXXX, PDXXXXX, or just XXXXX (5-6 chars)
        if (!/^(PD-?)?[A-Z0-9]{5,6}$/i.test(trimmedIdentifier)) {
          newErrors.identifier = "Invalid format. Use email or PD Code (e.g., PD-XXXXXX)";
        }
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch("/api/pd/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: formData.identifier.trim(),
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Session cookie is set by the API, redirect to portal
        router.push("/pd/portal");
        router.refresh();
      } else {
        setLoginError(data.error?.message || data.error || "Invalid PD Code or password. Please try again.");
      }
    } catch {
      setLoginError("Connection error. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img
              src="/images/logo.svg"
              alt="MR.CLINC"
              className="h-12 mx-auto mb-4"
            />
          </Link>
          <p className="text-gray-600">Pathway Developer Portal</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email or PD Code and password to access your portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or PD Code
                </label>
                <Input
                  value={formData.identifier}
                  onChange={(e) => handleChange("identifier", e.target.value)}
                  placeholder="email@example.com or PD-XXXXXX"
                  error={errors.identifier}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  placeholder="••••••••••••"
                  error={errors.password}
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={(e) => handleChange("rememberMe", e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1B4965] focus:ring-[#1B4965]"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Need help accessing your account?{" "}
                <Link
                  href="/contact"
                  className="font-medium hover:underline"
                  style={{ color: "#1B4965" }}
                >
                  Contact support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center mt-6 text-sm text-gray-500">
          <Link href="/pd" className="hover:underline">
            Learn about the PD Program
          </Link>
        </p>
      </div>
    </div>
  );
}
