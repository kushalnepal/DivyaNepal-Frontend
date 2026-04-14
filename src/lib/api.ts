const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface ApiResponse<T> {
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
  };
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "API request failed");
  }

  return response.json();
}

export const api = {
  // Auth
  auth: {
    register: (data: { name: string; email: string; password: string }) =>
      fetchApi<{ user: any; token: string }>("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    login: (data: { email: string; password: string }) =>
      fetchApi<{ user: any; token: string }>("/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    me: () => fetchApi<{ user: any }>("/auth/me"),
  },

  // Temples
  temples: {
    list: (params?: { page?: number; limit?: number; region?: string; type?: string }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      return fetchApi<ApiResponse<any[]>>(`/temples${query ? `?${query}` : ""}`);
    },
    get: (slug: string) => fetchApi<any>(`/temples/${slug}`),
    getFeatured: () => fetchApi<any[]>("/temples/featured"),
    create: (data: any) =>
      fetchApi<any>("/temples", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, data: any) =>
      fetchApi<any>(`/temples/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (id: string) =>
      fetchApi<void>(`/temples/${id}`, {
        method: "DELETE",
      }),
  },

  // Packages
  packages: {
    list: (params?: { page?: number; limit?: number; templeId?: string }) => {
      const query = new URLSearchParams(params as Record<string, string>).toString();
      return fetchApi<ApiResponse<any[]>>(`/packages${query ? `?${query}` : ""}`);
    },
    get: (slug: string) => fetchApi<any>(`/packages/${slug}`),
    getByTemple: (templeId: string) => fetchApi<any[]>(`/packages/temple/${templeId}`),
  },

  // Bookings
  bookings: {
    create: (data: any) =>
      fetchApi<any>("/bookings", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    list: () => fetchApi<any[]>("/bookings"),
    get: (id: string) => fetchApi<any>(`/bookings/${id}`),
  },

  // Contact
  contact: {
    submit: (data: { name: string; email: string; phone?: string; subject: string; message: string }) =>
      fetchApi<{ message: string }>("/contact", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },
};

export default api;