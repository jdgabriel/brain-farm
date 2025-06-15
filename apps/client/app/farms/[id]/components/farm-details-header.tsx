import { MapPinHouse } from "lucide-react";
import { FarmDetailsProps } from "./props.type";

export function FarmDetailsHeader({ farm }: FarmDetailsProps) {
  return (
    <div className="flex flex-col items-start space-y-6">
      <div className="flex items-center w-full space-x-2 border-b-3 pb-4 mb-4">
        <MapPinHouse className="size-16" strokeWidth={1} />
        <div>
          <h1 className="text-3xl font-bold">{farm.name}</h1>
          <p className="text-muted-foreground">{farm.city} - {farm.state}</p>
        </div>
      </div>
    </div>
  )
}
