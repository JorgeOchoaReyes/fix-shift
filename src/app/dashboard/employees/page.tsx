"use client";

import { useEffect, useState } from "react";
import { EmployeeTable } from "~/components/tables/employee-table";
import { EmployeeForm } from "~/components/forms/employee-form";
import type { Employee } from "~/server/db/schema"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { api } from "~/trpc/react";

export type CreateEmployeeData = Omit<Employee, "id">;

export default function HomePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [showModal, setShowModal] = useState(false);
  
  const listEmployees = api.employee.list.useQuery();
  const createEmployee = api.employee.create.useMutation();

  useEffect(() => {
    if (listEmployees.data) {
      setEmployees(listEmployees.data);
    }
  }, [listEmployees.data]);

  const handleAddEmployee = async (data: CreateEmployeeData) => {
    const newEmployee: Employee = {
      ...data,
      id: crypto.randomUUID(),
    };
    await createEmployee.mutateAsync(data);
    setEmployees((prev) => [...prev, newEmployee]);
    setShowModal(false);
  };

  const handleEditEmployee = (data: CreateEmployeeData) => {
    if (!editingEmployee) return;

    setEmployees((prev) => prev.map((emp) => (emp.id === editingEmployee.id ? { ...emp, ...data } : emp)));
    setEditingEmployee(null);
    setShowModal(false);
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowModal(true);
  };

  const handleAdd = async () => {
    setEditingEmployee(null);
    setShowModal(true); 
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <EmployeeTable employees={employees} onEdit={handleEdit} onDelete={handleDeleteEmployee} onAdd={handleAdd} />
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">
                {editingEmployee ? "Edit Employee" : "Add New Employee"}
              </DialogTitle>
            </DialogHeader>
            <EmployeeForm
              employee={editingEmployee ?? undefined}
              onSubmit={editingEmployee ? handleEditEmployee : handleAddEmployee}
              onCancel={handleCancel}
              loading={createEmployee.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
