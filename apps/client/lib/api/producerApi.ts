import { Producer } from "../types"
import { API_BASE_URL } from "./config"

export const producersApi = {
  getAll: async (): Promise<Producer[]> => {
    const response = await fetch(`${API_BASE_URL}/producers`)
    if (!response.ok) throw new Error("Failed to fetch farms")
    return response.json()
  },

  getById: async (id: string): Promise<Producer> => {
    const response = await fetch(`${API_BASE_URL}/producers/${id}`)
    if (!response.ok) throw new Error("Failed to fetch farm")
    return response.json()
  },

  create: async (producer: Omit<Producer, "id" | "createdAt" | "updatedAt">): Promise<Producer> => {
    const response = await fetch(`${API_BASE_URL}/producers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producer),
    })
    if (!response.ok) throw new Error("Failed to create producer")
    return response.json()
  },

  update: async (id: string, producer: Partial<Producer>): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/producers/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producer),
    })
    if (!response.ok) throw new Error("Failed to update producer")
  },

  delete: async (producerId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/producers/${producerId}`, {
      method: "DELETE",
    })
    if (!response.ok) throw new Error("Failed to fetch producers")
  }
}