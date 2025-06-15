'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDeleteProducer } from "@/hooks/use-producers";
import { Trash2 } from "lucide-react";

interface Props {
  producerId: string
}

export function ProducerTrashButton({ producerId }: Props) {
  const deleteProducer = useDeleteProducer()

  const handleDelete = async () => {
    await deleteProducer.mutateAsync({ producerId })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" onClick={() => {}}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja excluir este produtor?</AlertDialogTitle>
          <AlertDialogDescription>
            <p>Todas as propriedades e colheitas serão ser excluídas.</p>
            <p>Esta ação não pode ser desfeita.</p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Sim, continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}