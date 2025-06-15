import { FarmForm } from "@/components/farm/farm-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"
import {} from "react-day-picker"

interface Props {
  producerId: string
}

export function AddFarmToProducerButton({ producerId }: Props) {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsFarmOpenOpen(true)}>
          <Plus className="h-4 w-4" />
          Adicionar propriedade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Propriedade</DialogTitle>
        <DialogDescription>Informações da propriedade.</DialogDescription>
        <FarmForm producerId={producerId} onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}