import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import { Harvest } from "@/lib/types";

import { format } from "date-fns";
import { CultivationsStatusLabels } from "../cultives-form";
import { HarvestCultiveButton } from "./harvest-cultives";
import { HarvestEditButton } from "./harvest-edit-button";
import { FarmTrashButton } from "./harvest-trash-button";

interface Props {
  harvest: Harvest
}

export function HarvestRowTable({ harvest }: Props) {
  return (
    <TableRow key={harvest.id}>
      <TableCell className="font-medium">{harvest.name}</TableCell>
      <HarvestDateCell date={harvest.plantingDate} />
      <HarvestDateCell date={harvest.expectedHarvestDate} />
      <TableCell>
        <Badge variant={"default"} >
          {CultivationsStatusLabels[harvest.status].translation}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex space-x-2">
          <HarvestCultiveButton harvestId={harvest.id} farmId={harvest.farmId} />
          <HarvestEditButton harvestId={harvest.id} farmId={harvest.farmId} />
          <FarmTrashButton harvestId={harvest.id} farmId={harvest.farmId} />
        </div>
      </TableCell>
    </TableRow>
  )
}

function HarvestDateCell({ date }: { date?: Date | string | null }) {
  if (date) {
    return (
      <TableCell>{format(date, 'dd/MM/yyyy')}</TableCell>
    )
  }

  return (<TableCell>-/-</TableCell>)
}