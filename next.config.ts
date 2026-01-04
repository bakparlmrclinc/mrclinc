import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
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
=======
  // Enable strict mode for better development experience
  reactStrictMode: true,
>>>>>>> fbe244dc6a2a09a9931f00d5083a54561d3a7e4b
};

export default nextConfig;
