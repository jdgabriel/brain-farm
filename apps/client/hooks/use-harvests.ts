import { harvestsApi } from "@/lib/api/harvestsApi"
import type { Harvest } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useHarvests = (farmId: string) => {
  return useQuery({
    queryKey: ["harvests", farmId],
    queryFn: () => harvestsApi.getByFarmId(farmId),
    enabled: !!farmId,
  })
}

export const useHarvest = (farmId: string, harvestId?: string | null) => {
  return useQuery({
    queryKey: ["harvests", farmId, harvestId],
    queryFn: () => harvestsApi.getHarvestById(farmId, harvestId!),
    enabled: !!harvestId,
  })
}

export const useCreateHarvest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: harvestsApi.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests", variables.farmId] })
    },
  })
}

export const useUpdateHarvest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...harvest }: { id: string } & Partial<Harvest>) => harvestsApi.update(id, harvest),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests", variables.farmId] })
    },
  })
}

export const useDeleteHarvest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ farmId, harvestId }: {farmId: string, harvestId: string}) => harvestsApi.delete(farmId, harvestId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["harvests", variables.farmId] })
    },
  })
}
