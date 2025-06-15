import { ChartBarMixed } from "@/components/charts/cultivation-chart"
import { FarmCountChart } from "@/components/charts/farm-count.chart"
import { ProducerCountChart } from "@/components/charts/producer-count"
import { FarmTotalHectaresChart } from "@/components/charts/total-hectares.chart"
import { FarmDataTable } from "@/components/farm/data-table/farms"
import { DashboardHeader } from "./components/dashboard-header"

export default function DashboardPage() {
  return (
    <div className="p-6">
      <DashboardHeader />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <ProducerCountChart />
        <FarmCountChart />
        <FarmTotalHectaresChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FarmDataTable />
        <ChartBarMixed />
      </div>
    </div>
  )
}
