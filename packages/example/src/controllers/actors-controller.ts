import { Body, Controller, Delete, Get, Post, Query } from "@swish/decorators";
import type { Actor } from "../db/model/actor";
import type { ActorsService } from "../service/actors-service";

@Controller("/actors")
export class ActorsController {
  private readonly actorsService: ActorsService;

  constructor(actorsService: ActorsService) {
    this.actorsService = actorsService;
  }

  @Get()
  getActors(@Query("filter") filter?: string): Actor[] {
    return this.actorsService.getAll(filter);
  }

  @Get("/:id")
  getActorById(id: string): Actor {
    const actor = this.actorsService.getById(id);

    if (!actor) {
      throw new Error(`Actor not found with ID: ${id}`);
    }

    return actor;
  }

  @Post()
  addActor(@Body() actor: Actor) {
    return this.actorsService.add(actor);
  }

  @Delete(":id")
  deleteActor(id: string) {
    this.actorsService.remove(id);
  }
}
