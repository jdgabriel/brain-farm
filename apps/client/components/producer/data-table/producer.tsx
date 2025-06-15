'use client'

import { TableSkeleton } from "@/components/table-skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useProducers } from "@/hooks/use-producers";
import { ProducerRowTable } from "./producer-row.table";

export function ProducerDataTable() {
  const { data: producers, isLoading } = useProducers()

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
                <TableHead>Documento</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            {isLoading && <TableSkeleton rows={5} columns={4} />}
            <TableBody>
              {producers?.map((producer) => (<ProducerRowTable key={producer.id} producer={producer} />))}
              {producers?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground">
                    Nâo existem produtores registrados
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