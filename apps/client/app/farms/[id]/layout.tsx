import { farmsApi } from "@/lib/api/farmsApi"
import { Metadata, ResolvingMetadata } from "next"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { id } = await params
  const farm = await farmsApi.getById(id)

  return {
    title: farm.name,
    description: "Propriedade rutal",
  }
}

// TODO: move page.tsx to server side component
export default function FarmsLayout({ children }: { children: React.ReactNode }) {
  return (<>{children}</>)
}