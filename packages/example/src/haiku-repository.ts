import { Component } from "@swish/decorators";
import { haikuTable } from "./db/schema";
import { eq } from "drizzle-orm";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { getDatabase } from "./db/get-database";
import type { Haiku } from "./haiku";

@Component()
export class HaikuRepository {
  private readonly db: NodePgDatabase;

  constructor() {
    this.db = getDatabase();
  }

  async add(newHaiku: typeof haikuTable.$inferInsert): Promise<Haiku> {
    const haiku = (
      await this.db.insert(haikuTable).values(newHaiku).returning()
    )[0];

    if (!haiku) {
      throw new Error("Failed to create haiku");
    }
    return haiku;
  }

  async delete(id: number): Promise<Haiku> {
    const haiku = (
      await this.db.delete(haikuTable).where(eq(haikuTable.id, id)).returning()
    )[0];

    if (!haiku) {
      throw new Error(`Failed to delete haiku with ID ${id}`);
    }

    return haiku;
  }

  async selectById(id: number): Promise<Haiku | undefined> {
    const haiku = await this.db
      .select()
      .from(haikuTable)
      .where(eq(haikuTable.id, id));
    return haiku[0];
  }

  async selectAll(): Promise<Haiku[]> {
    return await this.db.select().from(haikuTable);
  }
}
