import { ProducerDataTable } from "@/components/producer/data-table/producer";
import { Metadata } from "next";
import { ProducerListHeader } from "./[producerId]/components/producer-header";

export const metadata: Metadata = {
  title: "Produtores",
  description: "Produtores rutais",
}

export default function Producer() {
  return (
    <div className="p-6">
      <ProducerListHeader />
      <ProducerDataTable />
    </div>
  )
}
