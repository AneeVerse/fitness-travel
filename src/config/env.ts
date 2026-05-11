// Environment variables with fallback values
const env = {
  // Email Configuration
  EMAIL_USER: process.env.EMAIL_USER || '',
  EMAIL_PASS: process.env.EMAIL_PASS || '',
  EMAIL_RECEIVER: process.env.EMAIL_RECEIVER || '',
  
  // Google Sheets Configuration
  GOOGLE_APPS_SCRIPT_URL: process.env.GOOGLE_APPS_SCRIPT_URL || '',
  
  // Node Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Site URL
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://tigerterrain.in',
};

// Helper function to get environment variables with fallback
export const getEnv = (key: keyof typeof env): string => {
  if (!(key in env)) {
    console.warn(`Environment variable ${key} is not defined in config`);
    return process.env[key] || '';
  }
  return env[key];
};

// Export all environment variables
export default env;

