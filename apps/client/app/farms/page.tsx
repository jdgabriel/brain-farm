import { FarmDataTable } from "@/components/farm/data-table/farms"
import { Metadata } from "next"
import { FarmPageHeader } from "./components/farm-header"

export const metadata: Metadata = {
  title: "Propriedades",
  description: "Propriedades rutais",
}

export default function FarmsPage() {
  return (
    <div className="p-6">
      <FarmPageHeader />
      <FarmDataTable />
    </div>
  )
}
