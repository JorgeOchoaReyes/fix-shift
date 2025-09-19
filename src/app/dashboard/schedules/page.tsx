"use client";

import { useEffect, useState } from "react";
import { ScheduleTable } from "~/components/tables/schedule-table"; 
import type { Schedule } from "~/server/db/schema"; 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { api } from "~/trpc/react";
import { ScheduleForm } from "~/components/forms/schedule-form";

export type CreateScheduleData = Omit<Schedule, "id" | "createdAt" | "updatedAt">;

export default function HomePage() {
  const [schedules, setschedules] = useState<Schedule[]>([]); 
  const [showModal, setShowModal] = useState(false);
  
  const listschedules = api.schedule.list.useQuery();
  const createschedule = api.schedule.create.useMutation();
  const deleteschedule = api.schedule.delete.useMutation();

  useEffect(() => {
    if (listschedules.data) {
      setschedules(listschedules.data);
    }
  }, [listschedules.data]);

  const handleAddschedule = async (data: CreateScheduleData) => {

    const newschedule: Schedule = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      id: crypto.randomUUID(),
    };
    await createschedule.mutateAsync({
      startTime: data.startTime,
      endTime: data.endTime,
    });
    setschedules((prev) => [...prev, newschedule]);
    setShowModal(false);
  };

  const handleDeleteschedule = async (id: string) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      setschedules((prev) => prev.filter((emp) => emp.id !== id));
      await deleteschedule.mutateAsync({ id });
    }
  }; 

  const handleAdd = async () => {
    setShowModal(true); 
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <ScheduleTable loading={listschedules.isLoading} schedules={schedules} onDelete={handleDeleteschedule} onAdd={handleAdd} />
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-primary">
                Add New Schedule 
              </DialogTitle>
            </DialogHeader>
            <ScheduleForm onSubmit={handleAddschedule} onCancel={handleCancel} loading={createschedule.isPending} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
