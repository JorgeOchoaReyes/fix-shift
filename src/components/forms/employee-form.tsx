"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent, } from "~/components/ui/card";
import type { Employee } from "~/server/db/schema";
import { Loader } from "lucide-react";

export type CreateEmployeeData = Omit<Employee, "id">;

interface EmployeeFormProps {
  employee?: Employee
  onSubmit: (data: CreateEmployeeData) => void
  onCancel: () => void
  loading?: boolean
}

export function EmployeeForm({ employee, onSubmit, onCancel, loading }: EmployeeFormProps) {
  const [formData, setFormData] = useState<CreateEmployeeData>({
    name: employee?.name ?? "",
    position: employee?.position ?? "",
    department: employee?.department ?? "",
    hireDate: employee?.hireDate ?? "",
    wage: employee?.wage ?? 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CreateEmployeeData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-autobg-slate-50 bg-slate-50"> 
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter full name"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-sm font-medium text-foreground">
                Position
              </Label>
              <Input
                id="position"
                type="text"
                value={formData.position}
                onChange={(e) => handleChange("position", e.target.value)}
                placeholder="Enter position"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department" className="text-sm font-medium text-foreground">
                Department
              </Label>
              <Input
                id="department"
                type="text"
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                placeholder="Enter department"
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hireDate" className="text-sm font-medium text-foreground">
                Hire Date
              </Label>
              <Input
                id="hireDate"
                type="date"
                value={formData.hireDate}
                onChange={(e) => handleChange("hireDate", e.target.value)}
                required
                className="bg-input border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary" className="text-sm font-medium text-foreground">
                Annual Salary ($)
              </Label>
              <Label htmlFor="wage" className="text-sm font-medium text-foreground">
                Hourly Wage ($)
              </Label>
              <Input
                id="wage"
                type="number"
                value={formData.wage}
                onChange={(e) => handleChange("wage", Number.parseInt(e.target.value) || 0)}
                placeholder="Enter hourly wage"
                required
                min="0"
                className="bg-input border-border"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              {(employee && !loading) ? "Update Employee" : "Add Employee"}
              {(loading && <Loader className="ml-2" />)}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-border hover:bg-muted bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
