import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateCultivation, useCultivations, useDeleteCultivation, useUpdateCultivation } from "@/hooks/use-cultivations"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { DatePicker } from "../ui/data-picker"
import { Label } from "../ui/label"

export const CultivationsStatus = ['PLANTED', 'GROWING', 'HARVESTED', 'PLOWING'] as const

export const CultivationsStatusLabels: Record<(typeof CultivationsStatus)[number], { label: string; translation: string }> = {
  PLOWING: {
    label: 'PLOWING',
    translation: 'Preparação'
  },
  PLANTED: {
    label: 'Planted',
    translation: 'Plantio iniciado',
  },
  GROWING: {
    label: 'Growing',
    translation: 'Em crescimento',
  },
  HARVESTED: {
    label: 'Harvested',
    translation: 'Colheira realizada',
  },
};

const cultiveSchema = z.object({
  cultivations: z.array(
    z.object({
      id: z.string().uuid().optional(),
      culture: z.string().min(1, "Culture name is required"),
      area: z.coerce.number().min(1, 'Área inválida'),
      plantingDate: z.coerce.date(),
      expectedHarvestDate: z.coerce.date(),
      status: z.enum(CultivationsStatus),
    })
  ),
})

type CultivesFormData = z.infer<typeof cultiveSchema>

interface CultivesFormProps {
  onSubmitForm: () => void
  harvestId: string
}

export function CultivesForm({ harvestId, onSubmitForm }: CultivesFormProps) {
  const { data: cultivesInfo, isLoading } = useCultivations(harvestId)
  const createCultivations = useCreateCultivation()
  const updateCultivation = useUpdateCultivation()
  const deleteCultivation = useDeleteCultivation()

  const [excludeCultives, setExcludeCultives] = useState<Array<string>>([])

  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CultivesFormData>({
    resolver: zodResolver(cultiveSchema),
    values: {
      cultivations: cultivesInfo ?? [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "cultivations",
  })

  function addToRemove(index: number) {
    const cultive = getValues(`cultivations.${index}.id`)
    if (cultive) {
      setExcludeCultives((prev) => [...prev, cultive])
    }
    remove(index)
  }

  function appendCultivation() {
    append({ culture: '', area: 0, expectedHarvestDate: new Date(), plantingDate: new Date(), status: 'GROWING' })
  }

  async function onSubmit(data: CultivesFormData) {
    /** Update all cultives when exists */
    await Promise.all(
      data.cultivations.filter(cultive => cultive.id).map(cultive =>
        updateCultivation.mutateAsync({ id: cultive.id!, harvestId, ...cultive })
      )
    )

    /** Exclude all cultives when exist */
    if (excludeCultives.length > 0) {
      await Promise.all(
        excludeCultives.map(cultiveId =>
          deleteCultivation.mutateAsync({ cultiveId, harvestId })
        )
      )
    }

    /** Create when not exists ID */
    await Promise.all(
      data.cultivations.filter(cultive => !cultive.id).map(cultive =>
        createCultivations.mutateAsync({ harvestId, ...cultive })
      )
    )

    onSubmitForm()
  }

  return (
    <>
      {isLoading &&
        (<div className="h-full w-full flex flex-col gap-8 items-center justify-center">
          <Loader2 className="size-14 animate-spin" />
          Carregando informações
        </div>
        )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={index} className="space-y-2 p-3 border-2 rounded-md">
            <div className="space-y-2">
              <Label>Cultivo</Label>
              <div className="flex gap-2">
                <div className="flex flex-1 flex-col">
                  <Input id={`cultivations.${index}.culture`} {...register(`cultivations.${index}.culture`)} />
                  {errors.cultivations?.[index]?.culture && (
                    <p className="text-sm text-red-500">
                      {errors.cultivations[index]?.culture?.message}
                    </p>
                  )}
                </div>
                <Button variant='ghost' onClick={() => addToRemove(index)} className="text-red-600 hover:text-red-700">
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div className="space-y-2">
                <Label>Área</Label>
                <Input id={`cultivations.${index}.area`} type="number" {...register(`cultivations.${index}.area`)} />
                {errors.cultivations?.[index]?.area && (
                  <p className="text-sm text-red-500">
                    {errors.cultivations[index]?.area?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Início</Label>
                <Controller
                  name={`cultivations.${index}.plantingDate`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker date={field.value} onDateChange={field.onChange} />
                  )}
                />
                {errors.cultivations?.[index]?.plantingDate && (
                  <p className="text-sm text-red-500">
                    {errors.cultivations[index]?.plantingDate?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Colheira</Label>
                <Controller
                  name={`cultivations.${index}.expectedHarvestDate`}
                  control={control}
                  render={({ field }) => (
                    <DatePicker date={field.value} onDateChange={field.onChange} />
                  )}
                />
                {errors.cultivations?.[index]?.expectedHarvestDate && (
                  <p className="text-sm text-red-500">
                    {errors.cultivations[index]?.expectedHarvestDate?.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Controller
                  name={`cultivations.${index}.status`}
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status</SelectLabel>
                          {Object.entries(CultivationsStatusLabels).map(([value, { translation }]) => (
                            <SelectItem key={value} value={value}>
                              {translation}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.cultivations?.[index]?.status && (
                  <p className="text-sm text-red-500">
                    {errors.cultivations[index]?.status?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="secondary" onClick={appendCultivation} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar cultivo
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
          Salvar colheita
        </Button>
      </form>
    </>
  )
}
