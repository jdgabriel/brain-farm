'use client'

import { FarmForm } from "@/components/farm/farm-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddFarmButton() {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsFarmOpenOpen(true)}>
          <Plus className="size-4" />
          Adicionar propriedade
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogTitle>Propriedade</DialogTitle>
        <DialogDescription>Informações da propriedade</DialogDescription>
        <FarmForm onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}