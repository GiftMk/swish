import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const MAX_LINE_LENGTH = 255;

export const haikuTable = pgTable("haikus", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  lineOne: varchar({ length: MAX_LINE_LENGTH }).notNull(),
  lineTwo: varchar({ length: MAX_LINE_LENGTH }).notNull(),
  lineThree: varchar({ length: MAX_LINE_LENGTH }).notNull(),
});
