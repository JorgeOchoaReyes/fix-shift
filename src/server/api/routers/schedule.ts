import { schedules } from "~/server/db/schema";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure, 
} from "~/server/api/trpc"; 
import { eq } from "drizzle-orm";

export const scheduleRouter = createTRPCRouter( {
  create: protectedProcedure
    .input(
      z.object({
        startTime: z.bigint(),
        endTime: z.bigint(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const schedule = await ctx.db.insert(schedules).values({
        startTime: input.startTime,
        endTime: input.endTime, 
        published: false,
      });
      return schedule;
    }),
  delete: protectedProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.db.delete(schedules).where(eq(schedules.id, input.id));
      } catch (error) {
        console.error("Error deleting schedule:", error);
        throw new Error("Failed to delete schedule");
      }
    }),
  list: protectedProcedure.query(async ({ ctx }) => {
    const allschedules = await ctx.db.select().from(schedules).orderBy(schedules.startTime);
    return allschedules;
  }),
}); 