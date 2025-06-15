import { ChartBar } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col items-start space-y-6">
      <div className="flex items-center w-full space-x-2 border-b-3 pb-4 mb-4">
        <ChartBar className="size-16" strokeWidth={1} />
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe o andamento do sistema</p>
        </div>
      </div>
    </div>
  )
}
