CREATE TABLE "attendance" (
	"id" serial PRIMARY KEY NOT NULL,
	"studentId" integer NOT NULL,
	"present" boolean DEFAULT false,
	"day" integer NOT NULL,
	"date" varchar(20) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "grades" ALTER COLUMN "id" SET DATA TYPE serial;