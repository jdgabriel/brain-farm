'use client'

import { TableSkeleton } from "@/components/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFarms } from "@/hooks/use-farms";
import { useParams } from "next/navigation";
import { FarmRowTable } from "./farm-row.table";

export function FarmDataTable() {
  const { producerId } = useParams<{ producerId: string }>()
  const { data: farms, isLoading, isRefetching } = useFarms(producerId)

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Propriedades agrícolas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead>Área (ha)</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading || isRefetching && <TableSkeleton rows={5} columns={4} />}
            <TableBody>
              {farms?.map((farm) => (<FarmRowTable key={farm.id} farm={farm} />))}
              {farms?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nâo existem propriedades registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}