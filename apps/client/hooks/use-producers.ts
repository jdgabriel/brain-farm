import { producersApi } from "@/lib/api/producerApi"
import { Producer } from "@/lib/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

export const useProducers = () => {
  return useQuery({
    queryKey: ["producers"],
    queryFn: () => producersApi.getAll(),
  })
}

export const useProducer = (producerId?: string | null) => {
  return useQuery({
    queryKey: ["producers", producerId],
    queryFn: () => producersApi.getById(producerId!),
    enabled: !!producerId
  })
}

export const useCreateProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: producersApi.create,
    onSuccess: () => {
      toast.success('Produtor criado com sucesso.')
      queryClient.invalidateQueries({ queryKey: ["producers"] })
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao criar o produtor')
    }
  })
}

export const useUpdateProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, ...producer }: { id: string } & Partial<Producer>) => producersApi.update(id, producer),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["producers"] })
      queryClient.invalidateQueries({ queryKey: ["producers", variables.id] })
      toast.success('Produtor atualizado.')
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao atualizar o produtor')
    }
  })
}
export const useDeleteProducer = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ producerId }: {producerId: string}) => producersApi.delete(producerId),
    onSuccess: () => {
      toast.success('Produtor excluído com sucesso.')
      queryClient.invalidateQueries({ queryKey: ["producers"] })
    },
    onError: () => {     
      toast.error('Ops! Ocorreu um erro ao excluir o produtor')
    }
  })
}
