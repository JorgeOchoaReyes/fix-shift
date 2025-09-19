
"use client";

import type React from "react";

import { useState } from "react"; 
import { Label } from "~/components/ui/label";
import { Card, CardContent, } from "~/components/ui/card";
import type { Schedule } from "~/server/db/schema";
import { Calendar as CalendarIcon, Loader } from "lucide-react";
import { format } from "date-fns"; 
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export type CreateScheduleData = Omit<Schedule, "id">;

interface ScheduleFormProps {
  schedule?: Schedule
  onSubmit: (data: CreateScheduleData) => void
  onCancel: () => void
  loading?: boolean
}

export function ScheduleForm({ schedule, onSubmit, onCancel, loading }: ScheduleFormProps) {
  const [formData, setFormData] = useState<CreateScheduleData>({
    startTime: new Date().getTime() as unknown as bigint,
    endTime: new Date().getTime() as unknown as bigint,
    createdAt: new Date(),
    updatedAt: new Date(),
    published: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CreateScheduleData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-autobg-slate-50 bg-slate-50"> 
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                Start off schedule
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!schedule?.startTime}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {formData?.startTime ? format(formData?.startTime as unknown as number, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={new Date((formData?.startTime as unknown as number))} onSelect={
                    (date) => date && handleChange("startTime", date.getTime())
                  } />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-foreground">
                End off schedule
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!schedule?.endTime}
                    className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
                  >
                    <CalendarIcon />
                    {formData?.endTime ? format(formData?.endTime as unknown as number, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={new Date(formData?.endTime as unknown as number)} onSelect={
                    (date) => date && handleChange("endTime", date.getTime())
                  } />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              {(schedule && !loading) ? "Update schedule" : "Add schedule"}
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
