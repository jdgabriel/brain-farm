'use client'

import { Skeleton } from "@/components/ui/skeleton";
import { useProducerCount } from "@/hooks/use-dashboard";
import { Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ProducerCountChart() {
  const { data, isLoading } = useProducerCount()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Produtores Cadastrados</CardTitle>
        <Users className="size-8 text-amber-600" />
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-[20px] w-[100px] rounded-md bg-zinc-200" /> : (
          <div className="text-5xl font-bold">{data?.count || 0}</div>
        )}
        <p className="text-xs text-muted-foreground">
          Total de produtores cadastrados
        </p>
      </CardContent>
    </Card >
  )
}