import { Controller, Get } from "@swish/decorators";
import type { Director } from "../db/model/director";
import type { InMemoryDatabase } from "../db/in-memory-database";

@Controller("/directors")
export class DirectorsController {
  private readonly db: InMemoryDatabase;

  constructor(db: InMemoryDatabase) {
    this.db = db;
  }

  @Get()
  getDirectors(): Director[] {
    return this.db.getDirectors();
  }
}
