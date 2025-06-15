import { FarmDataTable } from "@/components/farm/data-table/farms"
import { FarmPageHeader } from "./components/farm-header"

export default function FarmsPage() {
  return (
    <div className="p-6">
      <FarmPageHeader />
      <FarmDataTable />
    </div>
  )
}
