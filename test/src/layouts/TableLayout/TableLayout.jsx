import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
} from "@tanstack/react-table";

// Data Table Components
import { DataTable } from "../../components/data-table/data-table";

// Table Layout Components
import TableTitle from "./components/TableTitle";
import TableToolbar from "./components/TableToolbar";
import TableActionBar from "./components/TableActionBar";

function TableLayout({
  data = [],
  columns = [],
  enableRowSelection = true,
  enableFilters = true,
  enableSorting = true,
  enablePagination = true,
  className = "",
  actionBarItems = [],
  children,
  title = "",
  subtitle = "",
  icon = "",
  ...props
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [advancedFilters, setAdvancedFilters] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    enableRowSelection,
    enableSorting,
    enableColumnFilters: enableFilters,
    enableGlobalFilter: true,
    globalFilterFn: "includesString",
  });

  // Custom Toolbar Component
  const customToolbar = (
    <TableToolbar
      table={table}
      globalFilter={globalFilter}
      setGlobalFilter={setGlobalFilter}
      advancedFilters={advancedFilters}
      setAdvancedFilters={setAdvancedFilters}
    >
      {children}
    </TableToolbar>
  );

  // Action Bar Component
  const actionBar = (
    <TableActionBar
      table={table}
      actionBarItems={actionBarItems}
    />
  );

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      <TableTitle title={title} subtitle={subtitle} icon={icon} />
      {customToolbar}
      <DataTable table={table} actionBar={actionBar} />
    </div>
  );
}

export default TableLayout;
