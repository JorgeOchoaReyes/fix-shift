import { eq } from "drizzle-orm";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure, 
} from "~/server/api/trpc";  
import { employees } from "~/server/db/schema";

export const employeeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({
      name: z.string(),
      position: z.string(),
      department: z.string(),
      hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
      }),
      wage: z.number().min(0),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const employee = await ctx.db.insert(employees).values(input);
        return employee;
      } catch (error) {
        console.error("Error creating employee:", error);
        throw new Error("Failed to create employee");
      }
    }),
  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      position: z.string(),
      department: z.string(),
      hireDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
      }),
      wage: z.number().min(0),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        const { id, ...data } = input;
        const updatedEmployee = await ctx.db.update(employees).set(data).where(eq(employees.id, id)).returning();
        return updatedEmployee[0];
      } catch (error) {
        console.error("Error updating employee:", error);
        throw new Error("Failed to update employee");
      }
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.delete(employees).where(eq(employees.id, input.id));
      } catch (error) {
        console.error("Error deleting employee:", error);
        throw new Error("Failed to delete employee");
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    try {
      const allEmployees = await ctx.db.select().from(employees);
      return allEmployees;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw new Error("Failed to fetch employees");
    }
  }), 
});