import { Controller, Get } from "@swish/decorators";
import type { InMemoryDatabase } from "../db/in-memory-database";
import type { Movie } from "../db/model/movie";

@Controller("/movies")
export class MoviesController {
  private readonly db: InMemoryDatabase;

  constructor(db: InMemoryDatabase) {
    this.db = db;
  }

  @Get()
  getMovies(): Movie[] {
    return this.db.getMovies();
  }
}
