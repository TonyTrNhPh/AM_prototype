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
import { Search, Filter, X, Plus, Trash } from "lucide-react";

// Data Table Components
import { DataTable } from "../../components/data-table/data-table";
import { DataTableAdvancedToolbar } from "../../components/data-table/data-table-advanced-toolbar";
import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "../../components/data-table/data-table-action-bar";
import { DataTableViewOptions } from "../../components/data-table/data-table-view-options";
import { DataTableFacetedFilter } from "../../components/data-table/data-table-faceted-filter";
import { DataTableDateFilter } from "../../components/data-table/data-table-date-filter";

// UI Components
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

import TableTitle from "./components/TableTitle";

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
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        {/* Global Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search all columns..."
            value={globalFilter ?? ""}
            onChange={(event) => setGlobalFilter(event.target.value)}
            className="pl-8 h-9 w-72"
          />
        </div>

        {/* Advanced Filter System */}
        <AdvancedFilterSystem
          table={table}
          advancedFilters={advancedFilters}
          setAdvancedFilters={setAdvancedFilters}
        />

        {children}
      </div>

      {/* View Options */}
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );

  // Action Bar Component
  const actionBar =
    actionBarItems.length > 0 ? (
      <DataTableActionBar table={table}>
        <DataTableActionBarSelection table={table} />
        {actionBarItems.map((action, index) => (
          <DataTableActionBarAction
            key={index}
            onClick={() =>
              action.onClick(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original)
              )
            }
            tooltip={action.tooltip}
            variant={action.variant}
            disabled={action.disabled}
          >
            {action.icon && <action.icon className="w-4 h-4 mr-2" />}
            {action.label}
          </DataTableActionBarAction>
        ))}
      </DataTableActionBar>
    ) : null;

  return (
    <div className={`space-y-4 ${className}`} {...props}>
      <TableTitle title={title} subtitle={subtitle} icon={icon} />
      {customToolbar}
      <DataTable table={table} actionBar={actionBar} />
    </div>
  );
}

