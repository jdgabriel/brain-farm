"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart"
import { useTotalCultive } from "@/hooks/use-dashboard"
import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartConfig = {
  total: {
    label: "Total cultivo: ",
    color: "var(--chart-4)",
  }
} satisfies ChartConfig

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function ChartBarMixed() {
  const { data } = useTotalCultive()

  const dataFormatted = (data ?? []).map((dt, index) => ({
    ...dt,
    fill: DEFAULT_COLORS[index]
  }))

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>TOP 5 Cultivos</CardTitle>
        <CardDescription>Tipos de cultivos e totais</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer className="h-48 w-full" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={dataFormatted}
              layout="vertical"
              margin={{ right: 16 }}
              barCategoryGap={10}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="culture"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                hide
              />
              <XAxis dataKey="total" type="number" hide />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Bar
                dataKey="total"
                layout="vertical"
                fill="var(--color-desktop)"
                radius={4}
                barSize={24}

              >
                <LabelList
                  dataKey="culture"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
                  fontSize={12}
                />
                <LabelList
                  dataKey="total"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
