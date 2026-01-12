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
    pdCode: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    if (loginError) setLoginError("");
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.pdCode.trim()) {
      newErrors.pdCode = "PD Code is required";
    } else if (!/^PD-?[A-Z0-9]{5,6}$/i.test(formData.pdCode)) {
      newErrors.pdCode = "Invalid format. Example: PD-XXXXXX";
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
          pdCode: formData.pdCode.toUpperCase(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Session cookie is set by the API, redirect to portal
        router.push("/pd/portal");
        router.refresh();
      } else {
        setLoginError(data.error || "Invalid PD Code or password. Please try again.");
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
              Enter your PD Code and password to access your portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PD Code
                </label>
                <Input
                  value={formData.pdCode}
                  onChange={(e) => handleChange("pdCode", e.target.value)}
                  placeholder="PD-XXXXXX"
                  error={errors.pdCode}
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
