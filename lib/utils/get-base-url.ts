/**
 * Returns the base URL for the application based on the current environment
 * @returns {string} The base URL
 * @throws {Error} If APP_URL is not defined in production
 */
export function getBaseUrl(): string {
  if (process.env.NODE_ENV === "production") {
    return process.env.APP_URL!;
  } else {
    return "http://localhost:3000";
  }
}
