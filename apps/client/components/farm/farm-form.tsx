import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateFarm, useFarm, useUpdateFarm } from "@/hooks/use-farms"
import { useProducers } from "@/hooks/use-producers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select"

const farmSchema = z.object({
  name: z.string().min(1, 'Preencha um nome válido.'),
  city: z.string().min(1, 'Preencha uma cidade válida.'),
  state: z.string().min(2, 'Preencha com o nome ou sigla do estado.'),
  totalArea: z.coerce.number({ message: 'Informe apenas números.' }).min(1, 'Coloque a área total da propriedade'),
  arableArea: z.coerce.number({ message: 'Informe apenas números.' }).min(1, 'Coloque a área total de cultivo'),
  vegetationArea: z.coerce.number({ message: 'Informe apenas números.' }).min(1, 'Coloque a área total da vegetação'),
  producerId: z.string().uuid(),
})

type FarmFormData = z.infer<typeof farmSchema>

interface Props {
  onSubmitForm: () => void,
  farmId?: string | null
  producerId?: string | null
}

export function FarmForm({ farmId, producerId, onSubmitForm }: Props) {
  const updateFarm = useUpdateFarm()
  const createFarm = useCreateFarm()
  const { data: formInfo } = useFarm(farmId)
  const { data: producers } = useProducers()

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FarmFormData>({
    resolver: zodResolver(farmSchema),
    values: formInfo
  })

  useEffect(() => {
    if (producerId) setValue('producerId', producerId)
  }, [producerId])

  async function onSubmit(farm: FarmFormData) {
    if (formInfo?.id) {
      await updateFarm.mutateAsync({ id: formInfo.id, ...farm })
      onSubmitForm()
      return
    }
    await createFarm.mutateAsync(farm)
    onSubmitForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!producerId && (
        <div className="space-y-2">
          <Label>Produtor</Label>
          <Controller
            name="producerId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um produtor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Produtores</SelectLabel>
                    {producers?.map((producer) => (
                      <SelectItem key={producer.id} value={producer.id}>
                        {producer.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.producerId && (<p className="text-sm text-red-500"> {errors.producerId?.message}</p>)}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nome da propriedade</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Cidade</Label>
        <Input id="location" {...register("city")} />
        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Estado</Label>
        <Input id="location" {...register("state")} />
        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="totalArea">Área Total (hectares)</Label>
        <Input id="totalArea" step="1" {...register("totalArea")} />
        {errors.totalArea && <p className="text-red-500 text-sm">{errors.totalArea.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="arableArea">Área de Cultivo (hectares)</Label>
        <Input id="arableArea" step="1" {...register("arableArea")} />
        {errors.arableArea && (
          <p className="text-red-500 text-sm">{errors.arableArea.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="vegetationArea">Área de Vegetação (hectares)</Label>
        <Input id="vegetationArea" step="1" {...register("vegetationArea")} />
        {errors.vegetationArea && (
          <p className="text-red-500 text-sm">{errors.vegetationArea.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        {isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  )
}
