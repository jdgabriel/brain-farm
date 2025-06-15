import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Farm } from "@/lib/types";

import { Eye } from "lucide-react";
import Link from "next/link";
import { FarmEditButton } from "./farm-edit-button";
import { FarmTrashButton } from "./farm-trash-button";

interface Props {
  farm: Farm
}

export function FarmRowTable({ farm }: Props) {
  return (
    <TableRow key={farm.id}>
      <TableCell className="font-medium">{farm.name}</TableCell>
      <TableCell>{farm.city} - {farm.state}</TableCell>
      <TableCell>{farm.totalArea}</TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/farms/${farm.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <FarmEditButton farmId={farm.id} />
          <FarmTrashButton farmId={farm.id} />
        </div>
      </TableCell>
    </TableRow>
  )
}