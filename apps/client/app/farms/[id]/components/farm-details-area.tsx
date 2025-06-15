import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FarmDetailsProps } from "./props.type";

export function FarmDetailsArea({ farm }: FarmDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">Área total</span>
            <span>{farm.totalArea} ha</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Área de cultivo</span>
            <span>{farm.arableArea} ha</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Área de vegetação</span>
            <span>{farm.vegetationArea} ha</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
