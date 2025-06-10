/**
 * Returns the base URL for the application based on the current environment
 * @returns {string} The base URL
 * @throws {Error} If APP_URL is not defined in production
 */
export function getBaseUrl(): string {
  const ENV = process.env.NODE_ENV || "development";
  const PROD_URL = process.env.APP_URL;

  switch (ENV) {
    case "development":
      return "http://localhost:3000";
    case "production":
      if (!PROD_URL) {
        throw new Error(
          "APP_URL environment variable is not defined in production",
        );
      }
      return PROD_URL;
    default:
      return "http://localhost:3000"; // Fallback to development URL
  }
}
