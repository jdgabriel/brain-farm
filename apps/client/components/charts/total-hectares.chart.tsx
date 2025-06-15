'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useTotalHectare } from "@/hooks/use-dashboard";
import { Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function FarmTotalHectaresChart() {
  const { data, isLoading } = useTotalHectare()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Área total (hectares)</CardTitle>
        <Sprout className="size-8 text-green-600" />
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-[20px] w-[100px] rounded-md bg-zinc-200" /> : (
          <div className="text-4xl font-bold">
            {new Intl.NumberFormat("pt-PT", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            }).format(data?.totalHectares || 0)} ha
          </div>
        )}
        <p className="text-xs text-muted-foreground">
          Total de hectares registrados
        </p>
      </CardContent>
    </Card >
  )
}