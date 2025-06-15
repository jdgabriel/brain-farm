import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCreateProducer, useProducer, useUpdateProducer } from "@/hooks/use-producers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

export const ProducerDocumentType = ['CNPJ', 'CPF'] as const

export const ProducerDocumentTypeLabels: Record<(typeof ProducerDocumentType)[number], { label: string; description: string }> = {
  CNPJ: {
    label: 'CNPJ',
    description: 'Pessoa Jurídica',
  },
  CPF: {
    label: 'CPF',
    description: 'Pessoa Física',
  },
};

const producerSchema = z.object({
  name: z.string().min(1, 'Preencha um nome válido.'),
  document: z.string().min(1, 'Preencha um documento válido.'),
  docType: z.enum(ProducerDocumentType),
})

type ProducerFormData = z.infer<typeof producerSchema>

interface Props {
  onSubmitForm: () => void,
  producerId?: string | null
}

export function ProducerForm({ producerId, onSubmitForm }: Props) {
  const { data: producerInfo } = useProducer(producerId)
  const updateProducer = useUpdateProducer()
  const createProducer = useCreateProducer()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProducerFormData>({
    resolver: zodResolver(producerSchema),
    values: producerInfo
  })

  async function onSubmit(producer: ProducerFormData) {
    if (producerInfo?.id) {
      await updateProducer.mutateAsync({ id: producerInfo.id, ...producer })
      onSubmitForm()
      return
    }
    await createProducer.mutateAsync(producer)
    onSubmitForm()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome do produtor</Label>
        <Input id="name" {...register("name")} />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">N° do Documento</Label>
        <Input id="location" {...register("document")} />
        {errors.document && <p className="text-red-500 text-sm">{errors.document.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Tipo de documento</Label>
        <Controller
          name={'docType'}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Documento" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipo de documento</SelectLabel>
                  {Object.entries(ProducerDocumentTypeLabels).map(([value, { description, label }]) => (
                    <SelectItem key={value} value={value}>
                      {description}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.docType && <p className="text-red-500 text-sm">{errors.docType.message}</p>}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="mr-2 size-4 animate-spin" />}
        {isSubmitting ? "Salvando..." : "Salvar"}
      </Button>
    </form>
  )
}
