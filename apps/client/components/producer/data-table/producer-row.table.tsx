import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Producer } from "@/lib/types";
import { formatDocument } from "@/lib/utils";
import { WarehouseIcon } from "lucide-react";
import Link from "next/link";
import { ProducerDocumentTypeLabels } from "../producer-form";
import { ProducerEditButton } from "./producer-edit-button";
import { ProducerTrashButton } from "./producer-trash-button";

interface Props {
  producer: Producer
}

export function ProducerRowTable({ producer }: Props) {
  return (
    <TableRow key={producer.id}>
      <TableCell className="font-medium">{producer.name}</TableCell>
      <TableCell>{formatDocument(producer.document)}</TableCell>
      <TableCell>{ProducerDocumentTypeLabels[producer.docType].description}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/producers/${producer.id}/farms`}>
              <WarehouseIcon className="h-4 w-4" />
              Propriedades
            </Link>
          </Button>
          <ProducerEditButton producerId={producer.id} />
          <ProducerTrashButton producerId={producer.id} />
        </div>
      </TableCell>
    </TableRow>
  )
}