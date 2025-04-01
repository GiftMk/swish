import { Controller } from "../../decorators/Controller.js";
import { Get } from "../../decorators/Get.js";
import type { InMemoryDatabase } from "../db/InMemoryDatabase.js";
import type { Movie } from "../db/Movie.js";

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
