import React from "react";
import { Filter, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TableFilterEditor from "./TableFilterEditor";

function TableAdvancedFilterSystem({ table, advancedFilters, setAdvancedFilters }) {
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
                  <TableFilterEditor
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

export default TableAdvancedFilterSystem;
