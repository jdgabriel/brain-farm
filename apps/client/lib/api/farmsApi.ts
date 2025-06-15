import type { Farm } from "../types";
import { API_BASE_URL } from "./config";

export const farmsApi = {
  getAll: async (producerId: string): Promise<Farm[]> => {
    const url = new URL(`${API_BASE_URL}/farms`)
   if(producerId) url.searchParams.append('producerId', producerId)

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error("Failed to fetch farms");
    return response.json();
  },

  getById: async (id: string): Promise<Farm> => {
    const response = await fetch(`${API_BASE_URL}/farms/${id}`);
    if (!response.ok) throw new Error("Failed to fetch farm");
    return response.json();
  },

  create: async (farm: Omit<Farm, "id" | "createdAt" | "updatedAt">): Promise<Farm> => {
    const response = await fetch(`${API_BASE_URL}/farms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(farm),
    });
    if (!response.ok) throw new Error("Failed to create farm");
    return response.json();
  },

  update: async (id: string, farm: Partial<Farm>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/farms/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(farm),
    });
    if (!response.ok) throw new Error("Failed to update farm");
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/farms/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete farm");
  },
};
