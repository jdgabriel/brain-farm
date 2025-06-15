import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { FarmForm } from "../farm-form";

interface Props {
  farmId: string
}

export function FarmEditButton({ farmId }: Props) {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsFarmOpenOpen(true)}>
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Propriedade</DialogTitle>
        <DialogDescription>Informações da propriedade.</DialogDescription>
        <FarmForm farmId={farmId} onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}