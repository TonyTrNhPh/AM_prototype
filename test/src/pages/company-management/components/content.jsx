import { NuqsAdapter } from "nuqs/adapters/react";
import {
  MoreHorizontal,
  Download,
  Upload,
  Trash2,
  Edit,
  Eye,
} from "lucide-react";

import TableLayout from "@/layouts/TableLayout/TableLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Content({ menuItem }) {
  const taskData = [
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
    {
      id: "TASK-8245",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-07",
      dueDate: "2025-07-15",
    },
    {
      id: "TASK-9330",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-06",
      dueDate: "2025-07-20",
    },
    {
      id: "TASK-4427",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-05",
      dueDate: "2025-07-10",
    },
    {
      id: "TASK-7332",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
    },
    {
      id: "TASK-8912",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-03",
      dueDate: "2025-08-01",
    },
  ];

  // Badge components
  const TypeBadge = ({ type }) => {
    const variants = {
      bug: "destructive",
      enhancement: "default",
      documentation: "secondary",
      feature: "outline",
    };

    return (
      <Badge variant={variants[type] || "default"} className="capitalize">
        {type}
      </Badge>
    );
  };

  const StatusBadge = ({ status }) => {
    const variants = {
      todo: "outline",
      "in-progress": "default",
      done: "secondary",
    };

    const labels = {
      todo: "To Do",
      "in-progress": "In Progress",
      done: "Done",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  const PriorityBadge = ({ priority }) => {
    const variants = {
      low: "outline",
      medium: "default",
      high: "destructive",
    };

    return (
      <Badge variant={variants[priority] || "default"} className="capitalize">
        {priority}
      </Badge>
    );
  };

  // Column definitions for the data table
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "Task ID",
      meta: {
        label: "Task ID",
        variant: "text",
      },
      cell: ({ row }) => (
        <div className="font-mono text-sm">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: "Type",
      meta: {
        label: "Type",
        variant: "select",
        options: [
          { label: "Bug", value: "bug" },
          { label: "Enhancement", value: "enhancement" },
          { label: "Documentation", value: "documentation" },
          { label: "Feature", value: "feature" },
        ],
      },
      cell: ({ row }) => <TypeBadge type={row.getValue("type")} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      meta: {
        label: "Title",
        variant: "text",
      },
      cell: ({ row }) => (
        <div className="max-w-md truncate">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      meta: {
        label: "Status",
        variant: "select",
        options: [
          { label: "To Do", value: "todo" },
          { label: "In Progress", value: "in-progress" },
          { label: "Done", value: "done" },
        ],
      },
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      meta: {
        label: "Priority",
        variant: "select",
        options: [
          { label: "Low", value: "low" },
          { label: "Medium", value: "medium" },
          { label: "High", value: "high" },
        ],
      },
      cell: ({ row }) => <PriorityBadge priority={row.getValue("priority")} />,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "estimatedHours",
      header: "Est. Hours",
      meta: {
        label: "Estimated Hours",
        variant: "number",
        unit: "hrs",
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("estimatedHours")}</div>
      ),
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      meta: {
        label: "Assignee",
        variant: "text",
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("assignee")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      meta: {
        label: "Created Date",
        variant: "date",
      },
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.getValue("createdAt")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "dueDate",
      header: "Due Date",
      meta: {
        label: "Due Date",
        variant: "date",
      },
      cell: ({ row }) => (
        <div className="text-sm">
          {new Date(row.getValue("dueDate")).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const task = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => alert(`Viewing task ${task.id}`)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert(`Editing task ${task.id}`)}
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  if (confirm(`Delete task ${task.id}?`)) {
                    alert(`Task ${task.id} deleted!`);
                  }
                }}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
  ];

  // Action bar items for bulk operations
  const actionBarItems = [
    {
      icon: "download",
      onClick: (selectedRows) => {
        alert(`Exporting ${selectedRows.length} tasks`);
      },
      tooltip: "Export selected tasks",
    },
    {
      icon: "upload",
      onClick: () => {
        alert("Import tasks functionality");
      },
      tooltip: "Import tasks from file",
    },
    {
      icon: "trash-2",
      onClick: (selectedRows) => {
        if (confirm(`Delete ${selectedRows.length} selected tasks?`)) {
          alert(`${selectedRows.length} tasks deleted!`);
        }
      },
      tooltip: "Delete selected tasks",
      variant: "destructive",
    },
  ];

  return (
    <NuqsAdapter>
      <div className="p-6">
        <TableLayout
          data={taskData}
          columns={columns}
          enableRowSelection={true}
          enableFilters={true}
          enableSorting={true}
          enablePagination={true}
          actionBarItems={actionBarItems}
          className="space-y-4"
          title={"Quản lý công ty"}
          subtitle={"Quản lý thông tin các công ty trong hệ thống"}
          icon="building-2"
        />
      </div>
    </NuqsAdapter>
  );
}

export default Content;
