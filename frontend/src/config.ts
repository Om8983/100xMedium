export const USERS_BACKEND_URL =
  import.meta.env.VITE_USERS_BACKEND_URL ||
  "http://localhost:8787/api/v1/users";
export const BLOGS_BACKEND_URL =
  import.meta.env.VITE_BLOGS_BACKEND_URL || "http://localhost:8787/api/v1/blog";
export const GOOGLE_AUTH_URL =
  import.meta.env.VITE_GOOGLE_AUTH_URL || "http://localhost:8787/auth/google";
