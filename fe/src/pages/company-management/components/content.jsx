import { NuqsAdapter } from "nuqs/adapters/react";
import { MoreHorizontal, Trash2, Edit, Eye } from "lucide-react";

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
import { PopupLayout } from "@/layouts/AdaptivePopupLayout";
import { useState } from "react";

function Content({ menuItem }) {
  const taskData = [
    {
      id: "TASK-1001",
      type: "bug",
      title: "Fix authentication system vulnerability in user login process",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "John Doe",
      createdAt: "2025-07-01",
      dueDate: "2025-07-15",
      department: "Security",
      progress: 75,
    },
    {
      id: "TASK-1002",
      type: "enhancement",
      title: "Implement new dashboard analytics widget for real-time metrics",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jane Smith",
      createdAt: "2025-07-02",
      dueDate: "2025-07-20",
      department: "Frontend",
      progress: 0,
    },
    {
      id: "TASK-1003",
      type: "bug",
      title: "Resolve database connection timeout issues in production",
      status: "done",
      priority: "high",
      estimatedHours: 8,
      assignee: "Mike Johnson",
      createdAt: "2025-07-03",
      dueDate: "2025-07-10",
      department: "Backend",
      progress: 100,
    },
    {
      id: "TASK-1004",
      type: "documentation",
      title: "Update API documentation for v2.0 release",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Sarah Wilson",
      createdAt: "2025-07-04",
      dueDate: "2025-07-25",
      department: "Documentation",
      progress: 60,
    },
    {
      id: "TASK-1005",
      type: "feature",
      title: "Develop mobile responsive design for user portal",
      status: "todo",
      priority: "medium",
      estimatedHours: 32,
      assignee: "Tom Brown",
      createdAt: "2025-07-05",
      dueDate: "2025-08-01",
      department: "Design",
      progress: 0,
    },
    {
      id: "TASK-1006",
      type: "bug",
      title: "Fix memory leak in image processing module",
      status: "in-progress",
      priority: "high",
      estimatedHours: 18,
      assignee: "Alice Chen",
      createdAt: "2025-07-06",
      dueDate: "2025-07-18",
      department: "Engineering",
      progress: 45,
    },
    {
      id: "TASK-1007",
      type: "enhancement",
      title: "Add multi-language support for the application",
      status: "todo",
      priority: "medium",
      estimatedHours: 40,
      assignee: "David Lee",
      createdAt: "2025-07-07",
      dueDate: "2025-08-05",
      department: "Engineering",
      progress: 0,
    },
    {
      id: "TASK-1008",
      type: "feature",
      title: "Implement real-time chat functionality",
      status: "in-progress",
      priority: "high",
      estimatedHours: 28,
      assignee: "Emily Rodriguez",
      createdAt: "2025-07-08",
      dueDate: "2025-07-30",
      department: "Backend",
      progress: 30,
    },
    {
      id: "TASK-1009",
      type: "documentation",
      title: "Create user manual for new features",
      status: "todo",
      priority: "low",
      estimatedHours: 14,
      assignee: "Mark Thompson",
      createdAt: "2025-07-09",
      dueDate: "2025-08-10",
      department: "Documentation",
      progress: 0,
    },
    {
      id: "TASK-1010",
      type: "bug",
      title: "Fix pagination issues in search results",
      status: "done",
      priority: "medium",
      estimatedHours: 6,
      assignee: "Lisa Wang",
      createdAt: "2025-07-10",
      dueDate: "2025-07-16",
      department: "Frontend",
      progress: 100,
    },
    {
      id: "TASK-1011",
      type: "enhancement",
      title: "Improve application performance and loading times",
      status: "in-progress",
      priority: "high",
      estimatedHours: 24,
      assignee: "Chris Garcia",
      createdAt: "2025-07-11",
      dueDate: "2025-07-28",
      department: "Engineering",
      progress: 55,
    },
    {
      id: "TASK-1012",
      type: "feature",
      title: "Add advanced filtering options for data tables",
      status: "todo",
      priority: "medium",
      estimatedHours: 20,
      assignee: "Anna Martinez",
      createdAt: "2025-06-28",
      dueDate: "2025-07-22",
      department: "Frontend",
      progress: 0,
    },
    {
      id: "TASK-1013",
      type: "bug",
      title: "Resolve CSS styling conflicts in dark mode",
      status: "in-progress",
      priority: "low",
      estimatedHours: 10,
      assignee: "Kevin Park",
      createdAt: "2025-06-29",
      dueDate: "2025-07-12",
      department: "Frontend",
      progress: 80,
    },
    {
      id: "TASK-1014",
      type: "documentation",
      title: "Document new API endpoints and response formats",
      status: "todo",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Rachel Green",
      createdAt: "2025-06-30",
      dueDate: "2025-07-26",
      department: "Documentation",
      progress: 0,
    },
    {
      id: "TASK-1015",
      type: "enhancement",
      title: "Implement automated backup system",
      status: "done",
      priority: "high",
      estimatedHours: 30,
      assignee: "James Wilson",
      createdAt: "2025-06-25",
      dueDate: "2025-07-08",
      department: "DevOps",
      progress: 100,
    },
    {
      id: "TASK-1016",
      type: "bug",
      title: "Fix email notification delivery issues",
      status: "in-progress",
      priority: "high",
      estimatedHours: 12,
      assignee: "Michelle Kim",
      createdAt: "2025-06-26",
      dueDate: "2025-07-14",
      department: "Backend",
      progress: 70,
    },
    {
      id: "TASK-1017",
      type: "feature",
      title: "Create admin dashboard for system monitoring",
      status: "todo",
      priority: "medium",
      estimatedHours: 36,
      assignee: "Robert Taylor",
      createdAt: "2025-06-27",
      dueDate: "2025-08-02",
      department: "Backend",
      progress: 0,
    },
    {
      id: "TASK-1018",
      type: "enhancement",
      title: "Optimize database queries for better performance",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "Jennifer Davis",
      createdAt: "2025-06-24",
      dueDate: "2025-07-20",
      department: "Backend",
      progress: 65,
    },
    {
      id: "TASK-1019",
      type: "documentation",
      title: "Update installation and setup guide",
      status: "done",
      priority: "low",
      estimatedHours: 8,
      assignee: "Daniel Miller",
      createdAt: "2025-06-23",
      dueDate: "2025-07-05",
      department: "Documentation",
      progress: 100,
    },
    {
      id: "TASK-1020",
      type: "bug",
      title: "Fix drag and drop functionality in file manager",
      status: "todo",
      priority: "medium",
      estimatedHours: 14,
      assignee: "Sophia Anderson",
      createdAt: "2025-06-22",
      dueDate: "2025-07-18",
      department: "Frontend",
      progress: 0,
    },
    {
      id: "TASK-1021",
      type: "feature",
      title: "Implement two-factor authentication",
      status: "in-progress",
      priority: "high",
      estimatedHours: 26,
      assignee: "Andrew Clark",
      createdAt: "2025-06-21",
      dueDate: "2025-07-24",
      department: "Security",
      progress: 40,
    },
    {
      id: "TASK-1022",
      type: "enhancement",
      title: "Add export functionality for reports",
      status: "todo",
      priority: "medium",
      estimatedHours: 18,
      assignee: "Olivia White",
      createdAt: "2025-06-20",
      dueDate: "2025-07-28",
      department: "Backend",
      progress: 0,
    },
    {
      id: "TASK-1023",
      type: "bug",
      title: "Resolve timezone display issues",
      status: "done",
      priority: "low",
      estimatedHours: 6,
      assignee: "Nathan Brooks",
      createdAt: "2025-06-19",
      dueDate: "2025-07-01",
      department: "Frontend",
      progress: 100,
    },
    {
      id: "TASK-1024",
      type: "documentation",
      title: "Create troubleshooting guide for common issues",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 20,
      assignee: "Isabella Martinez",
      createdAt: "2025-06-18",
      dueDate: "2025-07-30",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1025",
      type: "feature",
      title: "Develop notification preferences panel",
      status: "todo",
      priority: "low",
      estimatedHours: 16,
      assignee: "Ethan Thompson",
      createdAt: "2025-06-17",
      dueDate: "2025-08-15",
      department: "Frontend",
      progress: 0,
    },
    {
      id: "TASK-1026",
      type: "enhancement",
      title: "Improve search algorithm accuracy",
      status: "in-progress",
      priority: "high",
      estimatedHours: 32,
      assignee: "Grace Liu",
      createdAt: "2025-06-16",
      dueDate: "2025-07-25",
      department: "Engineering",
      progress: 50,
    },
    {
      id: "TASK-1027",
      type: "bug",
      title: "Fix calendar widget date selection bug",
      status: "todo",
      priority: "medium",
      estimatedHours: 8,
      assignee: "Ryan Cooper",
      createdAt: "2025-06-15",
      dueDate: "2025-07-12",
      department: "Frontend",
      progress: 0,
    },
    {
      id: "TASK-1028",
      type: "feature",
      title: "Add bulk operations for user management",
      status: "done",
      priority: "medium",
      estimatedHours: 24,
      assignee: "Mia Rodriguez",
      createdAt: "2025-06-14",
      dueDate: "2025-07-08",
      department: "Backend",
      progress: 100,
    },
    {
      id: "TASK-1029",
      type: "documentation",
      title: "Write security best practices guide",
      status: "in-progress",
      priority: "high",
      estimatedHours: 22,
      assignee: "Logan Scott",
      createdAt: "2025-06-13",
      dueDate: "2025-07-22",
      department: "Security",
      progress: 35,
    },
    {
      id: "TASK-1030",
      type: "enhancement",
      title: "Implement caching layer for improved performance",
      status: "todo",
      priority: "high",
      estimatedHours: 28,
      assignee: "Zoe Adams",
      createdAt: "2025-06-12",
      dueDate: "2025-07-26",
      department: "Engineering",
      progress: 0,
    },
    {
      id: "TASK-1031",
      type: "bug",
      title: "Fix responsive layout issues on mobile devices",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Mason Evans",
      createdAt: "2025-06-11",
      dueDate: "2025-07-16",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1032",
      type: "feature",
      title: "Create data visualization charts and graphs",
      status: "todo",
      priority: "medium",
      estimatedHours: 34,
      assignee: "Aria Walker",
      createdAt: "2025-06-10",
      dueDate: "2025-08-05",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1033",
      type: "enhancement",
      title: "Add keyboard shortcuts for power users",
      status: "done",
      priority: "low",
      estimatedHours: 12,
      assignee: "Carter Phillips",
      createdAt: "2025-06-09",
      dueDate: "2025-06-28",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1034",
      type: "documentation",
      title: "Update privacy policy and terms of service",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 10,
      assignee: "Layla Turner",
      createdAt: "2025-06-08",
      dueDate: "2025-07-15",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1035",
      type: "bug",
      title: "Resolve file upload size limit errors",
      status: "todo",
      priority: "high",
      estimatedHours: 14,
      assignee: "Hudson Baker",
      createdAt: "2025-06-07",
      dueDate: "2025-07-18",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1036",
      type: "feature",
      title: "Implement automated testing framework",
      status: "in-progress",
      priority: "high",
      estimatedHours: 40,
      assignee: "Nova Hill",
      createdAt: "2025-06-06",
      dueDate: "2025-08-01",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1037",
      type: "enhancement",
      title: "Add dark theme support",
      status: "done",
      priority: "medium",
      estimatedHours: 18,
      assignee: "Kai Morgan",
      createdAt: "2025-06-05",
      dueDate: "2025-06-25",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1038",
      type: "bug",
      title: "Fix data synchronization issues",
      status: "todo",
      priority: "high",
      estimatedHours: 20,
      assignee: "Elena Carter",
      createdAt: "2025-06-04",
      dueDate: "2025-07-20",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1039",
      type: "documentation",
      title: "Create video tutorials for new users",
      status: "in-progress",
      priority: "low",
      estimatedHours: 30,
      assignee: "Finn Ross",
      createdAt: "2025-06-03",
      dueDate: "2025-08-10",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1040",
      type: "feature",
      title: "Develop custom widget builder",
      status: "todo",
      priority: "medium",
      estimatedHours: 42,
      assignee: "Iris Bennett",
      createdAt: "2025-06-02",
      dueDate: "2025-08-15",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1041",
      type: "enhancement",
      title: "Improve error handling and user feedback",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 16,
      assignee: "Jude Foster",
      createdAt: "2025-06-01",
      dueDate: "2025-07-14",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1042",
      type: "bug",
      title: "Fix session timeout handling",
      status: "done",
      priority: "medium",
      estimatedHours: 10,
      assignee: "Luna Price",
      createdAt: "2025-05-31",
      dueDate: "2025-06-15",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1043",
      type: "feature",
      title: "Add social media integration",
      status: "todo",
      priority: "low",
      estimatedHours: 24,
      assignee: "River Stone",
      createdAt: "2025-05-30",
      dueDate: "2025-08-20",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1044",
      type: "documentation",
      title: "Document deployment procedures",
      status: "in-progress",
      priority: "high",
      estimatedHours: 18,
      assignee: "Sage Murphy",
      createdAt: "2025-05-29",
      dueDate: "2025-07-10",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1045",
      type: "enhancement",
      title: "Optimize image compression algorithms",
      status: "todo",
      priority: "medium",
      estimatedHours: 22,
      assignee: "Phoenix Reed",
      createdAt: "2025-05-28",
      dueDate: "2025-07-22",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1046",
      type: "bug",
      title: "Fix cross-browser compatibility issues",
      status: "in-progress",
      priority: "high",
      estimatedHours: 26,
      assignee: "Orion Hayes",
      createdAt: "2025-05-27",
      dueDate: "2025-07-18",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1047",
      type: "feature",
      title: "Create advanced user role management",
      status: "done",
      priority: "high",
      estimatedHours: 36,
      assignee: "Quinn Bell",
      createdAt: "2025-05-26",
      dueDate: "2025-06-30",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1048",
      type: "enhancement",
      title: "Add real-time collaboration features",
      status: "todo",
      priority: "medium",
      estimatedHours: 38,
      assignee: "Raven Cruz",
      createdAt: "2025-05-25",
      dueDate: "2025-08-05",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1049",
      type: "documentation",
      title: "Write integration testing guidelines",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 14,
      assignee: "Storm Ward",
      createdAt: "2025-05-24",
      dueDate: "2025-07-12",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1050",
      type: "bug",
      title: "Resolve API rate limiting issues",
      status: "todo",
      priority: "high",
      estimatedHours: 16,
      assignee: "Vale Torres",
      createdAt: "2025-05-23",
      dueDate: "2025-07-15",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1051",
      type: "feature",
      title: "Implement advanced analytics dashboard",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 44,
      assignee: "Wren Gray",
      createdAt: "2025-05-22",
      dueDate: "2025-08-10",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1052",
      type: "enhancement",
      title: "Add webhook support for integrations",
      status: "done",
      priority: "medium",
      estimatedHours: 20,
      assignee: "Zara Knight",
      createdAt: "2025-05-21",
      dueDate: "2025-06-20",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1053",
      type: "bug",
      title: "Fix memory consumption in large datasets",
      status: "todo",
      priority: "high",
      estimatedHours: 24,
      assignee: "Atlas Webb",
      createdAt: "2025-05-20",
      dueDate: "2025-07-20",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1054",
      type: "documentation",
      title: "Create comprehensive FAQ section",
      status: "in-progress",
      priority: "low",
      estimatedHours: 12,
      assignee: "Echo Rivera",
      createdAt: "2025-05-19",
      dueDate: "2025-08-01",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1055",
      type: "feature",
      title: "Develop custom report builder",
      status: "todo",
      priority: "medium",
      estimatedHours: 48,
      assignee: "Fox Sterling",
      createdAt: "2025-05-18",
      dueDate: "2025-08-25",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1056",
      type: "enhancement",
      title: "Improve data validation and sanitization",
      status: "in-progress",
      priority: "high",
      estimatedHours: 18,
      assignee: "Ivy Collins",
      createdAt: "2025-05-17",
      dueDate: "2025-07-08",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1057",
      type: "bug",
      title: "Fix concurrent user access conflicts",
      status: "done",
      priority: "medium",
      estimatedHours: 22,
      assignee: "Jax Powell",
      createdAt: "2025-05-16",
      dueDate: "2025-06-10",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1058",
      type: "feature",
      title: "Add automated report scheduling",
      status: "todo",
      priority: "low",
      estimatedHours: 26,
      assignee: "Kit Sanders",
      createdAt: "2025-05-15",
      dueDate: "2025-08-30",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1059",
      type: "documentation",
      title: "Update code style guidelines",
      status: "in-progress",
      priority: "medium",
      estimatedHours: 8,
      assignee: "Lux Perry",
      createdAt: "2025-05-14",
      dueDate: "2025-07-05",
      department: "Documentation",
      progress: 25,
    },
    {
      id: "TASK-1060",
      type: "enhancement",
      title: "Implement progressive web app features",
      status: "todo",
      priority: "high",
      estimatedHours: 52,
      assignee: "Neo Blake",
      createdAt: "2025-05-13",
      dueDate: "2025-09-01",
      department: "Documentation",
      progress: 25,
    },
  ];

  // Badge components
  const TypeBadge = ({ type }) => {
    const variants = {
      bug: "default",
      enhancement: "destructive",
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
      todo: "destructive",
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
      medium: "destructive",
      high: "default",
    };

    return (
      <Badge variant={variants[priority] || "default"} className="capitalize">
        {priority}
      </Badge>
    );
  };

  const DepartmentBadge = ({ department }) => {
    const variants = {
      Security: "destructive",
      Frontend: "default",
      Backend: "secondary",
      Documentation: "outline",
      Design: "default",
      Engineering: "secondary",
      DevOps: "destructive",
      QA: "outline",
    };

    return (
      <Badge variant={variants[department] || "default"} className="capitalize">
        {department}
      </Badge>
    );
  };

  const ProgressBar = ({ progress }) => {
    const getProgressColor = (value) => {
      if (value === 0) return "var(--text-disabled)";
      if (value <= 25) return "#ef4444"; // red-500
      if (value <= 50) return "#eab308"; // yellow-500
      if (value <= 75) return "#3b82f6"; // blue-500
      return "#22c55e"; // green-500
    };

    return (
      <div className="flex items-center gap-2 min-w-[100px]">
        <div className="flex-1 h-2 rounded-full progress-track">
          <div
            className="h-2 transition-all duration-300 rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: getProgressColor(progress),
            }}
          />
        </div>
        <span className="w-8 text-xs font-medium text-right text-secondary">
          {progress}%
        </span>
      </div>
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
      size: 50,
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
        <div className="">{row.getValue("estimatedHours")}</div>
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
      accessorKey: "department",
      header: "Department",
      meta: {
        label: "Department",
        variant: "select",
        options: [
          { label: "Security", value: "Security" },
          { label: "Frontend", value: "Frontend" },
          { label: "Backend", value: "Backend" },
          { label: "Documentation", value: "Documentation" },
          { label: "Design", value: "Design" },
          { label: "Engineering", value: "Engineering" },
          { label: "DevOps", value: "DevOps" },
          { label: "QA", value: "QA" },
        ],
      },
      cell: ({ row }) => (
        <DepartmentBadge department={row.getValue("department")} />
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "progress",
      header: "Progress",
      meta: {
        label: "Progress",
        variant: "number",
        unit: "%",
      },
      cell: ({ row }) => <ProgressBar progress={row.getValue("progress")} />,
      size: 150,
    },
    {
      id: "actions",
      header: "",
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
                onClick={() => {
                  console.log("View Details for task:", task.id);
                  alert(`Task Details: ${task.title}`);
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log("Edit task:", task.id);
                  alert(`Edit Task: ${task.title}`);
                }}
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
                className="delete-text"
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
      size: 80,
    },
  ];

  // Action bar items for bulk operations
  const actionBarItems = [
    {
      icon: "file-down",
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

  // Context menu actions for right-click on rows
  const rowActions = [
    {
      label: "View Details",
      icon: <Eye className="w-4 h-4" />,
      onClick: (task) => {
        console.log("View Details for task:", task.id);
        alert(`Task Details: ${task.title} (${task.type})`);
      },
    },
    {
      label: "Edit Task",
      icon: <Edit className="w-4 h-4" />,
      onClick: (task) => {
        console.log("Edit task:", task.id);
        alert(`Edit Task: ${task.title}`);
      },
      separator: false,
    },
    {
      label: "Delete Task",
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (task) => {
        if (confirm(`Delete task ${task.id}?`)) {
          alert(`Task ${task.id} deleted!`);
        }
      },
      className: "delete-text",
    },
  ];

  return (
    <NuqsAdapter>
      <div className="h-full p-6 overflow-auto custom-scroll">
        <TableLayout
          data={taskData}
          columns={columns}
          enableRowSelection={true}
          enableFilters={true}
          enableSorting={true}
          enablePagination={true}
          actionBarItems={actionBarItems}
          className=""
          title={"Quản lý công ty"}
          subtitle={"Quản lý thông tin các công ty trong hệ thống"}
          icon="building-2"
          btnNewText="company"
          rowActions={rowActions}
        />
      </div>
    </NuqsAdapter>
  );
}

export default Content;
