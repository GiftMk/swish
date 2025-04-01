import { Body } from "../../decorators/Body.js";
import { Controller } from "../../decorators/Controller.js";
import { Delete } from "../../decorators/Delete.js";
import { Get } from "../../decorators/Get.js";
import { Post } from "../../decorators/Post.js";
import { Query } from "../../decorators/Query.js";
import type { Actor } from "../db/Actor.js";
import type { ActorsService } from "../service/ActorsService.js";

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
  getActorById(id: string, @Query("debug") debug: string | undefined): Actor {
    if (debug) {
      console.log("id", id, "debug", debug);
    }

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
