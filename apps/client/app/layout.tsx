import { Sidebar } from "@/components/sidebar"
import { Toaster } from "@/components/ui/sonner"
import { QueryProvider } from "@/lib/query-client"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import type React from "react"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | Brain Farm",
    default: "Brain Farm",
  },
  description: "Simplificando o campo",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">{children}</main>
          </div>
        </QueryProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  )
}
