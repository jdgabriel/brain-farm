import { farmsApi } from "@/lib/api/farmsApi"
import type { Farm } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useFarms = (producerId: string) => {
  return useQuery({
    queryKey: ["farms", producerId],
    queryFn: () => farmsApi.getAll(producerId),
  })
}

export const useFarm = (farmId?: string | null) => {
  return useQuery({
    queryKey: ["farms", farmId].filter(Boolean),
    queryFn: () => farmsApi.getById(farmId!),
    enabled: !!farmId
  })
}

export const useCreateFarm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: farmsApi.create,
    onSuccess: () => {
      toast.success("Propriedade criada com sucesso.")
      queryClient.invalidateQueries({ queryKey: ["farms"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
    onError: () => {
      toast.error("Erro ao criar a propriedade, tente novamente.")
    },
  })
}

export const useUpdateFarm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...farm }: { id: string } & Partial<Farm>) => farmsApi.update(id, farm),
    onSuccess: (_, variables) => {
      toast.success("Propriedade atualizada.")
      queryClient.invalidateQueries({ queryKey: ["farms"] })
      queryClient.invalidateQueries({ queryKey: ["farms", variables.id] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
    onError: () => {
      toast.error("Erro ao realizar atualizada desta propriedade, tente novamente.")
    },
  })
}

export const useDeleteFarm = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: farmsApi.delete,
    onSuccess: () => {
      toast.success("Propriedade excluída.")
      queryClient.invalidateQueries({ queryKey: ["farms"] })
      queryClient.invalidateQueries({ queryKey: ["dashboard"] })
    },
    onError: () => {
      toast.error("Erro ao excluir essa propriedade, tente novamente.")
    },
  })
}
