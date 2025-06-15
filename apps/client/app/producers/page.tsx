import { ProducerDataTable } from "@/components/producer/data-table/producer";
import { ProducerListHeader } from "./[producerId]/components/producer-header";

export default function Producer() {
  return (
    <div className="p-6">
      <ProducerListHeader />
      <ProducerDataTable />
    </div>
  )
}
