const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const API_URL_HAS_PREFIX = /\/api$/i.test(API_URL);

const buildUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (API_URL_HAS_PREFIX) {
    return `${API_URL}${normalizedPath.replace(/^\/api(?=\/)/i, "")}`;
  }

  const apiPath = normalizedPath.startsWith("/api/") || API_URL_HAS_PREFIX
    ? normalizedPath
    : `/api${normalizedPath}`;
  return `${API_URL}${apiPath}`;
};

export const apiRequest = async (path, method = "GET", body, token) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(buildUrl(path), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new Error(data?.message || `Request failed: ${res.status}`);
  }

  return data;
};
