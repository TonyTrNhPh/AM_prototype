import React from "react";
import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from "../../../components/data-table/data-table-action-bar";

function TableActionBar({ table, actionBarItems }) {
  if (!actionBarItems || actionBarItems.length === 0) {
    return null;
  }

  return (
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
  );
}

export default TableActionBar;
