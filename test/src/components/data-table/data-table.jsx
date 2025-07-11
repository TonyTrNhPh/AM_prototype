import { flexRender } from "@tanstack/react-table";

import { DataTablePagination } from "./data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getCommonPinningStyles } from "../../lib/data-table";
import { cn } from "../../lib/utils";


export function DataTable({ table, actionBar, children, className, ...props }) {
  return (
    <div
      className={cn("flex w-full flex-col gap-4 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="overflow-auto border rounded-md">
        <Table className="min-w-full">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={cn(
                        "bg-background border-b font-bold whitespace-nowrap",
                        header.column.id === "actions" && "text-right"
                      )}
                      style={{
                        ...getCommonPinningStyles({ column: header.column }),
                        width: header.column.columnDef.size
                          ? `${header.column.columnDef.size}px`
                          : undefined,
                        minWidth: header.column.columnDef.minSize
                          ? `${header.column.columnDef.minSize}px`
                          : undefined,
                        maxWidth: header.column.columnDef.maxSize
                          ? `${header.column.columnDef.maxSize}px`
                          : undefined,
                      }}
                    >
                      <div
                        className={cn(
                          header.column.id === "actions" && "flex justify-end pr-4"
                        )}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "whitespace-nowrap",
                          cell.column.id === "actions" && "text-right"
                        )}
                        style={{
                          ...getCommonPinningStyles({ column: cell.column }),
                          width: cell.column.columnDef.size
                            ? `${cell.column.columnDef.size}px`
                            : undefined,
                          minWidth: cell.column.columnDef.minSize
                            ? `${cell.column.columnDef.minSize}px`
                            : undefined,
                          maxWidth: cell.column.columnDef.maxSize
                            ? `${cell.column.columnDef.maxSize}px`
                            : undefined,
                        }}
                      >
                        <div
                          className={cn(
                            cell.column.id === "actions" && "flex justify-end pr-4"
                          )}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
