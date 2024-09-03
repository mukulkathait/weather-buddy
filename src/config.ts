const conf = {
  backendURL: String(import.meta.env.VITE_BACKEND_URL),
  cloudId: String(import.meta.env.VITE_CLOUD_ID),
  cloudSecret: String(import.meta.env.VITE_CLIENT_SECRET),
};

export default conf;
