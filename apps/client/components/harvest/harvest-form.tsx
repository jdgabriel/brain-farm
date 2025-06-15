import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCreateHarvest, useHarvest, useUpdateHarvest } from "@/hooks/use-harvests"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const harvestSchema = z.object({
  name: z.string().min(1, "Harvest name is required"),
  // startDate: z.string().min(1, "Start date is required"),
  // endDate: z.string().min(1, "End date is required"),
  // status: z.enum(["planning", "active", "completed"]),
})

type HarvestFormData = z.infer<typeof harvestSchema>

interface HarvestFormProps {
  onSubmitForm: () => void,
  farmId: string,
  harvestId?: string | null
}

export function HarvestForm({ farmId, harvestId, onSubmitForm }: HarvestFormProps) {
  const updateHarvest = useUpdateHarvest()
  const createHarvest = useCreateHarvest()
  const { data: harvestInfo } = useHarvest(farmId, harvestId)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<HarvestFormData>({
    resolver: zodResolver(harvestSchema),
    values: harvestInfo
  })

  async function onSubmit(harvest: HarvestFormData) {
    if (harvestInfo?.id) {
      await updateHarvest.mutateAsync({ id: harvestInfo?.id, farmId, ...harvest })
      onSubmitForm()
      return
    }

    await createHarvest.mutateAsync({ ...harvest, farmId })
    onSubmitForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Descrição</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* <div>
        <Label htmlFor="startDate">Start Date</Label>
        <Input id="startDate" type="date" {...register("startDate")} />
        {errors.startDate && <p className="text-sm text-red-500">{errors.startDate.message}</p>}
      </div>

      <div>
        <Label htmlFor="endDate">End Date</Label>
        <Input id="endDate" type="date" {...register("endDate")} />
        {errors.endDate && <p className="text-sm text-red-500">{errors.endDate.message}</p>}
      </div>

      <div>
        <Label htmlFor="status">Status</Label>
        <Select value={status} onValueChange={(val) => setValue("status", val as any)}>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && <p className="text-sm text-red-500">{errors.status.message}</p>}
      </div> */}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        {harvestInfo ? "Atualizar colheira" : "Criar colheira"}
      </Button>
    </form>
  )
}
