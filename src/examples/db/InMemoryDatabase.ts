import { Component } from "../../decorators/Component.js";
import type { Actor } from "./Actor.js";
import { actors, directors, movies } from "./defaultData.js";
import type { Director } from "./Director.js";
import type { Movie } from "./Movie.js";

@Component()
export class InMemoryDatabase {
  private readonly movies: Map<string, Movie>;
  private readonly directors: Map<string, Director>;
  private readonly actors: Map<string, Actor>;

  constructor() {
    this.actors = actors;
    this.movies = movies;
    this.directors = directors;
  }

  getMovies(): Movie[] {
    return [...this.movies.values()];
  }

  getMovieById(id: string): Movie | undefined {
    return this.movies.get(id);
  }

  getDirectors(): Director[] {
    return [...this.directors.values()];
  }

  getDirectorById(id: string): Director | undefined {
    return this.directors.get(id);
  }

  getActors(): Actor[] {
    return [...this.actors.values()];
  }

  getActorById(id: string): Actor | undefined {
    return this.actors.get(id);
  }

  addActor(actor: Actor) {
    this.actors.set(actor.id, actor);
  }

  deleteActor(id: string) {
    this.actors.delete(id);
  }
}
