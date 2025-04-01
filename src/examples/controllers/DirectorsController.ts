import { Controller } from "../../decorators/Controller.js";
import { Get } from "../../decorators/Get.js";
import type { Director } from "../db/Director.js";
import type { InMemoryDatabase } from "../db/InMemoryDatabase.js";
import type { RandomIntGenerator } from "../RandomIntGenerator.js";

@Controller("/directors")
export class DirectorsController {
  private readonly db: InMemoryDatabase;
  private readonly rng: RandomIntGenerator;

  constructor(db: InMemoryDatabase, rng: RandomIntGenerator) {
    this.db = db;
    this.rng = rng;
  }

  @Get()
  getDirectors(): Director[] {
    return this.db.getDirectors();
  }
}
