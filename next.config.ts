import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Development: No CSP restrictions for HMR/dev tools
  // Production: Can add strict CSP via headers() if needed
  async headers() {
    if (process.env.NODE_ENV === 'development') {
      // No CSP in development - allows HMR, eval, etc.
      return [];
    }
    
    // Production CSP (optional - add if needed)
    return [];
  },
};

export default nextConfig;
