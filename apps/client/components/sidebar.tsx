"use client"

import { cn } from "@/lib/utils"
import { BrainCircuit, Home, Users, Warehouse } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Produtores", href: "/producers", icon: Users },
  { name: "Propriedades", href: "/farms", icon: Warehouse },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <BrainCircuit className="size-8 text-green-600" />
          <h1 className="text-2xl font-bold text-green-800">Brain Farm</h1>
        </div>
      </div>
      <nav className="mt-6">
        <div className="px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1",
                  isActive
                    ? "bg-green-400 text-green-900"
                    : "text-zinc-600 hover:bg-green-50 hover:text-green-900",
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
