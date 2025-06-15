'use client'

import { useProducer } from "@/hooks/use-producers";
import { Warehouse } from "lucide-react";
import { useParams } from "next/navigation";
import { AddFarmToProducerButton } from "./producer-farm-button";

export function ProducerFarmListHeader() {
  const { producerId } = useParams<{ producerId: string }>()
  const { data: producer } = useProducer(producerId)

  return (
    <div className="flex flex-col items-start space-y-6 w-full">
      <div className="flex w-full items-center justify-between border-b-3 pb-4 mb-4">
        <div className="flex items-center space-x-2 ">
          <Warehouse className="size-20" strokeWidth={1} />
          <div>
            <h1 className="text-3xl font-bold">Propriedades - {producer?.name}</h1>
            <p className="text-muted-foreground">Toda as propriedades cadastradas</p>
          </div>
        </div>
        <AddFarmToProducerButton producerId={producerId} />
      </div>
    </div>
  )
}
