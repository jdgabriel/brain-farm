'use client'

import { ProducerForm } from "@/components/producer/producer-form"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useState } from "react"

export function AddProducerButton() {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsFarmOpenOpen(true)}>
          <Plus className="h-4 w-4" />
          Adicionar produtor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Produtores</DialogTitle>
        <DialogDescription>Todos os produtores cadastrados</DialogDescription>
        <ProducerForm onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}