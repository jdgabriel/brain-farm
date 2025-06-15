import { cultivationsApi } from "@/lib/api/cultivationsApi"
import type { Cultivation } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useCultivations = (harvestId: string) => {
  return useQuery({
    queryKey: ["cultivations", harvestId],
    queryFn: () => cultivationsApi.getByHarvestId(harvestId),
    enabled: !!harvestId,
  })
}

export const useCreateCultivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: cultivationsApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests"], })
      queryClient.invalidateQueries({ queryKey: ["cultivations", variables.harvestId] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}

export const useUpdateCultivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...cultivation }: { id: string } & Partial<Cultivation>) =>
      cultivationsApi.update(id, cultivation),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests"], })
      queryClient.invalidateQueries({ queryKey: ["cultivations", variables.harvestId] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}

export const useDeleteCultivation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cultiveId, harvestId }:{ cultiveId: string, harvestId: string }) => 
      cultivationsApi.delete(harvestId, cultiveId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests"], })
      queryClient.invalidateQueries({ queryKey: ["cultivations", variables.harvestId] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
  })
}
