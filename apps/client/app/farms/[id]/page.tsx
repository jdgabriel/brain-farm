"use client"

import { HarvestDataTable } from "@/components/harvest/data-table/harvest"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFarm } from "@/hooks/use-farms"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { FarmDetailsArea } from "./components/farm-details-area"
import { FarmDetailsHeader } from "./components/farm-details-header"
import { HarvestAddButton } from "./components/harvest-create-button"

export default function FarmDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const { data: farm, isLoading } = useFarm(id)

  return (
    <div className="p-6">
      {!farm || isLoading ? (
        <div className="h-full w-full flex flex-col gap-8 items-center justify-center">
          <Loader2 className="size-12 animate-spin" />
          Carregando informações
        </div>
      ) : (
        <>
          <FarmDetailsHeader farm={farm} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <FarmDetailsArea farm={farm} />
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Colheitas</CardTitle>
                  <HarvestAddButton />
                </div>
              </CardHeader>
              <CardContent>
                <HarvestDataTable />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  )
}
