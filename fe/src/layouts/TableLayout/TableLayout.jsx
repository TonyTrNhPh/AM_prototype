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
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import IconHolder from "@/components/ui/iconholder";
import { PopupLayout } from "@/layouts/AdaptivePopupLayout";
import AdaptiveLayout from "@/layouts/AdaptivePopupLayout/components/AdaptiveLayout";

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
  rowActions = [],
  children,
  title = "",
  subtitle = "",
  icon = "",
  btnNewText,
  onNewClick,
  ...props
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [advancedFilters, setAdvancedFilters] = React.useState([]);

  // Handle form save
  const handleFormSave = (formData) => {
    console.log('New item data:', formData);
    // Here you would typically:
    // 1. Validate the data
    // 2. Call an API to save the data
    // 3. Update the table data
    // 4. Show success message
    // For now, just alert the data
    //alert(`New ${btnNewText} created with data: ${JSON.stringify(formData, null, 2)}`);
  };
  const handleFormCancel = () => {
    console.log('Form cancelled');
    // Any cleanup logic can go here
  };

  
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

  // Button Group Component
  const buttonGroup = (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // Export functionality
          alert("Export functionality");
        }}
        className="flex items-center gap-2"
      >
        <IconHolder name="download" size="sm" />
        Export
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          // Import functionality
          alert("Import functionality");
        }}
        className="flex items-center gap-2"
      >
        <IconHolder name="upload" size="sm" />
        Import
      </Button>
      
      <PopupLayout
        trigger={
          <Button
            variant="default"
            size="sm"
            className="flex items-center gap-2"
          >
            <IconHolder name="plus" size="sm" />
            New {btnNewText}
          </Button>
        }
      >
        <AdaptiveLayout
          title={`Add new ${btnNewText || 'Item'}`}
          columns={columns}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      </PopupLayout>
    </div>
  );

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      <div className="flex items-center justify-between">
        <TableTitle title={title} subtitle={subtitle} icon={icon} />
        {buttonGroup}
      </div>
      {customToolbar}
      <DataTable table={table} actionBar={actionBar} rowActions={rowActions} />
    </div>
  );
}

export default TableLayout;
