import { Users } from "lucide-react";
import { AddProducerButton } from "./producer-button";

export function ProducerListHeader() {
  return (
    <div className="flex flex-col items-start space-y-6 w-full">
      <div className="flex w-full items-center justify-between border-b-3 pb-4 mb-4">
        <div className="flex items-center space-x-2 ">
          <Users className="size-20" strokeWidth={1} />
          <div>
            <h1 className="text-3xl font-bold">Produtores</h1>
            <p className="text-muted-foreground">Todos os produtores cadastrados</p>
          </div>
        </div>
        <AddProducerButton />
      </div>
    </div>
  )
}
