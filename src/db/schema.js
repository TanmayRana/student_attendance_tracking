import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";

export const GRADES = pgTable("grades", {
  id: serial("id", { length: 11 }).primaryKey(),
  grade: varchar("grade", { length: 256 }).notNull(),
});

// export const STUDENTS = pgTable("students", {
//   id: integer("id").autoIncrement().primaryKey(),
//   name: varchar("name", { length: 20 }).notNull(),
//   grade: varchar("grade", { length: 10 }).notNull(),
//   address: varchar("address", { length: 100 }),
//   phone: varchar("phone", { length: 20 }),
// });

export const STUDENTS = pgTable("students", {
  id: serial("id", { length: 11 }).primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  grade: varchar("grade", { length: 10 }).notNull(),
  address: varchar("address", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
});

export const ATTENDANCE = pgTable("attendance", {
  id: serial("id", { length: 11 }).primaryKey(),
  studentId: integer("studentId", { length: 11 }).notNull(),
  present: boolean("present").default(false),
  day: integer("day", { length: 11 }).notNull(),
  date: varchar("date", { length: 20 }).notNull(),
});
