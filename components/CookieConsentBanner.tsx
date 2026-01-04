"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const COOKIE_CONSENT_KEY = "mrclinc_cookie_consent";

interface CookieConsent {
  essential: boolean; // Always true
  analytics: boolean;
  timestamp: string;
  version: string;
}

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    // Check if consent already given
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) {
      setShowBanner(true);
    } else {
      try {
        const consent: CookieConsent = JSON.parse(stored);
        // If consent exists, apply settings
        if (consent.analytics) {
          enableAnalytics();
        }
      } catch {
        // Invalid stored consent, show banner
        setShowBanner(true);
      }
    }
  }, []);

  const enableAnalytics = () => {
    // Placeholder for analytics initialization
    // Analytics scripts should only be loaded here, AFTER consent
    if (typeof window !== "undefined") {
      (window as Window & { analyticsEnabled?: boolean }).analyticsEnabled = true;
    }
  };

  const saveConsent = (analytics: boolean) => {
    const consent: CookieConsent = {
      essential: true,
      analytics,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    
    if (analytics) {
      enableAnalytics();
    }
    
    setShowBanner(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    saveConsent(true);
  };

  const acceptEssentialOnly = () => {
    saveConsent(false);
  };

  const saveSettings = () => {
    saveConsent(analyticsEnabled);
  };

  const withdrawConsent = () => {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
    // Disable analytics
    if (typeof window !== "undefined") {
      (window as Window & { analyticsEnabled?: boolean }).analyticsEnabled = false;
    }
    setShowBanner(true);
    setShowSettings(false);
    setAnalyticsEnabled(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center p-4 sm:items-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
      
      {/* Banner */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 border border-gray-200">
        {!showSettings ? (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              Cookie Preferences
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              We use cookies to ensure the website functions correctly (essential cookies) 
              and to understand how you use our site (analytics cookies). Analytics cookies 
              are only set with your consent.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              For more information, please read our{" "}
              <Link href="/cookies" className="text-primary-600 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={acceptAll}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Accept All
              </button>
              <button
                onClick={acceptEssentialOnly}
                className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Essential Only
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Manage Settings
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Cookie Settings
            </h2>
            
            <div className="space-y-4 mb-6">
              {/* Essential Cookies */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Essential Cookies</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    Always Active
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Required for the website to function. These cannot be disabled.
                  Includes session management and security cookies.
                </p>
              </div>
              
              {/* Analytics Cookies */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">Analytics Cookies</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={analyticsEnabled}
                      onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600">
                  Help us understand how visitors interact with our website. 
                  No personal data is collected. Used for aggregated, anonymous statistics only.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={saveSettings}
                className="flex-1 px-4 py-2.5 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors text-sm"
              >
                Save Preferences
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Export utility function to check consent status
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Export utility to withdraw consent (for settings pages)
export function withdrawCookieConsent() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(COOKIE_CONSENT_KEY);
  window.location.reload();
}
