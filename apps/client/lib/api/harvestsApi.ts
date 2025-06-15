import type { Harvest } from "../types";
import { API_BASE_URL } from "./config";

export const harvestsApi = {
  getHarvestById: async (farmId: string, harvestId: string): Promise<Harvest> => {
    const response = await fetch(`${API_BASE_URL}/farm/${farmId}/harvest/${harvestId}`);
    if (!response.ok) throw new Error("Failed to fetch harvests");
    return response.json();
  },

  getByFarmId: async (farmId: string): Promise<Harvest[]> => {
    const response = await fetch(`${API_BASE_URL}/farm/${farmId}/harvest`);
    if (!response.ok) throw new Error("Failed to fetch harvests");
    return response.json();
  },

  create: async (harvest: Omit<Harvest, "id" | "createdAt" | "updatedAt">): Promise<Harvest> => {
    const response = await fetch(`${API_BASE_URL}/farm/${harvest.farmId}/harvest`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(harvest),
    });
    if (!response.ok) throw new Error("Failed to create harvest");
    return response.json();
  },

  update: async (id: string, harvest: Partial<Harvest>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/farm/${harvest.farmId}/harvest/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(harvest),
    });
    if (!response.ok) throw new Error("Failed to update harvest");
  },

  delete: async (farmId: string, harvestId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/farm/${farmId}/harvest/${harvestId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete harvest");
  },
};
