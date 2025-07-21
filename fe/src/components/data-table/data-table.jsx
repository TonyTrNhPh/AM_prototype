import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown, 
  EyeOff 
} from "lucide-react";

import { DataTablePagination } from "./data-table-pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { 
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../ui/context-menu";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { getCommonPinningStyles } from "../../lib/data-table";
import { cn } from "../../lib/utils";



export function DataTable({ table, actionBar, children, className, rowActions, ...props }) {
  const [openDropdown, setOpenDropdown] = React.useState(null);
  const [openContextMenu, setOpenContextMenu] = React.useState(null);

  // Close dropdown when context menu opens
  const handleContextMenuOpen = (rowId) => {
    setOpenDropdown(null);
    setOpenContextMenu(rowId);
  };

  // Close context menu when dropdown opens
  const handleDropdownOpen = (headerId) => {
    setOpenContextMenu(null);
    setOpenDropdown(headerId);
  };
  
  return (
    <div
      className={cn("flex w-full flex-col gap-4", className)}
      {...props}
    >
      {children}
      <div className="border rounded-md">
        <ScrollArea className="h-full w-full max-w-[1450px]">
          <div className="min-w-max">
            <Table className="w-full">
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
                          "flex items-center gap-2",
                          header.column.id === "actions" && "justify-end pr-4"
                        )}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {header.column.getCanSort() || header.column.getCanHide() ? (
                          <DropdownMenu 
                            open={openDropdown === header.id}
                            onOpenChange={(open) => {
                              if (open) {
                                handleDropdownOpen(header.id);
                              } else {
                                setOpenDropdown(null);
                              }
                            }}
                          >
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-6 h-6 p-0 hover:bg-muted"
                              >
                                <ChevronsUpDown className="w-3 h-3" />
                                <span className="sr-only">Column options</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              {header.column.getCanSort() && (
                                <>
                                  <DropdownMenuItem
                                    onClick={() => header.column.toggleSorting(false)}
                                  >
                                    <ChevronUp className="w-4 h-4 mr-2" />
                                    Sort Ascending
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => header.column.toggleSorting(true)}
                                  >
                                    <ChevronDown className="w-4 h-4 mr-2" />
                                    Sort Descending
                                  </DropdownMenuItem>
                                  {header.column.getCanHide() && (
                                    <DropdownMenuSeparator />
                                  )}
                                </>
                              )}
                              {header.column.getCanHide() && (
                                <DropdownMenuItem
                                  onClick={() => header.column.toggleVisibility(false)}
                                >
                                  <EyeOff className="w-4 h-4 mr-2" />
                                  Hide Column
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : null}
                        </div>
                        
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <ContextMenu 
                    key={row.id}
                    open={openContextMenu === row.id}
                    onOpenChange={(open) => {
                      if (open) {
                        handleContextMenuOpen(row.id);
                      } else {
                        setOpenContextMenu(null);
                      }
                    }}
                  >
                    <ContextMenuTrigger asChild>
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="cursor-pointer"
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
                            ? `${250}px`
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
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-fit">
                      {rowActions && rowActions.map((action, index) => (
                        <div key={index}>
                          <ContextMenuItem
                            onClick={() => action.onClick(row.original)}
                            className={action.className}
                          >
                            {action.icon && <span className="w-4 h-4 mr-2">{action.icon}</span>}
                            {action.label}
                          </ContextMenuItem>
                          {action.separator && <ContextMenuSeparator />}
                        </div>
                      ))}
                    </ContextMenuContent>
                  </ContextMenu>
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
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
