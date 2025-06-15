import { Skeleton } from "./ui/skeleton"
import { TableBody, TableCell, TableRow } from "./ui/table"

interface Props {
  rows: number
  columns: number
}

export function TableSkeleton({ rows = 4, columns = 4 }: Props) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, i) => {
        return (
          <TableRow key={`skeleton-row-${i}`}>
            {Array.from({ length: columns }).map((_, i) => (
              <TableCell key={`skeleton-cell-${i}`}>
                <Skeleton className="h-5 w-auto" />
              </TableCell>
            ))}
          </TableRow>
        )
      })}
    </TableBody>
  )
}