// Advanced Filter System Component
function AdvancedFilterSystem({ table, advancedFilters, setAdvancedFilters }) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const filterableColumns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const addFilter = () => {
    const firstColumn = filterableColumns[0];
    const columnMeta = firstColumn?.columnDef.meta;
    
    let defaultOperator = "contains";
    if (columnMeta?.variant === "select" || columnMeta?.variant === "multiSelect") {
      defaultOperator = "includes";
    } else if (columnMeta?.variant === "date") {
      defaultOperator = "equals";
    } else if (columnMeta?.variant === "number") {
      defaultOperator = "equals";
    }
    
    const newFilter = {
      id: Date.now(),
      column: firstColumn?.id || "",
      operator: defaultOperator,
      value: "",
      conjunction: advancedFilters.length > 0 ? "and" : "",
    };
    setAdvancedFilters([...advancedFilters, newFilter]);
  };

  const removeFilter = (filterId) => {
    setAdvancedFilters(advancedFilters.filter(f => f.id !== filterId));
  };

  const updateFilter = (filterId, updates) => {
    setAdvancedFilters(advancedFilters.map(f => {
      if (f.id === filterId) {
        const updatedFilter = { ...f, ...updates };
        // Auto-set operator based on column type when column changes
        if (updates.column && updates.column !== f.column) {
          const newColumn = filterableColumns.find(c => c.id === updates.column);
          const columnMeta = newColumn?.columnDef.meta;
          if (columnMeta?.variant === "select" || columnMeta?.variant === "multiSelect") {
            updatedFilter.operator = "includes";
          } else if (columnMeta?.variant === "date") {
            updatedFilter.operator = "equals";
          } else if (columnMeta?.variant === "number") {
            updatedFilter.operator = "equals";
          } else {
            updatedFilter.operator = "contains";
          }
        }
        return updatedFilter;
      }
      return f;
    }));
  };

  const resetFilters = () => {
    setAdvancedFilters([]);
    table.resetColumnFilters();
  };

  // Apply advanced filters to table
  React.useEffect(() => {
    const filters = advancedFilters.map(filter => ({
      id: filter.column,
      value: filter.value,
    })).filter(f => f.value);
    
    table.setColumnFilters(filters);
  }, [advancedFilters, table]);

  return (
    <div className="flex items-center gap-2">
      {/* Filter button/popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="items-center justify-between gap-2 text-sm h-9">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {advancedFilters.length > 0 && (
              <span className="items-center justify-center px-2 py-1 text-xs rounded-full bg-primary text-primary-foreground">
                {advancedFilters.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-4" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Filters</span>
            </div>
            
            {advancedFilters.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No filters applied. Click "Add filter" to start.
              </p>
            ) : (
              <div className="space-y-3">
                {advancedFilters.map((filter, index) => (
                  <AdvancedFilterEditor
                    key={filter.id}
                    filter={filter}
                    index={index}
                    columns={filterableColumns}
                    onUpdate={updateFilter}
                    onRemove={removeFilter}
                  />
                ))}
              </div>
            )}
            
            {/* Action buttons at the bottom */}
            <div className="flex items-center gap-2.5 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={addFilter}
                className="h-8 font-bold
                hover:text-white hover:bg-[#B71D21] hover:border-[#B71D21] 
                text-[#B71D21] bg-[#FFE4E4] border-[#FFE4E4]"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add filter
              </Button>
              
              {advancedFilters.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetFilters}
                  className="h-8"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reset filters
                </Button>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Advanced Filter Editor (inside popover)
function AdvancedFilterEditor({ filter, index, columns, onUpdate, onRemove }) {
  const column = columns.find(c => c.id === filter.column);
  const columnMeta = column?.columnDef.meta;

  const getOperators = (variant) => {
    switch (variant) {
      case "select":
        return [
          { value: "includes", label: "has any of" },
          { value: "excludes", label: "has none of" },
        ];
      case "multiSelect":
        return [
          { value: "includes", label: "has any of" },
          { value: "excludes", label: "has none of" },
        ];
      case "date":
        return [
          { value: "equals", label: "is" },
          { value: "before", label: "is before" },
          { value: "after", label: "is after" },
        ];
      case "number":
        return [
          { value: "equals", label: "equals" },
          { value: "greaterThan", label: "greater than" },
          { value: "lessThan", label: "less than" },
        ];
      default:
        return [
          { value: "contains", label: "contains" },
          { value: "equals", label: "equals" },
          { value: "startsWith", label: "starts with" },
        ];
    }
  };

  const operators = getOperators(columnMeta?.variant);

  const renderValueInput = () => {
    switch (columnMeta?.variant) {
      case "select":
      case "multiSelect":
        return (
          <DataTableFacetedFilter
            column={column}
            title="Select options..."
            options={columnMeta.options || []}
            multiple={true}
          />
        );
      case "date":
        return (
          <DataTableDateFilter
            column={column}
            title="Select date..."
            multiple={false}
          />
        );
      default:
        return (
          <Input
            placeholder="Enter value..."
            value={filter.value}
            onChange={(e) => onUpdate(filter.id, { value: e.target.value })}
            className="w-full h-9"
          />
        );
    }
  };

  return (
    <div className="w-fit">
      <div className="flex items-center justify-between gap-2.5">
        {/* Where/Conjunction Selector */}
        {index === 0 ? (
          <div className="flex items-center justify-center w-20">
            <span className="text-sm font-medium text-muted-foreground">
              Where
            </span>
          </div>
        ) : (
          <Select
            value={filter.conjunction}
            onValueChange={(value) => onUpdate(filter.id, { conjunction: value })}
          >
            <SelectTrigger className="w-20 h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="and">and</SelectItem>
              <SelectItem value="or">or</SelectItem>
            </SelectContent>
          </Select>
        )}
        
        {/* Column Selector */}
        <div className="w-32">
          <Select
            value={filter.column}
            onValueChange={(value) => onUpdate(filter.id, { column: value })}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select column..." />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.columnDef.meta?.label || column.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Operator Selector */}
        <div className="w-32">
          <Select
            value={filter.operator}
            onValueChange={(value) => onUpdate(filter.id, { operator: value })}
          >
            <SelectTrigger className="w-full h-9">
              <SelectValue placeholder="Select operator..." />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Value Input */}
        <div className="w-48">
          {renderValueInput()}
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(filter.id)}
          className="flex-shrink-0 w-8 h-8 p-0 border border-gray-300"
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default TableLayout;
