"use client";
import { Check, PlusCircle, XCircle } from "lucide-react";
import * as React from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Separator } from "../ui/separator";
import { cn } from "../../lib/utils";

export function DataTableFacetedFilter(
  {
    column,
    title,
    options,
    multiple
  }
) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []);

  const onItemSelect = React.useCallback((option, isSelected) => {
    if (!column) return;

    const newSelectedValues = new Set(selectedValues);
    if (isSelected) {
      newSelectedValues.delete(option.value);
    } else {
      newSelectedValues.add(option.value);
    }
    const filterValues = Array.from(newSelectedValues);
    column.setFilterValue(filterValues.length ? filterValues : undefined);
  }, [column, selectedValues]);

  const onReset = React.useCallback((event) => {
    event?.stopPropagation();
    column?.setFilterValue(undefined);
  }, [column]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full h-9" asChild>
        <Button variant="outline" size="sm" className="justify-start border-dashed h-9">
          {selectedValues?.size > 0 ? (
            <>
              {selectedValues.size > 2 ? (
                <span className="text-sm">
                  {selectedValues.size} selected
                </span>
              ) : (
                <div className="flex items-center gap-1">
                  {options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="px-1 text-xs font-normal rounded-sm">
                        {option.label}
                      </Badge>
                    ))}
                </div>
              )}
            </>
          ) : (
            <span className="text-sm text-muted-foreground">
              {title || "Select options..."}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="max-h-full">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);

                return (
                  <CommandItem key={option.value} onSelect={() => onItemSelect(option, isSelected)}>
                    <div
                      className={cn(
                        "flex size-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary"
                          : "opacity-50 [&_svg]:invisible"
                      )}>
                      <Check />
                    </div>
                    {option.icon && <option.icon />}
                    <span className="truncate">{option.label}</span>
                    {option.count && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem onSelect={() => onReset()} className="justify-center text-center">
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
