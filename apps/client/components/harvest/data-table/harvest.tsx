import { TableSkeleton } from "@/components/table-skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useHarvests } from "@/hooks/use-harvests";
import { useParams } from "next/navigation";
import { HarvestRowTable } from "./harvest-row.table";

export function HarvestDataTable() {
  const { id } = useParams<{ id: string }>()
  const { data: harvests, isLoading } = useHarvests(id)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descrição</TableHead>
          <TableHead>Previsão de início</TableHead>
          <TableHead>Previsão de colheira</TableHead>
          <TableHead>Andamento</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading && <TableSkeleton rows={3} columns={5} />}
      <TableBody>
        {harvests?.map((harvest) => (<HarvestRowTable key={harvest.id} harvest={harvest} />))}
        {harvests?.length === 0 && (
          <TableRow>
            <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
              Nâo há períodos de colheita cadastrados
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}
