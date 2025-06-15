import { Warehouse } from "lucide-react";
import { AddFarmButton } from "./farm-button";

export function FarmPageHeader() {
  return (
    <div className="flex flex-col items-start space-y-6 w-full">
      <div className="flex w-full items-center justify-between border-b-3 pb-4 mb-4">
        <div className="flex items-center space-x-2 ">
          <Warehouse className="size-16" strokeWidth={1} />
          <div>
            <h1 className="text-3xl font-bold">Propriedades</h1>
            <p className="text-muted-foreground">Toda as propriedades cadastradas</p>
          </div>
        </div>
        <AddFarmButton />
      </div>
    </div>
  )
}
