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
import { Search, Filter, X, Plus } from "lucide-react";

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
    const newFilter = {
      id: Date.now(),
      column: filterableColumns[0]?.id || "",
      operator: "contains",
      value: "",
      conjunction: advancedFilters.length > 0 ? "and" : "",
    };
    setAdvancedFilters([...advancedFilters, newFilter]);
  };

  const removeFilter = (filterId) => {
    setAdvancedFilters(advancedFilters.filter(f => f.id !== filterId));
  };

  const updateFilter = (filterId, updates) => {
    setAdvancedFilters(advancedFilters.map(f => 
      f.id === filterId ? { ...f, ...updates } : f
    ));
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
      {/* Display active filters */}
      {advancedFilters.map((filter, index) => (
        <AdvancedFilterItem
          key={filter.id}
          filter={filter}
          index={index}
          columns={filterableColumns}
          onUpdate={updateFilter}
          onRemove={removeFilter}
        />
      ))}
      
      {/* Reset button */}
      {advancedFilters.length > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="h-8"
        >
          Reset filters
        </Button>
      )}

      {/* Filter button/popover */}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="w-4 h-4 mr-2" />
            Filters
            {advancedFilters.length > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground px-1.5 py-0.5 text-xs">
                {advancedFilters.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4 w-96" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Filters</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={addFilter}
                className="h-8"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add filter
              </Button>
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
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Advanced Filter Item (displayed outside popover)
function AdvancedFilterItem({ filter, index, columns, onUpdate, onRemove }) {
  const column = columns.find(c => c.id === filter.column);
  const columnLabel = column?.columnDef.meta?.label || filter.column;

  return (
    <div className="flex items-center gap-1 px-2 py-1 text-sm rounded bg-muted">
      {index > 0 && (
        <span className="mr-1 text-muted-foreground">
          {filter.conjunction}
        </span>
      )}
      <span className="font-medium">{columnLabel}</span>
      <span className="text-muted-foreground">{filter.operator}</span>
      <span className="truncate max-w-20">{filter.value}</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onRemove(filter.id)}
        className="w-4 h-4 h-auto p-0"
      >
        <X className="w-3 h-3" />
      </Button>
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
            title=""
            options={columnMeta.options || []}
            multiple={false}
          />
        );
      case "date":
        return (
          <DataTableDateFilter
            column={column}
            title=""
            multiple={false}
          />
        );
      default:
        return (
          <Input
            placeholder="Enter value..."
            value={filter.value}
            onChange={(e) => onUpdate(filter.id, { value: e.target.value })}
            className="h-8"
          />
        );
    }
  };

  return (
    <div className="p-3 space-y-2 border rounded">
      {index > 0 && (
        <Select
          value={filter.conjunction}
          onValueChange={(value) => onUpdate(filter.id, { conjunction: value })}
        >
          <SelectTrigger className="w-20 h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="and">and</SelectItem>
            <SelectItem value="or">or</SelectItem>
          </SelectContent>
        </Select>
      )}
      
      <div className="flex items-center gap-2">
        <div className="grid flex-1 grid-cols-3 gap-2">
          {/* Column Selector */}
          <Select
            value={filter.column}
            onValueChange={(value) => onUpdate(filter.id, { column: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Column" />
            </SelectTrigger>
            <SelectContent>
              {columns.map((column) => (
                <SelectItem key={column.id} value={column.id}>
                  {column.columnDef.meta?.label || column.id}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Operator Selector */}
          <Select
            value={filter.operator}
            onValueChange={(value) => onUpdate(filter.id, { operator: value })}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Operator" />
            </SelectTrigger>
            <SelectContent>
              {operators.map((op) => (
                <SelectItem key={op.value} value={op.value}>
                  {op.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Value Input */}
          <div className="relative">
            {renderValueInput()}
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(filter.id)}
          className="w-8 h-8 p-0"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default TableLayout;
