import { cultivationsApi } from "@/lib/api/cultivationsApi"
import type { Cultivation } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

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
      toast.success('Cultivo criado com sucesso')
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao criar o cultivo')
    }
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
      toast.success('Cultivo atualizada com sucesso')
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao atualizar o cultivo')
    }
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
      toast.success('Cultivo excluído com sucesso')
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao excluir o cultivo')
    }
  })
}
