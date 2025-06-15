import { API_BASE_URL } from "./config";

export const dashboardApi = {
  getFarmCount: async (): Promise<{ count: number; }> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/farm-count`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },

  gerProducerCount: async (): Promise<{ count: number; }> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/producers-count`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },

  getTotalHectares: async (): Promise<{ totalHectares: number; }> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/total-area-count`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },

  getTotalCultive: async (): Promise<Array<{ culture: string; total: number; }>> => {
    const response = await fetch(`${API_BASE_URL}/dashboard/total-cultives`);
    if (!response.ok) throw new Error("Failed to fetch dashboard stats");
    return response.json();
  },
};
