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