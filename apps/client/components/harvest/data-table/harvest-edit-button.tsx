import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit } from "lucide-react";
import { useState } from "react";
import { HarvestForm } from "../harvest-form";

interface Props {
  harvestId: string
  farmId: string
}

export function HarvestEditButton({ harvestId, farmId }: Props) {
  const [isOpen, setIsFarmOpenOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsFarmOpenOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => setIsFarmOpenOpen(true)}>
          <Edit className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Colheita</DialogTitle>
        <DialogDescription>Informações da colheita.</DialogDescription>
        <HarvestForm farmId={farmId} harvestId={harvestId} onSubmitForm={() => setIsFarmOpenOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}