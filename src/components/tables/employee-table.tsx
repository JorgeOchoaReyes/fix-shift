"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Employee } from "~/server/db/schema";
import { Pencil, Trash2, Search, Plus } from "lucide-react";

interface EmployeeTableProps {
  employees: Employee[]
  onEdit: (employee: Employee) => void
  onDelete: (id: string) => void
  onAdd: () => void
}

export function EmployeeTable({ employees, onEdit, onDelete, onAdd }: EmployeeTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Employee>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ??
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ??
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold text-primary">Employee Management</CardTitle>
          <Button onClick={onAdd} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {sortedEmployees.length} employees
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("name")}
                >
                  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("position")}
                >
                  Position {sortField === "position" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("department")}
                >
                  Department {sortField === "department" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("hireDate")}
                >
                  Hire Date {sortField === "hireDate" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("salary")}
                >
                  Salary {sortField === "salary" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("wage")}
                >
                  Hourly Wage {sortField === "wage" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{employee.name}</td>
                  <td className="py-3 px-4 text-card-foreground">{employee.position}</td>
                  <td className="py-3 px-4">
                    <Badge variant="outline" className="border-border text-card-foreground">
                      {employee.department}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{formatDate(employee.hireDate)}</td>
                  <td className="py-3 px-4 font-medium text-foreground">{formatCurrency(employee.salary)}</td>
                  <td className="py-3 px-4 text-card-foreground">{formatCurrency(employee.wage)}/hr</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(employee)}
                        className="border-border hover:bg-muted"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(employee.id)}
                        className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sortedEmployees.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "No employees found matching your search." : "No employees found."}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
