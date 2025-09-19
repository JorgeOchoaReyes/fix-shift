CREATE TABLE "am_schedule" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"startTime" integer NOT NULL,
	"endTime" integer NOT NULL,
	"createdAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"published" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "am_shift" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"employeeId" varchar(255) NOT NULL,
	"scheduleId" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"startTime" timestamp with time zone NOT NULL,
	"endTime" timestamp with time zone NOT NULL,
	"breakRequired" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "am_shift" ADD CONSTRAINT "am_shift_employeeId_am_employee_id_fk" FOREIGN KEY ("employeeId") REFERENCES "public"."am_employee"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "am_shift" ADD CONSTRAINT "am_shift_scheduleId_am_schedule_id_fk" FOREIGN KEY ("scheduleId") REFERENCES "public"."am_schedule"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "am_employee" DROP COLUMN "salary";