import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { cn } from "../../lib/utils";

export function DataTablePagination(
  {
    table,
    pageSizeOptions = [10, 20, 30, 40, 50],
    className,
    showAll = true,
    ...props
  }
) {
  return (
    <div
      className={cn(
        "flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto sm:flex-row sm:gap-8",
        className
      )}
      {...props}>
      <div className="flex-1 text-sm whitespace-nowrap text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div
        className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium whitespace-nowrap">Rows per page</p>
          <Select
            value={
              table.getState().pagination.pageSize >= table.getFilteredRowModel().rows.length
                ? "all"
                : `${table.getState().pagination.pageSize}`
            }
            onValueChange={(value) => {
              if (value === "all") {
                table.setPageSize(table.getFilteredRowModel().rows.length);
              } else {
                table.setPageSize(Number(value));
              }
            }}>
            <SelectTrigger className="h-8 w-[4.5rem] [&[data-size]]:h-8">
              <SelectValue 
                placeholder={
                  table.getState().pagination.pageSize >= table.getFilteredRowModel().rows.length
                    ? "All"
                    : table.getState().pagination.pageSize
                } 
              />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
              {showAll && (
                <SelectItem value="all">
                  All
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          {table.getState().pagination.pageSize >= table.getFilteredRowModel().rows.length
            ? `Showing all ${table.getFilteredRowModel().rows.length} rows`
            : `Page ${table.getState().pagination.pageIndex + 1} of ${table.getPageCount()}`
          }
        </div>
        {table.getState().pagination.pageSize < table.getFilteredRowModel().rows.length && (
          <div className="flex items-center space-x-2">
            <Button
              aria-label="Go to first page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}>
              <ChevronsLeft />
            </Button>
            <Button
              aria-label="Go to previous page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}>
              <ChevronLeft />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              size="icon"
              className="size-8"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}>
              <ChevronRight />
            </Button>
            <Button
              aria-label="Go to last page"
              variant="outline"
              size="icon"
              className="hidden size-8 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}>
              <ChevronsRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
