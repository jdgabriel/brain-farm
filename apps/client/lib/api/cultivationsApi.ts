import type { Cultivation } from "../types";
import { API_BASE_URL } from "./config";

export const cultivationsApi = {
  getByHarvestId: async (harvestId: string): Promise<Cultivation[]> => {
    const response = await fetch(`${API_BASE_URL}/harvest/${harvestId}/cultivations`);
    if (!response.ok) throw new Error("Failed to fetch cultivations");
    return response.json();
  },

  create: async (cultivation: Omit<Cultivation, "id" | "createdAt" | "updatedAt">): Promise<Cultivation> => {
    const response = await fetch(`${API_BASE_URL}/harvest/${cultivation.harvestId}/cultivations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cultivation),
    });
    if (!response.ok) throw new Error("Failed to create cultivation");
    return response.json();
  },

  update: async (id: string, cultivation: Partial<Cultivation>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/harvest/${cultivation.harvestId}/cultivations/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cultivation),
    });
    if (!response.ok) throw new Error("Failed to update cultivation");
  },

  delete: async (harvestId: String, cultiveId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/harvest/${harvestId}/cultivations/${cultiveId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete cultivation");
  },
};
