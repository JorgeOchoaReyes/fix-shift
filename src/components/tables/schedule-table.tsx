
"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import type { Schedule } from "~/server/db/schema";
import { Trash2, Search, Plus, Loader2 } from "lucide-react";

interface ScheduleTableProps {
  schedules: Schedule[]
  onDelete: (id: string) => void
  onAdd: () => void
  loading?: boolean
}

export function ScheduleTable({ schedules, onDelete, onAdd, loading }: ScheduleTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Schedule>("startTime");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const filteredschedules = schedules;

  const sortedschedules = [...filteredschedules].sort((a, b) => {
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

  const handleSort = (field: keyof Schedule) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card className="w-full bg-slate-50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-2xl font-bold text-primary">Schedule Management</CardTitle>
          <Button onClick={onAdd} className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Add schedule
          </Button>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-input border-border"
            />
          </div>
          <Badge variant="secondary" className="bg-muted text-muted-foreground">
            {sortedschedules.length} schedules
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
                  onClick={() => handleSort("startTime")}
                >
                  Start time {sortField === "startTime" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="text-left py-3 px-4 font-medium text-foreground cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => handleSort("endTime")}
                >
                  End time {sortField === "endTime" && (sortDirection === "asc" ? "↑" : "↓")}
                </th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedschedules.map((schedule) => (
                <tr key={schedule.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{(new Date(schedule.startTime as unknown as number).toLocaleDateString("en-US"))}</td>
                  <td className="py-3 px-4 text-card-foreground">{(new Date(schedule.endTime as unknown as number).toLocaleDateString("en-US"))}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(schedule.id)}
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

          {
            loading ? <Loader2 className="animate-spin mx-auto mt-8 text-muted-foreground" /> :
              sortedschedules.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  {searchTerm ? "No schedules found matching your search." : "No Schedules found."}
                </div>
              )}
        </div>
      </CardContent>
    </Card>
  );
}
