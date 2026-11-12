const isDevlopement = import.meta.env.VITE_NODE_ENV == "development";

const DEFAULT_URL = isDevlopement
  ? import.meta.env.VITE_DEV_API_URL
  : import.meta.env.VITE_API_URL;

export { DEFAULT_URL };
// Example values:
// http://localhost:2007/api/v1
// https://backend-chatrix-modern-real-time.onrender.com/api/v1
