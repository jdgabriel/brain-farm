
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trees } from "lucide-react";
import { useState } from "react";
import { CultivesForm } from "../cultives-form";

interface Props {
  harvestId: string
  farmId: string
}

export function HarvestCultiveButton({ harvestId, farmId }: Props) {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsFarmOpenOpen(true)}>
          <Trees className="size-4" />
          Cultivos
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogTitle>Cultivos</DialogTitle>
        <DialogDescription>Lista de itens cultivados</DialogDescription>
        <CultivesForm harvestId={harvestId} onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}