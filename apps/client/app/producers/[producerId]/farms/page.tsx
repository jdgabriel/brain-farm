import { FarmDataTable } from "@/components/farm/data-table/farms"
import { ProducerFarmListHeader } from "./components/producer-farm-header"

export default function FarmsPage() {
  return (
    <div className="p-6">
      <ProducerFarmListHeader />
      <FarmDataTable />
    </div>
  )
}
