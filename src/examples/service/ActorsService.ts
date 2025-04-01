import { Component } from "../../decorators/Component.js";
import type { Actor } from "../db/Actor.js";
import type { InMemoryDatabase } from "../db/InMemoryDatabase.js";
import { v4 as uuidv4 } from "uuid";

@Component()
export class ActorsService {
  private readonly db: InMemoryDatabase;

  constructor(db: InMemoryDatabase) {
    this.db = db;
  }

  getAll(filter?: string): Actor[] {
    const loweredFilter = filter?.toLowerCase();
    return this.db.getActors().filter((actor) => {
      if (loweredFilter) {
        const fullName = `${actor.firstName} ${actor.lastName}`;
        return (
          actor.firstName.toLowerCase().includes(loweredFilter) ||
          actor.lastName.toLowerCase().includes(loweredFilter) ||
          fullName.toLowerCase().includes(loweredFilter)
        );
      }
      return true;
    });
  }

  getById(id: string): Actor | undefined {
    return this.db.getActorById(id);
  }

  add(actorDto: Omit<Actor, "id">): Actor {
    const actor = { id: uuidv4(), ...actorDto };
    this.db.addActor(actor);
    return actor;
  }

  remove(id: string) {
    this.db.deleteActor(id);
  }
}
