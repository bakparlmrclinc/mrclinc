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
    } else if (!/^PD-[A-Z0-9]{5}$/.test(formData.pdCode.toUpperCase())) {
      newErrors.pdCode = "Invalid format. Example: PD-A1B2C";
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

<<<<<<< HEAD
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
=======
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo login - accept specific codes
    const validCodes = ["PD-DEMO1", "PD-DEMO2", "PD-TEST1"];
    const normalizedCode = formData.pdCode.toUpperCase();

    if (validCodes.includes(normalizedCode) && formData.password === "demo123") {
      // Store in localStorage for demo purposes
      localStorage.setItem("pdSession", JSON.stringify({
        code: normalizedCode,
        name: "Demo User",
        loggedIn: true,
      }));
      router.push("/pd/portal");
    } else {
      setLoginError("Invalid PD Code or password. Please try again.");
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
<<<<<<< HEAD
            <img src="/images/logo.svg" alt="MrClinc" className="h-[52px] w-auto mx-auto" />
=======
            <span className="text-2xl font-bold text-primary-600">MrClinc</span>
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
          </Link>
          <p className="text-gray-600 mt-2">Pathway Developer Portal</p>
        </div>

        {/* Login Card */}
        <Card variant="bordered">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your PD Code and password to access your portal.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {loginError && (
                <div className="bg-error-50 border border-error-200 text-error-700 px-4 py-3 rounded-lg text-sm">
                  {loginError}
                </div>
              )}

              <Input
                label="PD Code"
                value={formData.pdCode}
                onChange={(e) => handleChange("pdCode", e.target.value.toUpperCase())}
                error={errors.pdCode}
                placeholder="PD-XXXXX"
                className="font-mono"
              />

              <Input
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                error={errors.password}
                placeholder="Enter your password"
              />

              <Button
                type="submit"
                variant="primary"
                className="w-full"
<<<<<<< HEAD
                isLoading={isLoading}
=======
                loading={isLoading}
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center">
<<<<<<< HEAD
                Need help accessing your account?{" "}
                <Link href="/contact" className="text-primary-600 hover:underline">
                  Contact support
=======
                First time logging in?{" "}
                <Link href="/pd/setup" className="text-primary-600 hover:underline">
                  Set up your password
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

<<<<<<< HEAD
=======
        {/* Demo hint - remove in production */}
        <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Demo: Use PD-DEMO1 with password "demo123"
          </p>
        </div>

>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/pd" className="text-sm text-gray-600 hover:text-primary-600">
            Learn about the PD Program
          </Link>
        </div>
      </div>
    </div>
  );
}
