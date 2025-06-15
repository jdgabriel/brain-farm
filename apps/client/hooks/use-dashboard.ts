import { dashboardApi } from "@/lib/api/dashboardApi"
import { useQuery } from "@tanstack/react-query"

export const useFarmCount = () => {
 return useQuery({
    queryKey: ["dashboard", "farm-count"],
    queryFn: dashboardApi.getFarmCount,
  })
}

export const useProducerCount = () => {
 return useQuery({
    queryKey: ["dashboard", "producer-count"],
    queryFn: dashboardApi.gerProducerCount,
  })
}

export const useTotalHectare = () => {  
 return useQuery({
    queryKey: ["dashboard", "total-hectares"],
    queryFn: dashboardApi.getTotalHectares,
  })
}

export const useTotalCultive = () => {  
  return useQuery({
    queryKey: ["dashboard", "cultives"],
    queryFn: dashboardApi.getTotalCultive,
  })
}
