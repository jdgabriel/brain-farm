import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { ProducerForm } from "../producer-form";

interface Props {
  producerId: string
}

export function ProducerEditButton({ producerId }: Props) {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsFarmOpenOpen(true)}>
          <Edit className="h-4 w-4" />
          Informações
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Produtor</DialogTitle>
        <DialogDescription>Informações do produtor.</DialogDescription>
        <ProducerForm producerId={producerId} onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}