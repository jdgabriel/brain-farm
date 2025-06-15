import { FarmDataTable } from "@/components/farm/data-table/farms"
import { Metadata } from "next"
import { ProducerFarmListHeader } from "./components/producer-farm-header"

export const metadata: Metadata = {
  title: "Propriedades",
  description: "Propriedades rutais",
}

export default function FarmsPage() {
  return (
    <div className="p-6">
      <ProducerFarmListHeader />
      <FarmDataTable />
    </div>
  )
}
